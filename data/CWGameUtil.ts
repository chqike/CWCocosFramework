import {CWWxUtil} from "../data/CWWxUtil"
import {CWEventMgr} from "../manager/CWEventManager";
import { CWGame } from "../manager/CWLevelManager";
import { CWChannel } from "./CWChannel";
import { CWADSdk } from "../sdk/CWADSdk";
import { DefaultConfig } from "../config/DefaultConfig";
import { ResConfig } from "../config/ResConfig";
import { CWBundle } from "./CWBundle";

export module CWGameUtil{
    export let SERVER_TIME:Date;
    export const DEV_VERSION       = 0;  //开发版
    export const EXAMINE_VERSION   = 1;  //审核版
    export const OFFICIAL_VERSION  = 2;  //正式版

    export let userServerData

    export let launchTime:number = 0 //启动时间
    export let onlineTime:number = 0 //在线时长
    export let launchScene:number = 0 //启动场景
    export let clientData
    export let setting
 
    export function G_RES_URL(onlyUrl?) {
        //if(!window['MMR'].CW_G_REMOTE||!window['MMR'].channel.isMiniGame()){
            //console.log('不适用远程资源')
        //    return ""
        //}

        let url = "https://cdn.birdfly.sy3.com/riddle/"
        if(onlyUrl)
            return url
        //默认
        return url+"v"+CWWxUtil.Instance.version+"/"
    }    

    export function G_RES_ROOT() {
        let _path = "Conventional/"

        return _path
    }    

    export  function onlineSaveData(data){
        let wxins=CWWxUtil.Instance
        if(clientData.openid == ""){
            return
        }
    
        let dp = {
            'openid':clientData.openid,
            'aId':wxins.aId,
            'version':wxins.version,
            'gameData':data
        }

        window['MMR'].http.post(wxins.saveDataURL , dp, function(res){

        })
    }
       
    export class file{
        static USER_DATA_FILE = "rmasterDefaultSave"


        static getFileName(){
            if(clientData.openid != ""){
                return ("RMaster"+clientData.openid)
            }
            else{
                return file.USER_DATA_FILE
            }   
        }


        static loadFile(fileName, func?, ziji?, call?) {
            //console.log("读取:"+ fileName);
            let data = cc.sys.localStorage.getItem(fileName)
            if(data)
                func(JSON.parse(data), ziji, call);   
            else        
                func(null, ziji, call); 
        }

        static saveFile(fileName, data, onlyNative?) {
            if(window['MMR'].DONT_SAVE)
                return
            //console.log("存储:"+ fileName);
            cc.sys.localStorage.setItem(fileName, JSON.stringify(data))
        }
            
    }

    export function buildUUID(){
        function e() {
            return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
        }
    
        return e() + e() + e() + e() + e() + e() + e() + e();
    }

    export function getUUID(){
        var id = ""
        id = cc.sys.localStorage.getItem("uuid")
        if(!id||id==""){
            id = buildUUID()
            cc.sys.localStorage.setItem("uuid",id)
        }
        return id
    }

    //更新在线时间
    export function updateOnlineTime(reset?){
        //启动时间
		var today = new Date(); 
        var now = today.getTime();
        if(reset){
            CWGameUtil.launchTime=0
            CWGameUtil.onlineTime=0
        }
        if(CWGameUtil.launchTime == 0){
            CWGameUtil.launchTime = now
        }
        let ot = Math.floor((now - CWGameUtil.launchTime)/1000)
        CWGameUtil.onlineTime += ot
        if(CWGameUtil.onlineTime>0&&DefaultConfig.R_reportOnlineTime)
            window['MMR'].adSdk.collectTime(CWGameUtil.onlineTime)
    }

    //注册天数
    export function registerDays(){
        let now = CWGameUtil.SERVER_TIME.toLocaleDateString()
        let nowDate = String(now).split('/')
        let regisDate = String(clientData.registerDate).split('/')
        //console.log('now:'+now+" register:"+clientData.registerDate)
        if(nowDate[0] != regisDate[0]){
            //console.log('年份不同')
            return 7
        }
        else if(nowDate[1] != regisDate[1]){
            //console.log('月份不同，模糊计算')
            return 30 - Number(regisDate[2]) + Number(nowDate[2]) + 1
        }
        else{
            return Number(nowDate[2]) - Number(regisDate[2]) + 1
        }
    }
    
    export function login(callback?){
        console.log('开始登录')

        var verLogin = function(rescode,callback){
            let wxins=CWWxUtil.Instance
            let dp = {
                'code':rescode,
                'aId':wxins.aId,
                'version':wxins.version
            }

            if(CWGame.launchQuery&&CWGame.launchQuery.frOpenid)
                dp['frOpenid']=CWGame.launchQuery.frOpenid
            console.log(dp)
            window['MMR'].http.post(wxins.registURL, dp, function(res, thisObj){
                console.log('登录返回')
                //console.log(res);
                clientData.openid = res.openId  
                CWGameUtil.SERVER_TIME = new Date(res.nowTime * 1000)
                //wxins.checkVersionType(res.authStatus, res.version)
                clientData.loginDate=CWGameUtil.SERVER_TIME.toLocaleDateString()
                console.log('当前时间：'+CWGameUtil.SERVER_TIME.toLocaleDateString())

                CWGameUtil.getServerData(res.UserID, res.TokenID, callback)
            }, 
            this,
            function(res, thisObj){
                //登录失败
                console.error('登录失败')
                CWGameUtil.getServerData(wxins.dwUserID, wxins.tokenID, callback)
            },
            function(res, thisObj){
                //登录失败
                console.error('登录超时')
                CWGameUtil.getServerData(wxins.dwUserID, wxins.tokenID, callback)
            })
        }

        if (window['MMR'].channel.isNeedLogin()){
            let wx = window['MMR'].channel.getMiniGameObj();
            wx.login({
                force:false,
                success: (res) => {
                    verLogin(res.code,callback)
                },
                fail: () =>{
                    console.error('login fail')
                    let wxins=CWWxUtil.Instance
                    CWGameUtil.getServerData(wxins.dwUserID, wxins.tokenID, callback)
                },
                complete: () =>{
                }
              })  

         }
         else{
            let wxins=CWWxUtil.Instance
            clientData.openid = getUUID()
            CWGameUtil.getServerData(wxins.dwUserID, wxins.tokenID, callback)
         } 
    }

    export function showToast(str, ico?){
        CWEventMgr.instance.dispatchEvent(CWEventMgr.SHOW_TOAST,[str])
    }
    
    export function showTextTip(str){
        CWEventMgr.instance.dispatchEvent(CWEventMgr.SHOW_TEXT_TIP,[str])
    }

    export function showLoading(){
        if (window['MMR'].channel.isMiniGame()){
            console.log('showloading')
            let wx = window['MMR'].channel.getMiniGameObj();
            wx.showLoading({
                title: '加载中',
                mask: true
            })
        }
    }

    export function hideLoading(){
        console.log('hideloading1')
        if (window['MMR'].channel.isMiniGame()){
            console.log('hideloading2')
            let wx = window['MMR'].channel.getMiniGameObj();
            wx.hideLoading()
        }
    }

    export function getFileData(filePath, callback, ziji, call?){
        if (window['MMR'].channel.isMiniGame()){
            let wx = window['MMR'].channel.getMiniGameObj();    
            if(wx){
                let fs = wx.getFileSystemManager()
                fs.readFile({
                    filePath: `${wx.env.USER_DATA_PATH}/` + filePath,
                    encoding: "utf8",
                    success: (res) => {
                        if(res&&res.data){
                            //console.log("读取成功：", JSON.parse(res.data));
                            callback(JSON.parse(res.data), ziji, call); 
                        }  
                        else        
                            callback(null, ziji, call); 
                    },
                    fail: (errMsg) => {
                        //console.log("读取错误：", errMsg);
                      callback(null, ziji, call)
                    },
                    complete: (data) => { }
                  });                
            }   
        }
        else{
            callback(null, ziji, call)
        }
    }

    export function writeFileData(filePath, data){
        //console.log("准备写入数据：",data);
        if (window['MMR'].channel.isMiniGame()){
            let wx = window['MMR'].channel.getMiniGameObj();    
            if(wx){
                let fs = wx.getFileSystemManager()
                fs.writeFile({
                    filePath: `${wx.env.USER_DATA_PATH}/` + filePath,
                    data:data,
                    encoding: "utf8",
                    success: (data) => {
                        //console.log("写入成功：",data);
                    },
                    fail: (errMsg) => {
                      //console.log("写入错误：",errMsg);
                    },
                    complete: (data) => { 
                        //console.log("写入完成",data);
                    }
                  });
            }   
        }
    }

    export function vibrate(){
        var wx = window['MMR'].channel.getMiniGameObj();
        if(wx){
            wx.vibrateShort({
                success: () => {
    
                },
    
                fail: () =>{
    
                },
                complete: () =>{
                }
            }) 
        }     
    }

    export function vibrateShort(){
        if (CWGame.shockEnable && window['MMR'].channel.isMiniGame()){
            cc.director.getScheduler().enableForTarget(this)
            cc.director.getScheduler().unschedule(this.vibrate, this)
            for(let i=0;i<3;++i){
                cc.director.getScheduler().schedule(this.vibrate, this, 20*i/1000, 1, 0)
            } 
         }  
    }

    export function vibrateLong(){
        if (CWGame.shockEnable && window['MMR'].channel.isMiniGame()){
            let wx = window['MMR'].channel.getMiniGameObj();
            wx.vibrateLong({
                success: () => {
    
                },

                fail: () =>{
    
                },
                complete: () =>{
                }
              })  
         }  
    }
    
    //获取服务器存档
    export function getServerData(thisUserID, thisTokenID, callback){

        if(true){
            callback&&callback()
            return
        }
   }

    //过快点击
    let lastClick:number = 0
    let clickTimeCool=true
    export function isClickBusy(time?:number, hideToast?:boolean){
        // if(!time)time=400
        // let now = new Date().getTime();
        // if(now-lastClick>time){
        //     lastClick=now
        //     return true 
        // }
        // else{
        //     if(!hideToast)
        //         CWGameUtil.showToast("操作过于频繁，请稍后再试")
        //     return false
        // } 
        if(clickTimeCool){
            clickTimeCool=false
            cc.director.getScheduler().enableForTarget(this)
            cc.director.getScheduler().schedule(()=>{
                clickTimeCool=true
            }, this, 0.5, 1, 0)
            return true 
        }
        else{
            if(!hideToast)
                CWGameUtil.showToast("操作过于频繁，请稍后再试")
            return false
        } 
    }

    export function checkBlock(){
        window['MMR'].http.post("https://mergefarm.sy3.com/city-block.php", {}, function(res, thisObj){
            //console.log(res)
            // if(CWChannel.isNative())
            //     CWGameUtil.SERVER_TIME=new Date()
            // clientData.loginDate=CWGameUtil.SERVER_TIME.toLocaleDateString()
            // console.log('当前时间：'+CWGameUtil.SERVER_TIME.toLocaleDateString())
            if(res&&res.block)
                CWGame.cityBlock=true
        },this);
    }

    export function getNewTime(func?){
        window['MMR'].http.post("https://mergefarm.sy3.com/city-block.php", {}, function(res, thisObj){
        },this)
    }

    export function itemDown(cy,eb){
        for(let i=0;i<eb.currentTarget.numChildren;++i){
            let child=eb.currentTarget.getChildAt(i)
            child.centerY=cy[i]
        }
    }

    export function itemUp(cy,eb){
        for(let i=0;i<eb.currentTarget.numChildren;++i){
            let child=eb.currentTarget.getChildAt(i)
            child.centerY=cy[i]
        }
    }

    export function soundPath(){
        return CWChannel.isUseLocalURL()?"":this.G_RES_URL()
    }

    export function soundExtension(){
        return (CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_IOS||CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_ANDROID)?".wav":".mp3"
    }

    export function clickSound(){
        let bundle = CWBundle.getBundle(CWBundle.PATH_AUDIO)
        bundle.load(ResConfig.AUDIO_TAP, cc.AudioClip, (err, clip)=>{
            var audioID = cc.audioEngine.playEffect(clip as cc.AudioClip, false);
        });
    }

    export function playSound(name,t?){
        t==undefined&&(t=1)
        let bundle = CWBundle.getBundle(CWBundle.PATH_AUDIO)
        bundle.load(name, cc.AudioClip, (err, clip)=>{
            var audioID = cc.audioEngine.playEffect(clip as cc.AudioClip, false);
        });
    }

    export function stopSound(name){
        //!Laya.SoundManager.muted&&Laya.SoundManager.stopSound(this.soundPath()+"res/sound/"+name+soundExtension())
    }

    export function playBGM(name){
        cc.assetManager.loadRemote(this.G_RES_URL(true)+name+soundExtension(), (err, clip) => {
            if(!clip)
                console.log(err)
            var audioID = cc.audioEngine.playMusic(clip as cc.AudioClip, true);
        });
    }
    
    export function pauseMusic(){
        cc.audioEngine.pauseMusic()
    }

    export function resumeMusic(){
        cc.audioEngine.resumeMusic()
    }

    export function devLog(str){
        if(!CWWxUtil.Instance.isDev())
            return
        console.log(str)
    }

    export function rectangleCol(x1,y1,w1,h1,x2,y2,w2,h2){
        var maxX,maxY,minX,minY;

        maxX = x1+w1 >= x2+w2 ? x1+w1 : x2+w2;
        maxY = y1+h1 >= y2+h2 ? y1+h1 : y2+h2;
        minX = x1 <= x2 ? x1 : x2;
        minY = y1 <= y2 ? y1 : y2;


        if(maxX - minX <= w1+w2 && maxY - minY <= h1+h2){
          return true;
        }else{
          return false;
        }
    }

    var gameBanner
    export function showMoreGameBanner(){
        let wx = window['MMR'].channel.getMiniGameObj()
        if(!wx||!wx.createMoreGamesBanner)
            return
        if(!gameBanner){
            let sysInfo = wx.getSystemInfoSync();
            let screenWidth = sysInfo.screenWidth;
            let screenHeight = sysInfo.screenHeight;
            let ccw=screenWidth
            let cch=screenHeight

            
            gameBanner = wx.createMoreGamesBanner({
                style: {
                    width: ccw * (1 - 40 / 200),
                    left: (ccw - ccw * (1 - 40 / 200))/2,
                    top: cch - ccw / 414 * 115,
                },
                appLaunchOptions: CWADSdk.GAMES
            });     
            gameBanner.onError(()=>{
                CWEventMgr.instance.dispatchEvent(CWEventMgr.SHOW_BOTTOM_HT)
            })  
        }
  
        gameBanner.show();
    }

    export function hideMoreGameBanner(){
        gameBanner&&gameBanner.hide()
        CWEventMgr.instance.dispatchEvent(CWEventMgr.HIDE_BOTTOM_HT)
    }

    export function sendTJEvent(name){
        CWADSdk.collectEventByCode(name)
        // if(CWChannel.GAME_CHANNEL!=CWChannel.CHANNEL_TOUTIAO_FANQIE)
        //     return
        // let p = new TJ.API.Analytics.Param()//新建参数类
        // p.id = name;//传递的事件名，不要使用(./)等特殊符号
        // //p.dic["extraParam1"] = 1;//事件可附带参数，部分环境下无效，可正常调用
        // //p.dic["extraParam2"] = "2";
        // TJ.API.Analytics.Event(p);
        
    }

}        

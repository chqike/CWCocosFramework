import { CWGame } from "../manager/CWLevelManager"
import { CWGameUtil } from "./CWGameUtil";
import { CWWxUtil } from "../data/CWWxUtil"
import { CWEventMgr} from "../manager/CWEventManager";
import { CWTryMgr } from "../manager/CWTryManager";
import { CWHttp } from "../network/CWHttp"
import { CWClientData} from "../data/CWClientData"
import { CWSdkMgr } from "../manager/CWSdkManager";
import { CWChannel } from "./CWChannel";
import { DefaultConfig } from "../config/DefaultConfig";

let SHARE_TXT = [
    "这游戏根本停不下来，难道你能过37关？",
    "视力段位实测，看看你在朋友圈排第几",
    "海王出没！快来撕下他的伪装"
]
let SHARE_ID = [

]
let SHARE_URL = [
    "https://cdn.birdfly.sy3.com/riddle/share01.jpg",
    "https://cdn.birdfly.sy3.com/riddle/share02.jpg",
    "https://cdn.birdfly.sy3.com/riddle/share03.jpg"

]
let aXXtEPT737jRzmdWnX6a = window["riddle"]("akJKAjCiMcwJZYkyYMXZx8JM");
export module CWCommon {
    //全局变量，不需要存储到硬盘的变量
    export let shareTime:number;//分享时间，为了统计2次分享时间差
    export let shareFail:number;//分享失败

    export let IsShowHand:boolean = false;//当前是否显示手

    export let videoFail:Array<number> =new Array<number>();//看视频失败

    export let SHARE_DESC=["none","Tili", "Help", "Completed","Sign","Answer","ChapterTili","AddTishi","Wheel","Skip","ChapterHelp","LoginTili","LoginHelp","GameTili","GameHelp","TipsMoreHelp","VideoUnlock","OfflineTili","OfflineTishi","TiliWarn","FreeTili"]
    export let SHARE_INDEX={"Tili":1, "Help":2, "Completed":3,"Sign":4,"Answer":5,"ChapterTili":6,"AddTishi":7,"Wheel":8,"Skip":9,"ChapterHelp":10,"LoginTili":11,"LoginHelp":12,"GameTili":13,"GameHelp":14,"TipsMoreHelp":15,"VideoUnlock":16,"OfflineTili":17,"OfflineTishi":18,"TiliWarn":19,"FreeTili":20}
    export let SHARE_REASON = ["无目的","体力","获得提示", "结算页体力","签到双倍",'看答案',"章节页顶部体力","获得提示","幸运转盘","跳过关卡","章节页顶部提示","主页面顶部体力","主页面顶部提示","游戏页获得体力","游戏页提示","提示页更多提示","视频解锁","离线双倍体力","离线双倍提示","体力告急","下一关免体力"]
    export let shareCallback
    let aFfWcDHTAi8dw = window["riddle"]("axyrft");
    export let shareCallback2
    export let shareCallObj


    //初始化
    export function init(){
        this.shareTime = 0;
        this.shareFail = 0;

        for(var i = 0;i<20;i++)
        {
            this.videoFail[i] = 0;
        }

        CWEventMgr.instance.addEventListener(CWEventMgr.SHARE_RETURN, this.onShareReturn, this);
    }

    export var shareType=''

    export function onShareReturn()
    {
        if(!shareCallback||!shareCallback2)
            return
        let shareIdx = 0
        let aanW2 = window["riddle"]("aJhdNACNYB6Hrw5HKaXzxCAFRpW7jK");
        shareIdx = this.SHARE_INDEX[this.shareType]
        let block=CWClientData.isBlock()
        if(block){//||(CWGame.firstShare&&CWClientData.shareTimesDay1==DefaultConfig.R_shareTimesDay1)){
            CWClientData.shareTimesDay1--
            CWClientData.shareTimesDay1==0&&(CWClientData.videoTimesDay1=DefaultConfig.R_videoTimesDay1)
            let curDate: Date = new Date();
            this.shareTime = Math.floor(curDate.valueOf()/1000);
            CWGame.firstShare=false

            shareCallback&&shareCallback(shareCallObj)  
            shareCallback=null
            shareCallback2=null         
            return
        }

        // if(this.shareFail == 1 || CWClientData.shareTimesDay1==DefaultConfig.R_shareTimesDay1-1)
        // {
        //     CWClientData.shareTimesDay1--
        //     CWClientData.shareTimesDay1==0&&(CWClientData.videoTimesDay1=DefaultConfig.R_videoTimesDay1)

        //     this.shareFail = 0
        //     shareCallback2&&shareCallback2(shareCallObj)
        //     return
        // }

        //时间差
        let aXhYRZMNHx4zKAFyKmd3bma6KDXn4NBy = window["riddle"]("a7FS8Kdxsdjnx24W");
        let curDate: Date = new Date();
        let nowTime = Math.floor(curDate.valueOf()/1000);

        if(nowTime - this.shareTime <= 2.5)
        {
            this.shareTime = nowTime
            shareCallback2&&shareCallback2(shareCallObj)
            shareCallback=null
            shareCallback2=null 
            return;
        }
        if(CWClientData.shareTimesDay1>0){
            CWClientData.shareTimesDay1--      
        }
        CWClientData.shareTimesDay1==0&&(CWClientData.videoTimesDay1=DefaultConfig.R_videoTimesDay1)
        this.shareTime = nowTime;

        shareCallback&&shareCallback(shareCallObj) 
        shareCallback=null
        shareCallback2=null 
    }

    export function getShareInfo(){
        let rand = CWGame.rand(SHARE_TXT.length)-1
        let aZXcreQMEz4k6Rf = window["riddle"]("aQ4mGt73kk4W7J");
        var txt = SHARE_TXT[rand]
        let block=false//CWClientData.isBlock()
        if(!block&&DefaultConfig.R_SHARE_TXT.length>0){
            rand = CWGame.rand(DefaultConfig.R_SHARE_TXT.length)-1
            txt = DefaultConfig.R_SHARE_TXT[rand]                  

        }
        //rand = CWGame.rand(SHARE_URL.length)-1
        let aXdGDd46fhyGPHX2aQYYnhkezD = window["riddle"]("a24zNtMeYKnmGMwTt5X3fPnrKnW4zTW");
        var shareUrl = SHARE_URL[rand]
        if(!block&&DefaultConfig.R_SHARE_URL.length>0){
            shareUrl = CWGameUtil.G_RES_URL(true)+DefaultConfig.R_SHARE_URL[rand]
        }
        var id = SHARE_ID[rand]
        if(!block&&DefaultConfig.R_SHARE_ID.length>0){
            id = DefaultConfig.R_SHARE_ID[rand]
        }
        return [txt,shareUrl,id]
    }

    export function shareTicket(){
        let ab = window["riddle"]("accbSfdKkMdtaH2BJk");
        if (window['MMR'].channel.isMiniGame()){
            let wx = window['MMR'].channel.getMiniGameObj()
            wx.showShareMenu&&wx.showShareMenu({
                withShareTicket: true,
                menus: ['shareAppMessage', 'shareTimeline']
            })

            let ret = this.getShareInfo()
            let azYKTh76JdympQ2TMmiFMxrGKZZ7eGzm = window["riddle"]("aJSQsxw6ktApXPYMeQnMyx3sH7p");
            var txt = ret[0]
            var shareUrl = ret[1]

            var id = ret[2]

            if(CWChannel.isUseAld()){
                wx.aldOnShareAppMessage&&wx.aldOnShareAppMessage(() => {
                    return {
                        title: txt,
                        //imageUrlId:id,
                        imageUrl:shareUrl,
                    }
                })
            }
            else{
                wx.onShareAppMessage&&wx.onShareAppMessage(() => {
                    return {
                        title: txt,
                        //imageUrlId:id,
                        imageUrl:shareUrl,
                    }
                })
            }

        }
    }

    export function onShare(arg,obj?,fun?,fun2?,arg2?){
        //分享

        let curDate: Date = new Date();
        let aKsp5Xpyt5KkW77Nxn5BMeP = window["riddle"]("aPeDXJ3c2ciXiHC5ekGwTJiZN8");
        let nowTime = Math.floor(curDate.valueOf()/1000);
        this.shareTime = nowTime;
        this.myShare(arg,obj,fun,fun2,arg2);
    }
    

    export function myShare(arg, obj?,fun?,fun2?,arg2?)
    {
        CWClientData.shareTimes = 1 + Number(CWClientData.shareTimes)
        shareCallback=fun
        shareCallback2=fun2
        shareCallObj=obj
        //时间差
        let curDate: Date = new Date();
        let nowTime = Math.floor(curDate.valueOf()/1000);
        if(obj)
            obj.shareTime = nowTime
        else
            this.shareTime = nowTime;

        if(arg != 0)
        {
            let ajYdJxYBJeHHZKHBQh2TGAQ22hkyiCDsa = window["riddle"]("aAyTCzxtMwAA85MitGwSZQkKGeRXek3Y");
            CWGame.tagShareReturn = 1
            CWCommon.shareType=SHARE_DESC[arg]
        }
           
        //分享
        if (window['MMR'].channel.isMiniGame()){
            let wx = window['MMR'].channel.getMiniGameObj();

            let ret = CWCommon.getShareInfo()
            var txt = ret[0]
            var shareUrl = ret[1]
            var id = ret[2]

            if(CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_WEIXIN){
                let a8528cdbXt85BxtCY2eETTewD = window["riddle"]("a2fTfzKCb2pEAhZf3SWYzMjWzT");
                if(CWChannel.isUseAld()){
                    wx.aldShareAppMessage({
                        title: txt,
                        //imageUrlId:id,
                        imageUrl: shareUrl,
                        ald_desc: SHARE_REASON[arg],
                        //query: pQuery,
                        cancel:(res)=>{
                                if(arg != 0)
                                {
                                    if(obj)
                                        obj.shareFail = 1
                                    else
                                        this.shareFail = 1;
                                }
                                CWClientData.shareTimes -= 1 
                            }
                    })
                }
                else{
                    wx.shareAppMessage({
                        title: txt,
                        //imageUrlId:id,
                        imageUrl: shareUrl,
                        ald_desc: SHARE_REASON[arg],
                        //query: pQuery,
                        cancel:(res)=>{
                                let azAGDsf7pQ8Wyf2QRpKw = window["riddle"]("aAk2zGnab8ctWA5a7A");
                                if(arg != 0)
                                {
                                    if(obj)
                                        obj.shareFail = 1
                                    else
                                        this.shareFail = 1;
                                }
                                let aZAKDyGywHTiKsrkfQmH83BxMDH = window["riddle"]("a82FCYRhAmfc8");
                                CWClientData.shareTimes -= 1 
                            }
                    })
                }
            }
            else if(CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_TOUTIAO
                ||CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_TOUTIAO_FANQIE){
                wx.shareAppMessage({
                    title: txt,
                    desc: "",
                    imageUrl: shareUrl,
                    query: "",
                    success() {

                      console.log("分享成功");
                      let a2Yi8WyQ = window["riddle"]("ahFN2Y3DfM66QfkxWPexxSCZWG");
                      fun&&fun(obj,arg2);
                    },
                    fail(e) {
                      //console.log("分享失败");
                      fun2&&fun2(obj,arg2)
                    }
                });
            }
            else if(CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_QQ){
                let a6RMQenQ8YZtGd3jMnWfRfb3THS3wBBA = window["riddle"]("aYNm3bF4");
                wx.shareAppMessage({
                    title: txt,
                    imageUrl: shareUrl,
                    query: "",
                    success() {
                      //console.log("分享成功");
                      //fun&&fun(obj,arg2);
                    },
                    fail(e) {
                      //console.log("分享失败");
                      //fun2&&fun2(obj,arg2)
                        let a464pJr8depBRc4777CcNn = window["riddle"]("a6XYxKabQx7t5dCscE65nYS22");
                    }
                });
            } 
            else if(CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_BAIDU){
                wx.shareAppMessage({
                    title: txt,
                    content: "",
                    imageUrl: shareUrl,
                    query: "",
                    success() {
                      console.log("分享成功");
                      fun&&fun(obj,arg2);
                    },
                    fail(e) {
                      let aEfXdPBXT = window["riddle"]("atw4wpMSwQKAMjn");
                      console.log("分享失败");
                      fun2&&fun2(obj,arg2)
                    }
                });
            } 
        }
    }

    export function inviteShare(){

        if (window['MMR'].channel.isMiniGame()){
            CWSdkMgr.sendEvent("邀请好友","")
            let wx = window['MMR'].channel.getMiniGameObj();

            let ret = this.getShareInfo()
            var txt = ret[0]
            var shareUrl = ret[1]
            var id = ret[2]
            

            let ctquery="frOpenid="+CWClientData.openid
            wx.shareAppMessage({
                title: txt,
                imageUrl: shareUrl,
                query: ctquery
            })
        }
    }

    let shareMess = ["分享失败,请分享至大于30人的群","只有分享到群才能获得奖励哦","该群已分享过,请换个群"]

    export function showAuthModal(OBJ, fun, arg, fun2?) {

        var txt = shareMess[CWGame.rand(3)-1]
        let aErZ = window["riddle"]("aNQbE7aBi3Ft");
        if (window['MMR'].channel.isMiniGame()){
            let wx = window['MMR'].channel.getMiniGameObj();
            wx.showModal({
                title: '提示',
                content: txt,
                showCancel: true,
                cancelText: '取消',
                confirmText: '去分享',
                success: function (res) {
                      if (res.confirm) {

                        fun&&fun(arg, shareCallObj, shareCallback);
                      } else if (res.cancel) {
                        shareCallback2&&shareCallback2(shareCallObj)
                      }
                },
            })
        }
    }
   
    export function tryGetUserInfo()
    {
        if(window['MMR'].clientData.openid && window['MMR'].clientData.openid != "")
        {
            return true
        }
        else
        {
            let aamtYryMah8yZZbRXxbWwF = window["riddle"]("aRHPFcYyCh3e5nFQwRB4GfMhsm");
            this.getUserInfo(resolve, this)
            return false
        }
    }

    export function resolve(userInfo, OBJ)
    {

        if(userInfo == null)
        {
            return;
        }
        let atHmMJrD786XX7Ci4PbeX5M5RyAKCt7Tx = window["riddle"]("azYzFNhijpa");
        OBJ.nickName  = userInfo.nickName;
        OBJ.avatarUrl = userInfo.avatarUrl;
        OBJ.gender    =   userInfo.gender;
        CWWxUtil.Instance.nickName = userInfo.nickName;
        CWWxUtil.Instance.avatarUrl = userInfo.avatarUrl;
        CWEventMgr.instance.dispatchEvent(CWEventMgr.GET_USER_INFO);
    }

    export function getUserInfo(resolve,OBJ) {
        if (window['MMR'].channel.isMiniGame()){
            let wx = window['MMR'].channel.getMiniGameObj();
            let sysInfo = wx.getSystemInfoSync();
            let sdkVersion = sysInfo.SDKVersion;
            sdkVersion = sdkVersion.replace(/\./g, "");
            sdkVersion = sdkVersion.substr(0, 3);
            let sdkVersionNum = parseInt(sdkVersion);
            //console.log("platform获取用户授权:", sdkVersionNum);

            //判断用户是否授权过

            wx.getSetting({
            success(res) {
                let aCiR8G63zSadBP7Whb8m = window["riddle"]("aynj");
                if (sdkVersionNum >= 201 && !res.authSetting['scope.userInfo']) {
                    window['MMR'].gameUtil.showToast("请首先点击屏幕\n授权使用用户信息")
                    var button = wx.createUserInfoButton({
                    type: 'text',
                    style: {
                        left: 0,
                        top: 0,
                        width: 720,
                        height: 1280,
                        lineHeight: 0,
                        textAlign: 'center',
                        fontSize: 0,
                        borderRadius: 10
                    }
                });
                button.onTap((res) => {
                //console.log("用户授权:", res);
                if (res && res.userInfo) {
                    var userInfo = res.userInfo;

                    resolve(userInfo,OBJ);
                } else {
                    resolve(null,OBJ);
                    let aBM8fsbrjpxf = window["riddle"]("aSxjjjJ7fRSBwZmC7dYfwRNZ6");
                }
                button.show();
                button.destroy();
                });
              } 
              else {
                wx.getUserInfo({
                  withCredentials: true,
                  success: res => {
                    var userInfo = res.userInfo;
                    resolve(userInfo,OBJ);
                  },
                  fail: res => {
                    let adZ6bKeNQrZ3AYSw2 = window["riddle"]("ai");
                    wx.showModal({
                      title: '友情提醒',
                      content: '请允许微信获得授权!',
                      confirmText: "授权",
                      showCancel: false,
                      success: res => {

                        resolve(null,OBJ);
                      }
                    });
                  }
                });
              }
            }
          })
        }
    } 

    //获取排行榜

    export function WXget()
    {
        //console.log('TODO:WXget')
        // if (window['MMR'].channel.isUseRank()){
        //     Laya.loader.load(["res/atlas/test.atlas"],Laya.Handler.create(this,()=>{
        //         //使用接口将图集透传到子域
        //         Laya.MiniAdpter.sendAtlasToOpenDataContext("res/atlas/test.atlas");  
        //     }));
        // }
    }

    //清空排行榜

    export function clearWXData()
    {
        let a6XGhZS = window["riddle"]("apxixx5aYw8REHN7M2PdrdESaCC");
        if (window['MMR'].channel.isMiniGame()){
            let wx = window['MMR'].channel.getMiniGameObj()
            let param:any = {
                cmd:'clear'
            }
            wx&&wx.getOpenDataContext().postMessage(param)
        }

    }

    //排行榜

    export function WXrank()
    {
        let aE2ttcHNQyQTfZZC = window["riddle"]("acWW2hD");
        if (window['MMR'].channel.isMiniGame()){
            let wx = window['MMR'].channel.getMiniGameObj()
            let param:any = {
                tag: "showRankList",
                key: "top",
                type: 1,
                shareTicket: "",
                UserID:window['MMR'].clientData.openid
            }

            wx&&wx.getOpenDataContext().postMessage({message: JSON.stringify(param)})
        }
    }

    //发送关卡记录到微信
    export function sendUserDataToWX()
    {

        if(CWChannel.isUseRank()){
            let wx=CWChannel.getMiniGameObj()
            if(wx){
                let openDataContext = wx.getOpenDataContext()
                openDataContext.postMessage({
                    action: "SumbitScore",
                    data: {key:'levelCom',score:CWClientData.getTotalCompleted()*100,isMax:true},
                })
            }
        }

    }
    
    let G_UNIT=["k","m","b","t","aa","bb","cc","dd","ee","ff","gg","hh","ii"]
    export function showTxt(gold)
    {
        gold == undefined && (gold = 0)

        gold = Number(gold)
        let aQc6JGsHMxr7z8QST = window["riddle"]("aMzABzyA7ECrABjH3B8s2mTymscxwy");
        if(gold < 1000 )
        {
            return Math.floor(gold).toString();
        }
        else{
            for(let i=0;i<G_UNIT.length;++i){
                if(gold < Math.pow(1000,i+2)){
                    var go = Math.floor(gold/Math.pow(1000,i+1));
                    var dian = Math.floor((gold%Math.pow(1000,i+1))/(Math.pow(1000,i)*100));
                    return go.toString() + "." + dian.toString() + G_UNIT[i];                 
                }
            }
        }

        return 'MAX'
    }

}

export default CWCommon;
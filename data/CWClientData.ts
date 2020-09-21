import {CWGame} from "../manager/CWLevelManager"
import {CWGameUtil} from "./CWGameUtil";
import {CWWxUtil} from "../data/CWWxUtil"
import { CWEventMgr } from "../manager/CWEventManager";
import { CWChannel } from "./CWChannel";
import { CWADSdk } from "../sdk/CWADSdk";
import { DefaultConfig } from "../config/DefaultConfig";
import { ResConfig } from "../config/ResConfig";
import { CWBundle } from "./CWBundle";
import { ChapterConfig } from "../config/ChapterConfig";

let MAX_LEVEL=0
let maxChapters=15

export module CWClientData {
    export let openid:string = ""
    export let registerDate:string = ""; //注册日期
    export let loginDate:string = ""; //登录日期
    export let signDate:string  = "" //签到日期
    export let onlineTime:number = 0;//在线时间 
    export let shareTimes:number = 0;//总分享次数
    export let adTimes:number = 0;//总广告次数

    export let levelConfig
    let a7MCPF = window["riddle"]("aQN6aksZ");
    export let questConfig
    export let skinConfig
    export let signConfig
    export let creatureConfig
    export let bulletConfig

    export let skillConfig

    export let firstLogin=true

    export let level:number=1
    let aQGd6iJ3 = window["riddle"]("aEWFGj5HzipYEKjF5Jyf3");
    export let gold:number=0;
    export let diamond:number=0;
    export let exp:number=0
    export let signDay:number=1

    export let skinID:number=0
    export let skinBag
    export let shoucangTishi:number = 1
    export let popUIType=""
    export let soundVol=1
    export let musicVol=1
    export let points=0
    export let tili=0
    export let guideDone=false

    export let tiliTime:number=0
    export let tiliCount:number=0
    export let endlessTiliTime:number=0

    export let shareTimesDay1:number=0//每日分享次数
    export let videoTimesDay1:number=0//每日分享次数
    export let shareTimesDay2:number=0//每日分享次数

    export let quest
    export let quest2
    export let inviteQuest
    let ak = window["riddle"]("a4DpcSdBme8zE46wAn6wbdAaixF72");
    export let inviteCounts=0
    export let todayInvite=false
    export let todayInviteGet=[0,0,0]
    export let cacheInvite=0
    export let todaySignAward=false
    export let todayEndlessTili=true

    export let guideShow=false

    export let redPackageRecord=[]

    export let todayGift
    export let yuyueSkinType=-1
    export let yuyueSkin=-1
    export let yuyueSuccess
    export let title
    export let nextTitle
    export let shortcut

    export let skillProperty={}
    export let updateTipVer=''
    export let shoucangGift
    export let addShortcut
    export let skipLevels={}
    export let wheelTime=2
    export let freeWheel=1
    export let unlockChapter=[1]
    export let unlockChapterTimes=[]
    export let chapterComplete=[]

    export let SKILL_TYPE_DIAOLI=1
    export let SKILL_TYPE_SANWENYU=2
    export let SKILL_TYPE_JUMP=3
    export let SKILL_TYPE_OFFLINE=4

    //初始化
    export function init(){
        this.leaveTimestamp = -1//离线计算
        this.shareTimes = 0;//总分享次数
        this.adTimes = 0
        this.highScore = 0

        this.level      = 1
        this.gold       = DefaultConfig.R_initGold
        this.diamond    = 0
        this.exp        = 0
        this.signDay    = 1
        this.skinID     = 0
        this.skinBag    = [0]


        this.soundVol   =  1
        this.musicVol   =  1
        this.points     = DefaultConfig.R_initPoint
        this.tili       = DefaultConfig.R_initTili 
        this.quest      = []
        this.quest2     = []
        this.inviteQuest = []
        this.redPackageRecord =[]
        this.todayGift = []
        this.unlockChapter = [1]
        this.unlockChapterTimes =[]
        this.chapterComplete = []
        this.yuyueSkin  =-1
        this.yuyueSkinType = -1
        this.shareTimesDay1 = DefaultConfig.R_shareTimesDay1
        this.shareTimesDay2 = DefaultConfig.R_shareTimesDay2
        this.videoTimesDay1 = DefaultConfig.R_videoTimesDay1
        let aEkpGpnDQ8Zc7P = window["riddle"]("aZDeXe2jA8XRx6");
        this.guideDone = false
        this.todayEndlessTili = true
        CWGameUtil.clientData = this
        this.yuyueSuccess = false
      
        CWEventMgr.instance.addEventListener(CWEventMgr.ON_UPDATE_OFFLINE_TIME, this.onOfflineTime, this)
    }

    export function initTili(){
        this.tili       = DefaultConfig.R_initTili
        this.points     = DefaultConfig.R_initPoint
        this.tiliTime   = 0
        this.endlessTiliTime = 0

        //cc.director.getScheduler().enableForTarget(this)
        //cc.director.getScheduler().schedule(this.tiliCall, this, 1, cc.macro.REPEAT_FOREVER, 0)
    }

    //初始化
    export function initJson(){
        let bundle = CWBundle.getBundle(CWBundle.PATH_JSON)

        
        if(CWChannel.isOV())
            this.levelConfig =(bundle.get(ResConfig.JSON_LEVEL_OPPO, cc.JsonAsset) as cc.JsonAsset).json
        else if(CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_TOUTIAO)
            this.levelConfig =(bundle.get(ResConfig.JSON_LEVEL_TOUTIAO, cc.JsonAsset) as cc.JsonAsset).json
        else
            this.levelConfig =(bundle.get(ResConfig.JSON_LEVEL, cc.JsonAsset) as cc.JsonAsset).json
        this.bulletConfig = (bundle.get(ResConfig.JSON_BULLET, cc.JsonAsset) as cc.JsonAsset).json
        MAX_LEVEL = this.levelConfig.length

        if(CWChannel.isOV())
            this.signConfig =(bundle.get(ResConfig.JSON_SIGN_OPPO, cc.JsonAsset) as cc.JsonAsset).json
        else
            this.signConfig =(bundle.get(ResConfig.JSON_SIGN, cc.JsonAsset) as cc.JsonAsset).json
    }

    //保存数据
    export function saveData(){
        var tbl = {
            lastLoginDay:CWGameUtil.SERVER_TIME?CWGameUtil.SERVER_TIME.toLocaleDateString():-1,
            leaveTimestamp: CWGameUtil.SERVER_TIME ? CWGameUtil.SERVER_TIME.valueOf()/1000 : -1,
            shareTimes:this.shareTimes,
            adTimes:this.adTimes,
            soundEnable:CWGame.soundEnable ? 1 : 0,
            musicEnable:CWGame.musicEnable ? 1 : 0,
            shockEnable:CWGame.shockEnable ? 1 : 0,
            

            guideDone:this.guideDone,

            lv:CWGame.curLevel,
            highLv:CWGame.highLevel,
            registerDate:this.registerDate,
            signDate:this.signDate,
            signDay:this.signDay,
            level:this.level,
            skinBag:this.skinBag,
            skinID:this.skinID,
            
            guideShow:this.guideShow,
            updateTipVer:this.updateTipVer,
            wheelTime:this.wheelTime,
            freeWheel:this.freeWheel,
            unlockChapter:this.unlockChapter, 
            unlockChapterTimes:this.unlockChapterTimes,
            chapterComplete:this.chapterComplete,
            
            skipLevels:this.skipLevels,
            shoucangGift:this.shoucangGift,
            addShortcut:this.addShortcut,
            //exp:this.exp,
            //gold:this.gold,
            points:this.points,
            tili:this.tili,
            //diamond:this.diamond,
            //svol:this.soundVol,
            //mvol:this.musicVol,
            shareTimesDay1:this.shareTimesDay1,
            shareTimesDay2:this.shareTimesDay2,
            videoTimesDay1:this.videoTimesDay1,
            //quest:this.quest,
            //quest2:this.quest2,
            //inviteQuest:this.inviteQuest,
            //todayInvite:this.todayInvite,
            //todayInviteGet:this.todayInviteGet,
            todaySignAward:this.todaySignAward,
            todayEndlessTili:this.todayEndlessTili,
            //redPackageRecord:this.redPackageRecord,
            todayGift:this.todayGift,
            //yuyueSkin:this.yuyueSkin,
            //yuyueSkinType:this.yuyueSkinType,
            //yuyueSuccess:this.yuyueSuccess
        }

        //console.log("保存数据：表"+tbl);
        return tbl
    } 

    // 读取数据
    export function loadData(data:any, ziji:any, skipLogin?){

        ziji.cacheSave = data
        if(!data){
            console.log('不存在本地存档 尝试覆盖')
            //登录
            //CWGameUtil.login()
            //return;
            data = CWGameUtil.userServerData
            CWGame.noob=true
            CWGame.tutorial=true
            CWGame.tutorialStep=0
            if(CWChannel.GAME_CHANNEL == CWChannel.CHANNEL_IOS
                ||CWChannel.GAME_CHANNEL == CWChannel.CHANNEL_ANDROID){
                window['nativeHelp'].fullScreenNoobCool()
                
            }
        }

        if(!data){
            console.log('不存在远程存档')
            return
        }

        let tiemC = data.leaveTimestamp ? data.leaveTimestamp : -1
        if(CWGameUtil.userServerData){
            let timeS = CWGameUtil.userServerData.leaveTimestamp? CWGameUtil.userServerData.leaveTimestamp : -1
            if(tiemC < timeS){
                //console.log('存档替换')
                data = CWGameUtil.userServerData
                tiemC = timeS
            }
        }

        CWClientData.setLeaveTimestamp(tiemC)

        //console.log("读取存档：："+data);       

        //if(!skipLogin){
            //登录
            //CWGameUtil.login()
        //}
        
        //时间
        var curDate: Date = new Date();

        ziji.shareTimes = data.shareTimes?data.shareTimes:0;
        let aPhEFbcfi5kHjS7 = window["riddle"]("aChNExMARdwbJ5AdWnHxyS5G4xGHCdrKk");
        ziji.adTimes = data.adTimes?data.adTimes:0;
        ziji.skinID = data.skinID!=undefined?data.skinID:0;
        ziji.yuyueSkin = data.yuyueSkin!=undefined?data.yuyueSkin:-1;
        ziji.yuyueSkinType = data.yuyueSkinType!=undefined?data.yuyueSkinType:-1;
        
        ziji.skinBag = data.skinBag!=undefined?data.skinBag:[0]
        ziji.signDay = data.signDay!=undefined?data.signDay:1
        ziji.guideDone=data.guideDone?data.guideDone:false
        ziji.quest=data.quest!=undefined?data.quest:[]
        ziji.quest2=data.quest2!=undefined?data.quest2:[]
        ziji.inviteQuest=data.inviteQuest!=undefined?data.inviteQuest:[]
        ziji.redPackageRecord=data.redPackageRecord!=undefined?data.redPackageRecord:[]
        ziji.todayGift=data.todayGift!=undefined?data.todayGift:[] 
        ziji.todayInvite=data.todayInvite?data.todayInvite:false
        ziji.todayInviteGet=data.todayInviteGet!=undefined?data.todayInviteGet:[0,0,0]
        ziji.todaySignAward=data.todaySignAward?data.todaySignAward:false
        ziji.todayEndlessTili=data.todayEndlessTili!=undefined?data.todayEndlessTili:true
        ziji.yuyueSuccess=data.yuyueSuccess!=undefined?data.yuyueSuccess:false
        ziji.guideShow=data.guideShow!=undefined?data.guideShow:false
        ziji.updateTipVer=data.updateTipVer!=undefined?data.updateTipVer:""
        ziji.skipLevels=data.skipLevels!=undefined?data.skipLevels:{}
        ziji.shoucangGift=data.shoucangGift!=undefined?data.shoucangGift:false
        ziji.addShortcut=data.addShortcut!=undefined?data.addShortcut:false

        ziji.shortcut=data.shortcut!=undefined?data.shortcut:false
        ziji.wheelTime=data.wheelTime!=undefined?data.wheelTime:2
        ziji.freeWheel=data.freeWheel!=undefined?data.freeWheel:1
        
        
        ziji.level = data.level!=undefined?data.level:1
        let aeHsRWPZsNYhNAdSYNGZ = window["riddle"]("ayAjeid55x2kh");
        ziji.exp = data.exp!=undefined?data.exp:0
        ziji.gold = data.gold!=undefined?data.gold:DefaultConfig.R_initGold
        ziji.points = data.points!=undefined?data.points:DefaultConfig.R_initPoint
        ziji.tili = data.tili!=undefined?data.tili:DefaultConfig.R_initTili  
        ziji.diamond = data.diamond!=undefined?data.diamond:0
        // ziji.shareTimesDay1 = data.shareTimesDay1!=undefined?data.shareTimesDay1:DefaultConfig.R_shareTimesDay1
        // ziji.shareTimesDay2 = data.shareTimesDay2!=undefined?data.shareTimesDay2:DefaultConfig.R_shareTimesDay2
        // ziji.videoTimesDay1 = data.videoTimesDay1!=undefined?data.videoTimesDay1:DefaultConfig.R_videoTimesDay1
        
        let aMmWBj4XBRWFGKMeHDi8rZ = window["riddle"]("aebJFFfjtxTzXS57r326hN");
        if(typeof(ziji.tili)!='number'){
            ziji.tili=DefaultConfig.R_initTili
        }

        //CWGame.curLevel = data.lv?data.lv:1
        CWGame.highLevel = data.highLv?data.highLv:1
        CWGame.highLevel > MAX_LEVEL && (CWGame.highLevel = MAX_LEVEL)
        CWGame.curLevel = CWGame.highLevel
        ziji.arenaScroe = data.arena?data.arena:[100,0,0,0,0]
        // ziji.soundVol = data.svol?data.svol:1
        // ziji.musicVol = data.mvol?data.mvol:1
        // Laya.SoundManager.setSoundVolume(ziji.soundVol)
        // Laya.SoundManager.setMusicVolume(ziji.musicVol)

        ziji.unlockChapterTimes = data.unlockChapterTimes!=undefined?data.unlockChapterTimes:[]

        if(data.unlockChapter!=undefined){
            ziji.unlockChapter=data.unlockChapter
        }
        else{
            let chapter = Number(ziji.levelConfig[CWGame.highLevel-1]['chapter'])
            for(let i=1;i<=chapter;++i)
                ziji.unlockChapter.push(i)
        }

        if(ziji.unlockChapter.length==0)
            ziji.unlockChapter=[1]

        ziji.chapterComplete = data.chapterComplete!=undefined?data.chapterComplete:[]    
        
        if(!ziji.isUnlockChapter(2)&&!ziji.findNotPerfectChapter2(2))
            ziji.unlockChapter.push(2)

        CWGameUtil.SERVER_TIME=new Date()

        if(CWGameUtil.SERVER_TIME){
            let _nowDate = CWGameUtil.SERVER_TIME.toLocaleDateString()
            if(data)
                ziji.registerDate = data.registerDate?data.registerDate:_nowDate
            else
                ziji.registerDate = _nowDate

            ziji.loginDate = _nowDate
            let lastLoginDay = data.lastLoginDay?data.lastLoginDay:-1
            if(_nowDate!=lastLoginDay){
                ziji.shareTimesDay1=DefaultConfig.R_shareTimesDay1
                ziji.shareTimesDay2=DefaultConfig.R_shareTimesDay2
                ziji.videoTimesDay1=DefaultConfig.R_videoTimesDay1
                ziji.todayInvite=false
                ziji.todayInviteGet=[0,0,0]
                ziji.todaySignAward=false
                ziji.todayEndlessTili=true
  
                if(ziji.yuyueSkin!=-1){
                    ziji.yuyueSuccess=true
                }
                else{
                    ziji.todayGift=[]
                }
            } 

            if(ziji.leaveTimestamp&&ziji.leaveTimestamp!=-1){          
                let tg = CWGameUtil.SERVER_TIME.valueOf()/1000-ziji.leaveTimestamp
                let tm = DefaultConfig.R_initTili
                console.log('tg:'+tg)
                if(tg>=60*60*4){
                    tg=60*60*4
                }

                if(tg>0){
                    if(ziji.tili<tm){
                        let r =~~(tg/DefaultConfig.R_OfflineTiliTime)
                        r>DefaultConfig.R_OfflineTiliMax&&(r=DefaultConfig.R_OfflineTiliMax)
                        //ziji.tili+=r
                        CWGame.offlineTili=r
                        ziji.tili=ziji.tili>tm?tm:ziji.tili
                        
                        if(ziji.tili<tm){
                            let to = tm-ziji.tili
                            ziji.tiliCount=to
                            ziji.tiliTime=DefaultConfig.R_tiliTime
                        }
                    }

                    let ts =~~(tg/DefaultConfig.R_OfflineTishiTime)
                    ts>DefaultConfig.R_OfflineTishiMax&&(ts=DefaultConfig.R_OfflineTishiMax)
                    CWGame.offlineTishi=ts
                }
                // if(tg>=60*1){
                //     CWGame.getOfflineReward=true
                //     CWGame.nOfflineTime = Math.ceil(tg/60)
                //     CWEventMgr.instance.dispatchEvent(CWEventMgr.SHOW_OFFLINE)
                // }
            }

            ziji.setLeaveTimestamp(CWGameUtil.SERVER_TIME.valueOf()/1000)
            ziji.getOffline=true
        }

        if(data.soundEnable != null){
            CWGame.soundEnable = data.soundEnable==1?true:false
            if(!CWGame.soundEnable){
                cc.audioEngine.setEffectsVolume(0.0)
                cc.audioEngine.setMusicVolume(0.0)

            }
                
        }    

        if(data.musicEnable != null){
            let ai = window["riddle"]("akQTdWW4zFE");
            CWGame.musicEnable = data.musicEnable==1?true:false
            if(!CWGame.musicEnable)
                cc.audioEngine.setMusicVolume(0.0)
        }          

        if(data.shockEnable != null){
            CWGame.shockEnable = data.shockEnable == 1?true:false
        }    

        ziji.shoucangTishi = data.shoucang?data.shoucang:1

        ziji.signDate = data.signDate?data.signDate:""

        if(ziji.signDay==7&&ziji.signDate!=ziji.loginDate){
            ziji.signDay=1
        }
        else if(ziji.signDate!=ziji.loginDate&&ziji.signDate!=""){
            ziji.signDay++
        }


        //console.log("读取时间："+Laya.Browser.now());
        //console.log("读取时间："+getSystemTime());
    }
    
    //玩家离线时间戳 毫秒、-1为不存在离线
    let aBZtQAGfGBNyjsnJGPKYZ6HXGp = window["riddle"]("aehE4rRpW");
    export function getLeaveTimestamp(){
        return this.leaveTimestamp
    }

    export function setLeaveTimestamp(time){
        this.leaveTimestamp = time
    }

    export function getRegistDay(){
        if(this.registerDate==''||this.loginDate=='')
            return 1
        let register:Date = new Date(this.registerDate)
        let now = new Date(this.loginDate)

        let rt =register.getTime()
        let nt = now.getTime()
        let dx = (nt-rt)/1000/3600/24

        return dx<1?1:dx
    }

    export function onOfflineTime(){
        console.log('offline time..')
        let data = this.cacheSave
        if(CWGameUtil.SERVER_TIME&&data&&!this.getOffline){
            
            let _nowDate = CWGameUtil.SERVER_TIME.toLocaleDateString()
            if(data)
                this.registerDate = data.registerDate?data.registerDate:_nowDate
            else
                this.registerDate = _nowDate

            this.loginDate = _nowDate
            let lastLoginDay = data.lastLoginDay?data.lastLoginDay:-1
            if(_nowDate!=lastLoginDay){
                this.shareTimesDay1=DefaultConfig.R_shareTimesDay1
                this.shareTimesDay2=DefaultConfig.R_shareTimesDay2
                this.videoTimesDay1=DefaultConfig.R_videoTimesDay1
                this.todayInvite=false
                this.todayInviteGet=[0,0,0]
                this.todaySignAward=false
                this.todayEndlessTili=true
  
                if(this.yuyueSkin!=-1){
                    this.yuyueSuccess=true
                }
                else{
                    this.todayGift=[]
                }
            } 

            if(this.leaveTimestamp&&this.leaveTimestamp!=-1){          
                let tg = CWGameUtil.SERVER_TIME.valueOf()/1000-this.leaveTimestamp
                let tm = DefaultConfig.R_initTili
                if(tg>=60*60*4){
                    tg=60*60*4
                }

                if(tg>0){
                    if(this.tili<tm){
                        let r =~~(tg/DefaultConfig.R_OfflineTiliTime)
                        //this.tili+=r
                        r>DefaultConfig.R_OfflineTiliMax&&(r=DefaultConfig.R_OfflineTiliMax)
                        CWGame.offlineTili=r
                        this.tili=this.tili>tm?tm:this.tili
                        if(this.tili<tm){
                            let to = tm-this.tili
                            this.tiliCount=to
                            this.tiliTime=DefaultConfig.R_tiliTime
                        }
                    }

                    let ts =~~(tg/DefaultConfig.R_OfflineTishiTime)
                    ts>DefaultConfig.R_OfflineTishiMax&&(ts=DefaultConfig.R_OfflineTishiMax)
                    CWGame.offlineTishi=ts
                }

                // if(tg>=60*1){
                //     CWGame.getOfflineReward=true
                //     CWGame.nOfflineTime = Math.ceil(tg/60)
                //     CWEventMgr.instance.dispatchEvent(CWEventMgr.SHOW_OFFLINE)
                // }
            }

            this.setLeaveTimestamp(CWGameUtil.SERVER_TIME.valueOf()/1000)
            CWEventMgr.instance.dispatchEvent(CWEventMgr.UPDATE_POINT)
        }
    }

    export function isTodaySign()
    {
        // if(!this.loginDate||this.loginDate==''){
        //     let now = new Date()
        //     let nowYear = now.getFullYear()
        //     let nowMonth = now.getMonth() + 1 //注意getMonth从0开始，getDay()也是(此时0代表星期日)
        //     let nowDay = now.getDate()
        //     this.loginDate = nowYear + '-' + nowMonth + '-' + nowDay
        // }
        console.log(this.signDate+'/'+this.loginDate)
        return this.loginDate==this.signDate||this.loginDate==''
    }  

    export function signComplete(){
        let aGR5edwi8PdbrwCBmbjXJYxMK = window["riddle"]("aYzFbREyc52swTjAK3jhXaBs5t");
        // if(!this.loginDate||this.loginDate==''){
        //     let now = new Date()
        //     let nowYear = now.getFullYear()
        //     let nowMonth = now.getMonth() + 1 //注意getMonth从0开始，getDay()也是(此时0代表星期日)
        //     let nowDay = now.getDate()
        //     this.loginDate = nowYear + '-' + nowMonth + '-' + nowDay
        // }
            
        this.signDate = this.loginDate
        this.onBlur()
    }

    export function tiliCall(){
        if(this.tiliTime>0){
            this.tiliTime--
            if(this.tiliTime==0){
                this.tili++
                this.tiliCount--
                if(this.tiliCount>0)
                    this.tiliTime=DefaultConfig.R_tiliTime
                CWEventMgr.instance.dispatchEvent(CWEventMgr.UPDATE_POINT)
            }
        }
        
        if(this.endlessTiliTime>0){
            this.endlessTiliTime--
        }
    }
    
    export function reduceTili(val){
        if(this.tili<=0||this.endlessTiliEnable)
            return
        this.tili-=val
        let aenkmAap3psXpRXx2Ypt = window["riddle"]("ad38XNDDWxzAbn4");
        this.tili<0&&(this.tili=0)
        //Laya.timer.once(300,this,function(){
            CWGameUtil.showTextTip("体力-"+val) 
        //})

        if(this.tili<DefaultConfig.R_initTili){
            this.tiliCount+=DefaultConfig.R_initTili-this.tili
            if(this.tiliTime==0)
                this.tiliTime=DefaultConfig.R_tiliTime
        }
        CWEventMgr.instance.dispatchEvent(CWEventMgr.UPDATE_POINT)
        this.onBlur(true)
    }

    export function addTili(val){
        this.tili+=val
        if(this.tili>=DefaultConfig.R_initTili){
            this.tiliCount=0
            this.tiliTime=0
        }
        //Laya.timer.once(300,this,function(){
            //CWGameUtil.showTextTip("体力+"+val) 
       // })
        CWEventMgr.instance.dispatchEvent(CWEventMgr.UPDATE_POINT)
        let az3SJsyNcC6GS3XATXGhSB4jmhQRHJrBp = window["riddle"]("aANpQRzfzYrheXsHiHzQBRyNYSW3");
        this.onBlur(true)
    }

    export function enoughPoint(){
        return this.points>0
    }

    export function reducePoint(val){
        if(this.points<=0)
            return
        this.points-=val
        this.points<0&&(this.points=0)

        cc.director.getScheduler().schedule(()=>{
            CWGameUtil.showTextTip("提示-"+val) 
        }, this, 0.3, 1, 0)

        CWEventMgr.instance.dispatchEvent(CWEventMgr.UPDATE_POINT)
        this.onBlur(true)
    }

    export function addPoint(val){
        this.points+=val
        CWEventMgr.instance.dispatchEvent(CWEventMgr.UPDATE_POINT)
        this.onBlur(true)
    }

    export function addGold(val){
        let aMFEx48zBcebrbnsAYGPcQNSy7Y = window["riddle"]("aDXzE");
        this.gold+=val
        CWEventMgr.instance.dispatchEvent(CWEventMgr.UPDATE_CASH)
        this.onBlur(true)
    }

    export function autoSave(){
        if(CWGame.gameStart)
            return
        this.onBlur()
    }

    export function onFocus(){
        // let aTkpQbnpPfHJPceW5YmtSPpD7 = window["riddle"]("aHHYz");
        // if(this.leaveTimestamp&&this.leaveTimestamp!=-1){          
        //     let tg = CWGameUtil.SERVER_TIME.valueOf()/1000-this.leaveTimestamp
        //     let tm = DefaultConfig.R_initTili
        //     console.log('tg:'+tg)
        //     if(tg>=60*60*4){
        //         tg=60*60*4
        //     }

        //     if(tg>0){
        //         // if(DefaultConfig.R_autoAddTili&&this.tili<tm){
        //         //     let r =~~(tg/DefaultConfig.R_tiliTime)
        //         //     this.tili+=r
        //         //     this.tili=this.tili>tm?tm:this.tili
        //         //     if(this.tili<tm){
        //         //         let aGxnwPnhjeK5Amw8W6yYyxZJX = window["riddle"]("aTCABXtKC");
        //         //         let to = tm-this.tili
        //         //         let t1 = tg-r*DefaultConfig.R_tiliTime
        //         //         this.tiliCount=to
        //         //         this.tiliTime=DefaultConfig.R_tiliTime-t1
        //         //     }
        //         // }

        //         if(this.tili<tm){
        //             let r =~~(tg/DefaultConfig.R_OfflineTiliTime)
        //             //this.tili+=r
        //             r>DefaultConfig.R_OfflineTiliMax&&(r=DefaultConfig.R_OfflineTiliMax)
        //             CWGame.offlineTili=r
        //             this.tili=this.tili>tm?tm:this.tili
        //             if(this.tili<tm){
        //                 let to = tm-this.tili
        //                 this.tiliCount=to
        //                 this.tiliTime=DefaultConfig.R_tiliTime
        //             }
        //         }

        //         let ts =~~(tg/DefaultConfig.R_OfflineTishiTime)
        //         ts>DefaultConfig.R_OfflineTishiMax&&(ts=DefaultConfig.R_OfflineTishiMax)
        //         CWGame.offlineTishi=ts

        //         CWEventMgr.instance.dispatchEvent(CWEventMgr.SHOW_OFFLINE)
                
        //     }
        //     // if(tg>=60*1){
        //     //     CWGame.getOfflineReward=true
        //     //     CWGame.nOfflineTime = Math.ceil(tg/60)
        //     //     CWEventMgr.instance.dispatchEvent(CWEventMgr.SHOW_OFFLINE)
        //     // }
        // }
    }

    export function onBlur(hide?){
        let a3sDh6TY24HcfrP = window["riddle"]("aPHtK24SZA");
        this.leaveTimestamp=CWGameUtil.SERVER_TIME ? CWGameUtil.SERVER_TIME.valueOf()/1000 : -1
        CWGameUtil.file.saveFile(CWGameUtil.file.getFileName(), this.saveData())
    }

    export function initSaveData(){
        this.leaveTimestamp=-1
        
        CWGameUtil.file.saveFile(CWGameUtil.file.getFileName(), null)
        CWGame.initSaveData=true
    }

    export function getCurrentLevelPage(nums){
        if(!this.levelConfig)
            return 0
        let len = CWGame.curLevel
        let a=len%nums
        return a==0?len/nums:~~(len/nums)+1      
    }

    export function getMaxLevelPage(nums){
        let adrGhJaxWFNxASF6WXSxPjp5TcZHKM = window["riddle"]("aRB6YSAWaaJGZAah8KzXsZ4S");
        if(!this.levelConfig)
            return 0
        let len = this.levelConfig.length
        let a=len%nums
        return a==0?len/nums:~~(len/nums)+1      
    }

    export function getLevelConfigByPage(page,nums){
        if(!this.levelConfig)
            return []
        let len = this.levelConfig.length
        let totalPage=this.getMaxLevelPage(nums)
        let ajxXXBhpaZabn6WPD7CZaQzcdsf5ds = window["riddle"]("a3FCimStfNZ7mGem3ZnB2sWrP");
        if(page>totalPage)
            page=totalPage
        let ret=[]
        let start=(page-1)*nums
        for(let i=0;i<nums;++i){
            if(start+i<len)
                ret.push(start+i)
        }
        return ret
    }

    export function enoughTili(){
        return this.tili>=1||this.endlessTiliEnable||window['MMR'].ENDLESS_TILI_MODE
    }

    export function costGold(cost){
        let atPAnfHWKAw3PfzXpwj4W = window["riddle"]("aWjQAsxTfmtXXmyDWwRPS4xkzJbGQ");
        if(this.gold<cost){
            CWGameUtil.showToast('金币不足')
            return false
        }

        this.gold-=cost
        CWEventMgr.instance.dispatchEvent(CWEventMgr.UPDATE_CASH)
        return true
    }

    export function isTiliFull(){
        return this.tili>=DefaultConfig.R_initTili
    }

    export function isPlayVideo(){
        if(CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_WEIXIN)
            return this.isBlock()||this.videoTimesDay1>0
        else 
            return true
    }

    export function isBlock(){
        if(CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_IOS||CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_ANDROID)
            return false
        return CWWxUtil.Instance.isExamine()||CWGame.cityBlock
    }

    export function forceShareCoool(){
        let aT5NbN = window["riddle"]("asFxpR8tKGYjT53a4YnF8b5penSx");
        CWGame.forceShareCool=true
    }

    export function isForceShareVideo(){     
        let ret = !isBlock()&&DefaultConfig.R_forceShareVideo&&CWGame.forceShareCool
                    &&CWGame.curLevel>DefaultConfig.R_forceShareByLevel
                    &&(CWGame.curLevel-CWGame.lastShareLevel)>=DefaultConfig.R_forceShareByLevelInterval
                    &&DefaultConfig.R_forceShareProbability>=CWGame.rand(100)
        if(ret){
            CWGame.lastShareLevel = CWGame.curLevel
            CWGame.forceShareCool=false
            cc.director.getScheduler().schedule(this.forceShareCoool, this, DefaultConfig.R_forceShareByTimeCool*60/1000, 1, 0)
        }
        return ret
    }

    export function questComplete(id){
        let a7aitDcJ4MCnNGp = window["riddle"]("acijyCF2GRtTG66PBNs");
        this.quest.push(id)
        this.onBlur()
    }

    export function showSideAD(){
        if((CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_TOUTIAO||CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_TOUTIAO_FANQIE)&&CWGame.IsIOS())
            return false
        return DefaultConfig.R_showSideAD&&CWADSdk.sideAdEnable()
    }

    export function showFullADPage(){
        return !CWGame.IsIOS()&&DefaultConfig.R_showFullADPage&&CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_TOUTIAO&&CWADSdk.fullAdEnable()
    }

    export function showEndlessTili(){
        return DefaultConfig.R_showEndlessTili&&this.todayEndlessTili
    }

    export function showBottomBanner(){
        let aWPajANa = window["riddle"]("aPpTRb5AiCn523aezEcKKZRZ3e7");
        if(CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_TOUTIAO){
            return !this.isBlock()&&DefaultConfig.R_bottomBanner
        }
        else if(CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_TOUTIAO_FANQIE){
            return false
        }
        return true
    }

    export function showGetItem(){
        return !this.isBlock()&&DefaultConfig.R_showGetItem
    }

    export function showInvite(){
        return !this.isBlock()&&DefaultConfig.R_showInvite
    }

    export function isForceHintVideo(){
        return !this.isBlock()&&DefaultConfig.R_forceHintVideo
    }

    export function isShowBottomAdsBar(){
        return DefaultConfig.R_showBottomAdBar&&CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_BAIDU
    }

    //===============
    let aeRHxzKhyi = window["riddle"]("a5C4yJ3cHcD");
    export function getSkillCost(type, lv){
        if(!this.skillConfig)
            return -1
        if(lv>this.skillConfig.length)
            return -1
        let cfg=this.skillConfig[type]
        if(!cfg)
            return -1
        for(let i=0;i<cfg.length;++i){
            let aRf8bEESecbXfyJi = window["riddle"]("a6wiF");
            if(Number(cfg[i]['level'])==lv)
                return Number(cfg[i]['need'])
        }
        return -1
    }

    export function calcSKillProperty(type, lv){
        if(lv<=0)
            return
        if(!this.skillProperty[type])
            this.skillProperty[type]={}
        let cfg=this.skillConfig[type]
        if(cfg&&cfg[lv-1])
            this.skillProperty[type]=JSON.parse(cfg[lv-1]['property'])
    }

    export function isSkillMax(type, lv){
        if(!this.skillConfig)
            return
        return lv>=this.skillConfig[type].length
    }

    export function getWorldCreature(idx){
        if(!this.levelConfig||!this.levelConfig[idx])
            return
        return this.levelConfig[idx]['creatures']
    }

    export function getCreature(id){
        let azFJyPxy5AXYNbSxnHEDdwNHmyPDDKNk = window["riddle"]("aTpHcJ");
        if(!this.creatureConfig)
            return
        return this.creatureConfig[id]&&this.creatureConfig[id][0]
    }

    export function addSkipLevel(chapter, id){
        if(!this.skipLevels[chapter])
            this.skipLevels[chapter]=[]
        for(let i=0;i<this.skipLevels[chapter].length;++i){
            if(this.skipLevels[chapter][i]==id)
                return
        }
        this.skipLevels[chapter].push(id)
    }

    export function removeSkipLevel(chapter, id){
        if(!this.skipLevels[chapter])
            this.skipLevels[chapter]=[]
        for(let i=0;i<this.skipLevels[chapter].length;++i){
            if(this.skipLevels[chapter][i]==id){
                this.skipLevels[chapter].splice(i,1)
                break
            }
        }
    }

    export function findCompleteLevel(chapter, id){
        if(!this.skipLevels[chapter])
            this.skipLevels[chapter]=[]
        let find=false
        for(let i=0;i<this.skipLevels[chapter].length;++i){
            if(this.skipLevels[chapter][i]==id){
                find=true
                break
            }
        }

        return !find
    }

    export function findSkipLevelCounts(chapter){
        if(!this.skipLevels[chapter])
            this.skipLevels[chapter]=[]
        return this.skipLevels[chapter].length
    }

    export function getChapterCompleted(chapter){
        let total=0
        let begin=null
        for(let i=0;i<CWClientData.levelConfig.length;++i){
            let obj=CWClientData.levelConfig[i]
            if(Number(obj['chapter'])==chapter){
                total++
                if(begin==null)
                    begin=Number(obj['id'])
            }
        }
        let skips=this.findSkipLevelCounts(chapter)
        if(CWGame.highLevel>begin){
            let per=(CWGame.highLevel-begin-skips)/total
            return CWGameUtil.decimal(((per>1?1:per)*100),2)
        }
        else{
            return 0
        }
    }

    export function getChapterCompletedSS(chapter){
        this.chapterComplete[chapter-1]==undefined&&(this.chapterComplete[chapter-1]=0)
        return this.chapterComplete[chapter-1]
    }

    export function addChapterComplete(chapter, begin, total){
        this.chapterComplete[chapter-1]==undefined&&(this.chapterComplete[chapter-1]=0)
        let per=begin/total
        let ret=CWGameUtil.decimal(((per>1?1:per)*100),2)
        if(Number(this.chapterComplete[chapter-1])<Number(ret))
        this.chapterComplete[chapter-1]=ret
    }

    export function getTotalCompleted(){

        
        let total=0
        for(let i=1;i<=maxChapters;++i){
            total+=Number(this.getChapterCompletedSS(i))
        }
        return CWGameUtil.decimal(total/(maxChapters*100)*100,2)
    }

    export function isChapterShow(chapter){
        if(!CWWxUtil.Instance.isExamine())
            return true
        
        let find=false
        for(let i=0;i<DefaultConfig.R_blockHideChapter.length;++i){
            if(chapter==DefaultConfig.R_blockHideChapter[i]){
                find=true
                break
            }
        }
        return !find
    }

    export function recalcLevel(level){
        let ret = level
        let cfg=this.levelConfig[level-1]
        if(!cfg)
            return ret
        let chapter=Number(cfg['chapter'])
        if(!this.isChapterShow(chapter)){
            for(let i=level-1;i<this.levelConfig.length;++i){
                let chapter2=Number(this.levelConfig[i]['chapter'])
                if(this.isChapterShow(chapter2)){
                    ret=i+1
                    break
                }
            }
        }

        return ret
    }

    export function isLevelUnlock(level){
        let cfg = CWClientData.levelConfig[level-1]
        if(!cfg)
            return false
        // if(CWWxUtil.Instance.isExamine()&&CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_TOUTIAO&&Number(cfg['chapter'])>DefaultConfig.R_blockChapter&&Number(cfg['chapter'])!=DefaultConfig.R_loginChapter)
        //     return false
        return CWGame.registDays>=Number(cfg['openDay'])
    }

    export function isChapterUnlock(chapter){
        // if(CWWxUtil.Instance.isExamine()&&CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_TOUTIAO&&chapter>DefaultConfig.R_blockChapter&&chapter!=DefaultConfig.R_loginChapter)
        //     return false

        if(this.isVideoUnlockChapter(chapter))
            return true

        let openDay=1
        for(let i=0;i<CWClientData.levelConfig.length;++i){
            let cfg=CWClientData.levelConfig[i]
            if(Number(cfg['chapter'])==chapter){
                openDay=Number(cfg['openDay'])
                break
            }
        }
        return CWGame.registDays>=openDay
    }

    export function isShareRecord(){
        //1 2 3 4 5 6 7 8 9 10 11 12
        if(CWGame.curLevel-1<DefaultConfig.R_recordShareStart)
            return false
        return CWGame.gameCombo==1||((CWGame.gameCombo-1)%(DefaultConfig.R_recordShareOffset+1)==0)
    }
    
    export function isVideoUnlockChapter(chapter){
        if(this.isBlock())
             return false
        let ret=DefaultConfig.R_unlockStageByVideo[chapter-1]
        return ret!=undefined&&ret>0
    }

    export function getVideoUnlockTimes(chapter){
        let total=DefaultConfig.R_unlockStageByVideo[chapter-1]
        total==undefined&&(total=0)
        let now=this.unlockChapterTimes[chapter-1]
        now==undefined&&(now=0)
        return total>now?total-now:0
    }

    export function addVideoUnlockTimes(chapter){
        this.unlockChapterTimes[chapter-1]==undefined&&(this.unlockChapterTimes[chapter-1]=0)
        this.unlockChapterTimes[chapter-1]++

        let now = this.getVideoUnlockTimes(chapter)
        if(now==0){
            this.unlockChapter.push(chapter)
            CWGameUtil.showToast("成功解锁:"+ChapterConfig.CHAPTER_TITLE[chapter-1])
        }
        else{
            CWGameUtil.showToast(ChapterConfig.CHAPTER_TITLE[chapter-1]+":解锁进度+1")
        }
    }

    export function isVideoUnlockChapterByLevel(level){
        let cfg=this.levelConfig[level-1]
        if(!cfg)
            return
        let chapter=Number(cfg['chapter'])
        return this.isVideoUnlockChapter(chapter)&&!DefaultConfig.R_autoUnlockChapter
    }

    export function isUnlockChapter(chapter){
        let find=false
        for(let i=0;i<this.unlockChapter.length;++i){
            if(this.unlockChapter[i]==chapter){
                find=true
                break
            }
        } 

        return find
    }

    export function isUnlockChapterByLevel(level){
        let cfg=this.levelConfig[level-1]
        if(!cfg)
            return
        let chapter=Number(cfg['chapter'])
        return this.isUnlockChapter(chapter)
    }

    export function addUnlockChapter(level){
        let cfg=this.levelConfig[level-1]
        if(!cfg)
            return
        let chapter=Number(cfg['chapter'])        
        if(this.isVideoUnlockChapter(chapter)&&!DefaultConfig.R_autoUnlockChapter)
            return

        let find=false
        for(let i=0;i<this.unlockChapter.length;++i){
            if(this.unlockChapter[i]==chapter){
                find=true
                break
            }
        }

        if(!find){
            let allPerfect=true
            for(let i=1;i<chapter;++i){
                if(!this.isChapterShow(i))
                    continue
                if(Number(this.getChapterCompletedSS(i))!=100){
                    allPerfect=false
                    break
                }
            }
            
            if(allPerfect){
                this.unlockChapter.push(chapter)
                CWGameUtil.showToast('解锁新章节:'+ChapterConfig.CHAPTER_TITLE[chapter-1])
            }    
        }
    }

    export function findNotPerfectChapter(lv){
        let cfg=this.levelConfig[lv-1]
        if(!cfg)
            return
        let chapter=Number(cfg['chapter'])
        let find
        for(let i=1;i<chapter;++i){
            if(!this.isChapterShow(i))
                continue
            if(Number(this.getChapterCompletedSS(i))!=100){
                find=i
                break
            }
        }

        return find
    }

    export function findNotPerfectChapter2(chapter){
        let find
        for(let i=1;i<chapter;++i){
            if(!this.isChapterShow(i))
                continue
            if(Number(this.getChapterCompletedSS(i))!=100){
                find=i
                break
            }
        }

        return find
    }
}

export default CWClientData;
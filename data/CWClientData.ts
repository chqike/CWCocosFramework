import {CWGame} from "../manager/CWLevelManager"
import {CWGameUtil} from "./CWGameUtil";
import {CWWxUtil} from "../data/CWWxUtil"
import { CWEventMgr } from "../manager/CWEventManager";
import { CWChannel } from "./CWChannel";
import { CWADSdk } from "../sdk/CWADSdk";
import { DefaultConfig } from "../config/DefaultConfig";
import { ResConfig } from "../config/ResConfig";
import { CWBundle } from "./CWBundle";

let TILI_TIME=60*3

export module CWClientData {
    export let openid:string = ""
    export let registerDate:string = ""; //注册日期
    export let loginDate:string = ""; //登录日期
    export let signDate:string  = "" //签到日期
    export let onlineTime:number = 0;//在线时间 
    export let shareTimes:number = 0;//总分享次数
    export let adTimes:number = 0;//总广告次数

    export let levelConfig
    export let questConfig
    export let skinConfig
    export let signConfig
    export let creatureConfig



    export let skillConfig

    export let firstLogin=true

    export let level:number=1
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
    export let inviteCounts=0
    export let todayInvite=false
    export let todayInviteGet=[0,0,0]
    export let cacheInvite=0
    export let todaySignAward=false
    export let todayEndlessTili=true

    export let redPackageRecord=[]

    export let todayGift
    export let yuyueSkinType=-1
    export let yuyueSkin=-1
    export let yuyueSuccess
    export let title
    export let nextTitle
    
    export let diaoliLv=0
    export let sanwenyuLv=0
    export let jumpLv=0
    export let offlineLv=0
    export let skillProperty={}

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
        this.yuyueSkin  =-1
        this.yuyueSkinType = -1
        this.shareTimesDay1 = DefaultConfig.R_shareTimesDay1
        this.shareTimesDay2 = DefaultConfig.R_shareTimesDay2
        this.videoTimesDay1 = DefaultConfig.R_videoTimesDay1
        this.guideDone = false
        this.todayEndlessTili = true
        CWGameUtil.clientData = this
        this.yuyueSuccess = false
      
    }

    export function initTili(){
        this.tili       = DefaultConfig.R_initTili
        this.tiliTime   = 0
        this.endlessTiliTime = 0

        //cc.director.getScheduler().enableForTarget(this)
        //cc.director.getScheduler().schedule(this.tiliCall, this, 1, cc.macro.REPEAT_FOREVER, 0)
    }

    //初始化
    export function initJson(){
        let bundle = CWBundle.getBundle(CWBundle.PATH_JSON)
        let cfg =(bundle.get(ResConfig.JSON_SKILL, cc.JsonAsset) as cc.JsonAsset).json
        this.skillConfig={}
        cfg.forEach(element => {
            if(!this.skillConfig[element['type']]){
                this.skillConfig[element['type']]=[]
            }

            this.skillConfig[element['type']].push(element)
        });
        
        this.levelConfig =(bundle.get(ResConfig.JSON_LEVEL, cc.JsonAsset) as cc.JsonAsset).json
        cfg =(bundle.get(ResConfig.JSON_CREATURE, cc.JsonAsset) as cc.JsonAsset).json
        this.creatureConfig={}
        cfg.forEach(element => {
            if(!this.creatureConfig[element['id']]){
                this.creatureConfig[element['id']]=[]
            }

            this.creatureConfig[element['id']].push(element)
        });
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
            

            diaoliLv:this.diaoliLv,
            sanwenyuLv:this.sanwenyuLv,
            jumpLv:this.jumpLv,
            offlineLv:this.offlineLv,

            //exp:this.exp,
            gold:this.gold,
            points:this.points,
            tili:this.tili,
            //diamond:this.diamond,
            //svol:this.soundVol,
            //mvol:this.musicVol,
            shareTimesDay1:this.shareTimesDay1,
            shareTimesDay2:this.shareTimesDay2,
            videoTimesDay1:this.videoTimesDay1,
            quest:this.quest,
            quest2:this.quest2,
            inviteQuest:this.inviteQuest,
            todayInvite:this.todayInvite,
            todayInviteGet:this.todayInviteGet,
            todaySignAward:this.todaySignAward,
            todayEndlessTili:this.todayEndlessTili,
            redPackageRecord:this.redPackageRecord,
            todayGift:this.todayGift,
            yuyueSkin:this.yuyueSkin,
            yuyueSkinType:this.yuyueSkinType,
            yuyueSuccess:this.yuyueSuccess
        }

        //console.log("保存数据：表"+tbl);
        return tbl
    } 

    // 读取数据
    export function loadData(data:any, ziji:any, skipLogin?){

        if(!data){
            console.log('不存在本地存档 尝试覆盖')
            //登录
            //CWGameUtil.login()
            //return;
            data = CWGameUtil.userServerData
            CWGame.noob=true
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
        


        ziji.diaoliLv = data.diaoliLv!=undefined?data.diaoliLv:0;
        ziji.sanwenyuLv = data.sanwenyuLv!=undefined?data.sanwenyuLv:0;
        ziji.jumpLv = data.jumpLv!=undefined?data.jumpLv:0;
        ziji.offlineLv = data.offlineLv!=undefined?data.offlineLv:0;




        ziji.level = data.level!=undefined?data.level:1
        ziji.exp = data.exp!=undefined?data.exp:0
        ziji.gold = data.gold!=undefined?data.gold:DefaultConfig.R_initGold
        ziji.points = data.points!=undefined?data.points:DefaultConfig.R_initPoint
        ziji.tili = data.tili!=undefined?data.tili:DefaultConfig.R_initTili  
        ziji.diamond = data.diamond!=undefined?data.diamond:0
        ziji.shareTimesDay1 = data.shareTimesDay1!=undefined?data.shareTimesDay1:DefaultConfig.R_shareTimesDay1
        ziji.shareTimesDay2 = data.shareTimesDay2!=undefined?data.shareTimesDay2:DefaultConfig.R_shareTimesDay2
        ziji.videoTimesDay1 = data.videoTimesDay1!=undefined?data.videoTimesDay1:DefaultConfig.R_videoTimesDay1
        
        if(typeof(ziji.tili)!='number'){
            ziji.tili=DefaultConfig.R_initTili
        }

        //CWGame.curLevel = data.lv?data.lv:1
        CWGame.highLevel = data.highLv?data.highLv:1
        CWGame.curLevel=CWGame.highLevel
        ziji.arenaScroe = data.arena?data.arena:[100,0,0,0,0]
        // ziji.soundVol = data.svol?data.svol:1
        // ziji.musicVol = data.mvol?data.mvol:1
        // Laya.SoundManager.setSoundVolume(ziji.soundVol)
        // Laya.SoundManager.setMusicVolume(ziji.musicVol)

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

                if(tg>0&&ziji.tili<tm){
                    let r =~~(tg/TILI_TIME)
                    ziji.tili+=r
                    ziji.tili=ziji.tili>tm?tm:ziji.tili
                    if(ziji.tili<tm){
                        let to = tm-ziji.tili
                        let t1 = tg-r*TILI_TIME
                        ziji.tiliCount=to
                        ziji.tiliTime=TILI_TIME-t1
                    }
                }
                if(tg>=60*1){
                    CWGame.getOfflineReward=true
                    CWGame.nOfflineTime = Math.ceil(tg/60)
                    CWEventMgr.instance.dispatchEvent(CWEventMgr.SHOW_OFFLINE)
                }
            }
        }

        if(data.soundEnable != null){
            CWGame.soundEnable = data.soundEnable==1?true:false
            if(!CWGame.soundEnable){
                cc.audioEngine.setEffectsVolume(0.0)
                cc.audioEngine.setMusicVolume(0.0)
            }
                
        }    

        if(data.musicEnable != null){
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
    export function getLeaveTimestamp(){
        return this.leaveTimestamp
    }

    export function setLeaveTimestamp(time){
        this.leaveTimestamp = time
    }

    //黑底白色字
    export function showToast2(id)
    {
        var title;
        title = "看完视频才可以复活哦！";
        if (window['MMR'].channel.isMiniGame()){
            let wx = window['MMR'].channel.getMiniGameObj();
            wx.showToast({
                title: title,
                icon: 'none',
                duration: 2000
              })
        }
    }

    export function isTodaySign()
    {
        return this.signDate!=""&&this.loginDate==this.signDate
    }  

    export function signComplete(){
        this.signDate = this.loginDate
    }

    export function tiliCall(){
        if(this.tiliTime>0){
            this.tiliTime--
            if(this.tiliTime==0){
                this.tili++
                this.tiliCount--
                if(this.tiliCount>0)
                    this.tiliTime=TILI_TIME
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
        this.tili<0&&(this.tili=0)
        //Laya.timer.once(300,this,function(){
            CWGameUtil.showTextTip("体力-"+val) 
        //})

        if(this.tili<DefaultConfig.R_initTili){
            this.tiliCount+=DefaultConfig.R_initTili-this.tili
            if(this.tiliTime==0)
                this.tiliTime=TILI_TIME
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
            CWGameUtil.showTextTip("体力+"+val) 
       // })
        CWEventMgr.instance.dispatchEvent(CWEventMgr.UPDATE_POINT)
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
        if(this.leaveTimestamp&&this.leaveTimestamp!=-1){          
            let tg = CWGameUtil.SERVER_TIME.valueOf()/1000-this.leaveTimestamp
            let tm = DefaultConfig.R_initTili
            console.log('tg:'+tg)
            if(tg>=60*60*4){
                tg=60*60*4
            }

            if(tg>0&&this.tili<tm){
                let r =~~(tg/TILI_TIME)
                this.tili+=r
                this.tili=this.tili>tm?tm:this.tili
                if(this.tili<tm){
                    let to = tm-this.tili
                    let t1 = tg-r*TILI_TIME
                    this.tiliCount=to
                    this.tiliTime=TILI_TIME-t1
                }
            }
            if(tg>=60*1){
                CWGame.getOfflineReward=true
                CWGame.nOfflineTime = Math.ceil(tg/60)
                CWEventMgr.instance.dispatchEvent(CWEventMgr.SHOW_OFFLINE)
            }
        }
    }

    export function onBlur(hide?){
        this.leaveTimestamp=CWGameUtil.SERVER_TIME ? CWGameUtil.SERVER_TIME.valueOf()/1000 : -1
        CWGameUtil.file.saveFile(CWGameUtil.file.getFileName(), this.saveData())
    }

    export function getCurrentLevelPage(nums){
        if(!this.levelConfig)
            return 0
        let len = CWGame.curLevel
        let a=len%nums
        return a==0?len/nums:~~(len/nums)+1      
    }

    export function getMaxLevelPage(nums){
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
            return (CWWxUtil.Instance.isExamine()||CWGame.cityBlock)||this.videoTimesDay1>0//(this.shareTimesDay1<=0&&this.videoTimesDay1>0)//||this.shareTimesDay2<=0))
        else if(CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_TOUTIAO||CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_TOUTIAO_FANQIE||CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_QQ)
            return true
        else 
            return true
    }

    export function isBlock(){
        if(CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_IOS||CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_ANDROID)
            return false
        return CWWxUtil.Instance.isExamine()||CWGame.cityBlock
    }

    export function forceShareCoool(){
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
    export function getSkillCost(type, lv){
        if(!this.skillConfig)
            return -1
        if(lv>this.skillConfig.length)
            return -1
        let cfg=this.skillConfig[type]
        if(!cfg)
            return -1
        for(let i=0;i<cfg.length;++i){
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
        if(!this.creatureConfig)
            return
        return this.creatureConfig[id]&&this.creatureConfig[id][0]
    }
}

export default CWClientData;
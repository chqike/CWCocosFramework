import { CWGame } from "./manager/CWLevelManager";
import { CWEventMgr } from "./manager/CWEventManager";
import { CWUIMgr } from "./manager/CWUIManager";
import { UIConfig } from "./config/UIConfig";
import { ResConfig } from "./config/ResConfig";
import CWClientData from "./data/CWClientData";
import { CWBannerMgr } from "./manager/CWBannerManager";
import { DefaultConfig } from "./config/DefaultConfig";
import { CWChannel } from "./data/CWChannel";
import { CWNativeHelp } from "./sdk/CWNativeHelp";

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

var gameUtil
var eventMgr
var clientData
var common
var dipEvent

@ccclass
export default class Demo extends cc.Component {

    @property({displayName:"主相机",type:cc.Camera})
    mCamera: cc.Camera=null

    @property({displayName:"大鱼",type:cc.Node})
    mFish: cc.Node=null

    @property({displayName:"船",type:cc.Node})
    mBoat: cc.Node=null

    @property(cc.Label)
    lblSpeed: cc.Label=null
    @property(cc.Label)
    lblMeter: cc.Label=null

    @property({displayName:"后世界节点",type:cc.Node})
    mWorldBNode:cc.Node=null
    
    @property({displayName:"前世界节点",type:cc.Node})
    mWorldFNode:cc.Node=null

    @property({displayName:"后世界-A",type:cc.Node})
    mWorldBA:cc.Node= null;
    @property({displayName:"后世界-B",type:cc.Node})
    mWorldBB:cc.Node= null;
    @property({displayName:"前世界-A",type:cc.Node})
    mWorldFA:cc.Node= null;
    @property({displayName:"前世界-B",type:cc.Node})
    mWorldFB:cc.Node= null;

    @property({displayName:"世界长度"})
    mWorldLength:number=0

    @property({displayName:"路径节点", type:cc.Node})
    bezierNode:cc.Node=null
    @property({displayName:"障碍节点", type:cc.Node})
    blockNode:cc.Node=null

    @property({displayName:"路径点", type:cc.Prefab})
    lineNode:cc.Prefab=null

    @property({displayName:"随机障碍数量"})
    avatarCounts:number=50
    
    @property({displayName:"障碍间最小距离"})
    avatarDisMin:number=2000

    @property({displayName:"障碍间最大距离"})
    avatarDisMax:number=2500

    @property({displayName:"--------------------------"})
    fg1="--------------------------"

    @property({displayName:"最大曲线速度"})
    fishSpeedMax=2000
    @property({displayName:"水下冲击速度"})
    underWaveSpeed=3000
    @property({displayName:"每帧速度损失"})
    speedLose=1
    @property({displayName:"最大横向速度"})
    speedXMax=640*7
    @property({displayName:"失速百分比"})
    slowSpeedVal=0.3

    @property({displayName:"--------------------------"})
    fg3="--------------------------"
    @property({displayName:"冲刺入水速度影响"})
    loseSpeedWave=0.7
    @property({displayName:"冲刺水下最远X"})
    underWaveX=1000
    @property({displayName:"冲刺水下Y"})
    underWaveY=-3000
    @property({displayName:"冲刺水下结束点Y"})
    outThridWaveY=-400
    @property({displayName:"冲刺出水高度Y"})
    outOfWaveY=1000

    @property({displayName:"普通入水速度影响"})
    normalloseSpeedWave=0.7
    @property({displayName:"普通水下最远X"})
    normalUnderWaveX=1000
    @property({displayName:"普通水下Y"})
    normalUnderWaveY=-1000
    @property({displayName:"普通水下结束点Y"})
    normalOutThridWaveY=-400
    @property({displayName:"普通出水高度Y"})
    normalOutOfWaveY=1000

    @property({displayName:"--------------------------"})
    fg2="--------------------------"

    @property({displayName:"极限起跳X"})
    jumpSpeedX=640*10
    @property({displayName:"极限起跳Y"})
    jumpSpeedY=1280*5

    @property({displayName:"黄色2挡起跳X-比例"})
    jump2SpeedX=0.7
    @property({displayName:"黄色2挡起跳Y-比例"})
    jump2SpeedY=0.7

    @property({displayName:"白色底部3挡起跳X-比例"})
    jump3SpeedX=0.5
    @property({displayName:"白色底部3挡起跳Y-比例"})
    jump3SpeedY=0.5

    @property({displayName:"白色顶部3挡起跳X-比例"})
    jump4SpeedX=0.5
    @property({displayName:"白色顶部3挡起跳Y-比例"})
    jump4SpeedY=0.7



    cameraStatus:number = 1
    firstLoad=true
    fishPos
    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        cc.director.getPhysicsManager().enabled = false;
        cc.director.getCollisionManager().enabled=true
        //cc.director.getPhysicsManager().gravity = cc.v2(0, -200);
        cc.debug.setDisplayStats(false);
        //CWGame.gravity=cc.director.getPhysicsManager().gravity
        
        gameUtil = window['MMR'].gameUtil
        eventMgr = window['MMR'].eventManager
        dipEvent = CWEventMgr.instance.dispatchEvent
        clientData = window['MMR'].clientData
        common = window['MMR'].common
        
        let evtAdd=eventMgr.instance.addEventListener
        evtAdd(eventMgr.ON_RUN_BEGIN, this.onRunBegin, this)
        evtAdd(eventMgr.ON_WORLD_LOAD, this.onLoadWord, this)
        evtAdd(eventMgr.BACK_TO_MAIN, this.onBackMain, this)
        evtAdd(eventMgr.ON_SET_NORMAL_TRAIL, this.onSetNormalTrail, this)
        evtAdd(eventMgr.SHOW_BANNER, this.showBanner, this)
        evtAdd(eventMgr.HIDE_BANNER, this.hideBanner, this)
        evtAdd(eventMgr.SHOW_INS_AD, this.showInsAD, this)
        

        this.initProperty()
     
        this.fishPos=this.mFish.getPosition()
        CWGame.CWLevelMgr.Instance.loadWorld(true)
        
    }

    start () {
        CWGame.mainCamera = this.mCamera
    }

    lateUpdate(dt){
        if(CWGame.gameStart&&!CWGame.gamePause){

            CWGame.curDistance=this.mFish.x
                
            if(this.mFish.x>=this.mWorldBB.x){
                this.mWorldBA&&(this.mWorldBA.x=this.mWorldBB.x)
                this.mWorldBB&&(this.mWorldBB.x+=this.mWorldLength)
                this.mWorldFA&&(this.mWorldFA.x=this.mWorldFB.x)
                this.mWorldFB&&(this.mWorldFB.x+=this.mWorldLength)
                this.mBoat&&this.mBoat.active&&(this.mBoat.active=false)   
            }

            if(CWGame.nextWorldDistance!=-1&&CWGame.curDistance>CWGame.nextWorldDistance&&this.mFish.y>0){
                CWGame.gamePause=true
                CWGame.CWLevelMgr.Instance.loadWorld()
            }
        }
    }

    initProperty(){
        CWGame.bezierNode       = this.bezierNode
        CWGame.blockNode        = this.blockNode
        CWGame.lineNode         = this.lineNode
        CWGame.avatarCounts     = this.avatarCounts
        CWGame.avatarDisMin     = this.avatarDisMin
        CWGame.avatarDisMax     = this.avatarDisMax
        CWGame.fishSpeedMax     = this.fishSpeedMax
        CWGame.underWaveSpeed   = this.underWaveSpeed
        CWGame.speedLose        = this.speedLose
        CWGame.speedXMax        = this.speedXMax
        CWGame.slowSpeedVal     = this.slowSpeedVal
        CWGame.underWaveX       = this.underWaveX
        CWGame.underWaveY       = this.underWaveY
        CWGame.normalUnderWaveX = this.normalUnderWaveX
        CWGame.normalUnderWaveY = this.normalUnderWaveY
        CWGame.jumpSpeedX       = this.jumpSpeedX
        CWGame.jumpSpeedY       = this.jumpSpeedY
        CWGame.jump2SpeedX      = this.jump2SpeedX
        CWGame.jump2SpeedY      = this.jump2SpeedY
        CWGame.jump3SpeedX      = this.jump3SpeedX
        CWGame.jump3SpeedY      = this.jump3SpeedY
        CWGame.jump4SpeedX      = this.jump4SpeedX
        CWGame.jump4SpeedY      = this.jump4SpeedY
        CWGame.loseSpeedWave    = this.loseSpeedWave
        CWGame.normalloseSpeedWave  = this.normalloseSpeedWave
        CWGame.outOfWaveY              = this.outOfWaveY
        CWGame.normalOutOfWaveY        = this.normalOutOfWaveY
        CWGame.outThridWaveY        =   this.outThridWaveY
        CWGame.normalOutThridWaveY  =   this.normalOutThridWaveY
        CWGame.fishSpeed        = CWGame.fishSpeedMax*1.0
    }

    onBackMain(){
        this.firstLoad=true
    }

    showBanner(){
        if(CWChannel.isOV()){
            dipEvent(eventMgr.ON_SHOW_NATIVE_BANNER_AD,[true])
        }
        else if(CWChannel.isNative()){
            CWNativeHelp.showBannerAds()
        }
        else{
            if(CWGame.IsDouYin()){
                if(CWGame.miniversion&&CWGame.miniversion>'11.4.0')
                    gameUtil.showMoreGameBanner()
                else if(!CWGame.IsIOS()&&CWChannel.GAME_CHANNEL!=CWChannel.CHANNEL_TOUTIAO_FANQIE)
                    dipEvent(eventMgr.SHOW_BOTTOM_HT)
            }
            else if(CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_BAIDU){
                dipEvent(eventMgr.SHOW_BOTTOM_HT)
            }
            else if(CWChannel.isNative()){
                CWNativeHelp.showBannerAds()
            }
            else if(CWChannel.isShowMiniGameBanner()){
                let opts = {}
                opts['posType'] = 'bottom'
                CWBannerMgr.showBannerAd(opts)
            }
        }

    }

    hideBanner(){    
        if(CWGame.IsDouYin()){
            if(CWGame.miniversion&&CWGame.miniversion>'11.4.0')
                gameUtil.hideMoreGameBanner()
            else if(!CWGame.IsIOS()&&CWChannel.GAME_CHANNEL!=CWChannel.CHANNEL_TOUTIAO_FANQIE)
                dipEvent(eventMgr.HIDE_BOTTOM_HT)
        }
        else if(CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_BAIDU){
            dipEvent(eventMgr.HIDE_BOTTOM_HT)
        }
        else if(CWChannel.isNative()){
            CWNativeHelp.hideBannerAds()
        }
        else if(CWChannel.isShowMiniGameBanner()){
            CWBannerMgr.hideBannerAd()
        }
    }

    
    showInsAD(){
        if(CWBannerMgr.enableInterstitialAd&&DefaultConfig.R_insAdOpen){
            if(CWChannel.isNative()){
                CWNativeHelp.showInterstitialAds()
            }
            else{
                CWBannerMgr.showInterstitialAd(null,null)
            }
        } 
    }

    needLoad
    mLoaded
    onLoadWord(){
        console.log('onLoadWord')
        let cfg = CWClientData.levelConfig[CWGame.curWorld]
        if(!cfg){
            console.error('world config is nil. '+CWGame.curWorld)
            return
        }
        this.mBoat&&(this.mBoat.parent=this.node)
        this.mWorldBNode.removeAllChildren()
        this.mWorldFNode.removeAllChildren()
        this.needLoad=cfg['worldF']==''?1:2
        this.mLoaded=0
        cc.loader.loadRes(cfg['worldB'], cc.Prefab, (err, asset)=>{
            this.mLoaded++
            if (err) {
                console.error('[资源加载] 错误'+err.message)
                return
            }
            if(asset){
                this.mWorldBA = cc.instantiate(asset)
                this.mWorldBB = cc.instantiate(asset)
                this.mWorldBA.x = CWGame.curDistance
                this.mWorldBB.x = CWGame.curDistance+Number(cfg['distance'])
                this.mWorldBNode.addChild(this.mWorldBA)
                this.mWorldBNode.addChild(this.mWorldBB)

                if(this.mWorldBA){
                    let boat = cc.loader.getRes(ResConfig.PREFAB_BOAT, cc.Prefab)
                    let L1:cc.Node = this.mWorldBA.getChildByName('L1')
                    let boatNode:cc.Node = L1&&L1.getChildByName('BoatNode')
                    if(boatNode&&boat){
                        if(!this.mBoat)
                            this.mBoat = cc.instantiate(boat)
                        this.mBoat.parent = boatNode
                    }
                }

                this.mWorldLength = Number(cfg['distance'])
                if(this.mLoaded>=this.needLoad)
                    this.loadWorldSuccess()
 
            }
        })

        CWGame.worldFA=null
        CWGame.worldFB=null
        if(cfg['worldF']!=''){
            cc.loader.loadRes(cfg['worldF'], cc.Prefab, (err, asset)=>{
                this.mLoaded++
                if (err) {
                    console.error('[资源加载] 错误'+err.message)
                    return
                }
                if(asset){
                    this.mWorldFA = cc.instantiate(asset)
                    this.mWorldFB = cc.instantiate(asset)
                    this.mWorldFA.x = CWGame.curDistance
                    this.mWorldFB.x = CWGame.curDistance+cfg['distance']
                    this.mWorldFNode.addChild(this.mWorldFA)
                    this.mWorldFNode.addChild(this.mWorldFB)

                    CWGame.worldFA          = this.mWorldFA
                    CWGame.worldFB          = this.mWorldFB

                    if(this.mLoaded>=this.needLoad)
                        this.loadWorldSuccess()
                }
            })
        }
    }

    loadWorldSuccess(){
        console.log('加载世界完成')
        if(this.firstLoad){
            this.firstLoad=false
            this.mFish.active=false
            this.mBoat.active=true
            this.mFish.setPosition(this.fishPos)   
            this.initProperty()
            dipEvent(eventMgr.ON_CAMERA_STATUS,'Idle')
            dipEvent(eventMgr.ON_LOADING_MASK_VISIBLE, false)
        }
        else{
            dipEvent(eventMgr.ON_TRANSLATE_MASK_VISIBLE, false)
            dipEvent(eventMgr.ON_REFRESH_CREATURE)
            CWGame.gamePause=false
        }
    }

    f(val){
        return Number(val.toString().match(/^\d+(?:\.\d{0,1})?/))
    }

    public onBtnStart(event){
        dipEvent(eventMgr.ON_CAMERA_STATUS,'Power')
        event.currentTarget.active=false
        CWUIMgr.instance.closeView(UIConfig.MAIN_VIEW, UIConfig.EFFECT_FADE)
    }

    onTouchBegan(touch, event) {
        //console.log('onTouchBegan')
        dipEvent(eventMgr.ON_GAME_BEGIN)
 
    }

    onRunBegin(powerlv){
        //console.log('onRunBegin:'+powerlv)
        if(!CWGame.gameStart){
            CWGame.gameStart=true
            
            this.mFish.active=true
            let trail1=this.mFish.getChildByName('trail1')
            let trail2=this.mFish.getChildByName('trail2')
            trail1.active=powerlv>1
            trail2.active=powerlv<=1
            CWGame.superTrail=powerlv<=1
            dipEvent(eventMgr.ON_FISH_JUMP, [powerlv])
            dipEvent(eventMgr.ON_CAMERA_STATUS,'Run')
            
            this.scheduleOnce(()=>{
                CWUIMgr.instance.openView(UIConfig.BATTLE_VIEW)
            }, 1.5)
        }
    }

    onSetNormalTrail(){
        let trail1=this.mFish.getChildByName('trail1')
        let trail2=this.mFish.getChildByName('trail2')
        trail1.active=true
        trail2.active=false
        CWGame.superTrail=false
    }

}

import { CWEventMgr } from "../manager/CWEventManager"
import { CWUIMgr } from "./CWUIManager"
import { UIConfig } from "../config/UIConfig"
import { CWSdkMgr } from "./CWSdkManager"

let gameUtil
let clientData
let eventDisp

export module CWGame{

    export let gameStart:boolean = false
    export let gamePause:boolean = false
    export let gameFinish:boolean = false
    export let gameWin:boolean = false
    export let RESROOT:string = "Conventional/"
    export let cityBlock:boolean=false

    export let LOW_EFFECT=false
    export let laungh=null

    export let SCENE_SHOUCANG="1089"

    let aYzPFXCMnnFbz4iTPwCwwhhZ6GaTbP4 = window["riddle"]("aQ");
    export let curLevelProgress=0
    export let maxLevelMis=0
    export let finishLevel=0
    export let curLevel=1
    export let highLevel=1

    export let curChapter=-1
    export let curWorld=-1
    export let nextWorldDistance=-1
    export let worldCreature
    export let gameTips=''
    export let gameTipsCheck=[]

    export let soundEnable:boolean = true
    export let musicEnable:boolean = true
    export let shockEnable:boolean = true
    export let touchEnable:boolean = true
    export let zhiseEnable:boolean = true

    export let firstLoad:boolean=true
    export let noob=false

    export let getOfflineReward=false
    export let forceShareCool=true
    export let lastShareLevel=0
    export let nOfflineTime=0

    export let offlineTili=0
    export let offlineTishi=0

    let ax7NwrZFT8QzzCGBbeht3aMY2Zwpz = window["riddle"]("aW7pAFpmQiyx8D5ejbd4dwXmks");
    export let appName=''
    export let platform
    export let SCENE_FAXIAN="011014"
    export let launchScene=''
    export let launchQuery
    export let miniversion
    export let referrerInfo
    export let remoteSetting
    export let tagShareReturn:number = 0
    export let firstShare=true
    export let highScreen=false
    
    let apGPRd42SBQYJ = window["riddle"]("a5JYXeiEsBW3j");
    export let manSpeed:cc.Node = new cc.Node()
    export let mainCamera:cc.Camera = null
    export let gravity:cc.Vec2

    export let fishSpeedMax=2000
    export let underWaveSpeed=3000
    export let speedLose=1
    export let speedXMax=640*7
    export let slowSpeedVal=0.3
    export let superTrail=false

    export let curDistance=0
    let anrWXaS = window["riddle"]("aPWZn2sQ6GJNrpDxdPy");
    export let curSpeed=0
    export let fishSpeed=2000

    export let underWaveX=1000
    export let underWaveY=-3000
    export let normalUnderWaveX=1000
    export let normalUnderWaveY=-1000

    let a6CGB = window["riddle"]("a34MnC4iMsbPEeJbNrt");
    export let outOfWaveY=1000
    export let normalOutOfWaveY=1000

    export let jumpSpeedX=640*10
    export let jumpSpeedY=1280*5
    export let jump2SpeedX
    export let jump2SpeedY
    export let jump3SpeedX
    let abDfXszxkab7P24KFAdAhF = window["riddle"]("aA");
    export let jump3SpeedY
    export let jump4SpeedX
    export let jump4SpeedY
    export let loseSpeedWave=0
    export let normalloseSpeedWave=0
    export let outThridWaveY=-400
    export let normalOutThridWaveY=-400
    
    export let slowSpeedMode=false
    export let falling=false
    export let underWave=false
    let azBYXZB5MYptf3tpkw8 = window["riddle"]("aSr5fiB7KjSEpT3P2Xb3A5Jx27");
    export let fishAppear=true
    export let powerStatus=false
    export let worldFA
    export let worldFB

    export let bezierNode:cc.Node
    export let blockNode:cc.Node
    export let lineNode

    export let avatarCounts=0
    export let avatarDisMin=0
    export let avatarDisMax=0
    
    export let canCatch=true
    export let catchCool=1.0
    export let goTomorrowTime=-1
    export let ballteBack
    export let xRayTouch=false
    export let assetsPool=[]
    export let goStart=false
    export let registDays=1
    export let autoStart=true
    export let oppoBannerCloseTime=0
    export let alreadyPause

    export let canShowNative=true
    export let gameCombo=0
    export let isPlayingVideo=false
    export let mainViewOpen=false
    export let normalLblColor=cc.color(212,179,138)
    export let tutorial=false
    export let tutorialStep=0
    export let initSaveData=false
    
    export function levelIndex(){
        return curLevel
    }

    let ab36WnM8syKnwJDtWRb2wGGpmWkeYC = window["riddle"]("aFmSF3jTshKTTDMbEJ82d");
    export function levelName(){
        return "第"+curLevel+"关"
    }
    
    var today = new Date(); 
    var seed = today.getTime();
    function rnd(){
        seed = ( seed * 9301 + 49297 ) % 233280;
        return seed / ( 233280.0 );
    };

    export function rand(number){
        return Math.ceil(rnd() * number);
    }   

    let aQG8zsQSrmwRMXxXyHDkr3cZEsrAbak7H = window["riddle"]("aQeWXs7ct57bkFrEm");
    export function IsDouYin(){
        return appName=='Douyin'
    }

    export function IsTouTiao(){
        return appName=='Toutiao'
    }

    export function IsIOS(){
        return platform=="ios"
    }
        

    export class CWLevelMgr {
        private static instance: CWLevelMgr

        public static get Instance(): CWLevelMgr {
            if (this.instance == null) {
                gameUtil= window['MMR'].gameUtil
                this.instance = new CWLevelMgr()
                var _ins = this.instance
                clientData = window['MMR'].clientData
                let adrHeF2C7b8EdcS7x768PQj = window["riddle"]("aCyFEbEn");
                eventDisp = CWEventMgr.instance.dispatchEvent
                if (window['MMR'].channel.isMiniGame()){
                    console.log('前后台监听')
                    window['MMR'].channel.getMiniGameObj().onShow(_ins.onfocus)
                    window['MMR'].channel.getMiniGameObj().onHide(_ins.onblur)
                } 
                let addEL = CWEventMgr.instance.addEventListener
                let emr = CWEventMgr
                addEL(emr.LEVLE_COMPLETE, _ins.onLevelComplete, _ins)      
                addEL(emr.BACK_TO_MAIN, _ins.onBackMain, _ins)  
                addEL(emr.RESTART, _ins.onRestart, _ins) 
                let a5NxNQ7irMFCCbdZWy8Qjtw8DAJMn = window["riddle"]("ajeG7PJDsxGaAWyccXBKCt6ccdd");
                addEL(emr.REVIVAL, _ins.onRevival, _ins)

            }     
                        
            return this.instance
        }

        
        onfocus(res){
            console.log('前台')
            if(tagShareReturn == 1){
                tagShareReturn = 0
                eventDisp(CWEventMgr.SHARE_RETURN);
            }
            clientData.onFocus()
            
            !alreadyPause&&(gamePause=false)
            cc.director.resume()
            if(res&&res.scene){
                CWGame.launchScene=res.scene
                console.log('scene='+CWGame.launchScene)
            }
            
            let a2kiarFh5cE = window["riddle"]("aerZiwaiBNiNcGmeiDRSi");
            eventDisp(CWEventMgr.ON_SHOW)
            gameUtil.resumeMusic()
            CWSdkMgr.loginStart()
            CWSdkMgr.loginEnd(true)
        }

        onblur(){   
            console.log('后台')
            clientData.onBlur(true) 
            eventDisp(CWEventMgr.ON_HIDE)      
            alreadyPause=gamePause
            gamePause=true
            cc.director.pause()
            gameUtil.pauseMusic()
            CWSdkMgr.logout()
        }
        

        public init(callFunc){

            let arDJfAreiEi4yG4r2PDdWia = window["riddle"]("aSRFjr368Tcrd2j44Ws3mc");
            callFunc&&callFunc()
        }

        onBackMain(){
            gamePause = false
            gameStart = false 
            gameFinish = false
            CWGame.fishAppear=true
            let aQ = window["riddle"]("aDi3");
            CWGame.curDistance=0
            CWEventMgr.instance.dispatchEvent(CWEventMgr.ON_LOADING_MASK_VISIBLE, true, ()=>{
                this.loadWorld(true)
                CWUIMgr.instance.openView(UIConfig.MAIN_VIEW, UIConfig.EFFECT_FADE)
            })

        }

        onRestart(){

        }

        aPQWT7ak5KXwE7CXtDRPTEXi = window["riddle"]("a4MNn6AByjzQW3Xx2fc");
        onRevival(){

        }

        onGameStart(){
            gamePause = false
            gameStart = false 
            gameWin = false
            gameFinish = false
            CWGame.fishAppear=true
            clientData.onBlur(true)
        }

        onLevelComplete(){
            if(gameFinish)
                return
            gameFinish=true
            CWEventMgr.instance.dispatchEvent(CWEventMgr.ON_CHANGE_OFFSET, 0, 0.5)
            CWEventMgr.instance.dispatchEvent(CWEventMgr.ON_CAMERA_STATUS,'Finish')
            laungh.scheduleOnce(()=>{
                CWUIMgr.instance.openView(UIConfig.COMPLETE_VIEW, UIConfig.EFFECT_POP)
                let ah8x2MjfjW4knEEnwj = window["riddle"]("aHRaxEWnWbtFakGrn7ZBidf");
                CWUIMgr.instance.closeView(UIConfig.BATTLE_VIEW)
            },1.0)
            
            clientData.onBlur(true)
        }

        loadWorld(hideMask?){
            let cfg = clientData.levelConfig
            if(!cfg){
                console.error('levelConfig is nil.')
                return
            }

            curWorld=-1
            nextWorldDistance=-1
            let dis = curDistance
            for(let i=0;i<cfg.length;++i){
                let element=cfg[i]
                if(Number(element['start']) <= dis){
                    curWorld=i
                }
                else if(curWorld!=-1){
                    nextWorldDistance=Number(element['start'])
                    break
                }
            }

            let aHbZmyz7sP2ACzzrb8xcx = window["riddle"]("aFKfDcCQ7nQaiYbfzWNWcjiMEjsKmsHR");
            let cs=clientData.getWorldCreature(curWorld)
            cs&&(worldCreature=JSON.parse(cs))
            
            if(!hideMask){
                eventDisp(CWEventMgr.ON_TRANSLATE_MASK_VISIBLE, true, curWorld)
            }
            else{
                eventDisp(CWEventMgr.ON_WORLD_LOAD, curWorld)
            }
            
        }
    }
}
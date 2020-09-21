import LoadSubpackage from "../utils/LoadSubpackage";
import { CWGame } from "../manager/CWLevelManager";
import { CWADSdk } from "../sdk/CWADSdk";
import { CWModuleMgr } from "../data/CWModuleMgr";
import { ResConfig } from "../config/ResConfig";
import { CWUIMgr } from "../manager/CWUIManager";
import { UIConfig } from "../config/UIConfig";
import CWCommon from "../data/CWCommon";
import { CWBannerMgr } from "../manager/CWBannerManager";
import { CWChannel } from "../data/CWChannel";
import { CWTryMgr } from "../manager/CWTryManager";
import { CWSdkMgr } from "../manager/CWSdkManager";
import { CWNativeHelp } from "../sdk/CWNativeHelp";
import { CWRecorderManager } from "../manager/CWRecorderManager";
import { CWWxUtil } from "../data/CWWxUtil";
import { ALL_SUBPACKAGES, PRELOAD_SUBPACKAGES} from "../config/AppConfig";
import { CWBundle } from "../data/CWBundle";
import { DefaultConfig } from "../config/DefaultConfig";
import { CWHTManager } from "../manager/CWHTManager";

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

let eventMgr
let clientData
let gameUtil

const RUN_BEGIN=-172
const RUN_STOP=145

@ccclass
export default class CWLoading extends cc.Component {

    @property({type: cc.Node})
    fadeSprite=null

    @property(cc.Node)
    xray:cc.Node=null

    @property(cc.Label)
    lblProcess:cc.Label=null

    @property(cc.Label)
    lblVersion:cc.Label=null

    @property({type:cc.ProgressBar})
    mLoadingBar:cc.ProgressBar=null

    @property({type: cc.Node})
    runObj=null

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    loadedSubCounts=0
    totalProcess=0
    nowProcess=0
    resPool
    nativeLoaded
    remoteLoaded
    start () {
        console.log('loading start...')
        CWGame.noob=window['noob']
        
        clientData = window['MMR'].clientData
        eventMgr = window['MMR'].eventManager
        gameUtil = window['MMR'].gameUtil

        this.gameInit()

        CWSdkMgr.sendEvent(CWGame.noob?"新玩家-进入加载页":"老玩家-进入加载页","")

        this.resPool = [ 
            {url:ResConfig.JSON_BULLET, type:cc.JsonAsset, bundle:CWBundle.PATH_JSON},
            
                       
            {url:ResConfig.AUDIO_TAP, type:cc.AudioClip, bundle:CWBundle.PATH_AUDIO},
            {url:ResConfig.AUDIO_WRONG, type:cc.AudioClip, bundle:CWBundle.PATH_AUDIO},
            {url:ResConfig.AUDIO_RIGHT, type:cc.AudioClip, bundle:CWBundle.PATH_AUDIO},
            
        ];

        if(CWChannel.isOV())
            this.resPool.push({url:ResConfig.JSON_SIGN_OPPO, type:cc.JsonAsset, bundle:CWBundle.PATH_JSON})
        else
            this.resPool.push({url:ResConfig.JSON_SIGN, type:cc.JsonAsset, bundle:CWBundle.PATH_JSON})

        if(CWChannel.isOV())
            this.resPool.push({url:ResConfig.JSON_LEVEL_OPPO, type:cc.JsonAsset, bundle:CWBundle.PATH_JSON})
        else if(CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_TOUTIAO)
            this.resPool.push({url:ResConfig.JSON_LEVEL_TOUTIAO, type:cc.JsonAsset, bundle:CWBundle.PATH_JSON})
        else
            this.resPool.push({url:ResConfig.JSON_LEVEL, type:cc.JsonAsset, bundle:CWBundle.PATH_JSON})

        this.totalProcess=PRELOAD_SUBPACKAGES.length+this.resPool.length+3
        this.setProcess(0)
        LoadSubpackage(PRELOAD_SUBPACKAGES[this.loadedSubCounts], ()=>{
            this.loadSuccess()
        })

        this.nativeLoaded=false
        this.remoteLoaded=false
        this.loadRemoteConfig(()=>{
            CWSdkMgr.sendEvent(CWGame.noob?"新玩家-完成读取配置":"老玩家-完成读取配置","")
            this.remoteLoaded=true
            if(this.nativeLoaded)
                this.fadeSwitchScene()
        }) 
    }

    abW4yQhT6YRf534m2 = window["riddle"]("a57rQE2RTsksBQZcSFJKsAXGX");
    gameInit(){
        cc.debug.setDisplayStats(false);

        this.lblVersion.string="Ver"+CWWxUtil.Instance.getVersionBundle()

        CWModuleMgr.clientData.init()
        CWSdkMgr.init()
		CWCommon.init()
        CWBannerMgr.init()
        
        gameUtil.checkBlock()
        let size=cc.winSize
        let sw=size.height/size.width
        console.log('sw='+sw)
        CWGame.highScreen=sw>=2.15	
        if(CWChannel.isMiniGame()){
			let wx=window['MMR'].channel.getMiniGameObj()

			if(wx){
				let res = wx.getSystemInfoSync&&wx.getSystemInfoSync()
				console.log(res)
				if(res){	
                    
					CWGame.appName=res.appName
					CWGame.platform=res.platform
					CWGame.miniversion=res.version
					if(cc.sys.OS_IOS){
						let m6 = res.model.search("6")
						if(m6 != -1){
							CWGame.LOW_EFFECT = true
						}
					}
					else{
						if (res.benchmarkLevel > 0 && res.benchmarkLevel <= 7){			
							CWGame.LOW_EFFECT = true
						}	
                    }
                    
                    if(CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_OPPO){
                        if(res.platformVersionCode >= 1060){
                            wx.reportMonitor('game_scene',0);
                        }
                    }
				}

				let res2 = wx.getLaunchOptionsSync&&wx.getLaunchOptionsSync()
				console.log(res2)
				if(res2){
					res2.scene&&(CWGame.launchScene=res2.scene)
					res2.query&&(CWGame.launchQuery=res2.query)
                    res2.referrerInfo&&(CWGame.referrerInfo=res2.referrerInfo)
                    console.log('scene='+CWGame.launchScene)
                }


                
                //常亮
                wx&&wx.setKeepScreenOn&&wx.setKeepScreenOn({
                    keepScreenOn: true,
                    success: (res) => {			

                    },
                    fail: () =>{
        
                    },
                    complete: () =>{
                    }			
                })
			}            
        }
        
        CWADSdk.init()
        CWGame.RESROOT = window['MMR'].gameUtil.G_RES_ROOT()
    }

    // update (dt) {}

    setProcess(val){
        this.lblProcess.string='努力加载中:'+val+'/'+this.totalProcess
        let pval = val/this.totalProcess
        pval>1&&(pval=1)
        this.mLoadingBar.progress=pval
        
    }

    addProcess(){
        this.nowProcess++
        this.lblProcess.string='努力加载中:'+this.nowProcess+'/'+this.totalProcess

        let aQ4KDPxQ7BCsnPPwCGCiW48D3WkApCh = window["riddle"]("aAstrmZGHztaF8GrhXn3XcAHAktWiF");
        let pval = this.nowProcess/this.totalProcess
        pval>1&&(pval=1)
        this.mLoadingBar.progress=pval
        this.runObj.x=RUN_BEGIN+(RUN_STOP-RUN_BEGIN)*pval
    }


    mNeedCounts=0
    mLoadedCounts=0
    loadSuccess(){
        this.addProcess()
        this.loadedSubCounts++
        if(this.loadedSubCounts<PRELOAD_SUBPACKAGES.length){
            LoadSubpackage(PRELOAD_SUBPACKAGES[this.loadedSubCounts], ()=>{
                this.loadSuccess()
            })
            return
        }

        CWSdkMgr.sendEvent(CWGame.noob?"新玩家-完成子包加载":"老玩家-完成子包加载","")

        CWTryMgr.init()
        CWCommon.WXget();
        CWRecorderManager.init()
        
        CWNativeHelp.init()
        CWChannel.isUseHT()&&CWHTManager.init(CWGame.launchQuery)
        //CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_KUAISHOU_H5&&CWKuaiShouHelp.init()
        CWSdkMgr.sendEvent("子包加载-完成","")
    

        this.mNeedCounts=this.resPool.length
        this.mLoadedCounts=0
        
        this.resPool.forEach(element => {
            let bundle = CWBundle.getBundle(element['bundle'])
            bundle.load(element['url'], element['type'], (err, asset)=>{
                    if (err) {
                        console.log('[资源加载] 错误'+err.message)
                    }
                    this.preLoadComplete()
                });
        });
    }

    loadSuccess2(callFuc?){
        this.loadedSubCounts++
        if(this.loadedSubCounts<ALL_SUBPACKAGES.length){
            LoadSubpackage(ALL_SUBPACKAGES[this.loadedSubCounts], ()=>{
                this.loadSuccess2(callFuc)
            })
            return
        }
        else{
            callFuc&&callFuc()
        }
    }

    loadSuccess3(){
        this.loadedSubCounts++
        if(this.loadedSubCounts<ALL_SUBPACKAGES.length){
            LoadSubpackage(ALL_SUBPACKAGES[this.loadedSubCounts], ()=>{
                this.loadSuccess3()
            })
        }

    }

    asyncLoadSubPackage(callFuc?){
        LoadSubpackage(ALL_SUBPACKAGES[this.loadedSubCounts], ()=>{
            this.loadSuccess2(callFuc)
        })
    }

    syncLoadSubPackage(callFuc?){
        LoadSubpackage(ALL_SUBPACKAGES[this.loadedSubCounts], ()=>{
            callFuc&&callFuc()
            LoadSubpackage('sub3', ()=>{
            })
        })
    }

    a2pd4nSss3K2Ebd = window["riddle"]("axhZX7Hj6a4nh6bkNfrHkwQEbFeKSE7");
    preLoadComplete(){
        this.mLoadedCounts++
        this.addProcess()
        console.log('加载进度：'+this.mLoadedCounts+'/'+this.mNeedCounts)
        if(this.mLoadedCounts>=this.mNeedCounts){
            console.log('加载完成')
            this.nativeLoaded=true
            if(this.remoteLoaded)
                this.fadeSwitchScene()
        }
    }

    loadRemoteConfig(callfunc?){
        var _configPath
        if(CWChannel.GAME_CHANNEL == CWChannel.CHANNEL_WEIXIN){
            _configPath="webSetting_wx.json"
        }
        else if(CWChannel.GAME_CHANNEL == CWChannel.CHANNEL_TOUTIAO){
            _configPath="webSetting_tt.json"
        }
        else if(CWChannel.GAME_CHANNEL == CWChannel.CHANNEL_OPPO){
            _configPath="webSetting_oppo.json"
        }
        else if(CWChannel.GAME_CHANNEL == CWChannel.CHANNEL_VIVO){
            _configPath="webSetting_vivo.json"
        }

        if(_configPath){

            window['MMR'].http.get(gameUtil.G_RES_URL(true)+_configPath, function(res, thisObj){
            //console.log(res)
            gameUtil.devLog(res)
            DefaultConfig.parse(res)
            callfunc&&callfunc()
            let aAR = window["riddle"]("anc");
            },this,()=>{
                callfunc&&callfunc()
            },()=>{
                callfunc&&callfunc()
            });

            let a4KtRFmRWAs = window["riddle"]("aDNPehSk");
        }
        else{
            callfunc&&callfunc()
        }
    }

    fadeSwitchScene(){
       // var fadeActon = cc.fadeIn(0.6);
        //this.fadeSprite.runAction(fadeActon);
        clientData.initTili()
        //console.log('onLoad')
        CWSdkMgr.sendEvent(CWGame.noob?"新玩家-完成预加载":"老玩家-完成预加载","")

        CWChannel.isNative()&&CWSdkMgr.sendEvent("资源加载-完成")
        var tthis = this
        CWCommon.shareTicket()
        clientData.initJson()
        
        CWSdkMgr.loginStart()
        gameUtil.login(function(){
            CWSdkMgr.sendEvent(CWGame.noob?"新玩家-完成登录":"老玩家-完成登录","")
            tthis.addProcess()
            gameUtil.file.loadFile(gameUtil.file.getFileName(), 
                function(data, self){
                    CWSdkMgr.loginEnd(true)
                    tthis.addProcess()
                    clientData.loadData(data, self)
                    window['MMR'].common.sendUserDataToWX()
                    CWSdkMgr.sendEvent(CWGame.noob?"新玩家-完成读取存档":"老玩家-完成读取存档","")
                        
                    gameUtil.playBGM('bgm')

                    if(DefaultConfig.R_preloadLogin){
                        console.log('预制主页..')
                        let cfg = clientData.levelConfig[CWGame.curLevel-1]
                        if(!cfg){
                            console.log('未知关卡:'+CWGame.curLevel)
                            tthis.loadMain()
                            return
                        }
    
                        let chapter=Number(cfg['chapter'])
                        let find=false
                        for(let i=0;i<ALL_SUBPACKAGES.length;++i){
                            if(('level'+chapter)==ALL_SUBPACKAGES[i]){
                                tthis.loadedSubCounts=i
                                find=true
                                break
                            }
                        }
    
                        if(!find){
                            console.log('未知章节:'+chapter)
                            tthis.loadMain()
                            return
                        }

                        
                        tthis.syncLoadSubPackage(()=>{
                            tthis.loadMain()
                        })   
                    }
                    else{
                        console.log('快速进入..')
                        tthis.loadMain()
                    }
   

           }, clientData, this)
        })
    }

    akQzYdG4n = window["riddle"]("aktkJBjxdJDFKEKyAs");
    loadMain(){
        if(CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_TOUTIAO){
            gameUtil.showFavoriteGuide()
        }
        
        var ttis=this
        console.log('loadMain')
        CWGame.CWLevelMgr.Instance.init(function(){
            ttis.addProcess()

            CWSdkMgr.sendEvent(CWGame.noob?"新玩家-准备进入主场景":"老玩家-准备进入主场景","")
            let bundle=CWBundle.getBundle(CWBundle.PATH_SCENE)
            bundle.loadScene("scene/MainScene", function (err, scene) {
                cc.director.runScene(scene);
            });
        })  
    }
}

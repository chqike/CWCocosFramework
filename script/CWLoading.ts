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

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    loadedSubCounts=0
    totalProcess=0
    nowProcess=0
    resPool
    start () {
        clientData = window['MMR'].clientData
        eventMgr = window['MMR'].eventManager
        gameUtil = window['MMR'].gameUtil

        this.gameInit()

        this.resPool = [ 
            {url:ResConfig.JSON_SKILL, type:cc.JsonAsset, bundle:CWBundle.PATH_JSON},
            {url:ResConfig.JSON_LEVEL, type:cc.JsonAsset, bundle:CWBundle.PATH_JSON},
            {url:ResConfig.JSON_CREATURE, type:cc.JsonAsset, bundle:CWBundle.PATH_JSON},
            {url:ResConfig.JSON_SIGN, type:cc.JsonAsset, bundle:CWBundle.PATH_JSON},
            
            {url:ResConfig.AUDIO_TAP, type:cc.AudioClip, bundle:CWBundle.PATH_AUDIO},
            {url:ResConfig.AUDIO_WRONG, type:cc.AudioClip, bundle:CWBundle.PATH_AUDIO},
            {url:ResConfig.AUDIO_RIGHT, type:cc.AudioClip, bundle:CWBundle.PATH_AUDIO},
            
        ];

        this.totalProcess=PRELOAD_SUBPACKAGES.length+this.resPool.length+3
        this.setProcess(0)
        LoadSubpackage(PRELOAD_SUBPACKAGES[this.loadedSubCounts], ()=>{
            this.loadSuccess()
        })
    }

    gameInit(){
        cc.debug.setDisplayStats(false);

        this.lblVersion.string="Ver"+CWWxUtil.Instance.getVersion()

        CWModuleMgr.clientData.init()
		CWCommon.init()
        CWBannerMgr.init()
        CWADSdk.init()
        
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
				}

				let res2 = wx.getLaunchOptionsSync&&wx.getLaunchOptionsSync()
				console.log(res2)
				if(res2){
					res2.scene&&(CWGame.launchScene=res2.scene)
					res2.query&&(CWGame.launchQuery=res2.query)
					res2.referrerInfo&&(CWGame.referrerInfo=res2.referrerInfo)
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

        let pval = this.nowProcess/this.totalProcess
        pval>1&&(pval=1)
        this.mLoadingBar.progress=pval
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

        CWTryMgr.init()
        CWSdkMgr.init()
        CWCommon.WXget();
        CWRecorderManager.init()
        
        CWNativeHelp.init()
        //CWChannel.isUseHT()&&CWHTManager.init(CWGame.launchQuery)
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
            //this.loadSuccess3()
        })
    }

    preLoadComplete(){
        this.mLoadedCounts++
        this.addProcess()
        console.log('加载进度：'+this.mLoadedCounts+'/'+this.mNeedCounts)
        if(this.mLoadedCounts>=this.mNeedCounts){
            console.log('加载完成')
            this.loadRemoteConfig(()=>{
                this.fadeSwitchScene()
            }) 
        }
    }

    loadRemoteConfig(callfunc?){
        var _configPath
        if(CWChannel.GAME_CHANNEL == CWChannel.CHANNEL_WEIXIN){
            _configPath="webSetting_wx.json"
        }

        if(_configPath){

            window['MMR'].http.get(gameUtil.G_RES_URL(true)+_configPath, function(res, thisObj){
                //console.log(res)
                gameUtil.devLog(res)
                DefaultConfig.parse(res)
                callfunc&&callfunc()
            },this,()=>{
                callfunc&&callfunc()
            },()=>{
                callfunc&&callfunc()
            });

            // CWBundle.loadBundle(gameUtil.G_RES_URL(true)+'remote/rJson', ()=>{
            //     let bundle = CWBundle.getBundle(CWBundle.PTAH_REMOTE_JSON)
            //     gameUtil.devLog(bundle)
            //     if(bundle){
            //         bundle.load(_configPath, cc.JsonAsset, (err, asset:cc.JsonAsset)=>{
            //             if (err) {
            //                 console.log('[rJson资源加载] 错误'+err.message)
            //             }
            //             asset&&DefaultConfig.parse(asset.json)
            //             callfunc&&callfunc()
            //         });   
            //     }
            //     else{
            //         callfunc&&callfunc()
            //     }
            // }, ()=>{
            //     callfunc&&callfunc()
            // })
        }
        else{
            callfunc&&callfunc()
        }
    }

    fadeSwitchScene(){
       // var fadeActon = cc.fadeIn(0.6);
        //this.fadeSprite.runAction(fadeActon);s

        
        clientData.initTili()
        //console.log('onLoad')
        CWSdkMgr.sendEvent("预加载-完成","")
        CWChannel.isNative()&&CWSdkMgr.sendEvent("资源加载-完成")
        var tthis = this
        CWCommon.shareTicket()
        clientData.initJson()
        
        gameUtil.login(function(){
            CWSdkMgr.sendEvent("登录-完成","")
            tthis.addProcess()
            gameUtil.file.loadFile(gameUtil.file.getFileName(), 
                function(data, self){
                    tthis.addProcess()
                    clientData.loadData(data, self)
                    window['MMR'].common.sendUserDataToWX()
                    if(CWGame.noob){
                        CWSdkMgr.sendEvent("新用户登录")
                        gameUtil.sendTJEvent('NEW_LOAD_START')
                    }
                    else{
                        CWSdkMgr.sendEvent("读取存档-完成","")
                        gameUtil.sendTJEvent('OLD_LOAD_START')
                    }
                        
                    let cfg = clientData.levelConfig[CWGame.curLevel-1]
                    if(!cfg){
                        console.log('未知关卡:'+CWGame.curLevel)
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
                        return
                    }

                    gameUtil.playBGM('bgm')

                    tthis.syncLoadSubPackage(()=>{
                        tthis.loadMain()
                    })      

           }, clientData, this)
        })
    }

    loadMain(){
        var ttis=this
        CWGame.CWLevelMgr.Instance.init(function(){
            ttis.addProcess()
            if(CWGame.noob){
                CWSdkMgr.sendEvent("新用户首次进入主界面")
                gameUtil.sendTJEvent('NEW_LOAD_MAIN')
            }    
            else{
                CWSdkMgr.sendEvent("进入主界面","") 
                gameUtil.sendTJEvent('OLD_MAIN')
            }
                
            let bundle=CWBundle.getBundle(CWBundle.PATH_SCENE)
            bundle.loadScene("scene/MainScene", function (err, scene) {
                cc.director.runScene(scene);
            });
        })  
    }
}

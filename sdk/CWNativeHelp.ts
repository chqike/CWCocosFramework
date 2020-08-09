import { CWGame } from "../manager/CWLevelManager"
import { DefaultConfig } from "../config/DefaultConfig"
import { ResConfig } from "../config/ResConfig"
import { CWBundle } from "../data/CWBundle"

export module CWNativeHelp{
    export let AdsHelp
    export let rewardVideoCallback
    export let rewardVideoObj
    export let eventConfig

    export function init(){
        AdsHelp = window['AdsHelp']
        window['nativeHelp']=CWNativeHelp
        cc.director.getScheduler().enableForTarget(this)
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

    export function showBannerAds(){
        if(!AdsHelp||!DefaultConfig.BANNER_REFRESH_COOL)
            return
        this.bannerTimeCool()
        AdsHelp.showBannerAds()
    }

    export function hideBannerAds(){
        if(!AdsHelp)
            return
        AdsHelp.hideBannerAds()
    }

   
    export function bannerTimeCool(){
        if(DefaultConfig.R_bannerShowTimeCool<=0)
            return
        DefaultConfig.BANNER_REFRESH_COOL=false
        cc.director.getScheduler().unschedule(this.onBannerAdCool, this)
        cc.director.getScheduler().schedule(this.onBannerAdCool, this, DefaultConfig.R_bannerShowTimeCool, 1, 0)
    }

    export function onBannerAdCool(){
        DefaultConfig.BANNER_REFRESH_COOL=true
    }

    export function showRewardVideoAds(obj, callback, rewardName, rewardAmount){
        if(!AdsHelp)
            return
        if(window['MMR'].SKIP_ADS){
            callback&&callback(obj)
            return true
        }
        rewardVideoCallback=callback
     
        rewardVideoObj=obj
        cc.audioEngine.pauseAll()
        this.fullScreenNormalCool()
        this.sendEvent("激励视频开始播放")
        AdsHelp.showRewardVideoAds(rewardName, rewardAmount, getUUID())
    }

    export function shareContentInfo(){
        if(!AdsHelp)
            return 
        AdsHelp.shareContentInfo() 
    }

    export function startRecorder(){
        if(!AdsHelp)
            return 
        //AdsHelp.startRecorder() 
    }

    export function stopRecorder(){
        if(!AdsHelp)
            return 
        //AdsHelp.stopRecorder() 
    }


    export function showToast(value){
        if(!AdsHelp)
            return
        AdsHelp.showToast(value)
    }

    export function rewardVideoComplete(){
        console.log("hippo_sdk ===>JS rewardVideoComplete")
    }

    export function rewardVideoClosed(){
        console.log("hippo_sdk ===>JS rewardVideoClosed")
        this.sendEvent("激励视频完成播放")
   
        rewardVideoCallback&&rewardVideoCallback(rewardVideoObj)
        cc.audioEngine.resumeAll()
        this.fullScreenNormalCool()
    } 

    export function splashClosed(){
        console.log("hippo_sdk ===>JS splashClosed")
        this.showBannerAds()
    } 


    export function showInterstitialAds(){
        if(!AdsHelp)
            return
        if(DefaultConfig.R_interstitialProbability<CWGame.rand(100))
            return
        if(CWGame.curLevel-DefaultConfig.lastInterstitialLevel<=DefaultConfig.R_interstitialCool)
            return
            DefaultConfig.lastInterstitialLevel=CWGame.curLevel
        AdsHelp.showInterstitialAds()
    }
    
    export function showFullScreenAds(obj, callback){
        if(!AdsHelp||!DefaultConfig.FULLSCREN_AD_COOL){
            callback&&callback(obj)
            return true
        }       
        if(window['MMR'].SKIP_ADS){
            callback&&callback(obj)
            return true
        }
        if(DefaultConfig.R_fullScreenProbability<CWGame.rand(100)){
            //console.log("hippo_sdk ===>JS showFullScreenAds rand fail:")

            callback&&callback(obj)
            return true
        }
        if(CWGame.curLevel-DefaultConfig.lastFullScreenLevel<=DefaultConfig.R_fullScreenLevelCool){
            callback&&callback(obj)
            return true
        }
        DefaultConfig.lastFullScreenLevel=CWGame.curLevel
        rewardVideoCallback=callback
        rewardVideoObj=obj
        cc.audioEngine.pauseAll()
        this.fullScreenNormalCool()
        this.sendEvent("全屏视频（fullscreen）开始播放")
        AdsHelp.showFullScreenAds()
        return true
    }

    export function onFullScreenAdClosed(){
        console.log("hippo_sdk ===>JS onFullScreenAdClosed")
        rewardVideoCallback&&rewardVideoCallback(rewardVideoObj)
        cc.audioEngine.resumeAll()
        this.sendEvent("全屏视频（fullscreen）完成播放")
    }


    export function onFullScreenAdCool(){
        DefaultConfig.FULLSCREN_AD_COOL=true
    }

    export function fullScreenNormalCool(){
        if(!DefaultConfig.R_fullScreenUseTimeCool)
            return
        DefaultConfig.FULLSCREN_AD_COOL=false
        cc.director.getScheduler().unschedule(this.onFullScreenAdCool, this)
        cc.director.getScheduler().schedule(this.onFullScreenAdCool, this, DefaultConfig.R_fullScreenTimeCool, 1, 0)
    }

    export function fullScreenNoobCool(){
        if(!DefaultConfig.R_fullScreenUseTimeCool)
            return
        DefaultConfig.FULLSCREN_AD_COOL=false
        cc.director.getScheduler().unschedule(this.onFullScreenAdCool, this)
        cc.director.getScheduler().schedule(this.onFullScreenAdCool, this, DefaultConfig.R_fullScreenNoodCool, 1, 0)
    }

    export function sendEvent(name, value){
        if(eventConfig==undefined){
            let bundle = CWBundle.getBundle(CWBundle.PATH_JSON)
            eventConfig=(bundle.get(ResConfig.JSON_EVENT, cc.JsonAsset) as cc.JsonAsset).json
        }

        value==undefined&&(value="0")

        if(!AdsHelp||!eventConfig){
            console.log('nativehelp sendEvent fail')
            return
        }
            
        let key
        for (let index = 0; index < eventConfig.length; index++) {
            const element = eventConfig[index];
            if(element['name']==name){
                key = element['id']
                break
            }
        }
        key!=undefined&&AdsHelp.sendEvent(key, value.toString())
    }

    export function startLevel(level){
        if(!AdsHelp){
            return
        }
        AdsHelp.startLevel(level)
    }


    export function finishLevel(level){
        if(!AdsHelp){
            return
        }   
        AdsHelp.finishLevel(level)  
    }

    export function failLevel(level){
        if(!AdsHelp){
            return
        }
        AdsHelp.failLevel(level)
    }
}


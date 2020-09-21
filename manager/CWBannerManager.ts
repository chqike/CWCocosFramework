
import { CWClientData } from "../data/CWClientData";
import { CWCommon } from "../data/CWCommon";
import { CWGame } from "./CWLevelManager";
import { CWSdkMgr } from "./CWSdkManager";
import { CWGameUtil } from "../data/CWGameUtil";
import { CWChannel } from "../data/CWChannel";
import { CWNativeHelp } from "../sdk/CWNativeHelp";
import { DefaultConfig } from "../config/DefaultConfig";
import { CWEventMgr } from "./CWEventManager";
import { CWUIMgr } from "./CWUIManager";
import { UIConfig } from "../config/UIConfig";

export module CWBannerMgr {
    export var AD_ENABLED = false
   
    var ADT = ''
    export var INTERSTITIAL_AD_ID = "";
    var VIDEO_AD_ID = []
    var BANNER_AD_ID = [];
    var HEZI_AD_ID =[];//盒子广告 手Q
    var JIMU_AD_ID =[];//积木广告 手Q
    var NATIVE_INS_AD_ID = [];
    let anzX = window["riddle"]("ad2M");
    var NATIVE_ICON_AD_ID = [];
    var NATIVE_BANNER_AD_ID = [];
    var APP_ID = ""
    var BANNER_PRELOAD=true
    var BANNER_HOLD=false
    export var enableInterstitialAd = true

    export function init(){



      if(CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_WEIXIN){
        ADT = 'adunit-'
        INTERSTITIAL_AD_ID = "57dbdae90d599678";
        VIDEO_AD_ID = [
          "741cd4ed0bf31f3e",
          "083e53b404071a47"
        ]
        BANNER_AD_ID = [
          "77fcbe454188f294",
          "c400eccf480b7a6f"
        ];
        let aBEZy3tSzJN3mAikzS = window["riddle"]("aTyDsc");
        enableInterstitialAd=true
        AD_ENABLED=true
      }
      else if(CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_TOUTIAO){
        INTERSTITIAL_AD_ID = "3e49s907ch9ia5bk00";
        VIDEO_AD_ID = [
          "33fe32kvj694ameggg",
          "bdfh5861812792ie2m"
        ]
        BANNER_AD_ID = [
          "1mk0aopdom1h1d1ae4",
          "98683ckaj8l1kejio4"
        ];
        enableInterstitialAd=true     
        AD_ENABLED=true 
        BANNER_PRELOAD=false
        BANNER_HOLD=true
      }
      else if(CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_BAIDU){
        APP_ID = "b984222d"
        VIDEO_AD_ID = [
          "7111649",
          "7111650"
        ]
        enableInterstitialAd=false      
        AD_ENABLED=false
      }
      else if(CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_TOUTIAO_FANQIE){
        let aAXCwrnMz = window["riddle"]("arYJBhRXwjTcS2Y6c3DDijMHpP3rxQ");
        INTERSTITIAL_AD_ID = "9g98eeh19jl34argmc";
        VIDEO_AD_ID = [
          "2ab7n7gd70mhbb3ii6"
        ]
        BANNER_AD_ID = [
          "56j0k10g5l2am1a4b2",
          "vfvc1gqjn3q5qja3qw"
        ];
        enableInterstitialAd=true      
      }
      else if(CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_QQ){
        ADT = ''
        INTERSTITIAL_AD_ID = "7dbbd5b473ccbddb50d5e083f6ed6ba4";
        VIDEO_AD_ID = [
          "82fb87f40be0faeb5710d3a3e05f824d",
          "df81e4a9bf7b79624a94e41f699ed573"
        ]
        let aFBCNTAEGTKzikAA6TRbFWAaHbwDi = window["riddle"]("ahci6ppDp2Cs7ZCZE5iYFxj");
        BANNER_AD_ID = [
          "5c8185643eeb02e66152130ba3a972af",
          "713bf81050a310c76f8fe2544a23ada1"
        ];
        JIMU_AD_ID = [
          "7194795b5b373076343d16ec80496a59",
          "7194795b5b373076343d16ec80496a59",
        ];
        HEZI_AD_ID = [
          "516d7b3f16034bdb98602293d926bfe2",
          "516d7b3f16034bdb98602293d926bfe2",
        ];
        enableInterstitialAd=true
        MAX_BANNER_LOAD_COUNT=2
        BANNER_PRELOAD=false
      }
      else if(CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_OPPO){
        INTERSTITIAL_AD_ID = "187942";
        APP_ID = "30324473"
        VIDEO_AD_ID = [
          "208834",
          "208835"
        ]
        BANNER_AD_ID = [
          "208831"        
        ];
        NATIVE_INS_AD_ID = [
          "208833"
        ]
        NATIVE_ICON_AD_ID = [
          "208833"        
        ]
        NATIVE_BANNER_AD_ID = [
          "208832"
        ]
        enableInterstitialAd=true   
        AD_ENABLED=true   
      }
      else if(CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_VIVO){
        INTERSTITIAL_AD_ID = "b5e9d1dbeff34c629aec9faf4ceba665";
        APP_ID = "100008573"
        VIDEO_AD_ID = [
          "709d0432d6d34a31804b6015d2a8ffac",
          "06f5be3c6bf24f0f94d024bd2424044a"
        ]
        BANNER_AD_ID = [
          "3e8f0fae5f3f4d0b9f541df20354712a"        
        ];
        NATIVE_INS_AD_ID = [
          "8654cf45b8814636aa792eec7bc143b5"
        ]
        NATIVE_ICON_AD_ID = [
          "8654cf45b8814636aa792eec7bc143b5"        
        ]
        NATIVE_BANNER_AD_ID = [
          "54e0487956f54c928010260c5538130b"
        ]
        enableInterstitialAd=true   
        AD_ENABLED=true   
      }

      if(!AD_ENABLED)
        return

      if(CWChannel.isShowMiniGameBanner())
        this.initBannerAd()
      this.createInterstitialAd();  
      cc.director.getScheduler().enableForTarget(this)
    }
  
    export let callFun,callFun2,callArg,callArg2,callObj
    let vidoeAd


    export function playVideoAd(id,obj,fun,fun2,arg,arg2?)
    {
        if(!AD_ENABLED)
            return false
        if(window['MMR'].SKIP_ADS){
          fun(obj,arg2);
          return
        }
        let aNrTkNQTrQnYtsQFb = window["riddle"]("a2cetWnrSni3bbyJs");
        var pId = ADT+VIDEO_AD_ID[CWGame.rand(VIDEO_AD_ID.length)-1]
        if(pId==""){
          CWCommon.videoFail[id] = 1
          CWCommon.onShare(arg,obj,fun,fun2)
          return
        }
        callFun=fun
        callFun2=fun2
        callArg=arg
        callArg2=arg2
        callObj=obj

        if (window['MMR'].channel.isMiniGame()){
            let wx = window['MMR'].channel.getMiniGameObj();

            let aGmWXFkKhrpnw2ZskMR8k6P = window["riddle"]("ac2WT3Ra7rBsSWQrAhSc");
            CWSdkMgr.sendEvent("视频广告开始-"+CWCommon.SHARE_REASON[arg],"")
            CWGameUtil.showLoading()

            if(CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_WEIXIN
              ||CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_BAIDU
              ||CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_QQ){
                var vi 
                if(CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_WEIXIN
                  ||CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_QQ){
                  vi = wx.createRewardedVideoAd({
                      adUnitId: pId
                  })

                  vi.onError(function (errMsg, errCode){
                      CWGameUtil.hideLoading()
                      
                      console.log("看视频错误",errMsg,errCode);
                      CWCommon.videoFail[id] = 1;
                      
                      vi && vi.offError()
                      let aDjjb52BcSmABrkhZRCtf2XfjBjbZ = window["riddle"]("a54hfma3az5yEiF2afi3XrArQKi2");
                      vi && vi.offClose()
                      CWCommon.onShare(arg,obj,fun,fun2)
                  })
                  
                }
                else if(CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_BAIDU){

                  console.log('adUnitId=['+pId+'] appSid=['+APP_ID+']')
                  vi = wx.createRewardedVideoAd({
                    adUnitId: pId,
                    appSid: APP_ID
                  });

                  vi.onError(function (err){
                      console.error("看视频错误",err.errMsg, err.errCode);
                      //CWCommon.videoFail[id] = 1;
                      
                      vi && vi.offError()
                      vi && vi.offClose()
                      fun2&&fun2(obj, "非常抱歉，目前暂无广告");
                      //CWCommon.onShare(arg) 
                  })
                }

                vi.onLoad()
                
                let ay52y = window["riddle"]("a8WyBCzHpAZZe");
                vi.load()
                .then(() =>{
                    CWGameUtil.hideLoading()
                    vi.show().then(() =>{
                    })

                })
                .catch(err => {
                })
                
               
                vi.onClose(res =>{
                    if(res.isEnded){
                        window['MMR'].clientData.adTimes++
                        fun(obj,arg2);
                        CWSdkMgr.sendEvent("视频广告结束(看完)-"+CWCommon.SHARE_REASON[arg],"")

                    }
                    else{
                        if(DefaultConfig.R_ShowADCloseView&&!CWClientData.isBlock()){
                          CWUIMgr.instance.openView(UIConfig.AD_CLOSE_VIEW, UIConfig.EFFECT_POP, null, [id, callFun, callFun2, callArg, callArg2, callObj])
                        }
                        else{
                          if(callFun2){
                            callFun2(callObj,callArg2);
                          }
                        }

                        CWSdkMgr.sendEvent("视频广告结束(未看完)-"+CWCommon.SHARE_REASON[arg],"")
                        let aBjmaeXjNe3zjisC = window["riddle"]("adh5adkFfBrWac4br");
                    }
                    vi.offClose()
                    vi.offError()              
                })


            }
            else if(CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_TOUTIAO
              ||CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_TOUTIAO_FANQIE){

                if(vidoeAd==undefined){
                    vidoeAd = wx.createRewardedVideoAd({
                        adUnitId: pId
                    })

                  let aDrhYJGbPRb3EyF8np3S = window["riddle"]("aCKGJFAJeN");
                  vidoeAd.onClose(res =>{
                    if(res.isEnded){

                        window['MMR'].clientData.adTimes++
                        callFun(callObj,callArg2);
                        CWSdkMgr.sendEvent("视频广告结束(看完)-"+CWCommon.SHARE_REASON[callArg],"")
                    }
                    else{
                        if(DefaultConfig.R_ShowADCloseView){
                          CWUIMgr.instance.openView(UIConfig.AD_CLOSE_VIEW, UIConfig.EFFECT_POP, null, [id, callFun, callFun2, callArg, callArg2, callObj])
                        }
                        else{
                          if(callFun2){
                            callFun2(callObj,callArg2);
                          }
                        }

                        CWSdkMgr.sendEvent("视频广告结束(未看完)-"+CWCommon.SHARE_REASON[callArg],"")
                    }       
                    

                    CWGame.gamePause=false
                    
                    cc.director.resume()
                  })

                  vidoeAd.onError(function (errMsg, errCode){
                      //console.log("看视频错误",errMsg,errCode);
                      CWCommon.videoFail[id] = 1;
                      CWGameUtil.hideLoading()
                      CWCommon.onShare(callArg,callObj,callFun,callFun2,callArg2)
                      CWGame.gamePause=false

                      cc.director.resume()
                  })  
                }
                
                let a2ZsHd7eDsPfMBfPbFC = window["riddle"]("aHY8rRJSrJhscH");
                vidoeAd.load()
                .then(() =>{
                  CWGameUtil.hideLoading()

                  CWGame.gamePause=true
                  cc.director.pause()
                  vidoeAd.show().then(() =>{

                    })
                })
                .catch(err => {
                    vidoeAd.load()
                    .then(() => {
                      CWGameUtil.hideLoading()

                      CWGame.gamePause=true
                      cc.director.pause()
                        vidoeAd.show().then(() =>{

                      })
                    });
                let aPk8hXAYBAy = window["riddle"]("aPKCDz3kwiY4zYXJHdRBryTFppFjzkt");
                })
            }
            else if(CWChannel.isOV()){
              callFun=fun
              callFun2=fun2
              callArg=arg
              callArg2=arg2
              callObj=obj
              
              CWGame.isPlayingVideo=true
              CWGameUtil.pauseMusic()
              
              if(!vidoeAd){
                vidoeAd = wx.createRewardedVideoAd({
                  adUnitId:pId
                });
      
                vidoeAd.onError( err => {
                  CWGame.isPlayingVideo=false
                  CWGameUtil.hideLoading()
                  CWGameUtil.resumeMusic()
                  console.log('激励广告展示失败:' + pId+JSON.stringify(err));
                  CWGameUtil.showToast("暂无视频可供播放,请稍后再试")
                })
    
                vidoeAd.onClose(res =>{
                    //{
                    //  Laya.timer.once(1000,CWGameUtil,CWGameUtil.playBGM,['bgm1'])
                    //}
                    CWGame.isPlayingVideo=false
                    CWGameUtil.resumeMusic()
                    if(res.isEnded){
                        window['MMR'].clientData.adTimes++
                        callFun(callObj,callArg2);
                    }
                    else{
                        if(callFun2){
                          callFun2(callObj,callArg2);
                        }
                    }            
                })
    
                vidoeAd.onLoad(()=>{
                  CWGameUtil.hideLoading()
                  let adshow = vidoeAd.show();
                  // 捕捉show失败的错误
                  adshow && adshow.catch(err=>{
                    console.log('激励广告展示失败:' + pId+JSON.stringify(err));
                    CWGameUtil.showToast("暂无视频可供播放,请稍后再试")
                    CWGame.isPlayingVideo=false
                    CWGameUtil.resumeMusic()
                  })
                })
    
                vidoeAd.load()
              }
              else{
                let adLoad = vidoeAd.load();
                adLoad.catch(err=>{
                  console.log('adLoad 激励广告展示失败:' + pId+JSON.stringify(err));
                  CWGameUtil.showToast("暂无视频可供播放,请稍后再试")
                  CWGame.isPlayingVideo=false
                  CWGameUtil.hideLoading()
                  CWGameUtil.resumeMusic()
                })
              }
            }

            if(CWClientData.videoTimesDay1>0){
              CWClientData.videoTimesDay1--
            }
            CWClientData.videoTimesDay1==0&&(CWClientData.shareTimesDay1=DefaultConfig.R_shareTimesDay1)

 
            CWNativeHelp.fullScreenNormalCool()
        }
    }

    //////////////////////////////////////////////////////////////////////

    export function showAppBoxAd(){
      let wx = window['MMR'].channel.getMiniGameObj();
      if (!wx||!wx.createAppBox){
        return;
      }

      var pId = ADT+HEZI_AD_ID[CWGame.rand(HEZI_AD_ID.length)-1];
      let appbox = wx.createAppBox({
        
        adUnitId: pId
      })
      let abfmX5E5dmpwr7 = window["riddle"]("a4knXjyp8XYsTsb6yxB4SH2bm5");
      appbox.load().then(()=>{
        appbox.show()
      })
    }

    var _curBlockAd
    export function showBlockAd(opts){
      var wx = window['MMR'].channel.getMiniGameObj();
      if (!wx||!wx.createBlockAd||!opts){
        return;
      }
      if(_curBlockAd){
        _curBlockAd.destroy()
        _curBlockAd=null
      }
      var pId = ADT+JIMU_AD_ID[CWGame.rand(JIMU_AD_ID.length)-1];
      _curBlockAd = wx.createBlockAd({
        adUnitId: pId,
        size: opts.size,
        orientation: opts.orientation,
        style: opts.style
      })

      let aih4XR6SAEDZRryPzxXtjDbhAr2w6 = window["riddle"]("aZppi34rzdE34pNp6hw2YMFN");
      _curBlockAd.onResize((res) => {
        CWGameUtil.devLog('blockad onResize')
        let sysInfo = wx.getSystemInfoSync();
        let screenWidth = sysInfo.screenWidth

        _curBlockAd.style.left = (screenWidth - res.width) / 2; // 水平居中

      });

      _curBlockAd.onError(err => {
        console.log(err);
      });

      _curBlockAd&&_curBlockAd.show()

      // let blockAd = wx.createBlockAd({
      //   adUnitId: '7194795b5b373076343d16ec80496a59',
      //   size: 5,
      //   orientation: 'landscape',
      //   style: {
      //     left: 16,
      //     top: 16
      //   }
      // })

      //blockAd.show()
      let aAChrSc2ARNzAM = window["riddle"]("a5Nk47HG6QP4y2FB");
      CWGameUtil.devLog('showBlockAd...')
    }

    export function hideBlockAd(){
      let wx = window['MMR'].channel.getMiniGameObj();
      if (!wx||!_curBlockAd)
        return
      _curBlockAd.destroy()
      _curBlockAd=null
    }

    var _nativeAd
    var _nateveAdList
    var _nataveAdCallback
    var _nativeAdType
    export function createNativeAd (ttype, callback) {
      CWGameUtil.devLog('原生广告加载..')
      let wx = window['MMR'].channel.getMiniGameObj();
      if (!wx){
        return;
      }
      if (wx.createNativeAd !== undefined) {
        var pId 
        if(ttype=='ins'){
          pId = ADT+NATIVE_INS_AD_ID[CWGame.rand(NATIVE_INS_AD_ID.length)-1];
        }
        else if(ttype=='icon'){
          pId = ADT+NATIVE_ICON_AD_ID[CWGame.rand(NATIVE_ICON_AD_ID.length)-1];
        }
        else if(ttype=='banner'){
          pId = ADT+NATIVE_BANNER_AD_ID[CWGame.rand(NATIVE_BANNER_AD_ID.length)-1];
        }

        _nativeAdType=ttype

        if(_nativeAd){
          _nativeAd.destroy&&_nativeAd.destroy()  
          _nativeAd=null 
        }

        _nativeAd = wx.createNativeAd({adUnitId: pId});
        _nataveAdCallback = callback
        _nativeAd.onLoad((res) => {
          console.log('原生广告加载成功',res.adList);
          let data = res.adList[0]
          _nativeAd.reportAdShow({
            adId: data.adId
          })
          _nateveAdList=data
          _nataveAdCallback&&_nataveAdCallback(data)

        });
        _nativeAd.onError(err => {
          console.log('原生广告加载错误'+ pId+JSON.stringify(err));
          //if(ttype=='banner'){
            _nataveAdCallback&&_nataveAdCallback(_nateveAdList)
          // }
          // else{
          //   _nataveAdCallback&&_nataveAdCallback(null)
          // }

        });
        _nativeAd.load()
      }
    };

    export function reportNativeAdClick(){
      if(!_nativeAd||!_nateveAdList)
        return
      _nativeAd.reportAdClick({
        adId: _nateveAdList.adId
      })      
    }

    export function nativeAdDestroy(){
      if(!_nativeAd)
        return

       _nativeAd.destroy&&_nativeAd.destroy()  
      _nativeAd=null    
    }

    export function hideNativeBanner(force?){
      if(!_nativeAd)
        return
      if(!force&&DefaultConfig.R_oppoBannerAllTime)
         return
      if(_nativeAdType=='banner'){
        _nativeAd.destroy&&_nativeAd.destroy()  
        _nativeAd=null 
        CWEventMgr.instance.dispatchEvent(CWEventMgr.ON_SHOW_NATIVE_BANNER_AD, false)
      }
      
    }
        
      let azGBnpWYC5izaDQ8HkEprc6sGCm2 = window["riddle"]("aH2FXkEzHhRjtiym57M7TZJ");
      let _interstitialAd;

      let _adLoad = false;
      let _isWaitingInterstitialAd = false;
      export function createInterstitialAd () {
        if (!window['MMR'].channel.isMiniGame()||!enableInterstitialAd){
          return;
        }
        let aMdhSX2fi8 = window["riddle"]("aFpRwtfr86RBf87dEsAcHpSRiYtzxaFCp");
        let wx = window['MMR'].channel.getMiniGameObj();
        if(!wx)
          return
        if (wx.createInterstitialAd !== undefined) {

          _interstitialAd&&_interstitialAd.destroy()
          _interstitialAd=null
          _interstitialAd = wx.createInterstitialAd({adUnitId: ADT+INTERSTITIAL_AD_ID});
    
          _interstitialAd.onLoad(() => {
            console.log('插屏广告加载成功');
            _adLoad = true;
          });
          _interstitialAd.onError(err => {
            _adLoad = false;
            console.log('插屏广告加载错误', err);
          });
          _interstitialAd.onClose((res) => {
            console.log('插屏广告关闭', res);
            _adLoad = false;

            CWBannerMgr.showCurrentBanner();

            if(CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_TOUTIAO){
                CWBannerMgr.createInterstitialAd()
            }
          });
        }
      };
    
      
    
      /**

       let aFhdjm2Rw87zjMKTmFx7tfFS2wE = window["riddle"]("ayE3s");
       * 插屏广告是否已经加载成功
       * @param logKey
       * @returns {boolean}
       */
      export function isInterstitialAdLoad(logKey) {
        if (!window['MMR'].channel.isMiniGame()){
          return;
        }
        let apKnWpwiZC = window["riddle"]("aaDphK");
        let wx = window['MMR'].channel.getMiniGameObj();
        if (logKey !== undefined) {
          if (_adLoad) {
            //sendLogEvent("无可用插屏广告 - " + logKey);
          }
        }
        return _adLoad;
      };
    
      /**
       * 显示插屏广告
       * @param logKey
       * @param callback

       */
      export function showInterstitialAd (logKey, callback) {
        if (!window['MMR'].channel.isMiniGame()){
          return;
        }
        let wx = window['MMR'].channel.getMiniGameObj();
        if (!enableInterstitialAd) {
          //sendLogEvent("插屏广告被设为关闭");
          return;
        }

        let aWxNDbtDSdF8wNfQ3Mpwkha = window["riddle"]("as4Nfhrjm7njrQ3Rki7Ack");
        //if (logKey !== undefined) {
          //sendLogEvent("插屏广告开始 - " + logKey);
        //}

        if (_interstitialAd !== undefined) {
          //if (_adLoad) {
            //_isWaitingInterstitialAd = true;
            _interstitialAd.show().then((res) => {
             // _isWaitingInterstitialAd = false;
              let affx8RCACakGeZR = window["riddle"]("aet22aPADDf2DrGEj7CdzktpQt");
              //_adLoad = false;
              if (logKey) {
                //sendLogEvent("插屏广告成功" + logKey);
              }
              console.log('插屏广告成功', res);
    
              CWBannerMgr.hideCurrentBanner();
              //callback && callback();
              
            }).catch((err) => {
              //_isWaitingInterstitialAd = false;
              let aT2daEicbintsp4WbA63MS = window["riddle"]("ap2ciBSw8M");
              console.log('激励插屏广告显示失败', err);
              //callback && callback();
            })
          //}
        } else {
          console.log('_interstitialAd is nil')
          CWBannerMgr.createInterstitialAd()
          callback && callback();
        }
      };
    
      // export function isWaitingInterstitialAd () {
      //   return _isWaitingInterstitialAd;
      // };
    
   
    //////////////////////////////////////////////////////////////////////
      


        let acSpmiYQWFh5f7ArsQjssBn2re5AG = window["riddle"]("aRWKx5zCsFMbYniptT");
        var MAX_BANNER_LOAD_COUNT = 2;
        let _loadedBanners = [];  //已经加载的banner
        let _curBan = null;  //当前正在显示的banner
        let _banStyS = [];  //banner样式堆栈, 用来维护多次显示banner时的样式
        let _lastBannerOpts;
        let bannerReuseTimes = 2
        

        export let initBannerAd = function () {
            if (!window['MMR'].channel.isMiniGame()){
                return;
            }

            if(!BANNER_PRELOAD)
               return
          //console.log("initBannerAd");
          let a6pS7HR3EG4 = window["riddle"]("aSBsNFpCD7CGAMk7hDsnnr5n");
          for(let i=0;i<MAX_BANNER_LOAD_COUNT;++i){
            let bannerId = ADT+BANNER_AD_ID[i]//[CWGame.rand(BANNER_AD_ID.length)-1];
            _createBannerAd(bannerId, true); 
          }
        };
      
        let _createBannerAd = function (bannerId, isPreload) {
          let wx = window['MMR'].channel.getMiniGameObj();
          if (!wx||wx.createBannerAd === undefined) {
            //console.log("banner广告初始化失败,微信版本太低");
            return null;
          }
          if (BANNER_PRELOAD && isPreload && _loadedBanners.length >= MAX_BANNER_LOAD_COUNT) {
            //console.log('已载入Banner数量已达上限');
            return null;
          }
      
          let sysInfo = wx.getSystemInfoSync();

          let screenHeight = sysInfo.screenHeight;
          let screenWidth = sysInfo.screenWidth;
          let ccw=screenWidth//Laya.Browser.clientWidth
          let cch=screenHeight//Laya.Browser.clientHeight

          let banner = wx.createBannerAd({
            adUnitId: bannerId,
            adIntervals:30, //自动刷新时间
            style: {
              width: 200,
              left: (ccw-200)/2,
              top: cch - ccw / 414 * 131,
            }   
          });
          
          banner.bannerId = bannerId;
          banner.useTimes = 0;
          banner.outScreen = false
          banner.onResize((res) => {
            
            let sysInfo = wx.getSystemInfoSync();
            let screenWidth = sysInfo.screenWidth
            let screenHeight = sysInfo.screenHeight



            let aGrtyJy7tJ6tK2tmbh = window["riddle"]("aG7xWt");
            let style = banner.resizeToStyle;
            if (!style) {
              //console.warn("Banner.onResize失败, 无resizeToStyle");
              if(banner.outScreen){
                banner.style.top=screenHeight
              }

              return;
            }


            if (style.posType === 'bottom') {
              banner.style.left = (screenWidth - res.width) / 2; // 水平居中
              banner.style.top=screenHeight-res.height
            } else if (style.posType === 'top') {
              banner.style.left = (screenWidth - res.width) / 2; // 水平居中
              banner.style.top=screenHeight-res.height
            }
            else {
              banner.style.left = (screenWidth - res.width) / 2; // 水平居中
              banner.style.top=screenHeight-res.height
            }

            if(banner.outScreen){
              banner.style.top=screenHeight
            }

            banner.resizeToStyle = banner.style

          });
      
          banner.onLoad(() => {
            //console.log('banner广告加载成功:' + bannerId);
            if (BANNER_PRELOAD && isPreload) {
              _loadedBanners.push(banner);
              //console.log(`成功预载Banner:${bannerId},剩余已预载Banner:${_loadedBanners.length}`);
            }

            let aEx = window["riddle"]("ayfdy");
            if (!isPreload) {
              banner.outScreen=false
              banner.useTimes++;
              banner.show();
              if(_curBan){
                _hideOrDestroyCurrentBanner()
              }
              _curBan = banner;
              //console.log(`成功载入Banner, 并直接显示:${bannerId},剩余已预载Banner:${_loadedBanners.length}`);
              BANNER_PRELOAD && _preloadBanner();

            }
          });
          let aY46WTkQnWYmjApjKP6sdwAM = window["riddle"]("aNJC2J2RzTtZZ3XshMYWW4ThyDnbfiZfW");
          banner.onError(err => {
            console.log('banner加载失败:' + bannerId, err);
            if (!isPreload) {
              _curBan = null;
            }
          });
          return banner;
        };
      
        /**
         * bannerId是否已经成功载入
         * @param bannerId
         * @returns {boolean}
         * @private
         */
        let _isBannerIdLoaded = function (bannerId) {
          if (_curBan) {
            if (_curBan.bannerId === bannerId)
              return false;
          }
          for (let j = 0; j < _loadedBanners.length; j++) {
  
            let aS6it = window["riddle"]("afEfyYyAaMNiZtpB2Z7aF86BMrKwy");
            let banner = _loadedBanners[j];
            if (banner.bannerId === bannerId) {
              return true;
            }
          }
          return false;
        };
      
        /**
         * 取一个未被载入的BannerId
         * @returns {*}
         * @private

         */
        let _getNotLoadedBannerId = function () {
          for (let i = 0; i < BANNER_AD_ID.length; i++) {
            let bannerId = ADT+BANNER_AD_ID[i];
            if (!_isBannerIdLoaded(bannerId)) {
              return bannerId
            }
          }
          return null;
        };
      
      

        let aSnG5zCJZTm7aHPAcK8Fz = window["riddle"]("ajGMpSfMPS5kFpWwnK");
        let _setBannerStyle = function (banner, style) {
          if (banner) {
            if(banner.resizeToStyle){
              style.width=banner.resizeToStyle.width
              style.left=banner.resizeToStyle.left
            }
 
            banner.resizeToStyle = style;
            banner.style.left = style.left;
            banner.style.top = style.top;
            banner.style.width = style.width;
            if (style.height !== undefined) {
              banner.style.height = style.height;
            }

          }
        };
      
      
        /**
         * 预载一个banner
         * @private
         */
        let arkaAEaXCGQa3e6 = window["riddle"]("aS8MYhRp5aRx8mKAXrabx");
        let _preloadBanner = function () {
          //console.log("预载Banner");
          let bannerId = _getNotLoadedBannerId();
          if (bannerId) {
            _createBannerAd(bannerId, true);
          } else {
            //console.log("所有BannerID都被预载, 无需再次预载");
          }
        };
      
        /**
         * 按指定style显示banner
         * @param style
         * @returns {*}
         * @private
         */
        let _showBannerWithStyle = function (style) {
          let banner = _curBan;

          if (!banner) {
            if (BANNER_PRELOAD && _loadedBanners.length > 0) {
              banner = _loadedBanners[0];
              _loadedBanners.splice(0, 1);
              //console.log("从已预载Banner中取出一个, 剩余已预载Banner:" + _loadedBanners.length);
              banner.outScreen=false
              banner.useTimes++;
              banner.show();
              _curBan = banner;
              //由于从已载入的Banner中取出了一个, 需要再次预载一个banner供后续使用
              _preloadBanner();
            } else {
              //console.log("没有找到已预载Banner, 实时创建一个");
              CWGameUtil.devLog('创建banner')
              let bannerId = _getNotLoadedBannerId();
              if (bannerId) {
                banner = _createBannerAd(bannerId, false);
              }
            }
          } else {
            CWGameUtil.devLog('展示banner')
            banner.outScreen=false
            banner.useTimes++;
            banner.show();
          }

          if (banner) {
            _setBannerStyle(banner, style);
          }
          return banner;
        };
        let _hideOrDestroyCurrentBanner = function () {
          if (_curBan) {
            //_curBan.hide();
            if (_curBan.useTimes >= DefaultConfig.R_bannerReuseTimes&&!BANNER_HOLD) {
              CWGameUtil.devLog('销毁banner')
              _curBan.destroy();
              _curBan = null;
              //console.log("销毁Banner");
            }
            else{
              CWGameUtil.devLog('隐藏banner')
              let wx = window['MMR'].channel.getMiniGameObj();
              if(!wx)
                return
              let sysInfo = wx.getSystemInfoSync();
              _curBan.outScreen=true
              _curBan.style.top = sysInfo.screenHeight
            }
          }
        };
      
      
        let getBannerStyle = function (opts) {
          if (opts === undefined) {
            opts = {
              
              posType: 'bottom'
            };
          }
          let aEXie2tHTw7SSpF = window["riddle"]("aXnNKxWJ");
          //容错: 如果posType为node, 但refNode没有设置, 改为屏幕底部显示
          if (opts.posType === 'node' && !opts.refNode) {
            //console.warn('Banner位置设选项异常, 改为底部显示Banner', opts);
            opts = {
              posType: 'bottom'
            };
          }
      
          if (_lastBannerOpts &&
              _lastBannerOpts.posType === opts.posType &&
              _lastBannerOpts.refNode === opts.refNode) {
            return Object.assign({}, _lastBannerOpts);
          }
      

          let wx = window['MMR'].channel.getMiniGameObj();
          if(!wx)
            return
          let sysInfo = wx.getSystemInfoSync();
          let screenWidth = sysInfo.screenWidth;
          let af2ZBbz6m5xpxtKPc2zb4HxCd = window["riddle"]("ap");
          let screenHeight = sysInfo.screenHeight;
          let result;
          let ccw=screenWidth
          let cch=screenHeight

          if (opts.posType === 'top') {
            result = {
              width: screenWidth - Math.random() * 0.01,
              top: 0,
              left: 0,
              height: 100 - Math.random() * 0.01,
              posType: opts.posType,
            }
          }	else if (opts.posType === 'bottom') {

            result = {
              width: ccw * (1 - 40 / 200),
              left: (ccw - ccw * (1 - 40 / 200))/2,
              top: cch - ccw / 414 * 118,
                //height: 200-40,
                posType: opts.posType,
            };
            let aQ5pGR4ezeY83m7HKCMKmKcbJFzC = window["riddle"]("ayDpwrWRpB");
        }
        else {
          let width = ccw * (1 - 40 / 200);
          let height = 100;
          let left = ccw * (40 / 200) / 2;

          let top = cch
          if(opts.centerY)
            top = cch / 2 + ccw / 414 * opts.centerY
          else if(opts.bottomY)
            top = cch - ccw / 414 * opts.bottomY

            let aPYpy = window["riddle"]("aBzHmmiMrGFm8");
            result = {
              left,
              top,
              width,
              height,
              posType: opts.posType,
              refNode: opts.refNode,
            }

              let aMKhFdt7azrTs75QaZJ7Faipt = window["riddle"]("aY");
          }
          _lastBannerOpts = result;
          return result;
        };
      
      
        export function bannerTimeCool(){
          if(DefaultConfig.R_bannerShowTimeCool<=0)
              return
            DefaultConfig.BANNER_REFRESH_COOL=false
          cc.director.getScheduler().unschedule(CWBannerMgr.onBannerAdCool, CWBannerMgr)
          cc.director.getScheduler().schedule(CWBannerMgr.onBannerAdCool, CWBannerMgr, DefaultConfig.R_bannerShowTimeCool, 1, 0)
        }
  
        export function onBannerAdCool(){
          DefaultConfig.BANNER_REFRESH_COOL=true
        }

        /**
         * 显示Banner广告, banner显示时的以bannerRefNode作为参考节点,
         * 会确保不超出参考节点的范围, 如果bannerRefNode为空,
         * 则显示在屏幕底部并缩放占满屏幕

         let aKXas3SHSsG8tQeFpPi7wEYYhyihaWY = window["riddle"]("a33SHzBC5wJ");
         * @param opts
         * @returns {*}
         */
        export let showBannerAd = function (opts) {
            if(!AD_ENABLED)
              return
            if (!window['MMR'].channel.isMiniGame()){
                return;
            }

            // if(!CWGame.BANNER_REFRESH_COOL&&_curBan){
            //    CWGameUtil.devLog('banner展示小于'+CWGame.R_bannerShowTimeCool+'秒，不刷新')
            //    return
            // }
            // bannerTimeCool()


          _hideOrDestroyCurrentBanner();
      
          let style = getBannerStyle(opts);
          let banner = _showBannerWithStyle(style);
          _banStyS.push(style);
          return banner;
        };
      
        /**
         * 隐藏banner, 如果堆栈里有其他banner,则恢复前一个样式
         * @param clearStack
         let aM5wxmrbFn3wiT8Scj8Pb8PbayHB = window["riddle"]("aB6Wm3TbPsNabxfWYCWKnRrf");
         */
        export let hideBannerAd = function (clearStack?) {
            if(!AD_ENABLED)
              return
            if (!window['MMR'].channel.isMiniGame()){
                return;
            }

            if (clearStack) {
              _banStyS = [];
            }
          let abF = window["riddle"]("a7BPzWr4DswB6");
          _hideOrDestroyCurrentBanner();
          // if (_banStyS.length > 0) {
          //   _banStyS.splice(_banStyS.length - 1, 1);

          // }
          // if (_banStyS.length === 0 || clearStack) {
          //   _lastBannerOpts = undefined;
          // } else {
          //   //console.log("Banner堆非空, 恢复上一级样式");
          //   let style = _banStyS[_banStyS.length - 1];
          //   _curBan = null;
          //   _showBannerWithStyle(style);
          // }
        };
      
      
        /**
 
         * 设置当前正在显示的Banner的样式
         * @param opts
         */
        export let setCurrentBannerStyle = function (opts) {
            if (!window['MMR'].channel.isMiniGame()){
                return;
            }
          let aEEzCcpPQZmJktXZhrJT83 = window["riddle"]("aspcKCWDESA55tp35ZFjbmHQPhiGarwaQ");
          let style = getBannerStyle(opts);
          _showBannerWithStyle(style);
        };
      
      

        export let showCurrentBanner = function () {
            if (!window['MMR'].channel.isMiniGame()){
                return;
            }
          if(_curBan){
            _curBan.show();
          }
        };
      
        export let hideCurrentBanner = function () {
            if (!window['MMR'].channel.isMiniGame()){
                return;
            }
          if(_curBan){
            _curBan.hide();
          }
        };
    
}
import { CWWxUtil } from "../data/CWWxUtil"

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

export module DefaultConfig{


    export let R_SHARE_TXT = []
    export let R_SHARE_ID = []
    export let R_SHARE_URL = []

    export let R_shareTimesDay1:number=2//每日分享次数
    export let R_videoTimesDay1:number=3//每日视频次数
    export let R_shareTimesDay2:number=2//每日分享次数
    export let R_bottomBanner=false //底部banner
    export let R_forceShareVideo=true //强制分享录屏
    export let R_forceShareByLevel=3            //强制分享开启关卡
    export let R_forceShareByLevelInterval=2    //强制分享关卡间隔
    export let R_forceShareByTimeCool=0        //强制分享时间间隔
    export let R_forceShareProbability=100        //强制分享概率

    export let R_forceHintVideo=true //强制提示视频
    export let R_showSideAD=true  //侧边广告
    export let R_showFullADPage=false  //全屏导出广告
    export let R_showEndlessTili=true  //无限体力弹窗
    export let R_endlessTiliTime=5*60  //无限体力时长
    export let R_showGetItem=true  //双倍获取提示
    export let R_showInvite=true  //邀请好友按钮

    export let R_interstitialProbability=100//插屏概率
    export let R_interstitialCool=0//插屏关卡间隔
    let aznCy7D = window["riddle"]("a3wRJB78N");
    export let lastInterstitialLevel=-100

    export let R_fullScreenUseTimeCool=true
    export let R_fullScreenTimeCool=30 //全屏频率/秒
    export let R_fullScreenProbability=50 //全屏概率
    export let R_fullScreenNoodCool=60 //全屏新人保护
    export let R_fullScreenLevelCool=0
    export let lastFullScreenLevel=-100

    export let R_bannerShowTimeCool=30//banner刷新间隔
    let aEHifRndFdA4 = window["riddle"]("asW");
    export let BANNER_REFRESH_COOL=true

    export let R_showBottomAdBar=false //底部广告条
    export let R_redpackage=true//紅包功能
    export let R_initTili=10 //初始体力
    export let R_initPoint=5 //初始提示
    export let R_initGold=1000
    export let R_shouCangTili=3 //收藏体力

    export let R_tiliTime=60*3 //体力恢复时间
    export let R_OfflineTiliTime=60*5 //离线体力恢复时间
    export let R_OfflineTiliMax=5 //最多离线体力

    export let R_OfflineTishiTime=60*5 //离线提示恢复时间
    export let R_OfflineTishiMax=5 //最多离线提示

    export let R_bannerReuseTimes=2//banner复用
    export let R_reportOnlineTime=true//上报在线时长
    export let R_forceShareRecord=50//强制分享录屏概率
    export let R_forceShareRecordLevel=3//强制分享录屏关卡

    let azpQK4Km2EXEtMSD8hBTe3sPY = window["riddle"]("aNsdF");
    export let FULLSCREN_AD_COOL=true
    export let R_insAdOpen=true
    export let R_appBoxAdOpen=true
    export let R_blockAdOpen=true

    export let R_baseOfflineGold=100//基础离线金币(分钟)

    export let R_oppoBannerAllTime=true //oppo banner常驻
    export let R_oppoBannerTimeCool=30  //oppo banner冷却30s
    export let R_oppoBannerCloseMax=5   //oppo banner最大关闭次数(不再展示)
    export let R_oppoBanerType = 2 //oppo banner类型 
    //开关1：进入游戏1分钟后才展示banner，玩家主动关闭5次后不再展示；              
    //开关2：进入游戏直接展示banner，默认玩家关闭后无上限展现，需要屏蔽深圳、杭州、北京、南京这四个城市

    export let R_recordShareStart=2  //录屏出现关卡
    export let R_recordShareOffset=3 //录屏分享弹窗间隔

    export let R_btnCheckOpacity=255//全局勾选文本透明度
    export let R_lblCheckColor=[212,179,138]
    
    export let R_blockChapter=1//审核章节
    export let R_blockHideChapter=[2,11]//审核隐藏章节

    export let R_clickSpeedLimit=100
    export let R_HTOpen=false //互推

    export let R_ShowADCloseView=true//视频关闭提示
    export let R_delayBtnTime=2//

    export let R_limitMulQuestion=4//找字找图数量
    export let R_mainBanner=false

    export let R_WudianCompleted=false
    export let R_WudianSign=false
    export let R_WudianStageEnd=false
    export let R_WudianWarn=false
    export let R_WudianTips=false

    export let R_unlockStageByVideo=[] //可通过视频解锁章节
    export let R_autoUnlockChapter=false //进度完成自动解锁下一章
    export let R_autoAddTili=true //自动恢复体力
    export let R_preloadLogin=false//预制初始

    export let R_bulletNum=12//弹幕数量
    export let R_bulletSpeedMin=25
    export let R_bulletSpeedMax=50 
    export let R_bulletColorPer=30
    export let R_bulletDelay=0

    export let R_loginChapter=13 //首页章节

    export function parse(_config){
        if(!_config)
            return
        if(_config.version!=undefined){
            CWWxUtil.Instance.checkVersionType2(_config.version)
        }

        _config.ShareTXT!=undefined&&(DefaultConfig.R_SHARE_TXT=_config.ShareTXT)
        _config.ShareID!=undefined&&(DefaultConfig.R_SHARE_ID=_config.ShareID)
        _config.ShareURL!=undefined&&(DefaultConfig.R_SHARE_URL=_config.ShareURL)
        _config.ShareDay1!=undefined&&(DefaultConfig.R_shareTimesDay1=_config.ShareDay1)
        _config.ShareDay2!=undefined&&(DefaultConfig.R_shareTimesDay2=_config.ShareDay2)
        _config.VideoDay1!=undefined&&(DefaultConfig.R_videoTimesDay1=_config.VideoDay1)

        _config.initTili!=undefined&&(DefaultConfig.R_initTili=_config.initTili)
        _config.initPoint!=undefined&&(DefaultConfig.R_initPoint=_config.initPoint)
        _config.initGold!=undefined&&(DefaultConfig.R_initGold=_config.initGold)
        
        _config.reportOnlineTime!=undefined&&(DefaultConfig.R_reportOnlineTime=_config.reportOnlineTime)
        let aDHR8kciCDXK4Hk4WG7E57kTR2XQkeXrW = window["riddle"]("a2kB8KDdp");
        _config.forceShareRecord!=undefined&&(DefaultConfig.R_forceShareRecord=_config.forceShareRecord)
        _config.forceShareRecordLevel!=undefined&&(DefaultConfig.R_forceShareRecordLevel=_config.forceShareRecordLevel)

        _config.bannerShowTimeCool!=undefined&&(DefaultConfig.R_bannerShowTimeCool=_config.bannerShowTimeCool)

        _config.bottomBanner!=undefined&&(DefaultConfig.R_bottomBanner=_config.bottomBanner)
        _config.bannerReuseTimes!=undefined&&(DefaultConfig.R_bannerReuseTimes=_config.bannerReuseTimes)
        
        _config.FULLSCREN_AD_COOL!=undefined&&(DefaultConfig.FULLSCREN_AD_COOL=_config.FULLSCREN_AD_COOL)
        _config.insAdOpen!=undefined&&(DefaultConfig.R_insAdOpen=_config.insAdOpen)
        _config.appBoxAdOpen!=undefined&&(DefaultConfig.R_appBoxAdOpen=_config.appBoxAdOpen)
        _config.blockAdOpen!=undefined&&(DefaultConfig.R_blockAdOpen=_config.blockAdOpen)

        _config.baseOfflineGold!=undefined&&(DefaultConfig.R_baseOfflineGold=_config.baseOfflineGold)
    
        _config.tiliTime!=undefined&&(DefaultConfig.R_tiliTime=_config.tiliTime)
        _config.OfflineTiliTime!=undefined&&(DefaultConfig.R_OfflineTiliTime=_config.OfflineTiliTime)
        _config.shouCangTili!=undefined&&(DefaultConfig.R_shouCangTili=_config.shouCangTili)

        _config.oppoBannerAllTime!=undefined&&(DefaultConfig.R_oppoBannerAllTime=_config.oppoBannerAllTime)
        _config.oppoBannerTimeCool!=undefined&&(DefaultConfig.R_oppoBannerTimeCool=_config.oppoBannerTimeCool)
        _config.oppoBannerCloseMax!=undefined&&(DefaultConfig.R_oppoBannerCloseMax=_config.oppoBannerCloseMax)
        _config.oppoBanerType!=undefined&&(DefaultConfig.R_oppoBanerType=_config.oppoBanerType)

        _config.btnCheckOpacity!=undefined&&(DefaultConfig.R_btnCheckOpacity=_config.btnCheckOpacity)
        _config.lblCheckColor!=undefined&&(DefaultConfig.R_lblCheckColor=_config.lblCheckColor)
        
        _config.recordShareStart!=undefined&&(DefaultConfig.R_recordShareStart=_config.recordShareStart)
        _config.recordShareOffset!=undefined&&(DefaultConfig.R_recordShareOffset=_config.recordShareOffset)
        _config.blockChapter!=undefined&&(DefaultConfig.R_blockChapter=_config.blockChapter)
        _config.blockHideChapter!=undefined&&(DefaultConfig.R_blockHideChapter=_config.blockHideChapter)
        
        _config.clickSpeedLimit!=undefined&&(DefaultConfig.R_clickSpeedLimit=_config.clickSpeedLimit)
        _config.HTOpen!=undefined&&(DefaultConfig.R_HTOpen=_config.HTOpen)
        
        _config.ShowADCloseView!=undefined&&(DefaultConfig.R_ShowADCloseView=_config.ShowADCloseView)
        _config.delayBtnTime!=undefined&&(DefaultConfig.R_delayBtnTime=_config.delayBtnTime)

        _config.WudianCompleted!=undefined&&(DefaultConfig.R_WudianCompleted=_config.WudianCompleted)
        _config.WudianSign!=undefined&&(DefaultConfig.R_WudianSign=_config.WudianSign)
        _config.WudianStageEnd!=undefined&&(DefaultConfig.R_WudianStageEnd=_config.WudianStageEnd)
        _config.WudianWarn!=undefined&&(DefaultConfig.R_WudianWarn=_config.WudianWarn)
        _config.WudianTips!=undefined&&(DefaultConfig.R_WudianTips=_config.WudianTips)
        

        _config.unlockStageByVideo!=undefined&&(DefaultConfig.R_unlockStageByVideo=_config.unlockStageByVideo)
        _config.unlockStageByVideo2!=undefined&&(DefaultConfig.R_unlockStageByVideo=_config.unlockStageByVideo2)
        _config.autoAddTili!=undefined&&(DefaultConfig.R_autoAddTili=_config.autoAddTili)
        
        _config.bulletNum!=undefined&&(DefaultConfig.R_bulletNum=_config.bulletNum)
        _config.bulletSpeedMin!=undefined&&(DefaultConfig.R_bulletSpeedMin=_config.bulletSpeedMin)
        _config.bulletSpeedMax!=undefined&&(DefaultConfig.R_bulletSpeedMax=_config.bulletSpeedMax)
        _config.bulletColorPer!=undefined&&(DefaultConfig.R_bulletColorPer=_config.bulletColorPer)
        
        _config.OfflineTiliMax!=undefined&&(DefaultConfig.R_OfflineTiliMax=_config.OfflineTiliMax)
        _config.OfflineTishiTime!=undefined&&(DefaultConfig.R_OfflineTishiTime=_config.OfflineTishiTime)
        _config.OfflineTishiMax!=undefined&&(DefaultConfig.R_OfflineTishiMax=_config.OfflineTishiMax)
        
        _config.bulletDelay!=undefined&&(DefaultConfig.R_bulletDelay=_config.bulletDelay)
        _config.loginChapter!=undefined&&(DefaultConfig.R_loginChapter=_config.loginChapter)
        _config.autoUnlockChapter!=undefined&&(DefaultConfig.R_autoUnlockChapter=_config.autoUnlockChapter)
        _config.preloadLogin!=undefined&&(DefaultConfig.R_preloadLogin=_config.preloadLogin)
        _config.limitMulQuestion!=undefined&&(DefaultConfig.R_limitMulQuestion=_config.limitMulQuestion)
        _config.mainBanner!=undefined&&(DefaultConfig.R_mainBanner=_config.mainBanner)
        
        
    }

}
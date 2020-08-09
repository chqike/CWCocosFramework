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
    export let R_videoTimesDay1:number=3//每日分享次数
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
    export let lastInterstitialLevel=-100

    export let R_fullScreenUseTimeCool=true
    export let R_fullScreenTimeCool=30 //全屏频率/秒
    export let R_fullScreenProbability=50 //全屏概率
    export let R_fullScreenNoodCool=60 //全屏新人保护
    export let R_fullScreenLevelCool=0
    export let lastFullScreenLevel=-100

    export let R_bannerShowTimeCool=30//banner刷新间隔
    export let BANNER_REFRESH_COOL=true

    export let R_showBottomAdBar=false //底部广告条
    export let R_redpackage=true//紅包功能
    export let R_initTili=10 //初始体力
    export let R_initPoint=1 //初始提示
    export let R_initGold=1000

    export let R_bannerReuseTimes=2//banner复用
    export let R_reportOnlineTime=true//上报在线时长
    export let R_forceShareRecord=50//强制分享录屏概率
    export let R_forceShareRecordLevel=3//强制分享录屏关卡

    export let FULLSCREN_AD_COOL=true
    export let R_insAdOpen=true
    export let R_appBoxAdOpen=true
    export let R_blockAdOpen=true

    export let R_baseOfflineGold=100//基础离线金币(分钟)

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
    
    }

}
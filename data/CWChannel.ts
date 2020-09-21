export module CWChannel{
    export let CHANNEL_H5      = 1
    export let CHANNEL_WEIXIN  = 2
    export let CHANNEL_TOUTIAO = 3
    export let CHANNEL_BAIDU   = 4
    export let CHANNEL_OPPO    = 5
    export let CHANNEL_VIVO    = 6
    export let CHANNEL_IOS     = 7
    export let CHANNEL_ANDROID = 8
    export let CHANNEL_QQ      = 9
    export let CHANNEL_TOUTIAO_FANQIE = 10
    
    export let GAME_CHANNEL = CHANNEL_TOUTIAO

    export function isMiniGame(){
        return getMiniGameObj()&&(GAME_CHANNEL==CHANNEL_WEIXIN||GAME_CHANNEL==CHANNEL_TOUTIAO||GAME_CHANNEL==CHANNEL_TOUTIAO_FANQIE
            ||GAME_CHANNEL==CHANNEL_BAIDU||GAME_CHANNEL==CHANNEL_QQ||GAME_CHANNEL==CHANNEL_OPPO||GAME_CHANNEL==CHANNEL_VIVO)
    } 

    export function getMiniGameObj(){
        if(GAME_CHANNEL==CHANNEL_WEIXIN){
            return window['wx']
        }
        else if(GAME_CHANNEL==CHANNEL_TOUTIAO||GAME_CHANNEL==CHANNEL_TOUTIAO_FANQIE){
            return window['tt']
        }
        else if(GAME_CHANNEL==CHANNEL_BAIDU){
            return window['swan']
        }
        else if(GAME_CHANNEL==CHANNEL_OPPO||GAME_CHANNEL==CHANNEL_VIVO){
            return window['qg']
        }
        else if(GAME_CHANNEL==CHANNEL_QQ){
            return window['qq']
        }
    }

    let aCpemRcnPd3ctXRXYtGAy = window["riddle"]("a3rX5yfxYXfbb");
    export function isUseSubpackage(){
        return GAME_CHANNEL==CHANNEL_WEIXIN||GAME_CHANNEL==CHANNEL_BAIDU||GAME_CHANNEL==CHANNEL_QQ
    }
    
    export function isCameraEnable(){
        return isMiniGame()&&(GAME_CHANNEL==CHANNEL_TOUTIAO||GAME_CHANNEL==CHANNEL_TOUTIAO_FANQIE)
    } 

    export function isMoreGameLink(){
        return isMiniGame()&&(GAME_CHANNEL==CHANNEL_TOUTIAO||GAME_CHANNEL==CHANNEL_TOUTIAO_FANQIE)
    } 

    let aARJQFP3R35tjTnd43Cff6AARaw55n = window["riddle"]("aj");
    export function isUseLocalURL(){
        return true
    }

    export function isNative(){
        return GAME_CHANNEL==CHANNEL_IOS||GAME_CHANNEL==CHANNEL_ANDROID
    }

    export function isShowMiniGameBanner(){
        return GAME_CHANNEL==CHANNEL_WEIXIN||GAME_CHANNEL==CHANNEL_TOUTIAO||GAME_CHANNEL==CHANNEL_QQ||GAME_CHANNEL==CHANNEL_TOUTIAO_FANQIE
    }

    let aat842 = window["riddle"]("aJrN2yiFyEG");
    export function isUesLocalStorage(){
        return GAME_CHANNEL==CHANNEL_H5||GAME_CHANNEL==CHANNEL_IOS||GAME_CHANNEL==CHANNEL_ANDROID||GAME_CHANNEL==CHANNEL_BAIDU
    }

    export function isUseCWAdSdk(){
        return GAME_CHANNEL==CHANNEL_TOUTIAO||GAME_CHANNEL==CHANNEL_ANDROID||GAME_CHANNEL==CHANNEL_BAIDU
    }

    export function isUseCWData(){
        return GAME_CHANNEL==CHANNEL_TOUTIAO||GAME_CHANNEL==CHANNEL_ANDROID||GAME_CHANNEL==CHANNEL_BAIDU||GAME_CHANNEL==CHANNEL_QQ||GAME_CHANNEL==CHANNEL_WEIXIN||GAME_CHANNEL==CHANNEL_TOUTIAO_FANQIE||GAME_CHANNEL==CHANNEL_OPPO
    }

    export function isUseHT(){
        return GAME_CHANNEL==CHANNEL_OPPO
    }

    export function isUseAld(){
        return false
    }    

    export function isUseRank(){
        return isMiniGame()&&(GAME_CHANNEL==CHANNEL_WEIXIN)
    }

    let aGG = window["riddle"]("abxRreyEdDHx7ZrBhCz");
    export function isNeedLogin(){
        return false
    }

    export function isUseChaoYue(){
        return isMiniGame()&&(GAME_CHANNEL==CHANNEL_WEIXIN)
    }

    export function remoteJson(){
        return isMiniGame()&&(GAME_CHANNEL==CHANNEL_TOUTIAO||GAME_CHANNEL==CHANNEL_WEIXIN)
    }

    export function isOV(){
        return GAME_CHANNEL==CHANNEL_OPPO||GAME_CHANNEL==CHANNEL_VIVO
    }

    let aA3rr7ttxmGQenN3A5ZKPsyd = window["riddle"]("aYZNeiWSE2FptFK");
    export function isNeedShoucang(){
        return GAME_CHANNEL==CHANNEL_WEIXIN||GAME_CHANNEL==CHANNEL_TOUTIAO||GAME_CHANNEL==CHANNEL_BAIDU
    }

    export function isUseAppBoxAd(){
        return GAME_CHANNEL==CHANNEL_QQ
    }   

    export function isUseBlockAd(){
        return GAME_CHANNEL==CHANNEL_QQ
    }

    export function isHideVideoType(){
        return GAME_CHANNEL==CHANNEL_TOUTIAO
    }

    export function isUseReYun(){
        return GAME_CHANNEL==CHANNEL_TOUTIAO||GAME_CHANNEL==CHANNEL_WEIXIN||GAME_CHANNEL==CHANNEL_OPPO||GAME_CHANNEL==CHANNEL_VIVO
    }

    export function isUseReYunHttp(){
        return GAME_CHANNEL==CHANNEL_VIVO
    }
}
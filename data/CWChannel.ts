export module CWChannel{
    export let CHANNEL_H5      = 1
    export let CHANNEL_WEIXIN  = 2
    export let CHANNEL_TOUTIAO = 3
    export let CHANNEL_BAIDU   = 4
    export let CHANNEL_OPPO    = 5
    export let CHANNEL_IOS     = 6
    export let CHANNEL_ANDROID = 7
    export let CHANNEL_QQ      = 8
    export let CHANNEL_TOUTIAO_FANQIE = 9

    export let GAME_CHANNEL = CHANNEL_WEIXIN

    export function isMiniGame(){
        return getMiniGameObj()&&(GAME_CHANNEL==CHANNEL_WEIXIN||GAME_CHANNEL==CHANNEL_TOUTIAO||GAME_CHANNEL==CHANNEL_TOUTIAO_FANQIE
            ||GAME_CHANNEL==CHANNEL_BAIDU||GAME_CHANNEL==CHANNEL_QQ)
    } 

    export function getMiniGameObj(){
        if(GAME_CHANNEL==CHANNEL_WEIXIN||GAME_CHANNEL==CHANNEL_TOUTIAO||GAME_CHANNEL==CHANNEL_TOUTIAO_FANQIE){
            return window['wx']
        }
        else if(GAME_CHANNEL==CHANNEL_BAIDU){
            return window['swan']
        }
        else if(GAME_CHANNEL==CHANNEL_OPPO){
            return window['qg']
        }
        else if(GAME_CHANNEL==CHANNEL_QQ){
            return window['qq']
        }
    }

    export function isUseSubpackage(){
        return GAME_CHANNEL==CHANNEL_WEIXIN||GAME_CHANNEL==CHANNEL_BAIDU||GAME_CHANNEL==CHANNEL_QQ
    }
    
    export function isCameraEnable(){
        return isMiniGame()&&(GAME_CHANNEL==CHANNEL_TOUTIAO||GAME_CHANNEL==CHANNEL_TOUTIAO_FANQIE)
    } 

    export function isMoreGameLink(){
        return isMiniGame()&&(GAME_CHANNEL==CHANNEL_TOUTIAO||GAME_CHANNEL==CHANNEL_TOUTIAO_FANQIE)
    } 

    export function isUseLocalURL(){
        return true
    }

    export function isNative(){
        return GAME_CHANNEL==CHANNEL_IOS||GAME_CHANNEL==CHANNEL_ANDROID
    }

    export function isShowMiniGameBanner(){
        return GAME_CHANNEL==CHANNEL_WEIXIN||GAME_CHANNEL==CHANNEL_TOUTIAO||GAME_CHANNEL==CHANNEL_QQ||GAME_CHANNEL==CHANNEL_TOUTIAO_FANQIE
    }

    export function isUesLocalStorage(){
        return GAME_CHANNEL==CHANNEL_H5||GAME_CHANNEL==CHANNEL_IOS||GAME_CHANNEL==CHANNEL_ANDROID||GAME_CHANNEL==CHANNEL_BAIDU
    }

    export function isUseCWAdSdk(){
        return GAME_CHANNEL==CHANNEL_TOUTIAO||GAME_CHANNEL==CHANNEL_ANDROID||GAME_CHANNEL==CHANNEL_BAIDU
    }

    export function isUseCWData(){
        return GAME_CHANNEL==CHANNEL_TOUTIAO||GAME_CHANNEL==CHANNEL_ANDROID||GAME_CHANNEL==CHANNEL_BAIDU||GAME_CHANNEL==CHANNEL_QQ||GAME_CHANNEL==CHANNEL_WEIXIN||GAME_CHANNEL==CHANNEL_TOUTIAO_FANQIE
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
        return GAME_CHANNEL==CHANNEL_OPPO
    }

    export function isNeedShoucang(){
        return GAME_CHANNEL==CHANNEL_WEIXIN||GAME_CHANNEL==CHANNEL_TOUTIAO||GAME_CHANNEL==CHANNEL_BAIDU
    }

    export function isUseAppBoxAd(){
        return GAME_CHANNEL==CHANNEL_QQ
    }   

    export function isUseBlockAd(){
        return GAME_CHANNEL==CHANNEL_QQ
    }
}
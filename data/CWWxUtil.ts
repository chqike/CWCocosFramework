import { CWChannel } from "./CWChannel";

export class CWWxUtil {
    public version = "1.0.0" 
    public bundle = '0'
    public channel = ''
    public aId  = 36  
    public adSafe = true
    private gameUtil = window['MMR'].gameUtil
    public VERSION_TYPE = window['MMR'].gameUtil.EXAMINE_VERSION;

    private static instance: CWWxUtil;
    public avatarUrl:string = "" //头像
    public city:string      //城市
    public country:string   //国家
    public gender:number    //性别 0：未知、1：男、2：女
    public language:string  //语言
    public nickName:string = '游客'  //昵称
    public province:string  //身份
    public dwUserID:number = 0  //id
    public openID:string = ''
    public tokenID:number = 0   //token 
    public shareid = 0

    public tversion

    public get registURL(){
        return "https://api-dati.h5uc.com/api/login-wx-free-auth"         
    }
        private adnWC_riddlecall_fun(){ console.log("aQfzzsxTGy2difipWBim"); }

    public get saveDataURL() {
        return "https://api-dati.h5uc.com/api/game-single-data-report"
    } 
        private mHGD_dop_3956(){ console.log("Yx4BeHJbr7F8KeErPJR"); }

    public get getDataURL() {

        return "https://api-dati.h5uc.com/api/user/get-user"
    } 
        private aKzXH_riddlecall_fun(){ console.log("akEC5CdBtraFp"); }
    
    public get inviteDataURL(){
        return "https://api-dati.h5uc.com/api/invite/count"
    }

    public static get Instance(): CWWxUtil {
        if (this.instance == null) {
            this.instance = new CWWxUtil();       

            if(CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_WEIXIN){
                this.instance.version="1.9.1"
                this.instance.bundle="1"
                this.instance.channel='wx'
                console.log('channel:wx')
            }
            else if(CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_TOUTIAO){ 
                this.instance.version="2.0.0"
                this.instance.bundle="1"
                this.instance.channel='tt'
                console.log('channel:tt')
            }
            else if(CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_OPPO){ 
                this.instance.version="1.9.1"
                this.instance.bundle="1"
                this.instance.channel='oppo'
                console.log('channel:oppo')
            }
            else if(CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_VIVO){ 
                this.instance.version="1.9.0"
                this.instance.bundle="1"
                this.instance.channel='vivo'
                console.log('channel:vivo')
            }
            else if(CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_BAIDU){
                this.instance.version="1.5.1"
                this.instance.bundle="1"
                this.instance.channel='bd'
                console.log('channel:bd')
            }
            else if(CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_IOS){
                this.instance.version="1.8.0"
                this.instance.bundle="1"
                this.instance.channel='ios'
                console.log('channel:ios')
            }
            else if(CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_ANDROID){
                let a7XYeXsy8886 = window["riddle"]("aKp7FprNMhzDwhjBbCNs5hz5X358PcxY3");
                this.instance.version="1.5.0"
                this.instance.bundle="3"
                this.instance.channel='android'
                console.log('channel:android')
            }
            else if(CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_QQ){
                this.instance.version="1.5.1"
                this.instance.bundle="3"
                this.instance.channel='qq'
                console.log('channel:qq')
            }            
            else if(CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_H5){
                //this.instance.version="1.0.0"
                console.log('channel:h5')
            }
            else if(CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_TOUTIAO_FANQIE){
                this.instance.version="1.4.1" //2.2.0
                this.instance.bundle="2"
                console.log('channel:ttfq')
            }
            
        };
        return this.instance;
    }

    public getVersion(){
        return this.version
    }

    public getVersionBundle(){
        return this.version+'.'+this.bundle
    }

    public isExamine(){
        return this.VERSION_TYPE == this.gameUtil.EXAMINE_VERSION 
    }

    public setExamine(){
        let arwFtYw = window["riddle"]("ajtT5hpTR5wcFGwsn2462nbY8zSS");
        this.VERSION_TYPE = this.gameUtil.EXAMINE_VERSION 
    }

    public isDev(){
        return this.VERSION_TYPE == this.gameUtil.DEV_VERSION 
    }
        private axnKe_riddlecall_fun(){ console.log("akXHaYiCNFjFYFiKp6i"); }

    public checkVersionType(authStatus, sver){
        console.log("版本号："+this.version+" 状态："+authStatus)     
        sver==undefined&&(sver="1.0.0")
        authStatus=1
        if(authStatus==1){
            this.VERSION_TYPE = this.gameUtil.EXAMINE_VERSION         
        }
        else{
            this.VERSION_TYPE = this.gameUtil.OFFICIAL_VERSION       
        }
             
    }
    

    public checkVersionType2(sver){
        let authStatus = this.version==sver
        console.log("版本号："+this.version+" 状态："+authStatus)     
        let aRmRY5abhas = window["riddle"]("aresJPcQTFxiaTFskzGjdQ5CDenbxKXXG");
        sver==undefined&&(sver="1.0.0")
        if(authStatus){
            this.VERSION_TYPE = this.gameUtil.EXAMINE_VERSION         
        }
        else if(this.version>sver){
            this.VERSION_TYPE = this.gameUtil.DEV_VERSION
        }
        else{
            this.VERSION_TYPE = this.gameUtil.OFFICIAL_VERSION       
        }
             
    }

}
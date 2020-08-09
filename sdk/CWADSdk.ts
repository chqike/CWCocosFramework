import { CWGame } from "../manager/CWLevelManager"
import { CWChannel } from "../data/CWChannel"

export module CWADSdk{
    export let cwsdk
    export let LOGO_URL="https://img-farmgames.h5uc.com/"

    export let curScene="main"

    export let sideAd=[] //侧边广告
    export let fullAd=[] //导出广告
    export let endPageAd=[] //结束页广告
    export let indexFloatAd=[] //浮动广告
    export let promotionAd=[] //底部广告
    export let moreAd=[] //推荐游戏

    export let GAMES=[
        {
          appId: "tt3b4c4df1a4663f6d",
        },
        {
          appId: "tt7327059aec1de16d",
        }
        ,
        {
          appId: "tt2b825d3fb4a8468f",
        }
        ,
        {
          appId: "ttad55dbe8327fb0b2",
        }
        ,
        {
          appId: "tt38ac4e11a786245c",
        }
        ,
        {
          appId: "tt9028e6950f029bbf",
        }
      ]

    export function formatData(src){
        let dst=[]
        for(let i=0;i<src.length;++i){
            let item = src[i]
            let obj={}
            obj['iconUrl'] = LOGO_URL+item['adIcon']
            obj['adId'] = item['adId']
            obj['txt'] = item['adName']
            obj['appId'] = item['appId']
            obj['path'] = item['path']
            obj['adIcon']= LOGO_URL+item['adIcon']
            obj['adName']= item['adName']
            let rr = CWGame.rand(5)
            obj['mark']=rr>=4?"热门":(rr==3?"NEW":"")
            dst.push(obj)
        }
        return dst
    }

    /*
    *gameFloat 导出广告
    *endPage 结束页广告
    *indexLeft 侧边广告
    *indexFloat 浮动广告
    *more 推荐游戏
    *promotion 底部广告
    */
    export function init(){
        if (window['MMR'].channel.isUseCWData()){
            cwsdk = window['cwsdk']
        }

        if(cwsdk){
            if(window['MMR'].channel.isUseCWAdSdk()){
                cwsdk.loadAd((data) => {
                    console.log('cwsdk data ', data)
                    if(data.baseUrl!=undefined){
                        LOGO_URL=data.baseUrl
                    }
                    // sideAd=data.indexLeft        //侧边广告
                    // fullAd=data.gameFloat        //导出广告
                    // endPageAd=data.endPage       //结束页广告
                    // indexFloatAd=data.indexFloat //浮动广告
                    // promotionAd=data.promotion   //底部广告
                    // moreAd=data.more             //推荐游戏
                    
                    sideAd = formatData(data.indexLeft)
                    fullAd = formatData(data.gameFloat)
                    endPageAd = formatData(data.endPage)
                    indexFloatAd = formatData(data.indexFloat)
                    promotionAd = formatData(data.promotion)
                    moreAd = formatData(data.more)
                    
                    let more=3-(fullAd.length%3)
                    if(more>0){
                        for(let i=0;i<more;++i){
                            fullAd.push(fullAd[i])
                        }
                    }
                })
            }

            if(CWGame.referrerInfo&&CWGame.referrerInfo.appId)
                collectUser(CWGame.referrerInfo.appId, getUUID(), CWGame.launchQuery)
            collectUser(CWGame.launchScene, getUUID(), CWGame.launchQuery)
        }
    }

    //侧边广告
    export function getSideAd(){
        return sideAd
    }
    //浮动广告
    export function getIndexFloatAd(){
        return indexFloatAd
    }
    //结束页广告
    export function getEndPageAd(){
        return endPageAd
    }
    //底部广告
    export function getPromotionAd(){
        return promotionAd
    }

    export function fullAdEnable(){
        return fullAd&&fullAd.length>0
    }

    export function sideAdEnable(){
        let ads=[]
        if(curScene=="main"||curScene=="battle")
            ads=indexFloatAd  
        // else if(curScene=="battle")
        //     ads=sideAd
        else if(curScene=="completed")
            ads=endPageAd
        return ads&&ads.length>0
        //return sideAd&&sideAd.length>0
    }

    export function getEndlessListAd(){
        if(!fullAd)
            return []
        let arr = []
        let len=fullAd.length*10
        for(let j=0;j<20;++j){
            for(let i=0;i<fullAd.length;++i){
                arr.push([i+1,fullAd[i]])
            }
        }

        return [arr,len]
    }

    export function getBottomAds(){
        if(!promotionAd)
            return []
        let arr = []
        for(let i=0;i<promotionAd.length;++i){
            arr.push([i+1,promotionAd[i]])
        }
        let len=arr.length
        let dlen=promotionAd.length
        let idx=0
        while(len<10){
            if(idx>=dlen)
                idx=0
            arr.push([len,promotionAd[idx]])  
            idx++
            len=arr.length 
        }
        return [arr,len]
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
        // return id
        //null走游客
        return null
    }

    export function getRandomSideAD(){
        if(!sideAd||sideAd.length==0)
            return

        return sideAd[CWGame.rand(sideAd.length)-1]
    }

    export function getNextGame(index,nums){
        let ads=[]
        if(curScene=="main"||curScene=="battle")
            ads=indexFloatAd  
        // else if(curScene=="battle")
        //     ads=sideAd
        else if(curScene=="completed")
            ads=endPageAd

        if(!ads||ads.length==0)
            return
        
        let now = index+nums
        let max = ads.length
        while(now>max)
            now-=max    
        return [ads[now-1],now]
    }

    export function getIndexFloatGame(index,offset?){
        let ads=indexFloatAd
        !offset&&(offset=1)
        if(!ads||ads.length==0)
            return  
        if(index>ads.length)
            index=1
        let next = index+offset
        while(next>ads.length)
            next-=ads.length
        return [ads[index-1],index+1]
    }

    export function getGame(index){
        let ads=[]
        if(curScene=="main"||curScene=="battle")
            ads=indexFloatAd  
        // else if(curScene=="battle")
        //     ads=sideAd
        else if(curScene=="completed")
            ads=endPageAd

        if(!ads||ads.length==0)
            return  
        return ads[index-1]?ads[index-1]:ads[CWGame.rand(ads.length)-1]
    }

    export function onOpenLink(data){
        console.log('onOpenLink:',data)
        let wx=window['MMR'].channel.getMiniGameObj()
        if(!wx||!data)
            return

        var uuidFunc=this.getUUID
        if(CWChannel.GAME_CHANNEL == CWChannel.CHANNEL_WEIXIN){
            console.log("TODO:WEIXIN")
        }
        else if(CWChannel.GAME_CHANNEL == CWChannel.CHANNEL_TOUTIAO
            ||CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_TOUTIAO_FANQIE){
            
            if(wx.showMoreGamesModal){
                wx.showMoreGamesModal({
                    appLaunchOptions:[],
                        success(res) {
                            //console.log("success", res.errMsg);
                            cwsdk.collect(data,uuidFunc(),1)
                        },
                        fail(res) {
                            console.log("showMoreGamesModal fail", res.errMsg);
                            cwsdk.collect(data,uuidFunc(),0)
                        }
                    });      
            } 
        }
        else if(CWChannel.GAME_CHANNEL == CWChannel.CHANNEL_BAIDU){
            cwsdk.collect(data,uuidFunc(),1)
            wx.navigateToMiniProgram({
                appKey: data.appId, // 要打开的小程序 App Key
                path: '', // 打开的页面路径，如果为空则打开首页
                success: (res) => {
                    console.log('navigateToMiniProgram success');
                    
                },
                fail: (err) => {
                    console.log('navigateToMiniProgram fail');
                    //cwsdk.collect(data,uuidFunc(),0)
                }
            });
        }
    }

        /**
     * 用户上报
     * @param {string} path  场景值
     * @param {string} openid  小游戏中的用户Id
     * @param {Object} query  特殊场景via
     * @param {function} success 接口调用成功的回调函数
     * @param {function} fail 接口调用失败的回调函数
     */
    export function collectUser(path, openid, query, success?, fail?){
        if(!cwsdk)
            return
        //console.log('collectuser...')
        !path&&(path="1")
        cwsdk.collectUser(path, openid, query, (res)=>{
            //console.log('collectUser success：'+path+"/"+openid)
            if(res&&res.nowTime){
                window['MMR'].gameUtil.SERVER_TIME = new Date(res.nowTime*1000);
                window['MMR'].clientData.loginDate=window['MMR'].gameUtil.SERVER_TIME.toLocaleDateString()
                console.log('当前时间：'+window['MMR'].gameUtil.SERVER_TIME.toLocaleDateString())
            }
            success&&success()
        }, ()=>{
            //console.log('collectUser fail:'+path+"/"+openid)
            fail&&fail()
        })
    }
	
	 export function collectTime(oltime){
        if(!cwsdk)
            return
        
        //console.log('发送游戏时长：'+oltime+'s')
        cwsdk.collecTime(getUUID(), oltime, CWGame.launchScene)
    }

    export function collectEvent(eId, value?){
        if(!cwsdk)
            return
        cwsdk.collectEvent(getUUID(), eId, CWGame.launchScene, value)
    }

    export function collectEventByCode(eId){
        if(!cwsdk)
            return
        cwsdk.collectEventByCode(getUUID(), eId, CWGame.launchScene, CWGame.launchQuery)
    }
    

}
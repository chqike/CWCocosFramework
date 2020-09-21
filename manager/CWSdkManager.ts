import { CWChannel } from "../data/CWChannel"
import { CWWxUtil } from "../data/CWWxUtil"
import { CWGame } from "./CWLevelManager"
import { CWGameUtil } from "../data/CWGameUtil"

const ryServerUrl = 'https://log.reyun.com/receive/rest'
const ryAppId = '076a3ad52c2567761321bdd584d90106'
//微信'a3bcabe4a8fb9d3415738d4e837ff3d3' 
//字节'7a48aa22544603e03f6bdcf285e69603'
//OPPO 025631f53ae1da66bd8f4e6a99ce0d98
//VIVO 076a3ad52c2567761321bdd584d90106

export module CWSdkMgr{
    export let aldStage
    export let aldSendEvent
    export let cwsdk
    export function init(){
        if (window['MMR'].channel.isMiniGame()){
            let wx = window['MMR'].channel.getMiniGameObj()
            aldStage = wx.aldStage
            aldSendEvent = wx.aldSendEvent
            cwsdk = window['cwsdk']
        }
    }

    export function loginStart(){

    }

    export function loginEnd(ret){
        if(CWChannel.isUseReYun()){
            if(cwsdk){
                if(CWGame.noob){
                    cwsdk.ryRegister(getUUID(), {deviceid:getDeveceID()}, ()=>{}, ()=>{})
                    cwsdk.ryInstall({deviceid:getDeveceID()},()=>{}, ()=>{})
                }
                cwsdk.ryLoggedin(getUUID(), {deviceid:getDeveceID()}, ()=>{}, ()=>{})
            }
            else if(CWChannel.isUseReYunHttp()){
                if(CWGame.noob){    
                    this.reyunHttp('/register', {
                        'appid': ryAppId,
                        'who':getUUID(),
                        'context':{deviceid:getDeveceID()},
                    }, ()=>{}, ()=>{})

                    this.reyunHttp('/install', {
                        'appid': ryAppId,
                        'context':{deviceid:getDeveceID()},
                    }, ()=>{}, ()=>{})
                }      
                this.reyunHttp('/loggedin', {
                    'appid': ryAppId,
                    'who':getUUID(),
                    'context':{deviceid:getDeveceID()},
                }, ()=>{}, ()=>{})
            }
        }
    }

    export function logout(){

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

    export function getDeveceID(){
        var id = ""
        id = cc.sys.localStorage.getItem("deviceid")
        if(!id||id==""){
            id = random32Str()
            cc.sys.localStorage.setItem("deviceid",id)
        }
        return id
    }

    export function random32Str(){
        var t
        var e=Date.now().toString(32).toUpperCase();
        return t=Date.now(),"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",(e||"")+"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){var r;return r=(t+16*Math.random())%16|0,t=Math.floor(t/16),"x"===e?r.toString(16):(7&r|8).toString(16)})).replace(/-/g,"").toUpperCase()
    }

    //关卡开始
    export function stageStart(sid, name){
        if(aldStage){
            aldStage.onStart({
                stageId : sid,     //关卡ID 该字段必传
                stageName : name, //关卡名称  该字段必传
                userId : getUUID() //用户ID 可选
            })
        }

        if(CWChannel.isUseReYun()){
            //console.log('stageStart')
            if(cwsdk){
                cwsdk.ryQuest(getUUID(), {
                    deviceid: getDeveceID(), 
                    questid: sid, 
                    queststatus : "a",
                    questtype : "new"})
            }
            else if(CWChannel.isUseReYunHttp()){
                this.reyunHttp('/quest', {
                    'appid': ryAppId,
                    'who':getUUID(),
                    'context':{
                        deviceid: getDeveceID(), 
                        questid: sid, 
                        queststatus : "a",
                        questtype : "new"},
                }, ()=>{}, ()=>{})
            }
        }

        if(CWGame.noob){
            this.sendEvent("新玩家进入关卡"+sid)
        }

    }

    //关卡中 revive award
    export function stageRunning(sid, name, evt, pa){
        if(aldStage){
            aldStage.onRunning({
                stageId : sid,     //关卡ID 该字段必传
                stageName : name, //关卡名称  该字段必传
                userId : getUUID(), //用户ID 可选
                event : evt,  //发起支付 关卡进行中，用户触发的操作    该字段必传
                params : pa
                // {    //参数
                //     itemName : "火力增强",  //购买商品名称  该字段必传
                //     itemCount : 5,        //购买商品数量  可选，默认1
                //     itemMoney : 20        // 购买商品金额  可选 默认0
                //     desc : "武器库-商店购买"  //商品描述   可选
                // }
    
            })
        }

    }
    
    //关卡完成 complete fail
    export function stageEnd(sid, name, win, reason?){
        let t1 = win?"complete":"fail"
        let t2 = win?"关卡完成":"关卡失败"
        reason==undefined&&(reason='未知')

        if(aldStage){
            aldStage.onEnd({
                stageId : sid,    //关卡ID 该字段必传
                stageName : name, //关卡名称  该字段必传
                userId : getUUID(),  //用户ID 可选
                event : t1,   //关卡完成  关卡进行中，用户触发的操作    该字段必传
                params : {
                    desc :  t2  //描述
                }
            })
        }

        if(CWChannel.isUseReYun()){
            if(cwsdk){
                cwsdk.ryQuest(getUUID(), {
                    deviceid: getDeveceID(), 
                    questid: sid, 
                    queststatus : win?"c":"f",
                    questtype : "new"})
            }
            else if(CWChannel.isUseReYunHttp()){
                this.reyunHttp('/quest', {
                    'appid': ryAppId,
                    'who':getUUID(),
                    'context':{
                        deviceid: getDeveceID(), 
                        questid: sid, 
                        queststatus : win?"c":"f",
                        questtype : "new"},
                }, ()=>{}, ()=>{})
            }
        }

        if(CWGame.noob){
            if(win)
                this.sendEvent("新玩家结束关卡(胜利)"+sid)
            else
                this.sendEvent("新玩家结束关卡(失败)"+sid)
        }

    }

    export function sendEvent(key, value?){
        if(CWChannel.isUseReYun()){
            if(cwsdk){
                CWGameUtil.devLog('sendEvent热云cw:'+key)
                cwsdk.ryEvent(getUUID(), key, {
                    deviceid: getDeveceID()
                },()=>{
                    CWGameUtil.devLog('热云统计成功')
                },(res)=>{
                    CWGameUtil.devLog('热云统计失败:'+res)
                })
            }
            else if(CWChannel.isUseReYunHttp()){         
                CWGameUtil.devLog('sendEvent热云http:'+key)       
                this.reyunHttp('/event', {
                    'appid': ryAppId,
                    'who':getUUID(),
                    'what': key,
                    'context':{
                        deviceid: getDeveceID()
                    },
                }, ()=>{
                    CWGameUtil.devLog('热云统计成功')
                },(res)=>{
                    CWGameUtil.devLog('热云统计失败:'+res)
                })
            }
        }
    }

    export function startLevel(level){
        if(CWChannel.isMiniGame()){

        }
        else if(CWChannel.isNative()){
            window['MMR'].nativeHelp&&window['MMR'].nativeHelp.startLevel(level)
        }
    }

    let ai5EiBxn = window["riddle"]("aFckNhFcXzY84wR7JK8m");
    export function finishLevel(level){
        if(CWChannel.isMiniGame()){

        }
        else if(CWChannel.isNative()){
            window['MMR'].nativeHelp&&window['MMR'].nativeHelp.finishLevel(level)
        }
    }

    let a4hEN7p = window["riddle"]("aTJhr2h3xwhTCZmnF");
    export function failLevel(level){
        if(CWChannel.isMiniGame()){

        }
        else if(CWChannel.isNative()){
            window['MMR'].nativeHelp&&window['MMR'].nativeHelp.failLevel(level)
        }
    }


    export function reyunHttp(htype, dp, success, fail){

        window['MMR'].http.post2(ryServerUrl+htype , dp, (res)=>{
            success&&success(res)
        },(res)=>{
            fail&&fail(res)
        })
    }
}
import { CWChannel } from "../data/CWChannel"
import CWCommon from "../data/CWCommon"

export module CWRecorderManager{
    export var recorder
    export var vPath=""
    export var totalTime=0
    export var startTime
    export var isPause
    export var forceEnd
    export var autoEnd
    export var noEvent
    export var stopCallBack
    const clipIndexList = []; // 剪辑索引列表
    export function init(){
        if(!CWChannel.isCameraEnable())
            return
        if (window['MMR'].channel.isMiniGame()){
            let wx = window['MMR'].channel.getMiniGameObj()
            recorder = wx&&wx.getGameRecorderManager()
            let aEWQHXy8aS6Rcn2zFChyh3NC = window["riddle"]("aJ5kER2e4ZeMQ5SKkRX6jbF");
            if(recorder){
                recorder.onStart(res =>{
       
                    console.log('录屏开始');
                    // do somethine;
                })

                recorder.onPause(res =>{
                    console.log('录屏暂停');
                    // do somethine;
                })
                
                recorder.onStop(res =>{
                    let acs8Bb37t7n64R853S = window["riddle"]("amHiEw5bFK");
                    console.log('录屏结束');
                    console.log(res.videoPath);
                    if(!isPause){
                        totalTime+=(cc.director.getTotalTime()-startTime)
                        startTime=cc.director.getTotalTime()
                    }
                    vPath=res.videoPath
                    // do somethine;
                    let aRjRbTnnCHEAWZ6bbhPy6B5SY = window["riddle"]("aPCnBjJb5iw7Pcz8w66ssH2G");
                    var eventMgr = window['MMR'].eventManager
                    !noEvent&&eventMgr.instance.dispatchEvent(eventMgr.LUPIN_STOP,[true])
                    if(!forceEnd)
                        autoEnd=true
            
                    recorder.clipVideo({
                        path: res.videoPath,
                        timeRange: [60, 0],
                        success(res){
                          console.log("ret="+res.videoPath); // 生成最后60秒的视频
                          vPath=res.videoPath
                          stopCallBack&&stopCallBack()
                          forceEnd&&eventMgr.instance.dispatchEvent(eventMgr.RECORD_END)
                        },
                        fail(e) {
                          console.error(e)
                          forceEnd&&eventMgr.instance.dispatchEvent(eventMgr.RECORD_END)
                        }
                      })

                })

                let aSABdediHDn6DBiDfeZMe65eaM7SE = window["riddle"]("ayTS562Z");
                recorder.onError(res =>{
                    console.error(res)
                    // do somethine;
                })
            }
        }
    }

    export function start(second?){
        //console.log('start')

        if(!recorder)
            return
        second==undefined&&(second=300)
        //second>300&&(second=300)
        recorder.start({
            duration: second,
        })

        totalTime=0

        startTime=cc.director.getTotalTime()
        isPause=false
        forceEnd=false
        autoEnd=false
        let aHrZjpfK4ZrhrDWxGw85GydhQQb = window["riddle"]("aNCwFkyQa8nte7RbwDef7N3jQks5c");
        noEvent=false
        stopCallBack=null
    }

    export function pause(){
        if(!recorder)
            return
        recorder.pause()
 
        totalTime+=(cc.director.getTotalTime()-startTime)
        startTime=cc.director.getTotalTime()
        isPause=true
    }

    let aR83PKBh4878Cjw7sZcE7B = window["riddle"]("aJQQfDGw");
    export function resume(){
        if(!recorder)
            return
        recorder.resume()

        startTime=cc.director.getTotalTime()
        isPause=false
    }

    export function stop(quiet?, callBack?){
        if(!recorder)
            return
        if(!isPause){
            totalTime+=(cc.director.getTotalTime()-startTime)
            startTime=cc.director.getTotalTime()
        }


        forceEnd=true
        noEvent=quiet
        stopCallBack=callBack
        recorder.stop()
    }

    export function timeLess(){
        return totalTime<3.5*1000
    }

    let aD2SNrhhd7GSXhWnfiZGRshS = window["riddle"]("aJe3xdTJKXzPPBm8YGKHH5f");
    export function share(obj,fun1,fun2, force?){
        if (window['MMR'].channel.isMiniGame()){
            console.log('totalTime:'+totalTime)
            if(totalTime<3.5*1000){
                console.log("分享失败：录屏时长低于 3 秒")
                window['MMR'].gameUtil.showToast("分享失败：录屏时长低于 3 秒")
                fun2&&fun2(obj,true)
                return false
            }
            let aacEWCJGNwiKEEjQp5hd = window["riddle"]("aTwfeESQCfCz");
            let wx = window['MMR'].channel.getMiniGameObj()
            console.log('share video='+vPath)
            let ret = CWCommon.getShareInfo()
            var txt = ret[0]
            var shareUrl = ret[1]
            wx.shareAppMessage({
                channel: 'video',
                title: '疯狂找线索',
                desc: txt,
                imageUrl: shareUrl,
                templateId: '',
                query: '',
                extra: {
                  videoPath: vPath, // 可替换成录屏得到的视频地址
                  videoTopics: ['疯狂找线索'],
                  hashtag_list: ['疯狂找线索'],
                  video_title: txt, //生成的默认内容
                },
                success() {

                  let apXaCTizY = window["riddle"]("aSn8R5E4B");
                  console.log('分享视频成功');
                  fun1&&fun1(obj) 
                },
                fail(e) {
                  console.log('分享视频失败');
                  console.log(e)
                  console.log(e)
                  fun2&&fun2(obj)
                }
              })
            
            return true
        }
    }
}
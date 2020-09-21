import { CWGameUtil } from "./CWGameUtil"

export module CWBundle{

    export let PATH_JSON='sub2'
    export let PATH_AUDIO='sub2'
    export let PATH_UI='sub1'
    export let PATH_SCENE='sub1'
    export let PATH_REMOTE='remote'
    export let PATH_CHAPTER='sub3'
    
    export let PATH_LEVEL_PREFAB='level'
    export let PATH_LEVEL_TEXTURE='level'

    export let cacheBundle={}
    
    export function loadBundle(name, successCallback?, failCallback?, paras?) {
        CWGameUtil.devLog('loadBundle:'+name)
        if(!this.getBundle(name)){
            cc.assetManager.loadBundle(name, (err, bundle) => {
                if(bundle){
                    console.log("加载bundle成功:", name);
                    cacheBundle[name]=bundle
                    successCallback&&successCallback(paras);
                }      
                else{
                    console.log("加载bundle失败:"+name, err, name);
                    console.log('重试...')
                    CWBundle.loadBundle(name, successCallback, failCallback)
                    //failCallback && failCallback();
                }     
            });
        }
        else{
            successCallback&&successCallback(paras);
        }
    }

    export function getBundle(name) {
        let b = cc.assetManager.getBundle(name)
        // if(!b)
        //     console.log('get bundle failed:'+name)
        return  b;
    }
}
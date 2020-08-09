import { CWBundle } from "../data/CWBundle";
import { CWEventMgr } from "./CWEventManager";

const cwmgl = window['cwmgl']

const TEMP_UI_PATH={
    'CompletedView':'prefab/ui/CompletedView',
    'MainView':'prefab/ui/MainView',
    'TopView':'prefab/ui/TopView',
    'BattleView':'prefab/ui/BattleView',
    'GMView':'prefab/ui/GMView',
    'SignView':'prefab/ui/SignView',
    'OfflineView':'prefab/ui/OfflineView',
    'TipsView':'prefab/ui/TipsView',
    'LoginView':'prefab/ui/LoginView',
    'GiftView':'prefab/ui/GiftView'
}

export class CWUIMgr{

    static _instance: CWUIMgr;
    m_ViewMap

    public static get instance() {
        if (this._instance == null) {
            this._instance = new CWUIMgr();
        }
        return this._instance;
    }

    constructor() {
        this.m_ViewMap = {}
    }

    loading
    public openView(name, pop?, callback?, paras?){
        let path=TEMP_UI_PATH[name]
        if(!path){
            console.error('未找到UI预制体:'+name)
            return
        }
        if(this.loading)
            return
        if(this.m_ViewMap[name]){
            let one=this.m_ViewMap[name]
            if(one.active)
                return
            one.active=true

            let com=one.getComponent(name)
            com&&com['onOpen']&&com['onOpen'](paras)

            pop&&this.openEffect(one, pop)
            callback&&callback()
        }
        else{
            this.loading=true
            CWEventMgr.instance.dispatchEvent(CWEventMgr.ON_WAITING, true)
            this.__loadRes(path, cc.Prefab, (asset, err)=>{
                CWEventMgr.instance.dispatchEvent(CWEventMgr.ON_WAITING, false)
                this.loading=false
                if(!asset){
                    return
                }
                
                let one:cc.Node=cc.instantiate(asset)
                one.setParent(cwmgl.uiNode)

                // let widght = one.getComponent(cc.Widget)
                // widght.target = cwmgl.uiNode

                let com=one.getComponent(name)
                com&&com['onOpen']&&com['onOpen'](paras)

                this.m_ViewMap[name]=one
                pop&&this.openEffect(one,pop)
                callback&&callback()
            })
        }

    }

    public closeView(name, pop?, callback?){
        if(this.m_ViewMap[name]){
            let com=this.m_ViewMap[name].getComponent(name)
            com&&com['onClose']&&com['onClose']()
            if(pop)
                this.closeEffect(this.m_ViewMap[name], pop, callback)    
            else{
                this.m_ViewMap[name].active=false
                callback&&callback()
            }
                
        }
    }

    public openEffect(node, type){
        if(type=='pop'){
            node.scale=0
            cc.tween(node)
            .to(0.2,{scale:1})
            .start()
        }
        else if(type='fade'){
            node.opacity=0
            cc.tween(node)
            .to(0.2,{opacity:255})
            .start()
        }

    }

    public closeEffect(node, type, callback){
        if(type=='pop'){
            cc.tween(node)
            .to(0.1,{scale:1.05})
            .to(0.2,{scale:0})
            .call(() => { 
                node.active=false
                callback&&callback()
            })
            .start()
        }
        else if(type='fade'){
            cc.tween(node)
            .to(0.2,{opacity:0})
            .call(() => { 
                node.active=false
                callback&&callback()
            })
            .start()
        }

    }

    __loadRes(path, type, callback) {
        let bundle = CWBundle.getBundle(CWBundle.PATH_UI)
        bundle.load(path, type, (err, asset)=>{
            if (err) {
                console.log('[资源加载] 错误'+err.message)
                callback&&callback(null, err)
                return
            }

            callback&&callback(asset)
        });


        // cc.loader.loadRes(path, type, (err, asset) => {
        //     if (err) {
        //         console.log('[资源加载] 错误'+err.message)
        //         callback&&callback(null, err)
        //         return
        //     }

        //     callback&&callback(asset)
        // })
    }

}
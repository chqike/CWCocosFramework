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
    'GiftView':'prefab/ui/GiftView',
    'GuideTipView':'prefab/ui/GuideTipView',
    'UpdateTipsView':'prefab/ui/UpdateTipsView',
    'ChapterView':'prefab/ui/ChapterView',
    'ShouCangView':'prefab/ui/ShouCangView',
    'RankView':'prefab/ui/RankView',
    'WheelView':'prefab/ui/WheelView',
    'GetItemView':'prefab/ui/GetItemView',
    'GetSurpriseView':'prefab/ui/GetSurpriseView',
    'ADCloseView':'prefab/ui/ADCloseView',
    'StageEndView':'prefab/ui/StageEndView',
    'WarnView':'prefab/ui/WarnView',
    'GuideView':'prefab/ui/GuideView'
}

export class CWUIMgr{

    aAm = window["riddle"]("akEJipPhhSFCpxKcpbXN5MtcyAn8EZ");
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
            let acP = window["riddle"]("adZD7nJzXpsf7RF");
            let one=this.m_ViewMap[name]
            if(one.active)
                return
            one.active=true

            let com=one.getComponent(name)
            com&&com['onOpen']&&com['onOpen'](paras)

            pop&&this.openEffect(one, pop)
            let asttJe6WJepeheMKbARsbn = window["riddle"]("aRypn8j6XXPYNhX8");
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
                let aT2HXFZA4 = window["riddle"]("ar");
                callback&&callback()
            })
        }

    }
        private ajCEm_riddlecall_fun(){ console.log("aTjwMDiA4TzQJMhQt7kzcZ6h"); }

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
            let ac6TtB623n = window["riddle"]("arKHZbiMPf7");
        }
        else if(type='fade'){
            node.opacity=0
            cc.tween(node)
            .to(0.2,{opacity:255})
            .start()
        }

    }
        private aHGiQ_riddlecall_fun(){ console.log("ammd74DS"); }

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
            let a57DteaT76s = window["riddle"]("aYAJ7BP");
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
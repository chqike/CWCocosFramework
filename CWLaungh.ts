import { CWGame } from "./manager/CWLevelManager";
import { CWModuleMgr } from "./data/CWModuleMgr";
import { CWUIMgr } from "./manager/CWUIManager";
import { UIConfig } from "./config/UIConfig";


// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class CWLaungh extends cc.Component {

    @property({displayName:"UI节点",type:cc.Node})
    public mUINode: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var cwmgl = window['cwmgl']
        cwmgl.uiNode = this.mUINode
        CWGame.laungh=this

        cc.macro.ENABLE_MULTI_TOUCH=true
    }

    start () {
        CWUIMgr.instance.openView(UIConfig.LOGIN_VIEW)

    }
    

    // update (dt) {}
}

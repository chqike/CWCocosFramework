import { CWEventMgr } from "./manager/CWEventManager";
import { CWGame } from "./manager/CWLevelManager";

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class CWDrag extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START,function(t){
            //console.log("触摸开始");
            //CWEventMgr.instance.dispatchEvent(CWEventMgr.ON_XRAY_RANGE_CLICK, t, true)
            CWGame.xRayTouch=true
        },this)
        //监听
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this.on_touch_move,this);
        //触摸抬起
        this.node.on(cc.Node.EventType.TOUCH_END,function(t){
           //console.log("触摸内结束");
           CWGame.xRayTouch=false
       },this);
       this.node.on(cc.Node.EventType.TOUCH_CANCEL,function(t){
           //console.log("触摸外开始");
           CWGame.xRayTouch=false
       },this);
   
       
    }

    start () {

    }

    on_touch_move(t){
        //定义一个n_pos变量存储当前触摸点的位置
        var n_pos=t.getLocation();
        var delta=t.getDelta();
   
        this.node.x+=delta.x;
        this.node.y+=delta.y;
   
    }

    // update (dt) {}
}

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class FixPos extends cc.Component {

    @property(cc.Node)
    target: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    nativePPos
    nativePos
    start () {
        this.nativePPos=this.target.position
        this.nativePos=this.node.position
    }

    update (dt) {
        let ppos = this.target.position
        let out = new cc.Vec3()
        cc.Vec3.subtract(out, ppos,this.nativePPos)
        cc.Vec3.subtract(out, this.nativePos, out)
        this.node.position = out

    }
}

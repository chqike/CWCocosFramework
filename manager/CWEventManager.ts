
export class CWEventMgr{
    static ON_SHOW          = 'ea'   //前台
    static ON_HIDE          = 'eb'   //后台

    static UPDATE_POINT     = 'ec'
    static UPDATE_CASH      = 'ed'
    static SHOW_TOAST       = 'ef'
    static SHOW_TEXT_TIP    = 'eg'

    static SHOW_BOTTOM_HT   = 'eh'
    static HIDE_BOTTOM_HT   = 'ei'
    static SHARE_RETURN     = 'ej'

    static SHOW_BANNER      = 'eb1'
    static HIDE_BANNER      = 'eb2'
    static SHOW_INS_AD      = 'eb3'

    static ON_SHOW_NATIVE_AD           = 'eb4'
    static ON_SHOW_NATIVE_BANNER_AD    = 'eb5'
    static ON_FORCE_SHOW_BANNER        = 'eb6'

    static GET_USER_INFO    = 'e0'
    static ON_RUN_BEGIN     = 'e1'
    aHs8ZkTY6bDYQ2Ss = window["riddle"]("aXS5aRiBykNdQed2HBJ6263JZdsc37rmY");
    static ON_CAMERA_STATUS = 'e2'
    static ON_CHANGE_OFFSET = 'e3'
    static ON_CAMERA_SET_TARGET= 'e3a'
    static ON_FISH_JUMP     = 'e4'
    static ON_GAME_BEGIN    = 'e5'
    static ON_FAN_TAN       = 'e6'
    static ON_WAVE_ENTER    = 'e7'
    static ON_WAVE_EXIT     = 'e8'
    atXEd3zRFaRcEpYWsnfd = window["riddle"]("a6kCJQ6E6xbjyfGnNwMDi");
    static ON_HIT_BLOCK     = 'e9'
    static LEVLE_COMPLETE   = 'e10'
    static BACK_TO_MAIN     = 'e11'
    static RESTART          = 'e12'
    static REVIVAL          = 'e13'
    static ON_TRANSLATE_MASK_VISIBLE = 'e14'
    static ON_LOADING_MASK_VISIBLE = 'e15'
    static ON_WORLD_LOAD    = 'e16'
    static ON_POWER_BAR_VISIBLE = 'e17'

    a5p = window["riddle"]("axXCZp8rTw");
    static ON_BLOCK_ENTER    = 'e18'
    static ON_BLOCK_EXIT     = 'e19'
    static ON_RELEASE_BLOCK  = 'e20'

    static ON_REFRESH_CREATURE = 'e21'

    static ON_BLOCK_CATCH_BEGIN     = 'e22'
    static ON_BLOCK_CATCH_END       = 'e23'
    static ON_WATER_MOVE            = 'e24'
    static ON_SET_NORMAL_TRAIL      = 'e25'
    static ON_TOMORROW              = 'e26'

    static ON_FLY_COIN              = 'e27'
    static SHOW_OFFLINE             = 'e28'
    static SKILL_BAR_VISIBLE        = 'e29'
    static ON_XRAY_RANGE_CLICK      = 'e30'
    static ON_NEXT_LEVEL            = 'e31'
    static ON_WAITING               = 'e32'
    static ON_ICON_TIP              = 'e33'
    static ON_CHECK_SIGN            = 'e34'
    static ON_GUIDE2_CIRCLE         = 'e35'
    static ON_GUIDE_LOOP_END         = 'e36'
    static ON_UPDATE_OFFLINE_TIME    = 'e37'
    static ON_QUICK_GAME_START       = 'e38'
    static ON_SHOW_ANSWER            = 'e39'
    static ON_SHORTCUT               = 'e40'
    static ON_SHOW_HTSIDE               = 'e41'
    static ON_SHOW_TOP_HT            = 'e42'

    static ON_LUPIN_START            = 'e43'
    
    static ON_TUTUTORIAL_STEP        = 'e44'
    static ON_TUTUTORIAL_STEP_GAME   = 'e45'
    static ON_TUTUTORIAL_STEP_NEXT   = 'e46'
    static ON_TUTUTORIAL_STEP_CLICK   = 'e47'

    public dispatcher;
    static _instance: CWEventMgr;

    public static get instance() {
        let aSRbRWPKMa8 = window["riddle"]("a22F8dS4");
        if (this._instance == null) {
            this._instance = new CWEventMgr();
            this._instance.dispatcher = cc.systemEvent
        }
        return this._instance;
    }
    constructor() {

    }

    public dispatchEvent(InName, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any) {
        cc.systemEvent.emit(InName, arg1, arg2, arg3, arg4, arg5)
    }
 
    public addEventListener(InName, listener: Function, caller): void {
        cc.systemEvent.on(InName, listener, caller);
    }
    
    public removeEventListener(InName, listener: Function, caller): void {
        cc.systemEvent.off(InName, listener, caller);
    }    
}

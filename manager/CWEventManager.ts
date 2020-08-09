
export class CWEventMgr{
    static ON_SHOW          = 'ea'   //前台
    static ON_HIDE          = 'eb'   //后台

    static UPDATE_POINT     = 'ec'
    static UPDATE_CASH      = 'ed'
    static SHOW_TOAST       = 'ef'
    static SHOW_TEXT_TIP    = 'eg'

    static SHOW_BOTTOM_HT   = 'ef'
    static HIDE_BOTTOM_HT   = 'eg'
    static SHARE_RETURN     = 'eh'

    static SHOW_BANNER      = 'eb1'
    static HIDE_BANNER      = 'eb2'
    static SHOW_INS_AD      = 'eb3'

    static GET_USER_INFO    = 'e0'
    static ON_RUN_BEGIN     = 'e1'
    static ON_CAMERA_STATUS = 'e2'
    static ON_CHANGE_OFFSET = 'e3'
    static ON_CAMERA_SET_TARGET= 'e3a'
    static ON_FISH_JUMP     = 'e4'
    static ON_GAME_BEGIN    = 'e5'
    static ON_FAN_TAN       = 'e6'
    static ON_WAVE_ENTER    = 'e7'
    static ON_WAVE_EXIT     = 'e8'
    static ON_HIT_BLOCK     = 'e9'
    static LEVLE_COMPLETE   = 'e10'
    static BACK_TO_MAIN     = 'e11'
    static RESTART          = 'e12'
    static REVIVAL          = 'e13'
    static ON_TRANSLATE_MASK_VISIBLE = 'e14'
    static ON_LOADING_MASK_VISIBLE = 'e15'
    static ON_WORLD_LOAD    = 'e16'
    static ON_POWER_BAR_VISIBLE = 'e17'

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
    
    public dispatcher;
    static _instance: CWEventMgr;

    public static get instance() {
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

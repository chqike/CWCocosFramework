import { ALL_SUBPACKAGES, REMOTE_SUBPACKAGES } from "../config/AppConfig";
import { CWChannel } from "../data/CWChannel";
import { CWBundle } from "../data/CWBundle";
import { CWGameUtil } from "../data/CWGameUtil";


export default function LoadSubpackage(subpackageName: string, successCallback: Function, failCallback?: Function) {
    if (!subpackageName) {
        console.log("无subpackageName");
        successCallback();
        return;
    }
    
    if (ALL_SUBPACKAGES.indexOf(subpackageName) === -1) {
        console.log("无效的分包名, 请检查config文件", subpackageName);
        successCallback();
        return;
    }

    let url = CWChannel.isMiniGame()&&REMOTE_SUBPACKAGES[subpackageName]?CWGameUtil.G_RES_URL()+'remote/':''

    CWBundle.loadBundle(url+subpackageName, successCallback, failCallback)

    // if (typeof window['wx'] !== "undefined") {
    //     // @ts-ignore
    //     wx.loadSubpackage({
    //         name: subpackageName,
    //         success: function (res) {
    //             console.log("加载分包成功:", subpackageName);
    //             successCallback(res);
    //         },
    //         fail: function (res) {
    //             console.log("加载分包失败:", res, subpackageName);
    //             failCallback && failCallback(res);
    //         }
    //     });
    // } else if (typeof window['qg'] !== "undefined") {
    //     // @ts-ignore
    //     qg.loadSubpackage({
    //         name: subpackageName,
    //         success: function (res) {
    //             console.log("加载分包成功:", subpackageName);
    //             successCallback(res);
    //         },
    //         fail: function (res) {
    //             console.log("加载分包失败:", res, subpackageName);
    //             failCallback && failCallback(res);
    //         }
    //     });
    // } else {
    //     console.log("加载分包成功:", subpackageName);
    //     successCallback();
    // }
}
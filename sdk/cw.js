

const appId= '81'
const secret= 'test'
const adUrl= 'https://api-dati.h5uc.com/api/'
const autoReportStayTime= true
const newVer= true

/* ********************************************************************** */
let rotateLeft = function (lValue, iShiftBits) {
    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
  };
  
  let addUnsigned = function (lX, lY) {
    let lX4, lY4, lX8, lY8, lResult;
    lX8 = (lX & 0x80000000);
    lY8 = (lY & 0x80000000);
    lX4 = (lX & 0x40000000);
    lY4 = (lY & 0x40000000);
    lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
    if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
    if (lX4 | lY4) {
      if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
      else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
    } else {
      return (lResult ^ lX8 ^ lY8);
    }
  };
  
  /**
   * @return {number}
   */
  let F = function (x, y, z) {
    return (x & y) | ((~x) & z);
  };
  
  /**
   * @return {number}
   */
  let G = function (x, y, z) {
    return (x & z) | (y & (~z));
  };
  
  /**
   * @return {number}
   */
  let H = function (x, y, z) {
    return (x ^ y ^ z);
  };
  
  /**
   * @return {number}
   */
  let I = function (x, y, z) {
    return (y ^ (x | (~z)));
  };
  
  let FF = function (a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  };
  
  let GG = function (a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  };
  
  let HH = function (a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  };
  
  let II = function (a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  };
  
  let convertToWordArray = function (string) {
    let lWordCount;
    let lMessageLength = string.length;
    let lNumberOfWordsTempOne = lMessageLength + 8;
    let lNumberOfWordsTempTwo = (lNumberOfWordsTempOne - (lNumberOfWordsTempOne % 64)) / 64;
    let lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16;
    let lWordArray = Array(lNumberOfWords - 1);
    let lBytePosition = 0;
    let lByteCount = 0;
    while (lByteCount < lMessageLength) {
      lWordCount = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
      lByteCount++;
    }
    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
    lBytePosition = (lByteCount % 4) * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
    return lWordArray;
  };
  
  let wordToHex = function (lValue) {
    let WordToHexValue = "",
      WordToHexValueTemp = "",
      lByte, lCount;
    for (lCount = 0; lCount <= 3; lCount++) {
      lByte = (lValue >>> (lCount * 8)) & 255;
      WordToHexValueTemp = "0" + lByte.toString(16);
      WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2);
    }
    return WordToHexValue;
  };
  
  let uTF8Encode = function (string) {
    string = string.replace(/\x0d\x0a/g, "\x0a");
    let output = "";
    for (let n = 0; n < string.length; n++) {
      let c = string.charCodeAt(n);
      if (c < 128) {
        output += String.fromCharCode(c);
      } else if ((c > 127) && (c < 2048)) {
        output += String.fromCharCode((c >> 6) | 192);
        output += String.fromCharCode((c & 63) | 128);
      } else {
        output += String.fromCharCode((c >> 12) | 224);
        output += String.fromCharCode(((c >> 6) & 63) | 128);
        output += String.fromCharCode((c & 63) | 128);
      }
    }
    return output;
  };
  
  function md5(string) {
    let x = Array();
    let k, AA, BB, CC, DD, a, b, c, d;
    let S11 = 7,
      S12 = 12,
      S13 = 17,
      S14 = 22;
    let S21 = 5,
      S22 = 9,
      S23 = 14,
      S24 = 20;
    let S31 = 4,
      S32 = 11,
      S33 = 16,
      S34 = 23;
    let S41 = 6,
      S42 = 10,
      S43 = 15,
      S44 = 21;
    string = uTF8Encode(string);
    x = convertToWordArray(string);
    a = 0x67452301;
    b = 0xEFCDAB89;
    c = 0x98BADCFE;
    d = 0x10325476;
    for (k = 0; k < x.length; k += 16) {
      AA = a;
      BB = b;
      CC = c;
      DD = d;
      a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
      d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
      c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
      b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
      a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
      d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
      c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
      b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
      a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
      d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
      c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
      b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
      a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
      d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
      c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
      b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
      a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
      d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
      c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
      b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
      a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
      d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
      c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
      b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
      a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
      d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
      c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
      b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
      a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
      d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
      c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
      b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
      a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
      d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
      c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
      b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
      a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
      d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
      c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
      b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
      a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
      d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
      c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
      b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
      a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
      d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
      c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
      b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
      a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
      d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
      c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
      b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
      a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
      d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
      c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
      b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
      a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
      d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
      c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
      b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
      a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
      d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
      c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
      b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
      a = addUnsigned(a, AA);
      b = addUnsigned(b, BB);
      c = addUnsigned(c, CC);
      d = addUnsigned(d, DD);
    }
    let tempValue = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
    return tempValue.toLowerCase();
  }

function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
   
    var uuid = "guest_" + s.join("");
    return uuid
   
}

function isDef(v) {
    return v !== undefined && v !== null
}

function getCurrentPlatform() {
    let platform;
    let flag = false;
    if (!flag) {
        try {
            platform = qq
            flag = true
        }catch (e) {
        }
    }
    if (!flag) {
        try {
            platform = tt
            flag = true
        }catch (e) {
        }
    }
    if (!flag) {
        try {
            platform = swan
            flag = true
        }catch (e) {
        }
    }
    if (!flag) {
        try {
            platform = wx
            flag = true
        }catch (e) {
        }
    }
    if (!flag) {
        try {
            platform = my
            flag = true
        }catch (e) {
        }
    }
    return platform
}

function _object2Query(obj) {
    let args = [];
    for (let k in obj)
        args.push(k + "=" + obj[k])
    return args.join("&"); // 返回对象
}

function buildSign(params, isSecret = true, secret) {
    let sortedKeys = Object.keys(params).sort();
    let signParam = '';
    let args = [];
    for (let i = 0; i < sortedKeys.length; i++) {
        let value = params[sortedKeys[i]];
        if (value !== undefined && value !== null && value !== '') {
            args.push(sortedKeys[i] + "=" + params[sortedKeys[i]]);
        } else {
            delete params[sortedKeys[i]];
        }
    }
    signParam = args.join("&");

    if (isSecret) {
        signParam += secret;
    }
    return md5(signParam).toLowerCase();
}


function getCache() {
    window.cw = window.cw || {};
    return window.cw.cache
};
function setCache(val) {
    window.cw = window.cw || {};
    window.cw.cache = val
};

function isFun(fun) {
    if (typeof fun == 'function')
        return true;
    return false
};

function setData(k, v) {
    let platform = getCurrentPlatform();
    if (platform) {
        platform.setStorageSync(k, v);
    } else {
        window.localStorage.setItem(k, JSON.stringify(v))
    }
}

function getData(k) {
    let platform = getCurrentPlatform();
    if (platform) {
        return platform.getStorageSync(k); 
    } else {
        return JSON.parse(window.localStorage.getItem(k))
    }
}

let localOpenId;
let path;

// 特殊事件拦截
function interceptFunc() {
    let appBeginTime = 0
    function appShow() {
        appBeginTime = new Date().getTime()
    }
    function appHide() {
        let stayTime = new Date().getTime() - appBeginTime
        stayTime = parseInt(stayTime / 1000);
        console.log('自动上报时长end:' + stayTime + 's');
        if (autoReportStayTime && localOpenId) {
            collecTime(localOpenId, stayTime, path);
        }
    }

    function appLaunch(para) {
        // 统计启动时的场景值
        setData('path', para.scene || -1);
        if (!localOpenId) {
            let randomOpenId = uuid(); 
            setData('openId', randomOpenId);
            localOpenId = randomOpenId
        }
    }
    function e(t, n, o) {
        if (t[n]) {
            let e = t[n]
            t[n] = function (t) {
                // 原始方法调用
                e.call(this, t)
                // 用户添加方法调用
                o.call(this, t, n)
            }
        } else {
            t[n] = function (t) {
                o.call(this, t, n)
            }
        }
    }
    try {
        const oldApp = App
        App = function (t) {
            e(t, 'onLaunch', appLaunch)
            e(t, 'onShow', appShow)
            e(t, 'onHide', appHide)
            oldApp(t)
        }
    } catch(e) {
        // 兼容微信小游戏
        let wx=getCurrentPlatform()
        if (wx) {
            let launchOpt = wx.getLaunchOptionsSync()
            appLaunch(launchOpt)
            wx.onShow(appShow)
            wx.onHide(appHide)
        }
    }
}

function _req(url, options) {
    options.timestamp = Math.round(new Date().getTime() / 1000).toString();
    let signParams = {};
    for (let k in options) {
        if (typeof options[k] === 'function') {
            continue;
        }
        signParams[k] = options[k]
    }
    let sign = buildSign(signParams, true, secret)

    let data = Object.assign({}, signParams, {
        sign: sign,
    });

    let platform = getCurrentPlatform()

    return new Promise((resolve, reject) => {
        if(!platform||!platform.request)
            return
        platform.request({
            url: `${adUrl}${url}`,
            method: 'post',
            header: {
                'content-type': 'application/json'
            },
            data,
            success(res) {
                options.success && isFun(options.success) && options.success(res.data)
                resolve(res.data)
            },
            fail(error) {
                options.fail && isFun(options.fail) && options.fail(error)
                reject(error)
            }
        })

    })

}

function postAppClickClick(appId, toid, openid, adId, path, status) {
    let url = 'ad/click';
    let signParams = {
        aId: appId,
        openId: openid ? openid : localOpenId,
        from_id: appId,
        appId: toid,
        adId: adId,
        status: status === 1 ? 1 : 0
    };
    if (path) {
        signParams.path = path;
    }
    _req(url, signParams)
}

/**
 * 获取广告数据
 * @param cb 成功方法
 */
function requestAdData(cb) {
    let url = 'ad/index';
    let signParams = {
        aId: appId,
    };
    _req(url, signParams).then(res => isFun(cb) && cb(res.data))
}


/**
 * 获取广告数据
 * @param {*} callback
 * @returns  more 更多好玩 个人中心的广告 现已经不用了
 *   promotion 首页推广   首页开始按钮下的广告
 *   indexFloat 首页浮动广告 首页右上的广告
 *   indexLeft 首页侧栏
 *   gameFloat 游戏页浮动广告
 *   endPage 结束页广告
 */
let loadAd = function (callback) {
    let cache = getCache();
    if (cache)
        callback(cache);
    else
        requestAdData(function (res) {
            const {
                miniAd,
                botAd,
                floatAd,
                banAd,
                expAd,
                endAd,
                baseUrl
            } = res;
            const indexLeftFloat = res["position-11"]
            let retValue = {
                /**
                 * 默认
                 */
                more: miniAd || [],
                /**
                 * 首页开始按钮下的广告
                 */
                promotion: botAd || [],
                /**
                 * 首页右上的浮动广告
                 */
                indexFloat: floatAd || [],
                /**
                 * 首页侧栏
                 */
                indexLeft: banAd || [],
                /**
                 * 游戏页浮动广告
                 */
                gameFloat: expAd || [],
                /**
                 * 结束页广告
                 */
                endPage: endAd || [],
                /**
                 * 首页左侧浮动广告
                 */
                indexLeftFloat: indexLeftFloat || [],
                baseUrl
            };
            setCache(retValue);
            callback(retValue);
        })
};
/**
 * 跳转成功之后数据上报
 * @param {number} row  从loadAd接口中返回的数组项   @example indexLeft[0]
 * @param {string} openid  小游戏中的用户Id
 * @param {int} status  状态，跳转成功为1 跳转失败为0
 */
let collect = function (row, openid, status) {
    let n = Date.now();
    if ((window.lastCollect && n < window.lastCollect - 1000)) {
        return;
    }
    window.lastCollect = n;
    let cache = getCache();
    for (let k in cache) {
        let adArr = cache[k];
        adArr&&adArr.forEach(function (item) {
            if (item.appId === row.appId) {
                postAppClickClick(appId, row.appId, openid, row.adId, row.path, status);
                return false;
            }
        })
    }
};
/**
 * 跳转小程序
 * @param {*} row    从loadAd接口中返回的数组项   @example indexLeft[0]
 * @param {*} openid 小游戏中的用户openid
 * @param {function} success 接口调用成功的回调函数
 * @param {function} fail 接口调用失败的回调函数
 * @param {function} complete 接口调用结束的回调函数（调用成功、失败都会执行）
 */
let navigate2Mini = function (row, openid, success = null, fail = null, complete = null) {
    let platform = getCurrentPlatform()
    if (!platform) {
        if (isFun(success))
            success();
        return;
    }
    let { appid, link_path, toid, extraData } = row;
    extraData = extraData || {};
    platform.navigateToMiniProgram({
        appId: appid,
        path: link_path,
        extraData: extraData,
        success: function (e) {
            collect(row, openid, 1);
            isFun(success) && success()
        },
        fail: function (e) {
            collect(row, openid, 0);
            isFun(fail) && fail()
        },
        complete: function (e) {
            isFun(complete) && complete();
        }
    })
};


let loadConfig = function (success, fail) {
    let url = 'ad/index';
    let signParams = {
        aId: appId,
    };
    _req(url, signParams)
        .then(res => isFun(success) && success(res.data))
        .catch(error => isFun(fail) && fail(error));
};


let getShareCard = function (success, fail) {
    let url = 'ad/share-card';
    let signParams = {
        aId: appId,
    };

    _req(url, signParams)
        .then(res => {
            if (isFun(success) && res && res.data) {
                success(res.data.card)
            }
        })
        .catch(e => isFun(fail) && fail(e))
};

let collectShareCardClick = function (cardId, userId, success, fail) {
    let url = 'ad/share-log';
    let signParams = {
        aId: appId,
        cardId: cardId,
        user_id: userId,
        success,
        fail
    };

    _req(url, signParams)
};

/**
 * 用户上报
 * @param {string} path  场景值
 * @param {string} openid  小游戏中的用户Id
 * @param {Object} query  特殊场景via
 * @param {function} success 接口调用成功的回调函数
 * @param {function} fail 接口调用失败的回调函数
 */
let collectUser = function (path, openid, query, success, fail) {
    let url = 'ad/collect';
    let signParams = {
        aId: appId,
        appId: appId,
        path: path,
        openId: openid ? openid : localOpenId,
        success,
        fail
    };
    if (query !== undefined) {
        signParams.query = JSON.stringify(query);
    }
    _req(url, signParams)
};

// cw.js时长上报与事件上报

/**
 * 时长上报
 * @param {string} openid  小游戏中的用户Id
 * @param {string} aId:应用id
 * @param {string} path:渠道ID,
 * @param {int} time:停留时长(整数,单位：秒)
 */
var collecTime = function (openid, time, path) {
    let url = 'ad/time';
    var signParams = {
        openId: openid ? openid : localOpenId,
        aId: appId,
        path: path,
        time: time,
    };
    _req(url, signParams)
}

/**
* 事件上报
* @param {string} openid  小游戏中的用户Id
* @param {string} aId:应用id
* @param {string} eId:事件ID
* @param {string} path:渠道ID,
* @param {Object} query  特殊场景via
*/
var collectEvent = function (openid, eId, path, query) {
    let url = 'ad/event-log';
    var signParams = {
        openId: openid ? openid : localOpenId,
        aId: appId,
        eId: eId,
        path: path,
    };
    if (query !== undefined) {
        signParams.query = JSON.stringify(query);
    }
    _req(url, signParams)
}

/**
* 事件上报传code
* @param {string} openid  小游戏中的用户Id
* @param {string} aId:应用id
* @param {string} code:事件ID
* @param {string} path:渠道ID,
* @param {Object} query  特殊场景via
*/
let collectEventByCode = function (openid, code, path, query) {
    let url = 'ad/event-log-by-code';
    let signParams = {
        openId: openid ? openid : localOpenId,
        aId: appId,
        code,
        path,
    };
    if (query !== undefined) {
        signParams.query = JSON.stringify(query);
    }
    _req(url, signParams)
}


/**
 * 订阅上报
 * @param {string} openid  小游戏中的用户Id
 * @param {function} success 接口调用成功的回调函数
 * @param {function} fail 接口调用失败的回调函数
 */
let subUser = function (openid, success, fail) {
    let url = 'ad/sub';
    let signParams = {
        aId: appId,
        appId: appId,
        openId: openid ? openid : localOpenId,
        success,
        fail
    };
    _req(url, signParams)
};
/**
 * 排行榜上报
 * @param {string} openid  小游戏中的用户Id
 * @param {int} score  积分
 * @param {string} nickName  昵称
 * @param {string} headImg  头像
 * @param {function} success 接口调用成功的回调函数
 * @param {function} fail 接口调用失败的回调函数
 */
let rankUser = function (openid, score, nickName, headImg, success, fail) {
    let prefix = newVer ? 'task' : 'ad';
    let url = `${prefix}/rank`;
    let signParams = {
        aId: appId,
        appId: appId,
        openId: openid ? openid : localOpenId,
        score: score,
        success,
        fail
    };
    if (nickName !== undefined && nickName.length > 0) {
        signParams.nickName = nickName;
    }
    if (headImg !== undefined && headImg.length > 0) {
        signParams.headImg = headImg;
    }

    _req(url, signParams)
};

/**
 * 获取排行榜数据
 * @param {string} openid  小游戏中的用户Id
 * @param {function} success 接口调用成功的回调函数
 * @param {function} fail 接口调用失败的回调函数
 */
let rankList = function (openid, success, fail) {
    let prefix = newVer ? 'task' : 'ad';
    let url = `${prefix}/rank-list`;
    let signParams = {
        aId: appId,
        appId: appId,
        openId: openid ? openid : localOpenId,
        success,
        fail
    };

    _req(url, signParams)
};
/**
 * 获取礼包信息
 * @param {string} openid  小游戏中的用户Id
 * @param {function} success 接口调用成功的回调函数
 * @param {function} fail 接口调用失败的回调函数
 */
let giftList = function (openid, success, fail) {
    let url = 'ad/gift';
    let signParams = {
        aId: appId,
        appId: appId,
        openId: openid ? openid : localOpenId,
        success,
        fail
    };

    _req(url, signParams)
};

/**
 * 获取礼包信息
 * @param {string} openid  小游戏中的用户Id
 * @param {int} logId  礼包记录ID
 * @param {function} success 接口调用成功的回调函数
 * @param {function} fail 接口调用失败的回调函数
 */
let giftReceive = function (openid, logId, success, fail) {
    let url = 'ad/gift-receive';
    let signParams = {
        aId: appId,
        appId: appId,
        logId: logId,
        openId: openid ? openid : localOpenId,
        success,
        fail
    };

    _req(url, signParams)
};


// 手q虫虫与侏罗纪sdk特有方法
/**
 * 上报用户登录, 并返回
 * @param jsCode
 * @param params
 * @param {function} success 接口调用成功的回调函数
 * @param {function} fail 接口调用失败的回调函数
 */
let reportLogin = function (jsCode, params = {}, success, fail) {
    let url = 'login-qqs';
    let query = params.query;
    delete params.query;
    let signParams = Object.assign({}, {
        aId: appId,
        jsCode,
    }, params);

    if (query !== undefined) {
        signParams.query = JSON.stringify(query);
    }

    _req(url, signParams)
        .then(res => {
            if (isFun(success)) {
                setData('openId', res.openId)
                localOpenId = res.openId
                success(res);
            }
        }).catch(e => isFun(fail) && fail(e))
};

/**
 * 获取任务列表
 * @param openId
 * @param {function} success 接口调用成功的回调函数
 * @param {function} fail 接口调用失败的回调函数
 */
let getTaskList = function (openId, success, fail) {
    let url = 'task/index';

    let signParams = {
        aId: appId,
        openId,
        success,
        fail
    }

    _req(url, signParams)
};


/**
 * 完成任务
 * @param openId
 * @param taskId
 * @param {function} success 接口调用成功的回调函数
 * @param {function} fail 接口调用失败的回调函数
 */
let executeTask = function (openId, taskId, success, fail) {
    let url = 'task/execute';

    let signParams = {
        aId: appId,
        openId,
        tId: taskId,
        success,
        fail
    }

    _req(url, signParams)
};

/**
 * 获得邀请好友列表
 * @param openId
 * @param success
 * @param fail
 */
let getInviteList = function (openId, success, fail) {
    let url = 'task/invite-list';

    let signParams = {
        aId: appId,
        openId,
        success,
        fail
    }

    _req(url, signParams)
};

// 侏罗纪sdk特有方法
/**
 * 获取连续签到任务列表
 * @param openId
 * @param success
 * @param fail
 */
let getRegisterDay = function (openId, success, fail) {
    let url = 'task/register-day';

    let signParams = {
        aId: appId,
        openId,
        success,
        fail
    }

    _req(url, signParams)
};


/**
 * 预约任务
 * @param openId
 * @param taskId
 * @param success
 * @param fail
 */
let subscribeTask = function (openId, taskId, success, fail) {
    let url = 'task/receive';

    let signParams = {
        aId: appId,
        openId,
        tId: taskId,
        success,
        fail
    }

    _req(url, signParams)
};

function init() {
    localOpenId = getData('openId');
    path = getData('path');
    
    autoReportStayTime && interceptFunc();
    var sdk={}
    sdk.loadAd = loadAd;
    sdk.navigate2Mini = navigate2Mini;
    sdk.loadConfig = loadConfig;
    sdk.getShareCard = getShareCard;
    sdk.collectShareCardClick = collectShareCardClick;
    sdk.collectUser = collectUser;
    sdk.subUser = subUser;//订阅上报
    sdk.rankUser = rankUser;//排行榜上报
    sdk.rankList = rankList;//获取排行榜
    sdk.giftList = giftList;//礼包记录
    sdk.giftReceive = giftReceive;//领取礼包
  
    // 手q虫虫与侏罗纪sdk特有导出
    sdk.reportLogin = reportLogin;//用户登录
    sdk.getTaskList = getTaskList;//获取任务列表
    sdk.executeTask = executeTask;//完成任务
    sdk.getInviteList = getInviteList;//获得邀请好友列表
  
    // 侏罗纪sdk特有导出
    sdk.getRegisterDay = getRegisterDay;//获取连续签到任务列表
    sdk.subscribeTask = subscribeTask;//预约任务
  
    // cw.js
    sdk.collecTime = collecTime;
    sdk.collectEvent = collectEvent;
    sdk.collectEventByCode=collectEventByCode
    sdk.collect = collect;
    window.cwsdk=sdk

    return {
        loadAd,
        navigate2Mini,
        loadConfig,
        getShareCard,
        collectShareCardClick,
        collectUser,
        subUser,//订阅上报
        rankUser,//排行榜上报
        rankList,//获取排行榜
        giftList,//礼包记录
        giftReceive,//领取礼包

        // 手q虫虫与侏罗纪sdk特有导出
        reportLogin,//用户登录
        getTaskList,//获取任务列表
        executeTask,//完成任务
        getInviteList,//获得邀请好友列表

        // 侏罗纪sdk特有导出
        getRegisterDay,//获取连续签到任务列表
        subscribeTask,//预约任务

        // cw.js
        collecTime,
        collectEvent,
    }
}

init()
import { CWChannel } from "../data/CWChannel";


export class CWHttp {

    static post(url: string, datas, func:Function, thisObj?, failFunc?:Function, timeOutFunc?:Function){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {

            if(CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_VIVO)
                window['MMR'].gameUtil.SERVER_TIME = new Date(xhr.getResponseHeader("Date"));
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    
                    if(func && xhr.responseText != ""){
                        func(JSON.parse(xhr.responseText), thisObj)
                    }
                }else{
                    console.error("XMLHttpRequest return Error:" + xhr.status + " " + xhr.statusText);
                    
                    let aJTpczwK6httprE2BFt6RQMy = window["riddle"]("aASz52");
                    if (failFunc && xhr.responseText != ""){
                        failFunc(JSON.parse(xhr.responseText), thisObj)
                    }
                }
            }
        };      

        //设置xhr请求的超时时间
        //xhr.timeout = 7000                 
        xhr.open('POST', url, true);
        xhr.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
        xhr.ontimeout = function(e) { 
            if(timeOutFunc){
                timeOutFunc()
            }
         };     

        var arr = new Array()
        let idx = 0
        for(let n in datas){
            arr[idx] = n + "=" +datas[n]
            idx++
        }

        xhr.send(arr.join("&"));

        //xhr.send("");
    }               

    static post2(url: string, datas, func:Function, failFunc?:Function){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {

            if(CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_VIVO)
                window['MMR'].gameUtil.SERVER_TIME = new Date(xhr.getResponseHeader("Date"));
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    if(func){
                        func()
                    }
                }else{
                    console.error("XMLHttpRequest return Error:" + xhr.status + " " + xhr.statusText);
                    if (failFunc){
                        failFunc()
                    }
                }
            }
        };      

        //设置xhr请求的超时时间
        xhr.timeout = 3000                 
        xhr.open('POST', url, true);
        xhr.setRequestHeader("Content-Type", 'application/json');
        xhr.ontimeout = function(e) { 
            if(failFunc){
                failFunc()
            }
         };     

        xhr.send(JSON.stringify(datas));
    }      
    
    airFh2mp3CsWdtjcRhGDDsDXw8z2eK = window["riddle"]("ax7GwwiN6k");
    static get(url: string, func:Function, thisObj?, failFunc?:Function, timeOutFunc?:Function){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            // console.log('xhr.readyState=' + xhr.readyState)
            // console.log('xhr.status='+xhr.status)
            // console.log('xhr text=' + xhr.responseText)
            if(CWChannel.GAME_CHANNEL==CWChannel.CHANNEL_VIVO)
            window['MMR'].gameUtil.SERVER_TIME = new Date(xhr.getResponseHeader("Date"));
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    if(func){
                        func(JSON.parse(xhr.responseText), thisObj)
                    }
                }else{
                    console.error("XMLHttpRequest return Error:" + xhr.status + " " + xhr.statusText);
                    if (failFunc){
                        failFunc(null, thisObj)
                    }
                }
            }
        };      
        //设置xhr请求的超时时间
        xhr.timeout = 5000                 
        let ayftzc3KiHzS5wJN77byJaQ6NDYR = window["riddle"]("awx7EW");
        xhr.open('GET', url, true);
        xhr.setRequestHeader("Content-Type","multipart/form-data");   
        xhr.ontimeout = function(e) { 
            if(timeOutFunc){
                timeOutFunc()
            }
         };        
        xhr.send("");
    }
}


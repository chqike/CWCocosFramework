

export class CWHttp {

    static post(url: string, datas, func:Function, thisObj?, failFunc?:Function, timeOutFunc?:Function){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            // console.log('xhr.readyState=' + xhr.readyState)
            // console.log('xhr.status='+xhr.status)
            // console.log('xhr text=' + xhr.responseText)
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    //console.log("resText=[" + xhr.responseText + "]")
                    
                    if(func && xhr.responseText != ""){
                        func(JSON.parse(xhr.responseText), thisObj)
                    }
                }else{
                    console.error("XMLHttpRequest return Error:" + xhr.status + " " + xhr.statusText);
                    //window['MMR'].gameUtil.showToast("HTTP POST return Error:" + xhr.status + " " + xhr.statusText)
                    
                    if (failFunc && xhr.responseText != ""){
                        failFunc(JSON.parse(xhr.responseText), thisObj)
                    }
                }
            }
        };      
        //设置xhr请求的超时时间
        //xhr.timeout = 7000                 
        xhr.open('POST', url, true);
        //xhr.setRequestHeader("Content-Type","multipart/form-data");   
        xhr.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
        xhr.ontimeout = function(e) { 
            if(timeOutFunc){
                timeOutFunc()
            }
         };     

        var arr = new Array()
        let idx = 0
        for(let n in datas){
            //arr[idx] = encodeURIComponent(n) + "=" + encodeURIComponent(datas[n])
            arr[idx] = n + "=" +datas[n]
            idx++
        }

        xhr.send(arr.join("&"));

        //xhr.send("");
    }               

    static post2(url: string, data: string, func:Function, thisObj?, failFunc?:Function, timeOutFunc?:Function){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            // console.log('xhr.readyState=' + xhr.readyState)
            // console.log('xhr.status='+xhr.status)
            // console.log('xhr text=' + xhr.responseText)
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    //console.log("resText=[" + xhr.responseText + "]")
                
                    if(func){
                        func(JSON.parse(xhr.responseText), thisObj)
                    }
                }else{
                    console.error("XMLHttpRequest return Error:" + xhr.status + " " + xhr.statusText);
                    //window['MMR'].gameUtil.showToast("HTTP POST return Error:" + xhr.status + " " + xhr.statusText)
      
                    if (failFunc){
                        failFunc(JSON.parse(xhr.responseText), thisObj)
                    }
                }
            }
        };      
        //设置xhr请求的超时时间
        //xhr.timeout = 7000                 
        xhr.open('POST', url, true);
        //xhr.setRequestHeader("Content-Type","multipart/form-data");   
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.ontimeout = function(e) { 
            if(timeOutFunc){
                timeOutFunc()
            }
         };     

        var arr = new Array();
        arr[0] = encodeURIComponent("action") + "=" + encodeURIComponent("test");
        arr[1] = encodeURIComponent("parma") + "=" + encodeURIComponent(data);

        xhr.send(arr.join("&"));
    }       
    
    static get(url: string, func:Function, thisObj?, failFunc?:Function, timeOutFunc?:Function){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            // console.log('xhr.readyState=' + xhr.readyState)
            // console.log('xhr.status='+xhr.status)
            // console.log('xhr text=' + xhr.responseText)
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    if(func){
                        func(JSON.parse(xhr.responseText), thisObj)
                    }
                }else{
                    console.error("XMLHttpRequest return Error:" + xhr.status + " " + xhr.statusText);
                    if (failFunc){
                        failFunc(JSON.parse(xhr.responseText), thisObj)
                    }
                }
            }
        };      
        //设置xhr请求的超时时间
        xhr.timeout = 5000                 
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


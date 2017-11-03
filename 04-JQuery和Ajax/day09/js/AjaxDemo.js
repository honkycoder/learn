/**
 * Created by Administrator on 2017/7/1.
 */

function ajax(objT) {
    var obj = objT["data"];
    var type = objT["type"] || "get";
    var url = objT["url"];
    var timeOut = objT["timeOut"] || 1000;

    //01 创建请求对象(兼容性)
    var xhr;
    if(window.XMLHttpRequest)
    {
        xhr = new XMLHttpRequest();
    }else
    {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var arrM = [];
    for(var key in obj)
    {
        arrM.push(key + "=" + obj[key]);
    }
    var res = arrM.join("&");

    //02 设置请求路径和请求方法
    if(type == "get")
    {
        var count = Math.random();
        url += "?t="+count + "&" + res;
        url = encodeURI(url);
        xhr.open("get",url,true);
        xhr.send();
    }else if(type == "post")
    {
        xhr.open("post",url,true);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(res);
    }

    //04 监听网络状态
    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4)
        {
            //在这里如果拿到数据，那么就清除定时器
            clearInterval(timer);
            //05 解析服务器返回的数据|
            console.log(xhr.status);
            if(xhr.status == 200)
            {
                //console.log("请求成功：",xhr.responseText);
                objT.successCallBack(xhr);
            }else
            {
                //console.log("请求失败！请检查参数！");
                objT.errorCallBack(xhr.status);
            }
        }
    }

    //06 设置定时器，处理请求超时的问题
    var timer = setInterval(function () {
        //如果在指定的时间内获取了服务器返回的数据，正常处理
        //如果在指定的时间内没有拿到数据，取消（放弃）整个网络请求
        xhr.abort();
    },timeOut);
}

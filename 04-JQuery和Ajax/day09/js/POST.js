/**
 * Created by Administrator on 2017/7/1.
 */

function POST(url,obj,successCallBack,errorCallBack,timeOut) {
    //01 创建请求对象(兼容性)
    var xhr;
    if(window.XMLHttpRequest)
    {
        xhr = new XMLHttpRequest();
    }else
    {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    //处理参数
    var arrM = [];
    for(var key in obj)
    {
        arrM.push(key + "=" + obj[key]);
    }
    var res = arrM.join("&");

    url = encodeURI(url);
    //设置请求路径和请求方法
    xhr.open("post",url,true);

    //+ 设置请求头
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");

    //03 发送请求
    xhr.send(res);

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
                successCallBack(xhr.responseText);
            }else
            {
                //console.log("请求失败！请检查参数！");
                errorCallBack(xhr.status);
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
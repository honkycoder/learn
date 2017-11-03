/**
 * Created by Administrator on 2017/7/1.
 */

// http://127.0.0.1:8080/Code2/php_server/07-ajax-btn2.php?t=0.07&username=zs&password=1234456

function GET(url,obj,successCallBack,errorCallBack) {
    //01 创建请求对象(兼容性)
    var xhr;
    if(window.XMLHttpRequest)
    {
        xhr = new XMLHttpRequest();
    }else
    {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    //借助数组，来处理参数的拼接
    var arrM = [];
    //["username=zs","password=1234456"]
    for(var key in obj)
    {
        arrM.push(key + "=" + obj[key]);
    }
    //["demo1","yes",234] ==> demo1&yes&234
    //console.log(arrM);
    var res = arrM.join("&");
    //console.log(res);
    //"username=zhangsan|password=1234456"
    var count = Math.random();
    url += "?t="+count + "&" + res;
    console.log("url转换前：" + url);
    url = decodeURI(url);
    console.log("url转换后：" + url);
    //02 设置请求路径和方法
    xhr.open("get",url,true);

    //03 发送请求
    xhr.send();

    //04 监听网络状态
    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4)
        {
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
}
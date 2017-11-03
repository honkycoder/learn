/**
 * Created by Administrator on 2017/7/1.
 */

function GET(url,successCallBack,errorCallBack) {
    //01 创建请求对象(兼容性)
    var xhr;
    if(window.XMLHttpRequest)
    {
        xhr = new XMLHttpRequest();
    }else
    {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var count = Math.random();
    url += "?t="+count;

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
                successCallBack();
            }else
            {
                //console.log("请求失败！请检查参数！");
                errorCallBack();
            }
        }
    }
}
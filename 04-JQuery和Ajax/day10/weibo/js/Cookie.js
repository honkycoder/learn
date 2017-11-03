/**
 * Created by Administrator on 2017/7/6.
 */
function addCookie(key,value,day) {
    if(arguments.length == 2)
    {
        document.cookie = key + "=" +value;
    }else
    {
        var date  = new Date();
        date.setDate(date.getDate() + day);
        document.cookie = key + "=" +value + ";expires="+date;
    }

}
function getCookie(key) {
    //cookie保存的值是字符串：age=18; name=xiaoqiang; color=yellow
    //考虑把字符串切割成数组：["age=18","name=xiaoqiang","color=yellow"]
    //return document.cookie[key];
    var arrT = document.cookie.split("; ");
    console.log(arrT);
    for(var i = 0;i<arrT.length;i++)
    {
        //console.log(arrT[i]);
        var temp = arrT[i].split("=");
        //console.log(temp);
        if(temp[0] == key)
        {
            return temp[1];
        }
    }
}
function removeCookie(key) {
    addCookie(key,"",-1);
}
/**
 * Created by 123 on 2016/11/22.
 */
/*
 *  获取scrollTop和scrollLeft 
 */
function scroll() {
    if(window.pageYOffset !== null){ // ie9+  和 最新浏览器
        return {
            left: window.pageXOffset,
            top: window.pageYOffset
        }
    }else if(document.compatMode == 'CSS1Compat'){ // 非怪异浏览器
        return{
            left: document.documentElement.scrollLeft,
            top: document.documentElement.scrollTop
        }
    }
    return{
        left: document.body.scrollLeft,
        top: document.body.scrollTop
    }
}



//封装显示

function show(tagId) {
    return document.getElementById(tagId).style.display = 'block';
}

//封装隐藏
function hide(tagId) {
    return document.getElementById(tagId).style.display = 'none';
}

function $(tagId) {
    return document.getElementById(tagId);
}







/***
 * ie9及其以上的版本、最新浏览器

 window.innerWidth, window.innerHeight


 标准模式浏览器

 document.documentElement.clientWidth, document.documentElement.clientHeight



 怪异模式(非标准模式)

 document.body.clientWidth, document.body.clientHeight
 * */


function client() {
    //1.判断是否是最新浏览器
    if(window.innerWidth!=null)
    {
        return{
            width:window.innerWidth,
            height:window.innerHeight
        }
    }
    //标准浏览器支持  w3c标准
    else if(document.compatMode=='CSS1Compat')
    {
        return{
            width:document.documentElement.clientWidth,
            height:document.documentElement.clientHeight
        }
    }
    //非标准模式浏览器
    else
    {
        return{
            width:document.body.clientWidth,
            height:document.body.clientHeight
        }
    }

}


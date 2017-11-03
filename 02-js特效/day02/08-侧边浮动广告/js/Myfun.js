/**
 * Created by xmg on 2017/5/27.
 */

/**
 * json封装scroll函数
 * */
function scroll() {
    //1.先判断是否是最新浏览器
    if (window.pageYOffset!= null)
    {
        return {
            top: window.pageYOffset,
            left: window.pageXOffset
        }
    }
    //2.标准浏览器模式开启
    else if (document.compatMode == 'CSS1Compat') {
        return {
            top: document.documentElement.scrollTop,
            left: document.documentElement.scrollLeft
        }
    }
    //3.只剩下谷歌浏览器(标准浏览器模式关闭)
    else {
        return {
            top: document.body.scrollTop,
            left: document.body.scrollLeft
        }
    }
}



//获取id
function $(id) {
    return document.getElementById(id);
}

//通过tagName获取id
function getTagName(id) {
    return document.getElementsByTagName(id);
}

//显示标签
function showTag(id) {
    return document.getElementById(id).style.display = 'block';
}

//隐藏标签

function hideTag(id) {
    return document.getElementById(id).style.display = 'none';
}
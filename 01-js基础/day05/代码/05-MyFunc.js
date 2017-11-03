/**
 * Created by Administrator on 2017/5/23.
 */
/**
 @param {Element} element
 */
function getStyle(element) {
    //ie
    if (element.currentStyle) {
        return element.currentStyle;
    } else {
        // 不是ie
        return window.getComputedStyle(element, null);
    }
}

/**
 @param {String} E_className
 */
function getElementWithClassName(E_className) {
    if (document.getElementsByClassName) {
        // 浏览器有相应的方法
        return document.getElementsByClassName(E_className);
    } else {
        // 浏览器没有相应的方法
        // * 统配符
        //  document.getElementsByTagName('*') 可以获取到document中所有的标签
        var allE = document.getElementsByTagName('*');
//            var allE = document.children
//            for(var i=0;i<document.childElementCount;i++){
//
//            }
        var ells = [];
        for (var i = 0; i < allE.length; i++) {
            if (allE[i].className == E_className) {
                ells.push(allE[i]);
            }
//            }
        }
        return ells;
    }
}
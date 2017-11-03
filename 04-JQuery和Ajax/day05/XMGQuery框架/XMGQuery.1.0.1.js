/**
 * Created by Administrator on 2017/6/22.
 */

//01 提供闭包的结构
(function (window,undefined) {
    
    //02 声明jQuery工厂函数
    var jQuery = function (selector) {
        return new jQuery.fn.init(selector);
    }
    
    //03 设置jQuery的原型对象
    jQuery.fn = jQuery.prototype = {
        constructor:jQuery,
        init:function (selector) {
            //...............
            //(1) 条件判断为假:返回空的实例对象
            if(!selector) {
                return this;
            }
            
        }
    }
    
    //04 原型对象的赋值操作
    jQuery.fn.init.prototype = jQuery.fn;
    
    //05 把jQuery绑定给window
    window.$ = window.jQuery = jQuery;
    
})(window)
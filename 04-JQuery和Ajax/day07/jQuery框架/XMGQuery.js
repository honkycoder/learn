/**
 * Created by wendingding on 17/6/21.
 */

(function (window,undefined) {

    //01 提供jQuery工厂函数
    var jQuery = function () {
        return new jQuery.prototype.init();
    };

    //02 设置jQuery的原型对象
    jQuery.prototype = {
        constructor:jQuery,
        init:function (selector) {
            //.........入口函数
        }
    };

    //03 设置init构造函数的原型对象为jQuery的原型对象
    jQuery.prototype.init.prototype = jQuery.prototype;

    //04 设置fn属性
    jQuery.fn = jQuery.prototype;

    //05 把jQuery和$绑定给window全局对象
    window.$ = window.jQuery = jQuery;
})(window);
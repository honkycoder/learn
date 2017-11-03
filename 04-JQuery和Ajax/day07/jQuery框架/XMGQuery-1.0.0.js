/**
 * Created by wendingding on 17/6/21.
 */

(function (window,undefined) {

    //01 提供jQuery工厂函数
    var jQuery = function (selector) {
        return new jQuery.prototype.init(selector);
    };

    //02 设置jQuery的原型对象
    jQuery.prototype = {
        constructor:jQuery,
        init:function (selector) {
            //.........入口函数
            //01 条件判断为假
            if (!selector){ return this};

            //02 字符串
            if (typeof  selector == "string")
            {
                //001 代码片段
                //如何判断某个字符串是否是代码片段
                //开头< | 结尾 > |长度>=3
                if (selector.charAt(0) == "<" && selector.charAt(selector.length-1) ==">" && selector.length>=3)
                {
                    //如果是代码片段,那么会把代码片段中所有的一级标签作为key为0.1.2.对应的value保存
                    //创建代码片段(借助临时的标签)
                    var temp = document.createElement("div");
                    temp.innerHTML = selector;
                    var nodes = temp.children;       //获取所有的子标签
                    for(var i = 0;i<nodes.length;i++)
                    {
                        this[i] = nodes[i];
                    }

                    this.length = nodes.length;

                }else
                {
                    //002 选择器
                }
            }
        }
    };

    //03 设置init构造函数的原型对象为jQuery的原型对象
    jQuery.prototype.init.prototype = jQuery.prototype;

    //04 设置fn属性
    jQuery.fn = jQuery.prototype;

    //05 把jQuery和$绑定给window全局对象
    window.$ = window.jQuery = jQuery;
})(window);
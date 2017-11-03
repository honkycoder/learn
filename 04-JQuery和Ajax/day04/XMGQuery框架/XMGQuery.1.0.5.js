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
            //(2)字符串
            else if(Tool.isString(selector))
            {
                selector = Tool.trim(selector);
                //001 代码片段
                //(1)需要先判断是否是代码判断
                if(Tool.isHTML(selector))
                {
                    //(2) 获取参数中所有的一级标签
                    //创建临时的标签,生成代码片段
                    var temp = document.createElement("div");
                    temp.innerHTML  = selector;
                    var nodes = temp.children;

                    //(3) 把所有的标签都取出来保存到实例对象中(this)
                    //(4) 添加length属性
                    //Array.prototype.push.apply(o,arrT);
                    [].push.apply(this,nodes);
                }
                //002 选择器
                else {
                    //(1) 先获取页面中指定的所有标签
                    //(2) 遍历这些标签,并把这些标签添加到实例对象中
                    //(3) 设置length
                    [].push.apply(this,document.querySelectorAll(selector))
                }
            }
        }
    }
    
    //04 原型对象的赋值操作
    jQuery.fn.init.prototype = jQuery.fn;
    
    //05 把jQuery绑定给window
    window.$ = window.jQuery = jQuery;
    
    //把工具方法先放在对象中管理
    var Tool = {
        isString:function (str) {
            return typeof str == "string";
        },
        isHTML:function (html) {
            return html.charAt(0) == "<" && html.charAt(html.length - 1) ==">" && html.length >=3
     },
        trim:function (str) {
            //01 先判断当前环境是否支持已有的方法 trim
            //02 如果不支持那么就自己实现
            if(str.trim)
            {
                return str.trim();
            }else 
            {
                return str.replace(/^\s+|\s+$/g,"");
            }
        }
    }
})(window)
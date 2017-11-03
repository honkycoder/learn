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
            else if(isString(selector))
            {
                //"assds"
                //"<div></div>"
                //"<a>"
                //001 代码片段
                //(1)需要先判断是否是代码判断
                if(isHTML(selector))
                {
                    //console.log("是");
                    //(2) 获取参数中所有的一级标签
                    //创建临时的标签,生成代码片段
                    var temp = document.createElement("div");
                    temp.innerHTML  = selector;
                    var nodes = temp.children;
                    //console.log(nodes);
                    //console.log("___________");

                    //(3) 把所有的标签都取出来保存到实例对象中(this)
                    //for(var i=0;i<nodes.length;i++)
                    for(var i=0,len=nodes.length;i<len;i++)
                    {
                        this[i] = nodes[i];
                    }

                    //(4) 添加length属性
                    this.length = nodes.length;
                }
                //002 选择器
            }
        }
    }
    
    //04 原型对象的赋值操作
    jQuery.fn.init.prototype = jQuery.fn;
    
    //05 把jQuery绑定给window
    window.$ = window.jQuery = jQuery;
    
    function isString(str) {
        return typeof str == "string";
    }
    
    function isHTML(html) {
        return html.charAt(0) == "<" && html.charAt(html.length - 1) ==">" && html.length >=3
    }
    
})(window)
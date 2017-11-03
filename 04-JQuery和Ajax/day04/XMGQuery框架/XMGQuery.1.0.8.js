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
            //(0) 条件判断为假:返回空的实例对象
            if(!selector) {
                return this;
            }
           //(1) 函数
            else if(Tool.isFunction(selector))
            {
                //00 当代码执行到此处的时候DOM文档可能已经加载完毕了
                if(document.readyState == "complete")
                {
                    selector();
                    return;
                }

                //01 判断是否支持addEventListener方法
                if(document.addEventListener)
                {
                    //监听DOM加载,当DOM加载完毕之后调用selector回调函数
                    document.addEventListener("DOMContentLoaded",selector);
                }else {
                    //如果当前环境不支持addEventListener方法
                    //第一个参数:要监听的条件
                    //第二个参数:当条件发生那么就会执行后面的回调
                    document.attachEvent("onreadystatechange",function () {
                        //当DOM的状态发生改变就会执行这个回调函数
                        //DOM的状态[4]
                        //判断DOM文档当前的状态是否是complete,如果是那么就执行回调函数
                        if(document.readyState == "complete")
                        {
                            selector();
                        }
                    })
                }
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
            //(3) 数组
            else if(Tool.isArray(selector))
            {
                //console.log("数组");
                //selector 是数组
                [].push.apply(this,selector);
            }
            //(4) 伪数组
            else if(Tool.isLikeArray(selector))
            {
                //伪数组 -- > 数组
                //尝试的处理方式1：包含length和不相干的value值
                /*
                var arrM = [];
                for(var key in selector)
                {
                    arrM.push(selector[key]);
                }*/


                var arrM = [].slice.apply(selector);
                //selector 是对象，不能直接作为apply的参数传递
                [].push.apply(this,arrM);
            }
            //(5) 其他情况的处理
            else {
                //DOM|对象|数字
                this[0] = selector;
                this.length = 1;
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
        },
        isArray:function (arrT) {
            //01 检查是否支持isArray方法
            if(Array.isArray)
            {
                return Array.isArray(arrT);
            }else 
            {
                //02 不支持那么需要自己处理
                return Object.prototype.toString.call(arrT) == "[object Array]";
            }
        },
        isLikeArray:function (objT) {
            //判断某个对象是否是数组:
            //(1) 是对象  typeof obj == "object"
            //(2) 拥有length属性
            //(3) 拥有length-1的属性
            //(4) 这个对象不是window
            console.log("_________+++");
           return Tool.isObject(objT) && "length" in objT
               && (objT.length -1) in objT
               && !Tool.isWindow(objT);

        },
        isObject:function (obj) {
            return typeof obj == "object";
        },
        isWindow:function (obj) {
            return obj == window.window;
        },
        isFunction:function (fn) {
            return typeof fn == "function";
        }
    }
})(window)
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
            else if(jQuery.isFunction(selector))
            {
               this.ready(selector);
            }
            //(2)字符串
            else if(jQuery.isString(selector))
            {
                selector = jQuery.trim(selector);
                //001 代码片段
                //(1)需要先判断是否是代码判断
                if(jQuery.isHTML(selector))
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
            else if(jQuery.isArray(selector))
            {
                //console.log("数组");
                //selector 是数组
                [].push.apply(this,selector);
            }
            //(4) 伪数组
            else if(jQuery.isLikeArray(selector))
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
          
        },
        jquery:"1.2.0",
        length:0,
        selector:"",
        toArray:function () {
            //把jQuery实例对象转换为数组返回   实例对象是伪数组 --> 数组
            //伪数组  --> 数组
            return [].slice.apply(this);
        },
        ready:function (fn) {
            //00 当代码执行到此处的时候DOM文档可能已经加载完毕了
            if(document.readyState == "complete")
            {
                fn();
                return;
            }

            //01 判断是否支持addEventListener方法
            if(document.addEventListener)
            {
                //监听DOM加载,当DOM加载完毕之后调用selector回调函数
                document.addEventListener("DOMContentLoaded",fn);
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
                        fn();
                    }
                })
            }
        },
        get:function (index) {
            //(1) 如果没有传递参数，那么会把获取到的所有标签都添加到数组中返回  
            //(2) get(n) n>=0 获取第n+1个
            //(3) get(n) n<0  获取倒数第n个
            
            //001 判断是否传递参数
            if(arguments.length == 0)
            {
                //没有传递参数，返回数组
                return this.toArray();
                
            }else 
            {
                //002判断参数是正数
                if(index>=0)
                {
                   return this[index];
                }else {
                    //...........
                    //总共3个标签 length = 3
                    //-1 返回倒数第一个  2   3 + (-1)
                    //-2 返回倒数第二个  1   3 + (-2)
                    //-3 返回倒数第三个  0   3 + (-3)
                    var i = this.length + index;
                    return this[i];
                }
            }
            
        }
    }
    
    //04 原型对象的赋值操作
    jQuery.fn.init.prototype = jQuery.fn;
    
    //05 把jQuery绑定给window
    window.$ = window.jQuery = jQuery;
    
    //工具方法管理~
    //提供函数,该函数接收一个对象,作用是把对象中所有的方法都添加到jQuery
    //提供函数,该函数接收一个对象,作用是把对象中所有的方法都添加到jQuery的原型对象上面
    jQuery.prototype.extend = jQuery.extend = function (objT) {
        for(var i in objT)
        {
            this[i] = objT[i];
        }
    }
    //表示给jQuery添加静态方法
    jQuery.extend({
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
            return jQuery.isObject(objT) && "length" in objT
                && (objT.length -1) in objT
                && !jQuery.isWindow(objT);

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
    });
    //表示给jQuery的原型对象添加方法
    jQuery.prototype.extend({
        each:function () {
            console.log("each");
        },
        isGoodMan:function () {
            console.log("是个好人");
        }
    })

    jQuery.extend({
        //...........
    })


})(window)
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
            
        },
        eq:function (index) {
            //001 判断是否传递参数
            if(arguments.length == 0)
            {
                return $();

            }else
            {
                /*
                //002判断参数是正数
                if(index>=0)
                {
                    return $(this[index]);
                }else {
                    //...........
                    //总共3个标签 length = 3
                    //-1 返回倒数第一个  2   3 + (-1)
                    //-2 返回倒数第二个  1   3 + (-2)
                    //-3 返回倒数第三个  0   3 + (-3)
                    var i = this.length + index;
                    return $(this[i]);
                }*/
               return $(this.get(index));
            }

        },
        first:function () {
            return this.eq(0);
        },
        last:function () {
            return this.eq(-1);
        },
        push:[].push,
        sort:[].sort,
        slice:[].slice,
        each:function (fn) {
            //jQuery.each(this,fn);
            //console.log("+2B++");
            $.each(this,fn);
        },
        map:function (fn) {
            console.log("++++");
            //01 判断是数组或者是伪数组,使用for循环遍历
            if(jQuery.isArray(this) || jQuery.isLikeArray(this))
            {
                console.log("++++");
                for(var i = 0,len = this.length;i<len;i++)
                {
                    var res = fn.call(this[i],i,this[i]);
                    if(res == false) continue;
                }
            }
            //02 对象使用for..in
            else if(jQuery.isObject(this))
            {
                for(var key in this)
                {
                    var res = fn.call(this[key],key,this[key]);
                    if(res == false) continue;
                }
            }
        },
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
            //console.log("_________+++");
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
    //jQuery.prototype.extend()

    jQuery.extend({
        each:function (objT,fn) {
            //01 判断是数组或者是伪数组,使用for循环遍历
            if(jQuery.isArray(objT) || jQuery.isLikeArray(objT))
            {
                for(var i = 0,len = objT.length;i<len;i++)
                {
                    //key ==》i
                    //value ==》元素 objT[i];
                    //绑定fn这个函数内部的this,让这个this绑定给value
                    //window.fn(i,objT[i]);
                    //第一个参数：objT[i] 绑定给fn这个函数内部的this的值 其实就是value
                    //第二个和第三个参数：传递给fn的实参
                    //window.fn.call(objT[i],i,objT[i])
                    var res = fn.call(objT[i],i,objT[i]);
                    /*
                    var obj = {
                        showName:function (index,value) {
                            
                        }
                    }
                    
                    var o ={}
                    obj.showName.call(o,i,23);
                    */
                    
                    //判断函数调用的返回值是否是false
                    //如果是false那么就终止循环
                    
                    if(res == false) break;
                 
                }
            }
            //02 对象使用for..in
            else if(jQuery.isObject(objT))
            {
                for(var key in objT)
                {
                    //fn(key,objT[key]);
                    var res = fn.call(objT[key],key,objT[key]);
                    if(res == false) break;
                }
            }
        },
        map:function (objT,fn) {
            
            var arrT =[];
            //01 判断是数组或者是伪数组,使用for循环遍历
            if(jQuery.isArray(objT) || jQuery.isLikeArray(objT))
            {
                for(var i = 0,len = objT.length;i<len;i++)
                {
                   var res =  fn(objT[i],i);
                    arrT.push(res);
                }
            }
            //02 对象使用for..in
            else if(jQuery.isObject(objT))
            {
                for(var key in objT)
                {
                    var res = fn(objT[key],key);;
                    arrT.push(res);
                }
            }
            
            return arrT;
        },
    })
    
    //操作HTML的方法
    jQuery.fn.extend({
        html:function (html) {
            //对参数进行区分:有参数 | 没有参数
            if(arguments.length == 0)
            {
                return this[0].innerHTML;
            }else 
            {
                //遍历所有的标签,替换innerHTML的值
                this.each(function (index,value) {
                    //得到当前的标签 - value - this
                    this.innerHTML = html;
                })
            }
            
            return this;
        },
        text:function (text) {
            //01 没有参数[拼接]
            if(arguments.length == 0)
            {
                var res = "";
                this.each(function (index,value) {
                    res += value.innerText;
                })
                return res;
            }
            //02 参数替换
            else {
                //遍历所有的标签,替换innerHTML的值
                this.each(function () {
                    //得到当前的标签 - value - this
                    this.innerText = text;
                })
            }
            
            return this;
        },
        empty:function () {
            //遍历当前的实例对象，清空每个标签的内容
            // for(var i in this)
            // {
            //     this[i].innerHTML = "";
            // }
            $.each(this,function () {
                //this -> value ->当前的标签
                this.innerHTML = "";
            })
        },
        remove:function () {
            $.each(this,function (index,value) {
                //value - 当前的标签
                //this
                this.remove();
            })
        },
        appendTo:function (e) {
            
            //00 初始化数组
            var arrT = [];
            //01 没有传递参数
            if(arguments.length == 0)
            {
                return $();
            }else 
            {
                //02 如果传递了参数:
                e = $(e);
                
                //03 遍历当前的jQuery实例对象
                //this -- >所有的li标签
                this.each(function (index,liItem) {
                    //value - >liItem ->当前的li标签

                    //遍历所有的div标签(e)
                    e.each(function (i,divItem) {
                        var temp;
                        if(i == 0)
                        {
                            temp = liItem;
                        }else
                        {
                            temp = liItem.cloneNode(true);
                        }
                        //divItem - >this - >当前的div标签
                        this.appendChild(temp);
                        arrT.push(temp);
                    })
                })
                
                return $(arrT);
            }
        },
        prependTo:function (e) {
            //00 初始化数组
            var arrT = [];
            //01 没有传递参数
            if(arguments.length == 0)
            {
                return $();
            }else
            {
                //02 如果传递了参数:
                e = $(e);
                //03 遍历当前的jQuery实例对象
                //this -- >所有的li标签
                this.each(function (index,liItem) {
                    //value - >liItem ->当前的li标签

                    //遍历所有的div标签(e)
                    e.each(function (i,divItem) {
                        var temp;
                        if(i == 0)
                        {
                            temp = liItem;
                        }else
                        {
                            temp = liItem.cloneNode(true);
                        }
                        //divItem - >this - >当前的div标签
                        //插入到内容的前面
                        //insertBefore
                        //this.appendChild(temp);
                        this.insertBefore(temp,this.lastChild);
                        arrT.push(temp);
                    })
                })
                return $(arrT);
            }
        },
        append:function (e) {
            //01 如果没有参数，返回空的对象
            if(arguments.length == 0)
            {
                return this;
            }else if(jQuery.isObject(e))
            {
                //如果是对象
                //$("li").append($("div")); //== $("div").appendTo($("li"));
                //$("li") ==> this
                //$("div")==> e
                //this.append(e) == > e.appendTo(this)
                $(e).appendTo(this);
                return this;
            }else 
            {
                //其他情况：字符串 | 数字 | 布尔值
                //遍历实例对象，拼接内部的innerHTML
                $.each(this,function (index,value) {
                    //拿到当前的标签 this
                    this.innerHTML = this.innerHTML +  e;
                })
            }


        }
    })
    
})(window)
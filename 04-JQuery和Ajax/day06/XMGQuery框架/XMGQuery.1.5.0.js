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


        },
        prepend:function (e) {
            //01 如果没有参数，返回自己
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
                $(e).prependTo(this);
                return this;
            }else
            {
                //其他情况：字符串 | 数字 | 布尔值
                //遍历实例对象，拼接内部的innerHTML
                $.each(this,function (index,value) {
                    //拿到当前的标签 this
                    this.innerHTML = e + this.innerHTML ;
                })
            }


        }
    })
    
    //操作CSS的方法
    jQuery.fn.extend({
        attr:function (param1,param2) {
            //(1) 先判断是否有参数,如果没有传递参数那么就直接抛出异常
            if(arguments.length == 0 || (!jQuery.isString(param1) && !jQuery.isObject(param1)))
            {
                throw "请传递正确的参数！";
            }
            //(2) 如果有参数:
            else if(arguments.length == 1)
            {
                //001 一个参数的情况
                if(jQuery.isString(param1))
                {
                    // =>1)字符串 getAttribute 
                    return this[0].getAttribute(param1);
                }else if(jQuery.isObject(param1))
                {
                    //var obj = {"color":"red","sex":"nan"}
                    // =>2）对象  双重循环 setAttribute
                    this.each(function (index,value) {
                        //index --> 0.1.2.3....
                        //value --> 当前的标签 ---> this
                        var that = this;
                        $.each(param1,function (key,vue) {
                            that.setAttribute(key,vue);
                        })
                    })
                    
                    return this;
                }
            }else if(arguments.length == 2)
            {
                //002 两个参数的情况 => 遍历所有的标签，key-value的形式添加
                this.each(function (index,ele) {
                    //设置
                    //this -- > ele -- >当前的div标签
                    this.setAttribute(param1,param2);
                })
                
                return this;
            }
            
           
        },
        removeAttr:function (name) {
            //01 没有参数
            if(name)
            {
                //02 有参数的情况
                //遍历所有的标签,把这些标签中指定的属性节点删除
                this.each(function () {
                    //得到当前的标签 this
                    this.removeAttribute(name);
                })
            }
            return this;
        },
        prop:function (param1,param2) {
            //(1) 先判断是否有参数,如果没有传递参数那么就直接抛出异常
            if(arguments.length == 0 || (!jQuery.isString(param1) && !jQuery.isObject(param1)))
            {
                throw "请传递正确的参数！";
            }
            //(2) 如果有参数:
            else if(arguments.length == 1)
            {
                //001 一个参数的情况
                if(jQuery.isString(param1))
                {
                    // =>1)字符串 getAttribute
                    return this[0][param1];
                }else if(jQuery.isObject(param1))
                {
                    //var obj = {"color":"red","sex":"nan"}
                    // =>2）对象  双重循环 setAttribute
                    this.each(function (index,value) {
                        //index --> 0.1.2.3....
                        //value --> 当前的标签 ---> this
                        var that = this;
                        $.each(param1,function (key,vue) {
                            //that.setAttribute(key,vue);
                            that[key] = vue;
                        })
                    })

                    return this;
                }
            }else if(arguments.length == 2)
            {
                //002 两个参数的情况 => 遍历所有的标签，key-value的形式添加
                this.each(function (index,ele) {
                    //设置
                    //this -- > ele -- >当前的div标签
                    //this.setAttribute(param1,param2);
                    this[param1] = param2;
                })

                return this;
            }


        },
        removeProp:function (name) {
            //01 没有参数
            if(name)
            {
                //02 有参数的情况
                //遍历所有的标签,把这些标签中指定的属性节点删除
                this.each(function () {
                    //得到当前的标签 this
                    //删除对象的属性 注意点:在删除的时候使用[]语法
                    delete this[name];
                })
            }
            return this;
        },
        css:function (param1,param2) {

            if(typeof param2 == "number")
            {
                param2 += "px";
                console.log(param2);
            }

            //(1) 先判断是否有参数,如果没有传递参数那么就直接抛出异常
            if(arguments.length == 0 || (!jQuery.isString(param1) && !jQuery.isObject(param1)))
            {
                throw "请传递正确的参数！";
        }
            //(2) 如果有参数:
            else if(arguments.length == 1)
            {
                //001 一个参数的情况
                if(jQuery.isString(param1))
                {
                    // =>1)字符串 getAttribute
                    //获取指定的样式
                    return jQuery().getStyle(this[0],param1);
                    //return this[0][param1];
                }else if(jQuery.isObject(param1))
                {
                    //var obj = {"color":"red","sex":"nan"}
                    // =>2）对象  双重循环 setAttribute
                    this.each(function (index,value) {
                        //index --> 0.1.2.3....
                        //value --> 当前的标签 ---> this
                        var that = this;
                        $.each(param1,function (key,vue) {
                            //that.setAttribute(key,vue);

                            if(typeof vue == "number")
                            {
                                vue += "px";
                            }
                            that.style[key] = vue;
                        })
                    })

                    return this;
                }
            }else if(arguments.length == 2)
            {
                //console.log("+++++++");
                //002 两个参数的情况 => 遍历所有的标签，key-value的形式添加
                this.each(function (index,ele) {
                    //设置
                    //this -- > ele -- >当前的div标签
                    //this.setAttribute(param1,param2);
                    //console.log(index, ele);
                    //如果是数字就拼接

                    this.style[param1] = param2;
                })

                return this;
            }


        },
        getStyle:function (dom,name) {
            //该方法接收两个参数:第一个参数DOM对象,第二个参数要获取该DOM对象的什么样式
            if (window.getComputedStyle)
            {
                return window.getComputedStyle(dom)[name];
            }else
            {
                return dom.currentStyle(name);
            }
        },
        val:function (vue) {
            //01 有参数
            if(arguments.length == 1)
            {
                //遍历所有的标签,设置这些标签的value的值
                this.each(function (index,ele) {
                    this["value"] = vue;
                })
                return this;
            }else 
            {
                return this[0]["value"];
            }
        }
    })
    
    //操作Class的方法
    jQuery.fn.extend({
        hasClass:function (str) {
            var flag = false;
            str = " " + str + " ";

            //遍历所有的标签,一个一个的匹配
            this.each(function (index,ele) {
                //ele - 当前的标签 --this
                //01 先获取当前标签的class 
                //" aa "
                //" aa bb cc "
                //var classStr = this.getAttribute("class");
                var classStr = " " + this.className + " ";
                console.log(classStr);
                console.log(str);
                console.log(classStr.indexOf(str));
                if(classStr.indexOf(str) != -1)
                {
                    flag = true;
                    //找到了,那么需要终止循环
                    return false;
                }
            })
            
            return flag;
        },
        addClass:function (classT) {
            //(1) 先判断是否传递了字符串参数,如果传递了字符串参数,那么:
            if(jQuery.isString(classT))
            {
                //① 把字符串传参数切割成数组
                var classArray = classT.split(" ");
                console.log(classArray);
                
                //② 遍历数组,判断每个标签
                for(var i = 0;i<classArray.length;i++)
                {
                    var classStr = classArray[i];
                    //"demo"
                    //③ 遍历实例对象,检查每一个标签
                    this.each(function (index,dom) {
                        //dom - this - 当前的div标签
                        if(!$(this).hasClass(classStr))
                        {
                            //如果当前的标签中没有指定的class,那么就添加
                            //得到当前标签的class,拼接在后面
                            //var className = this.className + " " + classStr;
                            this.className = jQuery.trim(this.className +" " + classStr);
                        }
                    })
                }
            }
            
            //(2) 如果没有传递参数或者是传递的参数不是字符串,返回实例对象
            return this;
        },
        removeClass:function (classT) {
            //(1) 没有传递参数 把所有标签的class都清空
            if(classT == undefined)
            {
                 this.each(function (index,dom) {
                     //dom - this - 当前的标签
                     this.className ="";
                 })   
            }
            //(2) 传递了字符串参数
            else if(jQuery.isString(classT))
            {
                //001 切割传入的参数,数组 ["aa","bb"];
                var classArray = classT.split(" ");
                
                var self = this;
                //002 遍历数组(for),每循环一次就拿到当前的元素去判断,一个一个的检查div
                //如果存在,那么就删掉该class (replace方法)
                $.each(classArray,function (index,value) {
                    //index : 0 . 1. 2...
                    //value : "aa" "bb"
                    var classItem = " " + classArray[index] + " ";
                    
                    //003 遍历实例对象
                    self.each(function (key,dom) {
                        //key : 0 1 2 3
                        //dom - this - 当前的标签
                        //(1) 首先先得到当前标签的class 拼接空格
                        var classNameStr = " " + this.className + " ";
                        //(2) 检查当前class字符串中是否包含参数 比如“aa”
                        if(classNameStr.indexOf(classItem) !=-1)
                        {
                            console.log("___");
                           // console.log(classNameStr.replace(classItem, " "));;
                            this.className = jQuery.trim(classNameStr.replace(classItem, " "));
                        }
                    })
                })
            }

            return this;
        },
        toggleClass:function (classT) {
            //01 没有参数
            if(arguments.length == 0)
            {
                this.removeClass();
            }
            else if(jQuery.isString(classT))
            {
                //切割成数组，然后遍历数组
                var classArray = classT.split(" ");
                var self = this;
                $.each(classArray,function (index,value) {
                    //index 下标 0 1 2
                    //value 元素 "aa" | "bb"
                    var currentClass = value;
                    $.each(self,function (i,dom) {
                        //判断当前的标签中是否存在指定的class
                        //dom - this 实例对象中的一个标签
                        //self 实例对象
                        if($(dom).hasClass(currentClass))
                        {
                            //如果有，那么就把该class删除
                            $(dom).removeClass(currentClass);
                        }else {
                            //如果不存在，那么就添加
                            $(dom).addClass(currentClass);
                        }
                    })
                    
                })
            }
            
            return this;
        }
    })

    //操作事件的方法
    jQuery.extend({
        addEvent:function (dom,eventType,callBack) {

            //00 如何判断dom是标签?  nodeType == 1
            //01 参数校验
            if(!jQuery.isFunction(callBack) || !jQuery.isString(eventType) || dom.nodeType !=1)
            {
                alert("参数错误");
                return;
            }

            //02 给标签添加事件
            if(dom.addEventListener)
            {
                //第一个参数:要监听的事件
                //第二个参数:事件发生后的回调函数
                dom.addEventListener(eventType,callBack);
            }else
            {
                //第一个参数:事件
                //第二个参数:回调
                dom.attachEvent("on" +eventType,callBack);
            }
        },
        removeEvent:function (dom,eventType,callBack) {

            //00 如何判断dom是标签?  nodeType == 1
            //01 参数校验
            if(!jQuery.isFunction(callBack) || !jQuery.isString(eventType) || dom.nodeType !=1)
            {
                alert("参数错误");
                return;
            }

            //02 给标签添加事件
            if(dom.removeEventListener)
            {
                //第一个参数:要监听的事件
                //第二个参数:事件发生后的回调函数
                dom.removeEventListener(eventType,callBack);
            }else
            {
                //第一个参数:事件
                //第二个参数:回调
                dom.detachEvent("on" +eventType,callBack);
            }
        }
    })
    
    jQuery.fn.extend({
        on:function (eventType,callBack) {
            //批量给指定的标签添加事件
            this.each(function (index,ele) {
                //ele - 当前标签 --this
                jQuery.addEvent(this,eventType,callBack);
            })
            
            return this;
        },
        off:function (eventType,callBack) {
            //批量给指定的标签添加事件
            this.each(function (index,ele) {
                //ele - 当前标签 --this
                jQuery.removeEvent(this,eventType,callBack);
            })

            return this;
        },
        click:function (callBack) {
            this.on("click",callBack);
        },
        mouseenter:function (callBack) {
            this.on("mouseenter",callBack);
        },
        mouseleave:function (callBack) {
            this.on("mouseleave",callBack);
        },
    })
})(window)
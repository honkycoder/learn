/**
 * Created by Administrator on 2017/7/6.
 */

$(function () {

    //store.clear();
    // console.log(store.get("itemArray"));
    /*
    * 01 吸顶效果的实现
    * */
    //000 获取nav标签距离窗口顶部的数值
    var nav_top = $(".nav").offset().top;
    //console.log(nav_top);
    //001 监听页面的滚动
    $(window).on("scroll",function () {
        //console.log("页面滚动");
        //002 得到滚动条距离顶部的距离
        var top = $(window).scrollTop();
        //console.log(top);
        //003 判断当前的距离是否超过临界值
        if(top > nav_top)
        {
            //004 设置nav标签的样式：定位-阴影效果-图片显示
            $(".nav").css({
                "position":"fixed",
                "box-shadow":"0 1px 3px rgba(0,0,0,.3)",
                "top":0
            })

            $(".nav img").css({
                "opacity":1
            })
        }else
        {
            $(".nav").css({
                "position":"absolute",
                "box-shadow":"none",
                "top":nav_top
            })

            $(".nav img").css({
                "opacity":0
            })
        }
    })


    /*
    * 02 返回顶部
    * */
    $(window).on("scroll",function () {
        //002 得到滚动条距离顶部的距离
        var top = $(window).scrollTop();
        //003 判断当前的距离是否超过临界值
        if(top > nav_top)
        {
           $(".back_top").stop().fadeIn();
        }else
        {
            $(".back_top").stop().fadeOut();
        }
    })
    //004 给小火箭添加点击事件
    $(".back_top").click(function () {
        //alert(123);
        $("html body").animate({
            "scrollTop":0
        })
    })

    /*
    * 03 添加数据
    * */

    //000 初始化空的数组
    var itemArray = store.get("itemArray") || [];
    if(itemArray)
    {
        rend_View();
    }

    //001 给“添加”标签添加点击事件的监听
    $(".nav_right input[type=submit]").click(function () {
        //alert(123);
        //002 获取文本框的内容
        var title = $(".nav_right input[type=text]").val();

        //003 创建对象，用来描述一条数据
        var item = {
            title:title,
            isCheck:false,
            detailInfo:"",
            time:"",
            isNotice:""
        }
        //store.set("item",item);
        //console.log(store.get("item"));
        itemArray.push(item);
        rend_View();
    })

    function rend_View() {

        //把数据保存到缓存中
        store.set("itemArray",itemArray);

        //先把之前的内容清空
        $(".task").empty();
        $(".finish_task").empty();
        //遍历数组，根据数组的内容创建标签，并且添加到页面中
        //判断当前的元素是否是undefined，如果是undefined
        // $.each(itemArray,function (index,item) {
        //     var temp = '<li data-xmg='+index+'>'+
        //        '<input type="checkbox">'+
        //         '<span class="title">'+item.title+'</span>'+
        //         '<span class="detail">详情</span>'+
        //         '<span class="del">删除</span>'+
        //         '</li>';
        //     $(".task").prepend(temp);
        // })

        for(var i = 0;i<itemArray.length;i++)
        {
            var item = itemArray[i];
            if(item == undefined) continue;
            var temp = '<li data-xmg='+i+'>'+
                '<input type="checkbox" '+(item.isCheck?'checked':'')+'>'+
                '<span class="title">'+item.title+'</span>'+
                '<span class="detail">详情</span>'+
                '<span class="del">删除</span>'+
                '</li>';

            if(item.isCheck)
            {
                $(".finish_task").prepend(temp);
            }else
            {
                $(".task").prepend(temp);
            }

        }

        $(".task li:first").hide().slideDown();
    }

    /*
    * 04 删除数据的操作
    * */
    //001 通过事件委托给删除标题添加点击事件
    $(".body").on("click",".del",function () {
        //alert(1243);
        var parent = $(this).parent();
        //002 获取要删除的是那条数据
        var index = parent.data("xmg");
        //alert(index);

        //003 把数组中对应的数据删除,值是undefined
        delete itemArray[index];
        console.log(itemArray);
        //004 把UI页面中指定的数据删除（更新UI界面）
        parent.slideUp(200,function () {
            parent.remove();
        })

        //005 更新缓存中的数据
        store.set("itemArray",itemArray);

    })

    /*
    * 05 tab切换
    * */
    //001 监听li标签的点击
    $(".header li").click(function () {
       // alert(1234);
        $(this).addClass("cur").siblings().removeClass("cur");
        //获取当前li标签的角标
        var index = $(this).index();
        //切换active
        $(".content .body").eq(index).addClass("active").siblings().removeClass("active");
    })

    /*
    * 06 标记完成
    * 001 监听点击复选框
    * 002 获取当前的选中状态
    * 003 重新设置对应的数组数据中的选中状态isCheck
    * 004 刷新页面
    * */
    $(".body").on("click","input",function () {
        //alert();
        //002 获取当前的选中状态
        var flag = $(this).is(":checked");
        //003 重新设置对应的数组数据中的选中状态isCheck
        var parent = $(this).parent();
        var index = parent.data("xmg");
        var item = itemArray[index];
        console.log(item);
        item.isCheck = flag;
        itemArray[index] = item;

        //004 刷新页面
        rend_View();
    })

    var currentIndex;
    /*
    * 07 展示详细信息
    * 001 完成界面的搭建
    * 002 监听详情标签的点击事件
    * 003 蒙版展示出来，弹出标签
    * 004 根据数组中的对象来设置标签的内容并且显示出来
    *
    *
    * 关闭mask
    * 001 监听mask的点击事件
    * 002 监听close关闭标签的点击事件
    * */
    $(".body").on("click",".detail",function () {
        //alert(123);
        //console.log($(".mask"));
        $(".mask").fadeIn();

        var parent = $(this).parent();
        var index = parent.data("xmg");
        var item = itemArray[index];
        currentIndex = index;

        $(".detail_header .title").text(item.title);
        $(".detail_body textarea").val(item.detailInfo);
        $("#dateTime").val(item.time)

    });

    $(".mask").click(function () {
        $(this).fadeOut();
    })

    $(".detail_content").click(function (e) {
        //阻止事件冒泡
        e.stopPropagation();
    })

    $(".close").click(function () {
        $(".mask").fadeOut();
    })

    /*
    * 08 更新详细信息
    * 001 监听更新按钮的点击事件
    * 002 获取当前弹出框中指定标签对应的值，并且设置给数组
    * 003 更新本地的缓存
    * 004 关闭蒙版
    * */
    $(".update").click(function () {
        var item = itemArray[currentIndex];

        item.title = $(".detail_header .title").text();
        console.log("====",$(".detail_body textarea"));
        item.detailInfo = $(".detail_body textarea").val();
        item.time = $("#dateTime").val()
        itemArray[currentIndex] = item;
        console.log("+++++");
        console.log(itemArray);
        //更新缓存
        store.set("itemArray",itemArray);

        $(".mask").fadeOut();

    });

    /*
    * 09 日期插件的处理
    * */
    $.datetimepicker.setLocale("ch");
    $("#dateTime").datetimepicker();

    /*
    * 10 提醒功能的实现
    *
    * 001 开启定时器
    * 002 获取当前的时间
    * 003 遍历数组，获取数组中每个元素中time的值
    * 004 拿当前的时间和time的值进行比较，如果时间到，那么就提醒
    * */
    setInterval(function () {

        var currentTime = (new Date()).getTime();
        for(var i = 0;i<itemArray.length;i++)
        {
            var obj = itemArray[i];
            if(!obj || obj.isNotice) continue;
            console.log(obj);
             var tempTime = new Date(obj.time).getTime();
             console.log(tempTime);

            if(currentTime >tempTime)
             {
                 console.log("______");
                 $("video").get(0).play();
                 obj.isNotice = true;

                 itemArray[i] = obj;
                 store.set("itemArray",itemArray);
             }
        }
    },2000);
});
/**
 * Created by Administrator on 2017/7/6.
 */

$(function () {

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
        //遍历数组，根据数组的内容创建标签，并且添加到页面中
        $.each(itemArray,function (index,item) {
            var temp = '<li>'+
               '<input type="checkbox">'+
                '<span class="title">'+item.title+'</span>'+
                '<span class="detail">详情</span>'+
                '<span class="del">删除</span>'+
                '</li>';
            $(".task").prepend(temp);
        })

        $(".task li:first").hide().slideDown();
    }
});
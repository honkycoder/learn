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
});
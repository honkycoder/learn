/**
 * Created by Administrator on 2017/7/15.
 */

    window.onload = function () {
        // 1头部透明度:
        topBarAlpha();
        //  2自动无限轮播:
        activeBanner();
        // 3.秒杀倒计时
        seckillTimer();
    }

// 仅仅是在pc浏览器上测试使用
window.onresize = function () {
    setTimeout(function () {
        window.location.reload();
    }, 200);
}

/*
* 1.头部透明度:
 alpha取值范围:[0,0.8];
 UI作用范围: body.scrollTop在[0, bannerH]之间
* */
function topBarAlpha() {
    // 1.获取元素
    var topbar = document.getElementById('jd_topbar');
    var banner = document.getElementById('jd_banner');

    // 2.拿到一些使用参数
    var maxAlpha = 0.8;
    var bannerH = banner.offsetHeight;
    var scrollH = 0;
    var alpha = 0;

    // 3.在界面滚动时
    window.onscroll = function () {

        // 3.1 获取当前滚动了多少
        scrollH = document.body.scrollTop;
        // 3.2 根据scrollH为alpha赋值
        if(scrollH > bannerH){
            alpha = maxAlpha;
        }else if(scrollH >= 0 && scrollH <= bannerH){
            alpha = maxAlpha * (scrollH/bannerH);
        }
        // 3.3 赋值 rgba(201, 21, 35, 0.8)  字符串+数字+字符串 = 字符串
        topbar.style.background = 'rgba(201, 21, 35, ' + alpha + ')';
    }
}

/*
*2.焦点图: 业务逻辑主要分两部分

 自动无限轮播:
 1.定时器每duration秒过渡滚动一次
 2.过渡结束后:
 index范围判断,若滚动到边界则进行index转移以及非过渡位移
 切换白点
 手势滑动
 1.手势开始时停止计时器
 2.滑动手势期间:
 - 清除默认事件event.preventDefault
 - 非过渡滚动:切换x值=当前x值+movedX
 3.手势结束
 - 根据movedX,确定index--/++or不动,并过渡翻页，过渡恢复到当前的整页
 - 重启定时器
 - 数据重置(optional)
* */
function activeBanner() {
    // 1.拿到标签
    var banner = document.getElementById('jd_banner');
    var ul_box = banner.getElementsByTagName('ul')[0];
    var ol_box = banner.getElementsByTagName('ol')[0];
    // 相当于ul中的li数组
    var img_array = ul_box.getElementsByTagName('li');
    var pages = ol_box.getElementsByTagName('li');

    // 2.设定参数
    var imgW = banner.offsetWidth;
    var timer;
    var duration = 1000; // 1000ms = 1s
    var index = 1; // 由于初始显示的是第二个img所以下标不是从0开始，是从1开始
    var ul_left = -imgW * index;

    // 3.设置transition与transform相关
    // 3.1 设置过渡
    var setTransition = function () {
        ul_box.style.transition = 'all .2s ease';
        ul_box.style.webkitTransition = 'all .2s ease';
    }
    // 3.2 移除过渡
    var removeTransition = function () {
        ul_box.style.transition = 'none';
        ul_box.style.webkitTransition = 'none';
    }
    // 3.3 设置水平转换
    var translateX = function (x) {
        ul_box.style.transform = 'translateX(' + x + 'px)';
        ul_box.style.webkitTransform = 'translateX(' + x + 'px)';
    }

    // 4.开始滚动
    timer = setInterval(scollImgs, duration);
    function scollImgs() {
        // 4.1 确定当前滚到哪张图片
        index ++;
        // 4.2 拿到当前ul的最左边在水平方向上的位置（以屏幕左边为原点）
        ul_left = -imgW * index;
        // 4.3 过渡位移
        setTransition();
        translateX(ul_left);
    }
    // 5.利用视差实现无线滚动
    ul_box.addEventListener('transitionend', function () {
        // 5.1 保持index取值安全
        // img_array.length - 1 = 9
        // img_array.length - 2 = 8
        if(index >= 9){
            index = 1;
        }else if(index <= 0){
            index = 8;
        }

        // 5.2 悄悄的让ul_left值变化
        ul_left = -imgW * index;
        removeTransition();
        translateX(ul_left);
        
        // 5.3 让curPage小原点跟随变化
        curPageChange();
    });
    
    function curPageChange() {
        // 1.remomve class name for cur
        for (var i = 0; i < pages.length; i++){
            pages[i].className = '';
        }

        // 2.设置curPage的className
        // index 取值是 1-8 ，要变【0-7】 只需-1
        pages[index - 1].className = 'current';

        // 3.注意：如果curPageChange不是在transitionend中执行，你需要对index做相同的安全处理
    }


/******************** 手势滑动*****************************/
    // 一。添加手势们

    var startX,movingX,changedX;
    startX = 0;
    movingX = 0;
    changedX = 0;
    var tempX = 0;
    // 1.1 touchstart 开始触摸
    ul_box.addEventListener('touchstart', function (e) {
        // 清除定时器
        clearInterval(timer);
        // 记录开始的x值
        startX = e.touches[0].clientX;
    });
    // 1.2 touchmove 开始滑动手势
    ul_box.addEventListener('touchmove', function (e) {
        // 记录移动中的x值
        movingX = e.touches[0].clientX;
        // 拿到位移向量（距离和方向）
        changedX = movingX - startX;
        if(changedX){
            e.preventDefault();
            tempX = ul_left + changedX;
            removeTransition();
            // 需要做一下作用范围处理，但是由于刚才的bug在真机情况下不会出现，所以先忽略
            translateX(tempX);
        }
    });
    // 1.3 touchend 结束触摸
    ul_box.addEventListener('touchend', function (e) {
        // ul_left = tempX;
        // 需要在手势结束的时候，显示整页
        if (changedX > imgW * 0.49){ // 往右手势滑动超过一半的imgW
            index --;
        }else if (changedX < - imgW * 0.49){ // 往左手势滑动超过一半的imgW
            index ++
        }else {

        }
        // 根据index变化与否得到ul_left应该到大的位置
        ul_left = -index * imgW;
        setTransition();
        translateX(ul_left);

        // 重启定时器
        timer = setInterval(scollImgs, duration);

        // optional临时参数还原
        startX = 0;
        movingX = 0;
        changedX = 0;
        tempX = 0;
    });
}

/*
*
*3.秒杀倒计时

 假设 每天3场抢购 0点场 8点场 16点场
 当前处于 1.x点场 2.离下一场还剩多少时间 3.每秒展示一次

假设下一场是 18点场

17:00:00  01:00:00
17:30:00  00:30:00
17:30:01  00:29:59

* */
function seckillTimer() {
    // 1.拿到标签
    var seckill_left = document.getElementById('seckill_header_left');
    var nth = seckill_left.getElementsByTagName('em')[0];
    var spans = seckill_left.getElementsByTagName('span');

    // 2.获取用到参数
    var cur_nth = 0;
    var now;
    var nowH = 0;
    var nowM = 0;
    var nowS = 0;
    var nth_duration = 2;

    var leftH,leftM,leftS;

    // 3.开始计时
    var timer = setInterval(function () {
        // 3.1 拿到当前的时间
        now = new Date();
        nowH = now.getHours();
        nowM = now.getMinutes();
        nowS = now.getSeconds();

        if(nowH > 0 && nowH < 8){ // 当前处于0点场，倒计时是到8点的时差
            cur_nth = 0;
            leftH = (nowM == 0 && nowS == 0) ? (8 - nowH): (7 - nowH);
        }else {
            cur_nth = Math.floor(nowH / nth_duration) * nth_duration;
            // 当前处于cur_nth场
            leftH = (nowM == 0 && nowS == 0) ? (cur_nth + nth_duration - nowH): (cur_nth + nth_duration - 1 - nowH);
        }

        leftM = (nowS == 0)? (60 - nowM) :(59 - nowM);
        leftS = (nowS == 0)? 0: 60 - nowS;

        // 标签赋值
        nth.innerHTML = cur_nth;
        spans[1].innerHTML = leftH;
        spans[3].innerHTML = Math.floor(leftM/10);
        spans[4].innerHTML = leftM % 10;
        spans[6].innerHTML = Math.floor(leftS/10);
        spans[7].innerHTML = leftS % 10;
    }, 1000);

}
/**
 * Created by xmg on 2017/6/1.
 */


//封装匀速动画框架
function constant(obj,speed,target) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var speed1 = target>obj.offsetLeft?speed:-speed;
        obj.style.left = obj.offsetLeft+ speed1+'px';
        if(Math.abs(target-obj.offsetLeft)<Math.abs(speed1))
        {
            clearInterval(obj.timer);
            obj.style.left = target+'px';
        }

    },20);
}










//缓动动画

function buffer(obj,target) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var begin = obj.offsetLeft;
        var speed = (target-obj.offsetLeft)/20;
        speed = target>obj.offsetLeft?Math.ceil(speed):Math.floor(speed);
        obj.style.left = begin+speed+'px';

        //用begin值和target目标值做对比
        if(begin==target)
        {
            alert(0);
            //清除定时器
            clearInterval(obj.timer);
        }
    },20);
}

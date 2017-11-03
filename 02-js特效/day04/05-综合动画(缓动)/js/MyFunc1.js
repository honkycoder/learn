/**
 * Created by xmg on 2017/6/1.
 */




//{'width':800,'height':900,'left':100,'top':200}
function buffer(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        //定义一个旗帜(统一旗号)
        var isStop = true;
        //遍历
        for (var key in json) {
            var begin = parseInt(getCSSAttr(obj, key));
            var target = parseInt(json[key]);

            var speed = (target - begin) / 20;
            speed = target > begin ? Math.ceil(speed) : Math.floor(speed);
            obj.style[key] = begin + speed + 'px';

            //判断
            if (begin != target) {
                isStop = false;
            }
        }
        if (isStop) {
            clearInterval(obj.timer);
            //保证外部是否传入了回调,如果没有传入,有可能报错
            if (fn) {
                //执行回调
                fn();
            }

        }
    }, 20);
}
//封装一个获取css样式的函数
function getCSSAttr(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    }
    //火狐和谷歌以及ie高版本
    else {
        return getComputedStyle(obj, null)[attr];
    }
}
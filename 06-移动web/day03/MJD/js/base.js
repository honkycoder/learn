/**
 * Created by Administrator on 2017/7/15.
 */
window.mjd = {}


mjd.tap = function (obj, callback) {
    // 1.首先进行参数安全判断
    if (typeof(obj) != 'object'){
        console.log('obj is undefined!!!');
        return;
    }
    if(callback){ // 有回调再执行业务逻辑
        /* 1.只要'touchmove'触发，click就不会触发
         * 2.如果 'touchmove'不触发，但是 'touchend'与'touchstart'之间的间隔时间过长(超过600~700之间的某个ms值)，也会不触发click
         * */
        var isMoved = false;
        var startTimescamp = 0;
        
        const duration = 300;

        obj.addEventListener('touchstart', function (e) {
            startTimescamp = Date.now();
        });
        obj.addEventListener('touchmove', function (e) {
            isMoved = true;
        });
        obj.addEventListener('touchend', function (e) {
            if (isMoved == false && Date.now() - startTimescamp < duration){
                callback(e);
            }

            startTimescamp = 0;
            isMoved = false;
        });
    }
}

// 快捷栏的显示方式的切换
function changeShortcutState() {
    // 1.get elements
    var header = document.getElementById('jd_base_header');
    var btn = header.getElementsByClassName('icon_shortcut')[0];
    var shortcut = header.getElementsByClassName('jd_shortcut')[0];

    // 2.setting parameters
    var dispalyState = '';

    // 3.btn tap
    mjd.tap(btn, function (e) {
        // 3.1 查看当前的display: 注意:如果要取某个元素的display，那此元素的display必须写在元素行内  补充：window.getComputedStyle
        // console.log(window.getComputedStyle(shortcut)['display']);
        dispalyState = shortcut.style.display;
        // console.log(dispalyState);
        if (dispalyState == 'none'){
            shortcut.style.display = 'table';
        }else if (dispalyState == 'table'){
            shortcut.style.display = 'none';
        }
    })
}
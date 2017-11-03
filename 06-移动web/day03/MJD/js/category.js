/**
 * Created by Administrator on 2017/7/19.
 */
window.onload = function () {
//    设置内容高度
    getMainH();
//  让左边列表重新动起来
    activeList();

    // 切换快捷栏的显示
    changeShortcutState();
}

window.onresize = function () {
    setTimeout(function () {
        getMainH();
    }, 100);
}

// 设置内容高度
function getMainH() {
    // 1.get elements
    var header = document.getElementById('jd_base_header');
    var cateMain = document.getElementById('jd_category_main');

    // 2.setting parameters
    var headerH = header.offsetHeight;
    var screenH = window.screen.height;
    // console.log(window.screen.height);
    // console.log(window.screen.availHeight);
    var mainH = screenH - headerH;

    // 3.make the value for elements
    cateMain.style.height = mainH + 'px';

}


// 左边动起来
function activeList() {
    // 1.get elements
    var cateMain = document.getElementById('jd_category_main');
    var mainRight = cateMain.getElementsByClassName('jd_category_right')[0];
    var ul_box = cateMain.getElementsByTagName('ul')[0];
    var ul_father = ul_box.parentNode;

    // 2.setting parameters
    var fatherH = ul_father.offsetHeight;
    var ul_boxH = ul_box.offsetHeight;
    var ul_top = 0;
    var ul_maxTop = 0;
    var ul_minTop = fatherH - ul_boxH;
    const bufferH = 150;
    var ul_maxBufferTop = ul_maxTop + bufferH;
    var ul_minBufferTop = ul_minTop - bufferH;
    // 3.transition
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
    var translateY = function (y) {
        ul_box.style.transform = 'translateY(' + y + 'px)';
        ul_box.style.webkitTransform = 'translateY(' + y + 'px)';
    }
    // 4.setting temp
    var startY,movingY,changedY;
    startY = 0;
    movingY = 0;
    changedY = 0;
    var tempY;

    // 5.手势相关

    ul_box.addEventListener('touchstart', function (e) {
        startY = e.touches[0].clientY;
    });
    ul_box.addEventListener('touchmove', function (e) {
        movingY = e.touches[0].clientY;
        changedY = movingY - startY;
        if (changedY){
            e.preventDefault();

            removeTransition();
            tempY = ul_top + changedY;
            // 根据手势进行位移的允许范围
            if (tempY > ul_minBufferTop && tempY < ul_maxBufferTop){
                translateY(tempY);
            }
        }
    });
    ul_box.addEventListener('touchend', function (e) {
        // 0.记录top变化
        ul_top = tempY;
        // 此处好好理解下 数据与UI的分层处理
        // console.log(ul_top);
        // console.log(ul_box.style.transform);
        // 1.需要让ul_top回到安全范围
        if (ul_top > ul_maxTop){
            ul_top = ul_maxTop;

            setTransition();
            translateY(ul_top);
        }else if(ul_top < ul_minTop){
            ul_top = ul_minTop;

            setTransition();
            translateY(ul_top);
        }else { // 安全范围内
            removeTransition();
        }

        // temp变量还原
        startY = 0;
        movingY = 0;
        changedY = 0;
        tempY = 0;
    });

    // 给ulbox添加了tap事件

    // console.log(cur_li.parentNode.childNodes); 自己理解的坑
    var li_array = ul_box.getElementsByTagName('li');
    // 记录当前选中li的下标，每次切换选中跟随变化
    var seclectedIndex = 0;
    // console.log(li_array);
    for (var i = 0; i < li_array.length; i++){
        if (li_array[i].className == 'current'){
            seclectedIndex = i;
        }
        // 为了之后计算位移来给index赋值
        li_array[i].index = i;
    }
    mjd.tap(ul_box, function (e) {
        // console.log(e.target); 根据备课代码理解此处
        var cur_li = e.target;
        if (cur_li.className == 'current'){
            // console.log(cur_li.index);
            // 只让它过渡移动到顶部，不做其他处理
            ul_top = -cur_li.index * cur_li.offsetHeight;
            // console.log(ul_top);
            if(ul_top < ul_minTop){
                ul_top = ul_minTop;
            }
            setTransition();
            translateY(ul_top);

        /** 隐患分析
         * index可能是undefined，会导致过渡失效
         * 但是：当index是undefined情况时，只有刚加载进网页，同时又未进行选中切换的时候是如此，而此时ulbox根本不需要移动，所以隐患排除
         *
         * 隐患解决,尽量将 索引查询事件、for循环事件，放到重复执行的tap事件外面
         * */
        }else{
            // 先取消选中
            li_array[seclectedIndex].className = '';
            // 设置新的选中
            cur_li.className = 'current';
            seclectedIndex = cur_li.index;
            // 通过过渡移动ulbox
            // 让选中的li处于顶部
            ul_top = -cur_li.index * cur_li.offsetHeight;
            if(ul_top < ul_minTop){
                ul_top = ul_minTop;
            }
            setTransition();
            translateY(ul_top);

        //    模拟刷新效果
            mainRight.style.display = 'none';
            setTimeout(function () {
                mainRight.style.display = 'block';
            }, 200);
        }
    })
}


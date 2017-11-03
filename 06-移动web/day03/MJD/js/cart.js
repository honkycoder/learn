/**
 * Created by Administrator on 2017/7/19.
 */

window.onload = function () {
    // 切换快捷栏的显示
    changeShortcutState();
   //    垃圾篓的点击
    deleteBoxTap();
    // checkBox切换
    checkedStateChange();
}

function deleteBoxTap() {
    // 1.get elements
    var deleteBoxs = document.getElementsByClassName('deleteBox');
    var cover = document.getElementById('alert_cover');
    var alert = cover.getElementsByClassName('alert')[0];
    var cancleBtn = alert.getElementsByClassName('alert_bottom_left')[0];
    var sureBtn = alert.getElementsByClassName('alert_bottom_right')[0];
    // 2.setting parameters
    var up; // 记录当前打开的盖子
    // 3.添加tap事件
    for (var i = 0; i < deleteBoxs.length; i++){
        mjd.tap(deleteBoxs[i], function (e) {
            // console.log(e.target);
            up = e.target.parentNode.getElementsByClassName('up')[0];
            // console.log(up);
            // 1.打开盖子
            // 1.1 设置过渡
            up.style.transition = 'all .2s ease';
            up.style.webkitTransition = 'all .2s ease';
            // 1.2 设置旋转
            up.style.transform = 'rotate(-30deg)';
            up.style.webkitTransform = 'rotate(-30deg)';
            // 1.3 设置转轴
            up.style.transformOrigin = 'left 3px'
            up.style.webkitTransformOrigin = 'left 3px'

            // 2.让alert出现
            cover.style.display = 'block';
            
            // 3.做alert弹簧动画效果
            alert.className = 'alert springJump';
        })
    }

    // 4.添加取消按钮的事件
    mjd.tap(cancleBtn, function (e) {
        // 1.alert以及cover消失
        cover.style.display = 'none';
        // 2.盖子恢复
        up.style.transform = 'none';
    })
    // 5.添加确定按钮的事件
    mjd.tap(sureBtn, function (e) {
        // 1.alert以及cover消失
        cover.style.display = 'none';
        // 2.盖子恢复
        up.style.transform = 'none';
        // 3.删除当前up所在的product
        // console.log(up.parentNode.parentNode.parentNode.parentNode.parentNode);
        // 结合 for (var i = 0; i < deleteBoxs.length; i++) 进行理解
        // for (var element = up; element.className != 'shop_goods'; element = element.parentNode){
        //     // console.log(element.className);
        //     if (element.className == 'product'){
        //         element.parentNode.removeChild(element);
        //         break;
        //     }
        // }

        // 递归的写法, 面试点：递归的隐患
        (function findProduct(element) {
            if (element.className == 'product'){
                element.parentNode.removeChild(element);
                return;
            };
            if (element == document.body) return;

            findProduct(element.parentNode);
        })(up);
    //   作业：用 while自己写写试试
    })

}
// checkBox切换
function checkedStateChange() {
    // 1.get elements
    var boxs = document.getElementsByClassName('checkBox');

    for(var i = 0; i < boxs.length; i++){
        (function (index) {
            var checkBox = boxs[index];
            mjd.tap(checkBox, function (e) {
                if (checkBox.hasAttribute('checked')){
                    checkBox.removeAttribute('checked');
                }else {
                    checkBox.setAttribute('checked', '');
                }
            })
        })(i);
    }

}
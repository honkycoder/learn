/**
 * Created by xmg on 2017/6/4.
 */



//1.创建构造函数

function ColorBall(option) {
    //1.1.调用初始化方法
    this._init(option);

}

//1.2.给五彩绣球设置原型属性
ColorBall.prototype = {

    _init: function (option) {
        //1.3.判断是否传入了json
        var option = option || {};

        //1.4.设置父标签
        this.parentId = option.parentId;

        //1.5.设置一些必须的属性
        //半径
        this.r = 80;
        this.x = option.x;
        this.y = option.y;
        this.background = option.background;

        //1.6.一些变化的属性
        this.dx = _.random(-5, 5);
        this.dy = _.random(-5,5);
        this.dr = _.random(1, 3);


        //定义一个数组用来存放每次创建的球对象
        ballArr.push(this);
    },
    //渲染球体
    render: function () {
        var parentNode = document.getElementById(this.parentId);
        var childNode = document.createElement('div');

        //定义
        parentNode.style.position = 'relative';
        childNode.style.position = 'absolute';
        childNode.style.left = this.x + 'px';
        childNode.style.top = this.y + 'px';
        childNode.style.width = this.r + 'px';
        childNode.style.height = this.r + 'px';
        childNode.style.borderRadius = '50%';
        childNode.style.background = this.background;

        //拼接
        parentNode.appendChild(childNode);
    },
    //当鼠标移动的时候让球体的大小以及位置发生变化
    update: function () {
        this.x += this.dx;
        this.y += this.dy;
        this.r -= this.dr;
        //当球的半径小于0的时候,那么应该将半径设置0

        //让之前存储彩色球的数组中对应的球对象元素踢出去
        if(this.r<0)
        {
            this.r = 0;

            //第一个参数指的是从哪个数组中提出元素   第二个参数指的是你要剔除谁
            _.without(ballArr,this);
        }
    }


}
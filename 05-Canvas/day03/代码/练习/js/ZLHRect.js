/**
 * Created by zzdy on 2017/7/14.
 */

//用面向对象的方法来封装矩形

function Rect(option) {
    this._init(option);
}

Rect.prototype = {
    constructor: Rect,
    //初始化

    _init: function (option) {
        //容错处理
        option = option || {};
        console.log(this);
        //x坐标
        this.x = option.x == 0 ? 0 : option.x || 100;
        //y坐标
        this.y = option.y == 0 ? 0 : option.y || 100;
        //矩形宽高
        this.width = option.width == 0 ? 0 : option.width || 200;
        this.height = option.height == 0 ? 0 : option.height || 200;
        //矩形的填充颜色
        this.fillStyle = option.fillStyle || "black";
        //矩形的宽度
        this.lineWidth = option.lineWidth || 2;
        //描边的颜色
        this.strokeColor = option.strokeColor || "red";
        //位移坐标 translate
        this.translateX = option.translateX || 0;
        this.translateY = option.translateY || 0;

        //缩放
        this.scaleX = option.scaleX || 1;
        this.scaleY = option.scaleY || 1;
        //旋转
        this.rotate = option.rotate || 0
    },
    //绘制方法
    render: function (context) {
        //保存状态
        context.save();
        //开启路径
        context.beginPath();
        context.translate(this.translateX, this.translateY);
        context.scale(this.scaleX, this.scaleY);
        context.rotate(this.rotate*Math.PI/180);
        context.strokeStyle = this.strokeColor;
        context.lineWidth = this.lineWidth;
        context.strokeRect(this.x, this.y, this.width, this.height);
        //还原状态
        context.restore();
    },

    //绘制填充矩形
    renderFill: function (context) {
        context.save();
        context.beginPath();
        //颜色
        context.translate(this.translateX, this.translateY);
        context.scale(this.scaleX, this.scaleY);
        context.rotate(this.rotate*Math.PI/180);
        context.fillStyle = this.fillStyle;
        //绘制矩形
        context.fillRect(this.x, this.y, this.width, this.height);
        context.restore();
    }
}
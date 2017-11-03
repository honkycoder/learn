
// 1.构造函数
function Ball(option) {
    this._init(option);
}
// 2.设置原型对象
Ball.prototype = {
    constructor : Ball,
    // 初始化
    _init : function (option) {
        option = option || {};
        // 位置
        this.x = option.x || 0;
        this.y = option.y || 0;
        // 半径
        this.r = option.r || 0;
        // 颜色
        this.fillColor = option.fillColor || 'black';
        // 速度
        this.speed = option.speed || 0;
    },
    
    // 绘制
     render : function (ctx) {
         // 保存
         ctx.save();
         ctx.beginPath();
         //绘制小球
         ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
         ctx.fillStyle = this.fillColor;
         ctx.fill();
         // 还原
         ctx.restore();
     },
    
    //  更新
    update : function () {
        this.x += this.speed;
    }
}
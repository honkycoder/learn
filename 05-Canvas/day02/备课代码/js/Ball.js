
// 1.构造函数
function Ball(option) {
    this._init(option);
};

// 2.设置原型对象
Ball.prototype = {
    constructor : Ball,
    _init : function (option) {
        option = option || {};
        this.x = option.x || 0;
        this.y = option.y || 0;
        this.r = option.r || 0;
        this.fillColor = option.fillColor || 'black';
        this.speed = option.speed || 1;
    },
    // 绘制
    render : function (ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
        ctx.fillStyle = this.fillColor;
        ctx.fill();
        ctx.restore();
    },
    
    // 让小球水平移动
    update : function () {
        this.x += this.speed;
    }
};
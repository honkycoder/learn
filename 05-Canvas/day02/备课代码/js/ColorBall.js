
// 2.构造函数
function ColorBall(option) {
    this._init(option);
};

// 设置原型对象
ColorBall.prototype = {
    constructor : ColorBall,
    _init : function (option) {
        option = option || {};
        this.x = option.x || 0;
        this.y = option.y || 0;
        this.r = option.r || 20;
        this.color = option.color || 'red';

        // 变化的量
        this.dx = Math.random() * 20 - 10;  // 0~20 --> -10~10
        this.dy = Math.random() * 20 - 10;
        this.dr = Math.random() * 2 + 1; //保证小球半径变化至少为1
    },
    // 绘制
    render : function (ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    },
    // 变化
    update : function () {
        this.x += this.dx;
        this.y += this.dy;
        this.r -= this.dr;

        // 删除小球
        if (this.r <= 0) {
//                this.r = 0;
            // 删除小球
            // without:从数组中删除指定的元素
            // 第一个参数:将要操作的数组;第一个参数:要删除的元素
            // this-->小球对象
            ballArray = _.without(ballArray,this);
        }
    }

};

// 1.构造函数
function ColorBall(option) {
    this._init(option);
}
// 2.设置原型对象
ColorBall.prototype = {
    constructor : ColorBall,
    // 初始化
    _init : function (option) {
        option = option || {};
        // 位置
        this.x = option.x || 0;
        this.y = option.y || 0;
        // 半径
        this.r = option.r || 0;
        // 颜色
        this.color = option.color || 'black';
        // 变化的量
        this.dX = Math.random() * 20 - 10; // -10-10
        this.dY = Math.random() * 20 - 10;
        this.dR = Math.random() * 2 + 1; // 保证小球半径至少变化1
    },
    // 绘制
    render : function (ctx) {
        ctx.save();// 保存
        ctx.beginPath();// 开启路径
        // 绘制小球
        ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
        // 设置颜色
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore(); // 还原
    },
    //更新
    update : function () {
        this.x += this.dX;
        this.y += this.dY;
        this.r -= this.dR;

        // 删除小球
        if(this.r <= 0){
//                this.r = 0;
            // 第一个参数:要操作的数组
            //  第二个参数:要删除的元素
            //  this->小球
            ballArray = _.without(ballArray,this);
        }
    }
}


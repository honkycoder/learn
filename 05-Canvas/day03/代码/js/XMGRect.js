// 1.构造函数
function XMGRect(option) {
    this._init(option);
}
// 2.设置原型对象
XMGRect.prototype = {
    constructor : XMGRect,
    // 初始化
    _init : function (option) {
        option = option || {};
        // 坐标
        // 用户传0就是0 不传才是200
        this.x = option.x == 0 ? 0 : option.x || 200;
        
        this.y = option.y == 0 ? 0 : option.y || 200;
        // 宽高
        this.width = option.width == 0 ? 0 : option.width || 100;
        this.height = option.height == 0 ? 0 : option.height || 100;
        // 描边的颜色
        this.strokeColor = option.strokeColor || 'black';
        // 描边的宽度
        this.strokeWidth = option.strokeWidth || 1;
        // 填充的颜色
        this.fillColor = option.fillColor || 'black';
        // 缩放
        this.scaleX = option.scaleX || 1;
        this.scaleY = option.scaleY || 1;
        // 位移
        this.translateX = option.translateX || 0;
        this.translateY = option.translateY || 0;
        // 旋转
        this.angle = option.angle || 0;
    },

    // 描边的矩形
     renderStroke : function (ctx) {
         // 保存
         ctx.save();
         ctx.beginPath();
         // 位移
         ctx.translate(this.translateX,this.translateY);
         // 旋转
         ctx.rotate(this.angle*Math.PI/180);
         // 缩放
         ctx.scale(this.scaleX,this.scaleY);
         // 矩形的设置
         ctx.strokeStyle = this.strokeColor;
         ctx.lineWidth = this.strokeWidth;
         //  绘制矩形
         ctx.strokeRect(this.x,this.y,this.width,this.height);
         // 还原
         ctx.restore();
     },
    
    // 填充的矩形
    renderFill : function (ctx) {
        // 保存
        ctx.save();
        ctx.beginPath();
        // 位移
        ctx.translate(this.translateX,this.translateY);
        // 旋转
        ctx.rotate(this.angle*Math.PI/180);
        // 缩放
        ctx.scale(this.scaleX,this.scaleY);
        // 绘制矩形
        ctx.fillStyle = this.fillColor;
        ctx.fillRect(this.x,this.y,this.width,this.height);
        // 还原
        ctx.restore();
    }
}

    // 1.构造函数
    function ZHCRect(option) {
        this._init(option);
    };
    
    // 2.设置原型对象
    ZHCRect.prototype = {
        constructor : ZHCRect,
        _init : function (option) {
            option = option || {};
            // 属性
            // 用户不传默认是100,传0还是0
            this.x = option.x == 0 ? 0 : option.x || 100;
            // this.x = option.x || 100;
            
            this.y = option.y == 0 ? 0 : option.y || 100;
            this.width = option.width == 0 ? 0 : option.width || 100;

            this.height = option.height == 0 ? 0 : option.height || 100;
            
            // 描边颜色
            this.strokeColor = option.strokeColor || 'black';
            // 描边宽度
            this.strokeWidth = option.strokeWidth || 1;
            
            // 填充的样式
            this.fillColor = option.fillColor || 'black';
        },
        
        // 绘制矩形
        renderStroke : function (ctx) {
            // 保存状态
            ctx.save();
            // 开启路径
            ctx.beginPath();
            // 设置描边颜色
            ctx.strokeStyle = this.strokeColor;
            // 设置线宽
            ctx.lineWidth = this.strokeWidth;
            // 绘制矩形
            ctx.strokeRect(this.x,this.y,this.width,this.height);
            // 还原状态
            ctx.restore();
        },
        
        renderFill : function (ctx) {
            // 保存状态
            ctx.save();
            // 开启路径
            ctx.beginPath();
            // 设置填充颜色
            ctx.fillStyle = this.fillColor;
            // 绘制填充矩形
            ctx.fillRect(this.x,this.y,this.width,this.height);
            // 还原状态
            ctx.restore();
        }
    };

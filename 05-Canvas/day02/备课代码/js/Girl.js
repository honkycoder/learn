

    // 1.构造函数
    function Girl(option) {
       this._init(option);
    }
    
    // 2.设置原型对象
    Girl.prototype = {
        constructor : Girl,
        _init : function (option) {
            // 兼容性处理
            option = option || {};
            // 定义属性
            this.imgSrc = option.imgSrc; // 图片
            this.sWidth = option.sWidth || 256; // 裁剪的宽度
            this.sHeight = option.sHeight || 256;// 裁剪的高度
            this.x = option.x || 0; // 显示的x
            this.y = option.y || 0; // 显示的y
            this.width = option.width || 256; // 显示的宽度
            this.height = option.height || 256;// 显示的高度
            this.duration = option.duration || 300;// 间隔的时间
            this.dir = option.dir || 0; // 方向
        },

        // 绘制
        render : function (ctx) {
            // 备份this
            var self = this;

            // 创建图片对象
            var image = new Image();
            image.src = this.imgSrc;

            // 计数
            var index = 0;

            // 绘制
            image.onload = function () {
                // 定时器
                setInterval(function () {
                    // 清屏
                    ctx.clearRect(self.x,self.y,self.width,self.height);

                    // 绘制
                    ctx.drawImage(image,index * self.sWidth,self.dir * self.sHeight,self.sWidth,self.sHeight,self.x,self.y,self.width,self.height);

                    // 处理计数器
                    index ++;
                    // 无限循环
                    index %= 8;
                    
                },self.duration);
            };
        },

        // 改变方向
        changeDir : function (dir) {
            this.dir = dir;
        }
    };  
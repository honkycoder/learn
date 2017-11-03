
// 1.构造函数
function Girl(option) {
    this._init(option);
}

// 2.设置原型对象
Girl.prototype = {
    constructor : Girl,
    // 初始化的方法
    _init : function (option) {
        // 兼容性的处理
        option = option || {};
        // 图片
        this.imgSrc = option.imgSrc;
        //  裁剪的宽高
        this.clipWidth = option.clipWidth || 256;
        this.clipHeight = option.clipHeight || 256;
        // 显示的位置
        this.x = option.x || 0;
        this.y = option.y || 0;
        // 显示的宽高
        this.width = option.width || 0;
        this.height = option.height || 0;
        // 动画的时间
        this.duration = option.duration || 400;
        // 方向
        this.dir = option.dir || 0;
    },
    
    // 绘制
    render : function (ctx) {
        // 备份指针
        var self = this;
        // 创建图片对象
        var image = new Image();
        image.src = this.imgSrc;
        // 索引
        var index = 0;
        // 图片对象加载完毕后绘制
        image.onload = function () {
            // 定时器
            setInterval(function () {
                // 清屏
                ctx.clearRect(self.x,self.y,self.width,self.height);
                // 绘制图片
                ctx.drawImage(image,index*self.clipWidth,self.dir*self.clipHeight,self.clipWidth,self.clipHeight,self.x,self.y,self.width,self.height);
                // 累加索引
                index ++;
                // 循环
                index = index%8;
            },self.duration);
        }
    },
    
    // 改变方向
    changeDir : function (dir) {
        this.dir = dir;
    }
}

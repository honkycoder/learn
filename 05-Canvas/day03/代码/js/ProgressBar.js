// 1.构造函数
function ProgressBar(option) {
    this._init(option);
}
// 2.设置原型对象
ProgressBar.prototype = {
    constructor : ProgressBar,
    // 初始化
    _init : function (option) {
        option = option || {};
        // 位置
        this.x = option.x || 0;
        this.y = option.y || 0;
        // 尺寸
        this.width = option.width || 0;
        this.height = option.height || 0;
        // 颜色
        this.stroke = option.stroke || 'black';
        this.fill = option.fill || 'black';
        this.strokeWidth = option.strokeWidth || 1;
        // 比例
        this.value = option.value || 0;
        // 圆角半径
         this.cornerRadius = option.cornerRadius || 0;
    },
    // 绘制
    render : function (layer) {
        // 1.创建组
        this.group = new Konva.Group();
        layer.add(this.group);
        // 2.创建内部的矩形
        var innerRect = new Konva.Rect({
            x : this.x,
            y : this.y,
            width: this.width * this.value,
            height: this.height,
            fill: this.fill,
            id : 'innerRect'
        });
        this.group.add(innerRect);
        // 3.创建外面的矩形
        var outerRect = new Konva.Rect({
            x : this.x,
            y : this.y,
            width: this.width,
            height: this.height,
            stroke: this.stroke,
            strokeWidth: this.strokeWidth,
            cornerRadius : this.cornerRadius
        });
        this.group.add(outerRect);
    },
    
    update : function () {
        //  findOne : 找到组中某个图形
        var rect = this.group.findOne('#innerRect');
        rect.to({
            width : this.width,// 要做动画的属性
            duration : 1,// 动画的时间
            easing: Konva.Easings.EaseIn,
            yoyo: true,
            onFinish: function() {
                console.log('动画执行完毕后调用');
            }
        });
    }
}

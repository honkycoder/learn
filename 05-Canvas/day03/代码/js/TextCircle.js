/**
 * Created by xmg on 2017/7/12.
 */
// 1.构造函数
function TextCircle(option) {
    this._init(option);
}
// 2.设置原型对象
TextCircle.prototype = {
    constructor : TextCircle,
    // 初始化
    _init : function (option) {
        option = option || {};
        //  圆心的坐标
        this.x = option.x || 0;
        this.y = option.y || 0;
        // 半径
        this.innerRadius = option.innerRadius || 0;
        this.outerRadius = option.outerRadius || 0;
        // 颜色
        this.innerFill = option.innerFill || 'black';
        this.outerColor = option.outerColor || 'black';
        // 文字和颜色
        this.text = option.text || '默认的文字';
        this.textColor = option.textColor || 'white';
    },
    
    //  绘制
    render : function (layerOrGroup) {
        // 1.创建组
        this.group = new Konva.Group({
            x : this.x,
            y : this.y
        });
        layerOrGroup.add(this.group);
        
        // 2.创建内圆
        var inner_Circle = new Konva.Circle({
            radius: this.innerRadius,
            fill: this.innerFill
        });
        this.group.add(inner_Circle);

        // 3.创建圆环
        var outer_ring = new Konva.Ring({
            innerRadius: this.innerRadius,
            outerRadius: this.outerRadius,
            fill: this.outerColor
        });
        this.group.add(outer_ring);
        
        // 4.创建文字对象
        var text = new Konva.Text({
            x: -this.innerRadius,
            y: -8,
            width : 2 * this.innerRadius,
            align : 'center', // 设置对齐方式
            text: this.text,
            fontSize: 16,
            fill: this.textColor
        });
        this.group.add(text);
    }
    
}
/**
 * Created by zzdy on 2017/7/14.
 */

function Rect(option) {
    this._init(option);
}

Rect.prototype = {
    constructor: Rect,
    _init: function (option) {
        this.x = option.x || 0;
        this.y = option.y || 0;
        this.width = option.width || 0;
        this.height = option.height || 0;
        this.fill = option.fill || "red";
        this.stroke = option.stroke || "#ccc";
        this.lineWidth = option.lineWidth || 0;
        this.ratio = option.ratio || 0;
        this.cornerRadius = option.radius || 0;
        this.duration = option.duration ||1;
    },
    render: function (layer) {
        this.group = new Konva.Group();
        layer.add(this.group);
        //绘制内部矩形
        var innerRect = new Konva.Rect({
            x:this.x,
            y:this.y,
            width: this.width*this.ratio,
            height: this.height,
            fill:  this.fill,
            cornerRadius:this.cornerRadius,
            id:"innerRect"
    })
        this.group.add(innerRect);
        //绘制外部矩形
        var outerRect = new Konva.Rect({
            x:this.x,
            y:this.y,
            width: this.width,
            height: this.height,
            stroke: this.stroke,
            strokeWidth: this.lineWidth,
            cornerRadius:this.cornerRadius
        })
        this.group.add(outerRect);
    },
    update:function () {
        var rect = this.group.findOne("#innerRect");
        rect.to({
            width:this.width,
            duration:this.duration,
            yoyo: true,
        })
    }
}
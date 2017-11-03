/**
 * Created by zzdy on 2017/7/14.
 */
function Pie(option) {
    this._init(option);
}

pie.prototype = {
    constructor: Pie,
    _init: function (option) {
        option = option || {};
        //设置坐标
        this.x = option.x || 0;
        this.y = option.y || 0;
        //设置内外圆的半径
        this.innerRect = option.innerRect || 0;
        this.outerRect = option.outerRect || 0;
        //外圆的颜色和半径
        this.innerColor = option.innerColor ||"#666";
        this.innerWidth = option.innerWidth ||1;
        // 数据
        this.dataArray = option.dataArray;
        //动画的索引
        this.animationIndex = option.index;

    },
    render:function () {

    }
}
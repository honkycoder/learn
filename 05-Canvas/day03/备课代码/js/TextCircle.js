
    // 1.构造函数
    function TextCircle(option) {
        this._init(option);
    };

    // 2.设置原型对象
    TextCircle.prototype = {
        constructor : TextCircle,
        _init : function (option) {
            option = option || {};
            // 圆心
            this.x = option.x || 0;
            this.y = option.y || 0;
            // 半径
            this.innerRadius = option.innerRadius || 0;
            this.outerRadius = option.outerRadius || 0;

            // 内圆的填充颜色
            this.innerFill = option.innerFill || 'balck';

            // 外圆的颜色
            this.outerColor = option.outerColor || 'gray';
            
            // 文字
            this.text = option.text || '文字';
            // 文字的颜色
            this.textColor = option.textColor || 'white';
        },

        // 绘制
        render : function (layerOrGroup) {
            // 1.创建组
            this.group = new Konva.Group({
               x : this.x,
               y : this.y
            });
            layerOrGroup.add(this.group);

            // 2. 创建内圆
            var innerCircle = new Konva.Circle({
                radius: this.innerRadius,
                fill: this.innerFill,
            });
            this.group.add(innerCircle);

            // 3.创建圆环
            var outCircle_ring = new Konva.Ring({
                innerRadius: this.innerRadius,
                outerRadius: this.outerRadius,
                fill: this.outerColor
            });
            this.group.add(outCircle_ring);

            // 4.创建文字
            var inner_text = new Konva.Text({
                    x: -this.innerRadius,
                    y: -8,
                    width:this.innerRadius * 2,
                    align:"center",
                    text: this.text,
                    fontSize: 16,
                    fill: this.textColor
            });
            this.group.add(inner_text);
        }

    };
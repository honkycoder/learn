    // 1.构造函数
    function PieChart(option) {
        this._init(option);
    };

    // 2.设置原型对象
    PieChart.prototype = {
        constructor :PieChart ,
        _init : function (option) {
            option = option || {};
            // 圆心
            this.x = option.x || 0;
            this.y = option.y || 0;
            // 半径
            this.innerRadius = option.innerRadius || 0;
            this.outerRadius = option.outerRadius || 0;

            // 外圆的颜色
            this.outerColor = option.outerColor || 'blue';
            // 外圆的宽度
            this.outerWidth = option.outerWidth || 1;

            // 数据
            this.dataArray = option.dataArray || [];

            // 动画的索引
            this.animationIndex = 0;
        },

        // 绘制
        render : function (layer) {
            // 0.备份this
            var self = this;

            // 1.创建总组
             this.group = new Konva.Group({
                 x : 0,
                 y : 0
             });
            layer.add(this.group);
            
            // 2.创建扇形组
             this.wedgeGroup = new Konva.Group({
                 x : 0,
                 y : 0
             });
            this.group.add(this.wedgeGroup);

            // 3.创建文字组
            this.valueTextGroup = new Konva.Group({
                x : 0,
                y : 0
            });
            this.group.add(this.valueTextGroup);

            // 4.创建区域组
            this.areaGroup = new Konva.Group({
                x : 0,
                y : 0
            });
            this.group.add(this.areaGroup);

            // 5.绘制外圆
            var outerCircle = new Konva.Circle({
                x : this.x,
                y : this.y,
                radius: this.outerRadius,
                stroke: this.outerColor,
                strokeWidth: this.outerWidth
            });
            this.group.add(outerCircle);

            // 6.绘制扇区
            // 开始的角度
            var beginAngle = -90;

            this.dataArray.forEach(function (item,index) {

                // 01.创建扇区
                // 扇形的角度
                var tempAngle = item.value * 360;

                var wedge = new Konva.Wedge({
                    x : self.x,
                    y : self.y,
                    radius: self.innerRadius,
                    fill: item.color,
                    angle:tempAngle, // 扇形的角度
                    rotation:beginAngle  // 开始的角度
                });

                // 02.添加到扇区组
                self.wedgeGroup.add(wedge);

                // 03.绘制文字
                // 文字的角度
                var textAngle = beginAngle + tempAngle * 0.5;
                var textX = self.x+(self.outerRadius + 20)*Math.cos(textAngle *Math.PI/180);
                var textY = self.y+(self.outerRadius + 20)*Math.sin(textAngle *Math.PI/180);
                var valueText = new Konva.Text({
                     x: textX,
                     y: textY,
                     text: item.value * 100 + '%',
                     fontSize: 18,
                     fill: item.color
                 });

                // 04.特殊的处理
                if(textAngle > 90 && textAngle < 270){
                    valueText.x(textX - valueText.width());
                }

                self.valueTextGroup.add(valueText);

                // 05.绘制区域组的内容
                // 区域组矩形的常量
                var areaW = 60;
                var areaH = 20;
                var areaX = self.x + self.outerRadius + 80;
                var areaY = self.y + index * (areaH + 10);
                // 创建区域组的矩形
                var areaRect = new Konva.Rect({
                    x: areaX,
                    y: areaY,
                    width: areaW,
                    height: areaH,
                    fill: item.color
                });
                self.areaGroup.add(areaRect);

                // 创建区域组的文字
                var areaText = new Konva.Text({
                    x : areaX + areaW + 20,
                    y : areaY,
                    text: item.name,
                    fontSize: 20,
                    fill: item.color

                });
                self.areaGroup.add(areaText);
                
                // 7.更新开始的角度
                beginAngle += tempAngle;
            });
        },

        // 执行动画
        playAnimation : function () {
            // 0.备份this
            var self = this;

            // 1.开始的状态
            if (this.animationIndex == 0){ //第一次才需要让所有扇区角度为0
                this.wedgeGroup.getChildren().each(function (item,index) {
                    // 让所有扇区的角度为0
                    item.angle(0);
                });
            }

            // 2.结束的状态
            var wedge = this.wedgeGroup.getChildren()[this.animationIndex];

            wedge.to({
                // 扇区的角度
                angle : this.dataArray[this.animationIndex].value * 360,
                // 1s时间完成动画
                duration : this.dataArray[this.animationIndex].value,
                
                // 动画完毕后要做的事情
                onFinish : function () {
                    // 累加索引
                    self.animationIndex += 1;
                    
                    // 退出递归
                    if(self.animationIndex > self.dataArray.length -1){
                        self.animationIndex = 0;
                        return;
                    }
                    
                    // 递归调用
                    self.playAnimation();
                }
            });
        }
    };

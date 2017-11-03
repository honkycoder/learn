
    // 1.构造函数
    function ProgressBar(option) {
        this._init(option);
    };
    
    // 2.设置原型对象
    ProgressBar.prototype = {
        constructor : ProgressBar,
        _init : function (option) {
            option = option || {};
            this.x = option.x || 0;
            this.y = option.y || 0;
            this.width = option.width || 0;
            this.height = option.height || 0;

            this.fill = option.fill || 'gray';
            this.stroke = option.stroke || 'black';
            this.strokeWidth = option.strokeWidth || 5;
            
            this.value = option.value || 0;
            
            this.cornerRadius = option.cornerRadius || 0
        },

        render : function (layer) {
            // 1.创建组
             this.group = new Konva.Group({
                 x : 0,
                 y : 0
             });
            layer.add(this.group);
            
            // 2.创建里面的矩形
            var innerRect = new Konva.Rect({
                x : this.x,
                y : this.y,
                width : this.width * this.value,
                height : this.height,
                fill : this.fill,
                id : 'innerRect'
            });
            this.group.add(innerRect);
            
            // 3.创建外面的矩形
            var outerRect = new Konva.Rect({
                x : this.x,
                y : this.y,
                width : this.width,
                height : this.height,
                stroke : this.stroke,
                strokeWidth : this.strokeWidth,
                cornerRadius : this.cornerRadius
            });
            this.group.add(outerRect);
        },
        update : function () {
            // 1.获取里面的矩形->findOne:找到组中某一个图形
            var innerRect = this.group.findOne('#innerRect');
            innerRect.to({
                width :this.width, // 需要做动画的属性
                duration : 1, // 动画的持续时间(s)
                easing: Konva.Easings.EaseInOut,// 动画效果
                opacity : 0.5, // 透明度变化
                // yoyo : true // 循环播放动画
                onFinish : function () {
                    // 动画执行完,会自动调用这个函数
                    console.log('动画执行完毕');
                }
            });
        }
    };

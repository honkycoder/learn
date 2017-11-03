
// game类->整一个游戏
(function () {
    window.Game = Class.extend({
        // 初始化
        init : function (option) {
            option = option || {};
            // 0.备份指针
            var self = this;
            // 1.FPS
            this.fps = option.fps || 60;
            // 2.实例化帧工具类
            this.frameUtil = new FrameUtil();
            // 3.获取画布和上下文
            this.canvas = document.getElementById(option.canvasId);
            this.context = this.canvas.getContext('2d');
            // 4.实例化加载本地数据类
            this.staticSourceUtil = new StaticSourceUtil();
            // 5.保存所有数据
            this.allImageObj = {};
            // 5.加载数据
            // 需要:所有dom对象,所有的图片个数,已经加载好的dom对象个数
            this.staticSourceUtil.loadImage('r.json',function (allImageObj,allImageCount,loadImageCount) {
                // 判断数据加载完毕后运行游戏
                if(allImageCount == loadImageCount){ // 数据加载完毕
                    // 保存数据
                    self.allImageObj = allImageObj;
                    // 开始游戏
                    self.run();
                }
            });
            
        },
        // 开始游戏
        run : function () {
            // 备份指针
            var self = this;
            this.timer = setInterval(function () {
                self.runLoop();
            },1000/self.fps);// fps-> 每秒传输的帧数  fps=50 1s->50 每一帧多长时间? 1000/50

            // 1.创建房子
             this.fangzi = new Background({
                image : this.allImageObj['fangzi'],
                y : this.canvas.height - 256 - 100,
                width : 300,
                height : 256,
                speed : 1
            });

            // 2.创建树
            this.shu = new Background({
                image : this.allImageObj['shu'],
                y : this.canvas.height - 216 - 48,
                width : 300,
                height : 216,
                speed : 2
            });

            // 3.创建地板
            this.diban = new Background({
                image : this.allImageObj['diban'],
                y : this.canvas.height - 48,
                width : 48,
                height : 48,
                speed : 3
            });
            
            // 管道数组
            this.pipeArr = [new Pipe()];

            
        },

        // 游戏运行循环,每一帧都会调用
        runLoop : function () {

            // 0.清屏
            this.context.clearRect(0,0,canvas.width,canvas.height);
            // 1.计算fps
            this.frameUtil.countFps();
            // 2.绘制FPS/FNO
            this.context.fillText('FPS/'+this.frameUtil.realFps,15,15);
            this.context.fillText('FNO/'+this.frameUtil.currentFrame,15,30);
            // 3.更新和渲染房子
            this.fangzi.update();
            this.fangzi.render();
            // 4.更新和渲染树
            this.shu.update();
            this.shu.render();
            // 5.更新和渲染地板
            this.diban.update();
            this.diban.render();

            // 6.每隔100帧创建一个管道
            if(this.frameUtil.currentFrame % 100 == 0){
                this.pipeArr.push(new Pipe());
            }
            // 7.更新和渲染管道
            for (var i = 0; i < this.pipeArr.length; i++) {
                // 更新
                this.pipeArr[i].update();
            }
            for (var i = 0; i < this.pipeArr.length; i++) {
                // 绘制
                this.pipeArr[i].render();
            }

        },

        // 暂停游戏
        pause : function () {
            clearInterval(this.timer);
        },

        // 结束游戏
        gameOver : function () {

        }
    });
})();

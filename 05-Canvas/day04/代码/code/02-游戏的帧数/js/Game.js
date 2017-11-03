
// game类->整一个游戏
(function () {
    window.Game = Class.extend({
        // 初始化
        init : function (option) {
            option = option || {};
            // 1.FPS
            this.fps = option.fps || 60;
            // 2.实例化帧工具类
            this.frameUtil = new FrameUtil();
            // 3.获取画布和上下文
            this.canvas = document.getElementById(option.canvasId);
            this.context = this.canvas.getContext('2d');
            
        },
        // 开始游戏
        run : function () {
            // 备份指针
            var self = this;
            this.timer = setInterval(function () {
                self.runLoop();
            },1000/self.fps);// fps-> 每秒传输的帧数  fps=50 1s->50 每一帧多长时间? 1000/50
        },

        // 游戏运行循环,每一帧都会调用
        runLoop : function () {
            // 清屏
            this.context.clearRect(0,0,canvas.width,canvas.height);
            // 计算fps
            this.frameUtil.countFps();
            // 绘制FPS/FNO
            this.context.fillText('FPS/'+this.frameUtil.realFps,15,15);
            this.context.fillText('FNO/'+this.frameUtil.currentFrame,15,30);
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

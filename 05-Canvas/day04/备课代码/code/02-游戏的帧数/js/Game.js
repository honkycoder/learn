
(function () {
    window.Game = Class.extend({
        // 初始化的方法
         init : function (option) {
             option = option || {};
             // 1.fps
             this.fps = option.fps || 60;
             // 2.实例化帧工具类
             this.frameUtil = new FrameUtil();

             // 3.获取画布和上下文
             this.canvas = document.getElementById(option.canvasId);
             this.context = this.canvas.getContext('2d');

             
         },
        
        // 运行游戏
         run : function () {
             // 备份this
             var self = this;
             
             // 定时器
             this.timer = setInterval(function () {
                 
                 self.runLoop();
             },1000/self.fps); // fps:每秒传输的帧数 (1000/fps = 20;-->每一帧需要的时间)
         },

        // 游戏运行循环-->每一帧都需要执行
        runLoop : function () {
            // 0.清屏
            this.context.clearRect(0,0,this.canvas.width,this.canvas.height);

            // 1.计算真实的帧数
            this.frameUtil.render();

            // 2.绘制fps
            this.context.fillText('FPS /' + this.frameUtil.realFps,15,15);
            
            // 3.绘制总帧数
            this.context.fillText('FNO /' + this.frameUtil.currentFrame,15,30);
        },
        
        // 暂停游戏
        pause : function () {
            
        },
        
        // 结束游戏
        gameOver : function () {
            
        }
        
        
    });
})();

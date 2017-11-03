
(function () {
    window.Game = Class.extend({
        // 初始化的方法
         init : function (option) {
             option = option || {};
             this.fps = option.fps || 60;
         },
        
        // 运行游戏
         run : function () {
             // 备份this
             var self = this;
             
             // 定时器
             this.timer = setInterval(function () {
                 console.log(this);
                 self.runLoop();
             },1000/self.fps); // fps:每秒传输的帧数 (1000/fps = 20;-->每一帧需要的时间)
         },

        // 运行循环-->每一帧都需要执行
        runLoop : function () {
            console.log(Math.random());
        },
        
        // 暂停游戏
        pause : function () {
            
        },
        
        // 结束游戏
        gameOver : function () {
            
        }
        
        
    });
})();

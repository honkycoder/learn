
/**
 * 定义一个类
 * */
(function () {
    window.Game = Class.extend({
        //初始化.添加属性和方法
        init:function (option) {
            //容错处理
            option = option ||{};
            this.fps = option.fps ||60;

        },
        //开始游戏
        run:function () {
            // 备份指针
            var self = this;
            //每一帧都刷新一次
         self.timer = setInterval(function () {
                self.runLoop();
            },1000/self.fps);
        },
        //循环游戏
        runLoop:function () {
            console.log('----');
        },
        //  暂停游戏
      pause:function () {

        },
        //结束游戏
        gameOver:function () {

        }
    })
})();
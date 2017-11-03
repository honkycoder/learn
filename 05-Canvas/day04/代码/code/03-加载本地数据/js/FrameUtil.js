/**
 * Created by xmg on 2017/7/13.
 */
// 帧工具类->计算真实的fps和当前总的帧数FNO
(function () {
    window.FrameUtil = Class.extend({
        init : function () {
            // 1. 开始的时间
            this.sTime = new Date();
            // 2.开始的帧数
            this.sFrame = 0;
            // 3.当前的帧数
            this.currentFrame = 0;
            // 4.真实的fps
            this.realFps = 0;
        },

        // 计算(保证这个方法每一帧都要执行)
        countFps : function () {
            // 记录当期的帧数
            this.currentFrame ++;
            //  当期的时间
            var currentTime = new Date();
            //  判断是否走过的1s
            if(currentTime - this.sTime >= 1000){ // 走过了1s
                //  计算真实的fps
                this.realFps = this.currentFrame - this.sFrame;
                // 更新开始的时间
                this.sTime = new Date();
                // 更新开始的帧数
                this.sFrame = this.currentFrame;
            }
        }
    });
})();
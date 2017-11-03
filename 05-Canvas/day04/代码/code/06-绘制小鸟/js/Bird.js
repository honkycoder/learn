/**
 * Created by xmg on 2017/7/13.
 */
//  绘制小鸟类
(function () {
    window.Bird = Class.extend({
        init : function () {
            // 1.宽高
            this.width = 255 / 3;
            this.height = 60;
            // 2.位置
            this.x = (game.canvas.width - this.width) * 0.5;
            this.y = 100;
            // 3.小鸟翅膀的状态(索引)
            this.wingState = 0;
            
        },
        // 绘制
        render : function () {
            game.context.drawImage(game.allImageObj['bird'],this.wingState*this.width,0,this.width,this.height,this.x,this.y,this.width,this.height);
        },
        //  更新
        update : function () { // 0 1 2
            // 每隔5帧挥动翅膀一次
            if(game.frameUtil.currentFrame % 5 == 0){
                // 改变翅膀的状态
                this.wingState++;
                if(this.wingState > 2) {
                    this.wingState = 0;
                }
            }
        }
    });
})();
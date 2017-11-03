/**
 * Created by xmg on 2017/7/13.
 */
// 管道类
(function () {
    window.Pipe = Class.extend({
        init : function () {
             // 1.方向 0:向下 1:向上
            this.dir = _.random(0,1);
            // 2.宽高
            this.width = 148;
            this.height = _.random(100,(game.canvas.height-48)*0.5);
            // 3.位置
            this.x = game.canvas.width;
            this.y = this.dir == 0 ? 0 : game.canvas.height - this.height - 48;
            // 4.速度
            this.speed = 4;

        },
        // 绘制
        render : function () {
            // 根据方向绘制管道
            if(this.dir == 0){ // 向下
                game.context.drawImage(game.allImageObj['pipe1'],0,1664 - this.height,this.width,this.height,this.x,this.y,this.width,this.height);
            } else if(this.dir == 1){ // 向上
                game.context.drawImage(game.allImageObj['pipe0'],0,0,this.width,this.height,this.x,this.y,this.width,this.height);
            }
        },
        // 更新
        update : function () {
            this.x -= this.speed;
            // 销毁离开屏幕的管道
            if(this.x < -this.width){
                game.pipeArr = _.without(game.pipeArr,this);
            }

            // 碰撞检测
            // 判断小鸟是否进入管道区域
            if(game.bird.x+game.bird.width > this.x && game.bird.x < this.x + this.width){
                // 进入管道区域
                //  判断管道的方向
                if(this.dir == 0 && game.bird.y < this.height){ // 向下
                    game.gameOver();
                } else if(this.dir == 1 && game.bird.y+game.bird.height > this.y){ // 向上
                    game.gameOver();
                }
            }
        },
        // 暂停
        pause : function () {
            this.speed = 0;
        }
    });
})();
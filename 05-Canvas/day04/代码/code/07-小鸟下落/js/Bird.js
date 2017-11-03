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
            // 4.下落的增量
            this.dy = 0;
            // 5. 下落时的帧数
            this.dropFrame = game.frameUtil.currentFrame;
            // 6.旋转的度数
            this.rotateAngle = 0;
            
        },
        // 绘制
        render : function () {
            // 保存
            game.context.save();
            //  位移
            game.context.translate(this.x + this.width*0.5,this.y + this.height*0.5);
            // 旋转
            game.context.rotate(this.rotateAngle*Math.PI/180);

            // 让画布位移回去
            game.context.translate(-(this.x + this.width*0.5),-(this.y + this.height*0.5));
            // 绘制
            game.context.drawImage(game.allImageObj['bird'],this.wingState*this.width,0,this.width,this.height,this.x,this.y,this.width,this.height);
            // 还原
            game.context.restore();
            
        },
        //  更新
        update : function () { // 0 1 2
            // 每隔5帧挥动翅膀一次
            if(game.frameUtil.currentFrame % 5 == 0){
                // 改变翅膀的状态
                this.wingState++;
                if(this.wingState == 2) {
                    this.wingState = 0;
                }
            }

            // 自由落体  1/2*g*t^2 下落 Math.pow(3,2)
            this.dy = 0.01 * Math.pow(game.frameUtil.currentFrame - this.dropFrame,2);
            // 增大旋转的度数
            this.rotateAngle += 1;
            // 更新小鸟的位置
            this.y += this.dy;
        }
    });
})();
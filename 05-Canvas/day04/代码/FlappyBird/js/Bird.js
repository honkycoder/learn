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
            // 7.小鸟的状态 合法值 0 : 向下 1:向上
            this.state = 0;
            // 8. 空气的阻力
            this.deleteY = 1;

            // 8.绑定事件
            this.bindClick();
            // 9.记录小鸟死亡的状态
            this.die = false;
            
            //  10.死亡动画的索引
            this.dieAnimationIndex = 0;
        },
        // 绘制
        render : function () {
            // 抛热血
            if(this.die == true){
                // 根据索引计算行号和列号
                var col = this.dieAnimationIndex % 5;
                var row = parseInt(this.dieAnimationIndex / 5);

                // 裁剪的宽高
                var cWidth = 325;
                var cHieght = 138;

                //  绘制热血
                game.context.drawImage(game.allImageObj['blood'],col*cWidth,row*cHieght,cWidth,cHieght,this.x - 100,this.y,cWidth,cHieght);
                
                //  绘制游戏结束
                var gameOverX = (game.canvas.width - 626)*0.5;
                var gameOverY = (game.canvas.height- 144)*0.5;
                game.context.drawImage(game.allImageObj['gameover'],gameOverX,gameOverY);

                return;
            }
            
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
            if(this.die) { //  鸟死亡
                // 更新动画的索引
                this.dieAnimationIndex++;
                if(this.dieAnimationIndex == 30){
                    //  暂停游戏
                    game.pause();
                }
                return;
            }

            // 每隔5帧挥动翅膀一次
            if(game.frameUtil.currentFrame % 5 == 0){
                // 改变翅膀的状态
                this.wingState++;
                if(this.wingState > 2) {
                    this.wingState = 0;
                }
            }


            // 根据小鸟的状态判断小鸟是下落还是上升
            if(this.state == 0){ //下落
                // 自由落体  1/2*g*t^2 下落 Math.pow(3,2)
                this.dy = 0.01 * Math.pow((game.frameUtil.currentFrame - this.dropFrame),2);

                // 增大旋转的度数
                this.rotateAngle += 1;

            } else if(this.state == 1){ //上升
                // 阻力越来越大
                this.deleteY++;
                this.dy = -15 + this.deleteY;

                if(this.dy>=0){ // 下落
                    //  更新小鸟的状态
                    this.state = 0;
                    // 更新下落的帧数
                    this.dropFrame = game.frameUtil.currentFrame;
                }
            }

            // 更新小鸟的位置
            this.y += this.dy;

            // 封锁上空
            if(this.y <=0){
                this.y = 0;
            }

            // 撞到地板,游戏结束
            if(this.y >= game.canvas.height - this.height - 48){
                game.gameOver();
            }
        },
        
        // 绑定事件
        bindClick : function () {
            // 备份指针
            var self = this;
            
            game.canvas.onmousedown = function () {
                // 更新小鸟的状态
                self.state = 1;
                // 设置仰角
                self.rotateAngle = -25;
                // 让空气阻力复原
                self.deleteY = 1;
            }
        }
        
        
    });
})();
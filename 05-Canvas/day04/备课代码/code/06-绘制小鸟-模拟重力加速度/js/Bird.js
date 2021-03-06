
(function () {
    window.Bird = Class.extend({
        init : function () {
            this.width = 85;
            this.height = 60;
            this.x = (game.canvas.width - this.width) * 0.5;
            this.y = 100;

            // 小鸟的状态 合法值: 0 1 2
            this.state = 0;

            // 煽动翅膀的频率
            this.singRate = 5;
            
            // 下落时的帧数
            this.dropFrame = game.frameUtil.currentFrame;
            // 下落的增量
            this.dy = 0;
        },
        
        update : function () {

            // 1.每5帧更新更新小鸟的状态
            if(game.frameUtil.currentFrame % this.singRate == 0){
                this.state ++;
                if(this.state > 2){
                    this.state = 0;
                }
            }

            // 2.自由落体
            // 下落高度: h= 1/2 *g*Math.pow(t, 2)
            this.dy = 0.001 * 0.5 * 9.8 * Math.pow(game.frameUtil.currentFrame - this.dropFrame,2);
            this.y += this.dy;

        },
        
        render : function () { 
            
            game.context.drawImage(game.allImageObj['bird'],this.state * this.width,0,this.width,this.height,this.x,this.y,this.width,this.height);
            
        }
    });
})();

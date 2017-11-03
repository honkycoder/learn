/**
 * Created by zzdy on 2017/7/12.
 */
function Girl(option) {
    return this._init(option)
}

Girl.prototype = {
    constant: Girl,
    //初始化方法
    _init: function (option) {
        //兼容性处理
        option = option || {};
        //图片
        this.imgSrc = option.imgSrc;
        //裁剪的坐标
        this.x0 = option.x0 || 0;
        this.y0 = option.y0 || 0;
        //裁剪的宽高
        this.widthX = option.widthX || 256;
        this.heightY = option.heightY || 256;
        //显示的坐标
        this.x = option.x;
        this.y = option.y;

        // 显示的宽高
        this.width = option.width;
        this.height = option.height;
        //运动的时间
        this.date = option.date;
        //运动的方向
        this.dir = option.dir;
    },
    //封装绘制方法

    render: function (context) {
        var self = this;
        var img = new Image;
        img.src = this.imgSrc;
        var index = 0;
        img.onload = function () {
            setInterval(function () {
                // 清屏
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(img, self.x0 * index, self.y0 * self.dir, self.widthX, self.heightY, self.x, self.y, self.width, self.height)
                index++;
                index = index % 8;
            }, self.date);

        }

    },

//改变方向
    dirT: function (dir) {
        this.dir =dir;
    }
};


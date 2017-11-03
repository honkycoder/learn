/**
 * Created by xmg on 2017/7/13.
 */

// 加载本地数据 图片 文字 视频
(function () {
    window.StaticSourceUtil = Class.extend({
        init : function () {
            // 保存所有的图片对象
           this.allImageObj = {}; 
        },
        
        // 加载图片
        // 需要:所有dom对象,所有的图片个数,已经加载好的dom对象个数
        loadImage : function (jsonUrl,callBack) {
            // 0.备份指针
            var self = this;
            // 1.创建请求对象
            var xhr = new XMLHttpRequest();
            // 2.ajax三步走
            xhr.open('get',jsonUrl);
            xhr.send(); // 发送请求

            // 3.获取请求的数据
            // 当 readyState 等于 4 且状态为 200 时，表示响应已就绪,请求完成
            xhr.onreadystatechange=function()
            {
                if (xhr.readyState==4 && xhr.status==200)
                {
                    // 请求完成后获取响应数据(json字符串)
                    var responseText = xhr.responseText;
                    // json解析 字符串->对象
                    var responeseJson = JSON.parse(responseText);
                    
                    //  获取数组
                    var dataArray = responeseJson.images;
                    
                    // 记录已经加载好的图片个数
                    var loadImageCount = 0;

                    //  遍历数组,创建图片对象
                    for (var i = 0; i < dataArray.length; i++) {
                        // 创建图片对象
                        var image = new Image();
                        image.src = dataArray[i].src;
                        image.index = i;
                        
                        // 图片对象加载完毕后才返回
                        image.onload = function () {
                            // 已经加载好的图片个数
                            loadImageCount++;
                            // {name:image}
                            var key = dataArray[this.index].name;
                            // this->image
                            self.allImageObj[key] = this;
                            callBack(self.allImageObj,dataArray.length,loadImageCount);
                        }
                    }
                }
            }
            
        }
    });
})();
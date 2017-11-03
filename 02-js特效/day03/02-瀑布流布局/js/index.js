/**
 * Created by xmg on 2017/5/31.
 */

/***
 * 1.让父盒子水平居中显示(#main)
 *
 * 1.1.设置盒子的width
 *
 *
 * 1.2.设置盒子的margin(0 auto)
 *
 *
 * 2.除了第一行的盒子不需要做定位,其余行的盒子都需要做定位
 *
 *
 *
 *
 * 3.判断什么时候加载后续的其他盒子条件
 *
 *
 *
 * 4.当满足第三部的加载其他盒子的条件的时候,如果加载出新数据(造数据)
 * **/


function $(tagId) {
    return document.getElementById(tagId);
}

window.onload = function () {
     //1.让父盒子居中显示
    waterFlow('main','box')

     window.onscroll = function () {
        // console.log('-加载了-');\

         //满足条件加载数据
         if(isWillLoadOtherBox())
         {
             // console.log('---');


             //造出假数据
             var  imgArr =[{ src:'1.jpg'},{src:'2.jpg'},{src:'3.jpg'},{src:'4.jpg'},{src:'5.jpg'},{src:'6.jpg'},{src:'7.jpg'},{src:'8.jpg'}];

             //创建新的盒子
             for(var i=0;i<imgArr.length;i++)
             {
                 //1.创建box的div
                 var newBox = document.createElement('div');
                 newBox.className = 'box';
                 $('main').appendChild(newBox);

                 //2.创建newPic
                 var newPic = document.createElement('div');
                 newPic.className = 'pic';
                 newBox.appendChild(newPic);
                 
                 
                 //3.创建新的img
                 var newImg = document.createElement('img');
                 newImg.src = 'images/'+imgArr[i].src;
                 newPic.appendChild(newImg);
             }



             //重新调用瀑布流布局
             waterFlow('main','box')
         }
     };
    


}

//瀑布流布局
function waterFlow(parent,box) {
    //1.获取所有的盒子
    var allBox = $(parent).getElementsByClassName(box);
    //2.求出任意一个盒子的宽度
    var boxWidth = allBox[0].offsetWidth;

    //3.求出当前屏幕的宽度
    var clientW = document.body.clientWidth||document.documentElement.clientWidth;

    //4.求出每一行显示的盒子
    var cols = Math.floor(clientW/boxWidth);
    //
    // alert(cols);
    //5.让父盒子进行居中显示
    $(parent).style.width = cols * boxWidth +'px';
    $(parent).style.margin = '0 auto';


    //2.除了第一行的盒子不需要做定位,其余行的盒子都需要做定位

    var heightArr =[];
    //遍历所有的子盒子
    for(var i=0;i<allBox.length;i++)
    {

        //1.求出每一个盒子的高度
        var boxHeight = allBox[i].offsetHeight;

        //是否是第一行
        //
        // //第一行
        if(i<cols)
        {
          heightArr.push(boxHeight);
        }
        //  //不是第一行
        else
        {
          //2.取出数组中第一行高度最矮的盒子
            var minBoxHeight = _.min(heightArr);

            //3.求出数组中高度最矮盒子对应的索引
            var minBoxHeightIndex = getBoxHeightIndex(heightArr,minBoxHeight);


            //4.定位其他行的所有盒子
            allBox[i].style.position = 'absolute';
            allBox[i].style.left = minBoxHeightIndex*boxWidth+'px';
            allBox[i].style.top = minBoxHeight+'px';
        }

        //更新高度数组中最矮盒子的索引位置
        heightArr[minBoxHeightIndex]+=boxHeight;
    }
    // console.log(heightArr,minBoxHeight,minBoxHeightIndex);
}


/***
 *
 * 求出最矮盒子在高度数组对应的索引位置
 */
function getBoxHeightIndex(arr,value) {
    for(var i=0;i<arr.length;i++)
    {
        //判断
        if(arr[i]==value) return i;
    }
}

//3.判断什么时候加载后续的其他盒子条件
function isWillLoadOtherBox() {
   //3.1.求出所有的盒子
    var allBox = $('main').getElementsByClassName('box');

    //3.2.求助所有盒子中的最后一个盒子
    var lastBox = allBox[allBox.length-1];

    //3.3.求出最后一个盒子高度的一半+最后一个盒子距离顶部的高度
    var lastDis = lastBox.offsetHeight*0.5+lastBox.offsetTop;

    //3.4.求出当前屏幕的高度
    var clientH = document.documentElement.clientHeight||document.body.clientHeight;

    // console.log(clientH);
    
    //3.5.求出scrollTop
    var myScrollTop = scroll().top;

    //3.6判断
    return lastDis<=clientH+myScrollTop;


}
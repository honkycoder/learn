<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/6/29
 * Time: 16:04
 */

# PHP基础语法
/*
 * (0) 注释
 *      单行注释:// | #
 *      多行注释:/星星-星星/
 * (1) 变量的声明
 *      js中的变量的声明 var 变量名 = 值
 *      var name = "张三";
 *      php中:
 *      $name = "zs";
 * (2) 语句
 *      注意点:代码结尾一定要加上分号
 *      循环:for | while | do while
 *      分支:if..else..| switch
 *
 * (3) 控制输出
 *      js ---> console.log()
 *      php
 *          1) echo 变量
 *          2) print 变量
 * (4) 函数
 *      js:function name(参数1,参数2){//.........return 返回值}
 *
 * (5) 数组|对象
 *      js:var arrT = new Array(1,2,3)
 *      js:var obj = {name:"wc",age:23}
 * */


# 变量的声明
    $name = "jack";   //字符串
    $num = 123;       //数字
    $bool = true;    //布尔值

# 控制输出,如果是字典或者是数组要打印具体的内容应该使用print_r
    echo $name;
    echo "<br>";
    print $name;
    echo "<br>";

# 数组
    $arrM = array(1,"demo","test");
    print_r($arrM);
    $arrT[] = "demo1";
    $arrT[] = "demo2";
    $arrT[1] = "demo3";
    echo "<br>";
    print_r($arrT);

# 字典-关联数组
    $dict = array("name"=>"wc","age"=>23);
    echo "<br>";
    print_r($dict);
    $dict["name"] = "xiaoqiang";
    echo "<br>";
    print_r($dict);


# 函数
    function sum($a,$b) {
        return $a + $b;
    }
    $res = sum(1,2);

    echo "<br>";
    echo $res;

# 遍历
    $arr = array("demo1","demo2","demo3","demo4");
    for($i = 0;$i<count($arr);$i++)
    {
        echo "<br>";
        echo $arr[$i];
    }


#网络请求通信的模型:请求 -- 响应
#请求
    请求头:包含对客户端以及请求本身的描述信息:
    请求体:具体的参数:

#响应
    响应头:包含对服务器端以及响应本身的描述信息:
    响应体:返回给客户端的具体数据:
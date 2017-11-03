<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/7/1
 * Time: 17:07
 */


# $_REQUEST 不管发送的GET请求还是POST请求都可以通过$_REQUEST对象来获取内部的数据

echo "post请求成功！";
echo $_REQUEST["name"];
echo "<br>";
echo $_REQUEST["type"];

<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/6/29
 * Time: 17:29
 */

    echo "hello world!";

    #接收客户端提交的数据 $_GET 全局对象
    echo "<br>";
    print_r($_GET);

    if($_GET["username"] != "zs")
    {
        echo "用户名不存在!";
        return;
    }

    if($_GET["password"] != "123456")
    {
        echo "密码错误!";
        return;
    }

    echo "登录成功!";
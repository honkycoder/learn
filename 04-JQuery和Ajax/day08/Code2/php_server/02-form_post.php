<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/7/1
 * Time: 9:24
 */

echo "请求成功!";

# 获取用户提交的用户名和密码
# 如果是GET请求，那么就是$_GET获取
# 如果是POST请求，那么就使用$_POST对象获取、

echo  $_POST["username"];
echo  $_POST["password"];

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
# 获取上传的数据，使用$_FILES

/*
 *  [fileName] => Array
        (
            [name] => 2345截图20170629173445.jpg   文件的名称
            [type] => image/jpeg                   文件的类型（MIMETYPE）
            [tmp_name] => E:\wamp\tmp\php8DEF.tmp  文件在服务器上的临时存储路径，随时会被删除
            [error] => 0                           错误信息
            [size] => 18627                        文件的大小
        )
 * */

# sleep(3);

# echo $_POST;
print_r($_FILES);

# 转移文件到安全的地方
# 第一个参数：这个文件在哪里
# 第二个参数：要把这个文件移动到什么地方
$sourcePath = $_FILES["fileName"]["tmp_name"];
$name = $_FILES["fileName"]["name"];
$targetPath = "../File/".$name;

# echo $sourcePath;
move_uploaded_file($sourcePath,$targetPath);
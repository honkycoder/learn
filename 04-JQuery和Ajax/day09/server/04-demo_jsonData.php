<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/7/2
 * Time: 11:26
 */

header("Content-Type: text/json; charset=utf-8");

# 01 加载对应的JSON数据
$jsonData = file_get_contents("jsonData.json");

# 02 根据用户提交的参数，把指定的某一部分数据返回
# 001 获取用户提交的参数
$name = $_REQUEST["name"];
# echo $name;

# 002 获取特定的数据
# (1) 把json格式的字符串 => PHP对象    反序列化
$obj = json_decode($jsonData,true);
# print_r($obj[$name]);

# (2) 处理完毕之后，再把PHP对象 = 》json
$json = json_encode($obj[$name]);
echo $json;

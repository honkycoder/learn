<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/7/2
 * Time: 10:42
 */

$data = array(
    "nz"=>array("title"=>"时尚女装","des"=>"时尚时尚最时尚的女装","img"=>"images/1.webp"),
    "bb"=>array("title"=>"精品 包包","des"=>"包治百病","img"=>"images/2.webp"),
    "xz"=>array("title"=>"品牌鞋子","des"=>"厂长是我表哥","img"=>"images/3.webp"),
);

# 根据用户提交的数据来获取对应的信息，返回
# bb nz xz
$name = $_REQUEST["name"];

$product = $data[$name];

# print_r($product);
echo $product["title"];
echo "@@";
echo $product["des"];
echo "@@";
echo $product["img"];



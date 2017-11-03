<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/7/2
 * Time: 11:26
 */

header("Content-Type: text/xml; charset=utf-8");

# 01 加载对应的JSON数据
$xmlData = file_get_contents("xmlData.xml");

echo $xmlData;

<?php

require_once '../database/database_class.php';
$db = new Database();

$ajax_cate_name = $_POST['cate'];
$ajax_countkind = $_POST['countkind'];
$ajax_like_stat = $_POST['like'];
$ajax_nummber = $_POST['conno'];

if($ajax_like_stat == 'true')
{
    $like_check = '+1';
}else if(!$ajax_like_stat != 'true')
{
    $like_check = '-1';
}

$db->changedb('lubyconboard');
$db->query = "UPDATE `$ajax_cate_name` SET `$ajax_countkind` = `$ajax_countkind` $like_check WHERE `$ajax_cate_name`.`boardCode` = $ajax_nummber";
$db->askQuery(); // viewcount up
?>

       
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
    $db->query = "UPDATE `lubyconboard`.`$ajax_cate_name` SET `$ajax_countkind` = `$ajax_countkind` $like_check WHERE `$ajax_cate_name`.`boardCode` = $ajax_nummber";
    $db->askQuery(); // viewcount up
    
    $db->query = "INSERT INTO `lubyconuser`.`$ajax_countkind` (`memberCode`,`boardCode`,`likeBoolean`,`CategoryCode`) VALUE(1,$ajax_nummber,1,1)";
    $db->askQuery(); // viewcount up

    // insert 쿼리 마저 짜야함 멤버코드는 세션참조 카테고리 코드는 제이슨참조

}else if(!$ajax_like_stat != 'true')
{
    $like_check = '-1';
}

$db->query = "UPDATE `lubyconboard`.`$ajax_cate_name` SET `$ajax_countkind` = `$ajax_countkind` $like_check WHERE `$ajax_cate_name`.`boardCode` = $ajax_nummber";
$db->askQuery(); // viewcount up
?>

       

(UPDATE `lubyconboard`.`artwork` SET `likeCount` = `likeCount`+1 WHERE `artwork`.`boardCode` = 1)
UNION
(INSERT INTO `lubyconuser`.`like` (`memberCode`,`boardCode`,`likeBoolean`) VALUE(1,1,1))
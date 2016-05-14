<?php
require_once '../session/session_class.php';
$session = new Session();
if(($session->GetSessionId() == null) && $session->GetSessionName() == null){
$LoginState = false;
}else{
if($session->SessionExist()){
$LoginState = true;
$username= $_SESSION['lubycon_nick'];
$userid= $_SESSION['lubycon_id'];
$usercode= $_SESSION['lubycon_code'];
}else{
$LoginState = false;
}
}
$ajax_cate_name = $_POST['cate'];
$ajax_countkind = $_POST['countkind'];
$ajax_countkind_name = $ajax_countkind.'Count';
$ajax_like_stat = $_POST['like'];
$ajax_nummber = $_POST['conno'];
$ajax_usercode = $usercode;

require_once "../class/json_class.php";
$json_control = new json_control;
$json_control->json_decode('top_category',"../../data/top_category.json");
$json_control->json_search($ajax_cate_name);
$top_cate_code = $json_control->search_key;

require_once '../database/database_class.php';
$db = new Database();


if($ajax_like_stat == 'true')
{
    $like_check = '+1';
    echo $ajax_countkind.$ajax_usercode.$ajax_nummber.$top_cate_code;
    $db->query = "INSERT INTO `lubyconuser`.`$ajax_countkind` (`memberCode`,`boardCode`,`$ajax_countkind"."Boolean`,`CategoryCode`) VALUE($ajax_usercode,$ajax_nummber,1,$top_cate_code)";
}else if(!$ajax_like_stat != 'true')
{
    $like_check = '-1';
    $db->query = "DELETE FROM `lubyconuser`.`$ajax_countkind` WHERE `$ajax_countkind`.`memberCode` = $ajax_usercode AND `$ajax_countkind`.`boardCode` = $ajax_nummber AND `$ajax_countkind`.`CategoryCode` = $top_cate_code";
    //delete query is not working
}else{
    die('like stat was wrong');
}
echo $db->query;
$db->askQuery(); // viewcount up
$db->query = "UPDATE `lubyconboard`.`$ajax_cate_name` SET `$ajax_countkind_name` = `$ajax_countkind_name` $like_check WHERE `$ajax_cate_name`.`boardCode` = $ajax_nummber";
$db->askQuery(); // viewcount up
?>
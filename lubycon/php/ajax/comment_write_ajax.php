<?php
require_once '../session/session_class.php';
$session = new Session();
if(($session->GetSessionId() == null) && $session->GetSessionName() == null){
$LoginState = false;
}else{
if($session->SessionExist()){
$LoginState = true;
$Loginuser_name= $_SESSION['lubycon_nick'];
$Loginuser_id= $_SESSION['lubycon_id'];
$Loginuser_code= $_SESSION['lubycon_code'];
}else{
$LoginState = false;
}
}
if($LoginState)
{

    $ajax_cate_name = $_POST['cate']; //artwork vector threed
    $ajax_countkind = $_POST['countkind']; //bookmark or like
    $ajax_countkind_name = $ajax_countkind.'Count'; //colume name
    $ajax_nummber = $_POST['conno']; // contents boradCode
    $ajax_usercode = $Loginuser_code; // userCode
    $ajax_content = $_POST['content'];
    $ajax_stat = $_POST['stat_check'];
    $stat_value = '-1';
    if($ajax_stat)
    {
        $stat_value= '+1';
    }

    require_once "../class/json_class.php";
    $json_control = new json_control;
    $json_control->json_decode('top_category',"../../data/top_category.json");
    $top_cate_json = $json_control->json_decode_code;
    $json_control->json_search($top_cate_json,'name','topCateCode',$ajax_cate_name);
    $cate_name = $json_control->search_key;

    $active_date = date("YmdHis");

    require_once '../database/database_class.php';
    $db = new Database();
    $db->query = 
        "
        INSERT INTO `lubyconboard`.`contentscomment` 
        (`commentActionUserCode`, `boardCode`, `topCategoryCode`, `commentDate`, `commentContents`) VALUES 
        ('$ajax_usercode', '$ajax_nummber', '$ajax_cate_name', '$active_date', '$ajax_content');

        ";
    $db->askQuery();
    $db->query = "UPDATE `lubyconboard`.`$ajax_cate_name` SET `$ajax_countkind_name` = `$ajax_countkind_name` $stat_value WHERE `$ajax_cate_name`.`boardCode` = $ajax_nummber";
    $db->askQuery(); 
    //echo $db->query;


    //echo $db->query ;
    $select_result =  $db->result;
    $value = array(
        'src' => "../../../../Lubycon_Contents/user/$ajax_usercode/profile.jpg",
        'name' => "$Loginuser_name",
        'date' => "$active_date", 
        'content' => "$ajax_content"
    );

    $output = json_encode($value);
    echo $output;
    
}else
{
    return 'not login';
}
?>
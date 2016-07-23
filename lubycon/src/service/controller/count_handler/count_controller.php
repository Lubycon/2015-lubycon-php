<?php
require_once '../../../common/Class/session_class.php';
    //session_start();
    $session = new Session();

    if(($session->GetSessionId() == null) && $session->GetSessionName() == null){
        $LoginState = false;
    }else{
        if($session->SessionExist()){
            
            if(isset($_SESSION['lubycon_validation']))
            {
                $LoginState = true;
            }else{
                $session->DestroySession();
            } 
            $Loginuser_name = isset($_SESSION['lubycon_nick']) ? $_SESSION['lubycon_nick'] : NULL;
            $Loginuser_code= isset($_SESSION['lubycon_userCode']) ? $_SESSION['lubycon_userCode'] : NULL;
            // login menu
        }else{
            $LoginState = false;    
        }
    }
    require_once "../../../common/class/json_class.php";
    $json_control = new json_control;
    $json_control->json_decode('top_category',"../../../../data/top_category.json");
    $top_cate_json = $json_control->json_decode_code;

if($LoginState)
{
    $ajax_countkind = $_POST['countkind']; //bookmark or like
    $content_kind = $_POST['contentkind'];
    $ajax_countkind_name = $ajax_countkind.'Count'; //colume name
    $ajax_nummber = $_POST['conno']; // contents boradCode
    $ajax_cate_code = $_POST['cate']; //artwork vector threed
    $ajax_cate_name = $top_cate_json[$ajax_cate_code]['name'];
    $ajax_usercode = $Loginuser_code; // userCode

    $active_date = date("YmdHis");

    require_once '../../model/count_handler/count_model.php';

}else
{
    die('501error');
}
?>
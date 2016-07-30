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


if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
    $postData = json_decode(file_get_contents("php://input"));
}else
{
    die('it is not post data error code 0000');
}



if($LoginState)
{
    $ajax_countkind = $postData->type == 0 ? 'bookmark' : 'like'; //bookmark or like
    $content_kind = $postData->contentKind == 0 ? 'contents' : 'comment';
    $ajax_countkind_name = $ajax_countkind.'Count'; //colume name

    $json_control->json_decode($content_kind.'_top_category',"../../../../data/top_category.json");
    $top_cate_json = $json_control->json_decode_code;

    $ajax_board_kind = $postData->boardKind;
    $ajax_number = $postData->conno; // contents boradCode
    $ajax_cate_code = $postData->cate; //0 1 2
    $ajax_cate_name = $top_cate_json[$ajax_cate_code]['name'];
    $ajax_give_usercode = $Loginuser_code; // userCode
    $ajax_take_usercode = $postData->usercode; // userCode

    $active_date = date("YmdHis");

    require_once '../../model/count_handler/count_model.php';

}else
{
    die('501error');
}
?>

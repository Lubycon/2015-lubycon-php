<?php
require_once '../session/session_class.php';
$session = new Session();
if(($session->GetSessionId() == null) && $session->GetSessionName() == null){
        $LoginState = false;
    }else{
        if($session->SessionExist()){
            
            if(isset($_SESSION['lubycon_validation']))
            {
                $activity = NULL;
                
                if($_SESSION['lubycon_validation'] === "active")
                    $activity = true;
                else if($_SESSION['lubycon_validation'] === "inactive")
                    $activity = false;
                else
                    $activity = false;

                if($activity === false)
                    echo '<script>document.location.href="./php/account/waiting_for_resisting.php"</script>';

            }else{
                $session->DestroySession();
            } 

            $LoginState = true;
            
            $Loginuser_name = isset($_SESSION['lubycon_nick']) ? $_SESSION['lubycon_nick'] : NULL;
            $Loginuser_id= isset($_SESSION['lubycon_id']) ? $_SESSION['lubycon_id'] : NULL;
            $Loginuser_code= isset($_SESSION['lubycon_userCode']) ? $_SESSION['lubycon_userCode'] : NULL;
            // login menu
        }else{
            $LoginState = false;    
        }
    }
if($LoginState)
{

    $ajax_cate_name = $_POST['cate']; //artwork vector threed
    $ajax_nummber = $_POST['conno']; // contents boradCode
    $ajax_usercode = $Loginuser_code; // userCode
    $ajax_content = $_POST['content'];
    $ajax_time = $_POST['write_time'];

    require_once "../class/json_class.php";
    $json_control = new json_control;
    $json_control->json_decode('top_category',"../../data/top_category.json");
    $top_cate_json = $json_control->json_decode_code;
    $json_control->json_search($top_cate_json,'topCateCode','name',$ajax_cate_name);
    $cate_code = $json_control->search_key;

    require_once '../database/database_class.php';
    $db = new Database();
    $db->query = "UPDATE `lubyconboard`.`contentscomment` as a SET a.`commentStatus` = 'delete' WHERE a.`boardCode` = '$ajax_nummber' AND a.`topCategoryCode` = '$cate_code' AND a.commentActionUserCode = '$ajax_usercode' AND a.commentDate = '$ajax_time'";
    $db->askQuery(); 
    print_r($db->query);
}else
{
    return 'not login';
}
?>
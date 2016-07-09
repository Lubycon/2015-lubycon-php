<?php
// session
require_once '../session/session_class.php';
$session = new Session();
require_once "../class/json_class.php";
$json_control = new json_control;
$json_control->json_decode('top_category',"../../data/top_category.json");
require_once "../class/upload_class.php";
$uploader = new upload($_FILES,$_POST,'profile');
include_once '../class/database_class.php';
$db = new Database();


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
// session

// variable
// variable

$uploader->fill_array_data(); // fill array data for validate things // preview image able , thumb image able
$uploader->validate_extension_and_size();
$uploader->file_upload_control();

$db->query = "UPDATE `lubyconuser`.`userinfo` SET `profileImg` = '$uploader->last_path' WHERE `userinfo`.`userCode` = '$Loginuser_code' ";
$db->askQuery(); // update user profile image path
//echo $db->query;
?>
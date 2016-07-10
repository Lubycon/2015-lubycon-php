<?php
    require_once '../session/session_class.php';
    //session_start();
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

    $post_data = $_POST['ajax_data'];

    require_once "../class/upload_class.php";

    $uploader = new upload($usercode);
    $uploader->ajax_check_type($post_data);
    $uploader->ajax_validate_ext($post_data ,'img');
    $uploader->ajax_validate_size($post_data , 100000);
    $uploader->ajax_saveto_temp($post_data);

    //echo 'done';
?>
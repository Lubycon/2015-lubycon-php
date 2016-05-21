<?php
    require_once './php/session/session_class.php';
    //session_start();
    $session = new Session();

    if(($session->GetSessionId() == null) && $session->GetSessionName() == null){
        $LoginState = false;
    }else{
        if($session->SessionExist()){
            $LoginState = true;
            echo "로그인 성공<br/>";
        }else{
        	$LoginState = false;	
        	echo "로그인 실패<br/>";
        }
        
                
    }


    //echo("<script>console.log(LoginState:".$LoginState.");</script>");
    /*
    if(isset($_COOKIE)){
        if(isset($_COOKIE['login'])){
            $info = unserialize($_COOKIE['login']);
            setcookie('login', serialize($info), time()+5000000);
        }else if(!isset($_COOKIE['login'])){
            session_destroy();
        }
    }
    */
?>
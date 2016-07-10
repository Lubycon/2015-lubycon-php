<?php
    require_once './common/Class/session_class.php';
    //session_start();
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
                    echo '<script>document.location.href="?dir=service/view/waiting_for_resisting.php"</script>';

            }else{
                $session->DestroySession();
            } 

            $LoginState = true;
            
            $Loginuser_name = isset($_SESSION['lubycon_nick']) ? $_SESSION['lubycon_nick'] : NULL;
            $Loginuser_id= isset($_SESSION['lubycon_id']) ? $_SESSION['lubycon_id'] : NULL;
            $Loginuser_code= isset($_SESSION['lubycon_userCode']) ? $_SESSION['lubycon_userCode'] : NULL;
        }else{
            $LoginState = false;    
        }
    }
?>
    <link rel="stylesheet" href="./service/view/messagePage.css" />
    
    <script type="text/javascript" src="./service/view/messagePage.js"></script>
    
    <section class="message message-wrapper bounceInDown animated">
        <i class="message-icon fa fa-lock black-color"></i>
        <div class="message-box">
            <article class="main-message">Security</article>
            <article class="sub-message">Plesase write your password again</article>
        </div>
        <div class="message-box">
            <label class="label-message">Password</label>
            <input class="input-message" type="password" data-value="password" />
        </div>
        <div class="message-box">
            <div class="btn cancel-bt">Not now</div>
            <a class="btn submit-bt" href="?dir=pages/view/account_setting/account_setting&usernum=<?=$Loginuser_code?>">CHECK</a>
        </div>
    </section>
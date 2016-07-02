<?php
    $one_depth = '../..'; //css js load
    $two_depth = '..'; // php load
    require_once $two_depth.'/session/session_class.php';
    //session_start();
    $session = new Session();

    if(($session->GetSessionId() == null) && $session->GetSessionName() == null){
        $LoginState = false;
    }else{
        if($session->SessionExist()){
            $LoginState = true;
            $Loginuser_name= $_SESSION['lubycon_nick'];
            $Loginuser_id= $_SESSION['lubycon_id'];
            $Loginuser_code= $_SESSION['lubycon_code'];
            // login menu
        }else{
            $LoginState = false;    
        }
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta name="subject" content="Lubycon" />
    <meta name="description" content="free sources" />
    <meta name="developed" content="Lubycon" />
    <meta name="designed" content="Lubycon" />
    <meta name="robots" content="index" />
    <meta name="copyright" content="copyrights 2015 LUBYCON" />
    <meta name="keywords" content="design, font ,vector, 3d design, community, designers, engineer, 3d printer, illustration, lubycon" />

    <title>Lubycon</title>
	
	<link rel="shortcut icon" href="../../ch/img/logo/lubycon.ico" />  <!-- favicon -->
	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" />
	<link href='http://fonts.googleapis.com/css?family=Source Sans Pro:200,400' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="../../css/layout/animate.css" />
    <link rel="stylesheet" href="../../css/messagePage.css" />

    <script type="text/javascript" src="../../js/core/jquery-1.12.2.min.js"></script> <!-- jquery library -->
    <script type="text/javascript" src="../../js/core/core.js"></script>
    <script type="text/javascript" src="../../js/messagePage.js"></script>
</head>
<body ondragstart="return false" onselectstart="return false">
    <section class="message message-wrapper bounceInDown animated">
        <i class="message-icon fa fa-lock black-color"></i>
        <div class="message-box">
            <article class="main-message">Are you sure?</article>
            <article class="sub-message">Plesase write your password again</article>
        </div>
        <div class="message-box">
            <label class="label-message">Password</label>
            <input class="input-message" type="password" data-value="password" />
        </div>
        <div class="message-box">
            <div class="btn cancel-bt">Not now</div>
            <div class="btn submit-bt" href="../account/account_setting.php?usernum=<?=$Loginuser_code?>">CHECK</div>
        </div>
    </section>
</body>
</html>
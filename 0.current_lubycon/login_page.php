<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>LUBYCON</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="subject" content="Lubycon" />
    <meta name="description" content="free sources" />
    <meta name="author" content="Daniel ZEPOT" />
    <meta name="designer" content="Dart" />
    <meta name="robots" content="index" />
    <meta name="copyright" content="copyrights 2015 LUBYCON" />
    <meta name="keywords" content="font ,vector, 3D design, community, designers, engineer, 3D printer, Illustration, Lubycon" />
    <meta name="viewport" content="width=device-width, height=device-height, user-scalable=no"><!--responsive design enable-->
    
    <link rel="shortcut icon" href="./ch/img/logo/lubycon.ico" />  <!-- favicon -->
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" />
    <link href="css/layout/normalize.css" rel="stylesheet" type="text/css" />  <!-- web normalize -->
    <link href="css/layout/animate.css" rel="stylesheet" type="text/css" /><!--animation for objects-->
    <link href="css/layout/common.css" rel="stylesheet" type="text/css" />  <!-- common css -->
    <link href="css/layout/media.css" rel="stylesheet" type="text/css" /> <!-- media query-->
    <link href="css/module/lubySelector.css" rel="stylesheet" type="text/css" />
    <link href="css/module/lubyAlert.css" rel="stylesheet" type="text/css" />
    <link href="css/module/checkBox.css" rel="stylesheet" type="text/css" />
    <link href="css/login_page.css" rel="stylesheet" type="text/css" /> 
    <link href='http://fonts.googleapis.com/css?family=Source Sans Pro:200,400' rel='stylesheet' type='text/css'>

    <script type="text/javascript" src="js/core/jquery-1.12.2.min.js"></script> <!-- jquery library -->
    <script type="text/javascript" src="js/module/jquery.lubySelector.js"></script><!--lubySelector-->
    <script type="text/javascript" src="js/module/jquery.lubyAlert.js"></script><!--lubySelector-->
    <script type="text/javascript" src="js/module/checkBox.js"></script>
    <script type="text/javascript" src="js/core/ui.js"></script>
    <script type="text/javascript" src="js/login_page.js"></script> <!--login_page interation js-->
    <script type="text/javascript" src="js/module/account.js"></script> <!-- account file js -->
</head>
<body id="bodyer">
    <div class="dark_overlay"></div>
    <div id="loginWrap">
        <div id="login_box">
            <header id="intro_wrap">
                <a href="index.php">
                    <figure id="logo_lubycon"></figure>
                </a>
            </header>
            <form id="main_login" name="main_login" method="post" action="login_check.php">
                <div id="login_input">
                        <input type="text" id="login_id" name="login_id" value="E-mail"/><i id="email_icon" class="fa fa-user"></i>
                        <input type="password" id="login_pass" name="login_pass" value="Password" /><i id="pass_icon" class="fa fa-key"></i>
                </div> <!-- end login_input div --> 
                <button type="submit" id="login_lubycon" class="animate_width"><i class="fa fa-unlock-alt"></i></button><!--submit bt-->
            </form><!--end login_input form-->
            <div id="login_submit">
                <p id="loginWith_title">Login with</p>
                <button id="login_facebook"><i class="fa fa-facebook"></i><span>Facebook</span></button>
                <button id="login_google"><i class="fa fa-google-plus"></i><span>Google+</span></button>
            </div>     <!-- end login_submit div -->
            <p id="create_acc">Create An Account</p> 
            <a href="./php/account/forgot_password.php" target="_self"><p id="forgot_pass">Forgot your password?</p></a>          
        </div>  <!-- end login_box div -->
    </div>
    
</body>
</html>

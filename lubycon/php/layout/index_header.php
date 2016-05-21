<?php
    require_once $two_depth.'/session/session_class.php';
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
    //echo("<script>console.log(LoginState:".$LoginState.");</script>");
    /*
    if(isset($_COOKIE)){
        if(isset($_COOKIE['login'])){
            $info = unserialize($_COOKIE['login']);
            $username = $_SESSION['user_name'];
            $usercode = $_SESSION['user_code'];
            setcookie('login', serialize($info), time()+5000000);
        }else if(!isset($_COOKIE['login'])){
            session_destroy();
        }
    }
    */

?>

<!DOCTYPE html>

<html>

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

    <link rel="icon" href="<?=$one_depth?>/ch/img/logo/lubycon.ico" /> <!-- favicon -->
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Source Sans Pro:200,400,600" type="text/css" />	<!--google web font-->
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" /> <!--icon font-->

    <link href="<?=$one_depth?>/css/layout/normalize.css" rel="stylesheet" type="text/css" />  <!-- web normalize -->
    <link href="<?=$one_depth?>/css/layout/common.css" rel="stylesheet" type="text/css" />  <!-- common css -->
    <link href="<?=$one_depth?>/css/layout/media.css" rel="stylesheet" type="text/css" /> <!-- media query-->
    <link href="<?=$one_depth?>/css/module/lubySelector.css" rel="stylesheet" type="text/css" />
    <link href="<?=$one_depth?>/css/module/lubyAlert.css" rel="stylesheet" type="text/css" />
    <link href="<?=$one_depth?>/css/module/checkBox.css" rel="stylesheet" type="text/css" />
    <link href="<?=$one_depth?>/css/layout/animate.css" rel="stylesheet" type="text/css" /><!--animation for objects-->
    <link href="<?=$one_depth?>/css/slider.css" rel="stylesheet" type="text/css" /><!--slider css-->

    <script type="text/javascript" src="<?=$one_depth?>/js/core/jquery-1.12.2.min.js"></script> <!-- jquery library -->
    <script type="text/javascript" src="<?=$one_depth?>/js/core/jquery-ui.min.js"></script> <!-- jquery library -->
    <script type="text/javascript" src="<?=$one_depth?>/js/module/slider.js"></script><!--slider plugin-->
    <script type="text/javascript" src="<?=$one_depth?>/js/module/jquery.lubySelector.js"></script><!--lubySelector-->
    <script type="text/javascript" src="<?=$one_depth?>/js/module/jquery.lubyAlert.js"></script><!--lubyAlert-->
    <script type="text/javascript" src="<?=$one_depth?>/js/module/resizeObject.js"></script>
    <script type="text/javascript" src="<?=$one_depth?>/js/module/sticky.js"></script>
    <script type="text/javascript" src="<?=$one_depth?>/js/module/checkBox.js"></script>
    <script type="text/javascript" src="<?=$one_depth?>/js/core/ui.js"></script><!-- ui file js -->
    <script type="text/javascript" src="<?=$one_depth?>/js/core/mobile.js"></script><!--mobile file js-->
    <script type="text/javascript" src="<?=$one_depth?>/js/core/core.js"></script> <!-- index file js -->
    <script type="text/javascript" src="<?=$one_depth?>/js/module/account.js"></script> <!-- account file js -->
    
    <meta name="viewport" content="width=device-width, height=device-height, user-scalable=no"><!--responsive design enable-->
    <meta name="theme-color" content="#222222"><!--mobile web browser address window will be changed to #222-->
    <!--[if lt IE 9]>
    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
</head>
<body id="bodyer">
<div id="wrapper"> 
    <div id="loading_icon"><i class="fa fa-spinner fa-spin"></i></div>
    <div class="dark_overlay" data-value="dark_overlay"></div>
    <div id="cancel_layer"></div><!--for mobile, It's transparent-->
    <aside id="mb-menu_panel" class="visible-mb"><!--mobile panel menu-->
        <header id="mb-user_section">
            <div id="mb-signin">
                <a href="<?=$one_depth?>/login_page.php">
                    <p class="signicon"><i class="fa fa-unlock-alt fa-lg"></i></p>
                    <p class="signin">SIGN IN</p>
                </a>
            </div>
            <div id="mb-after_signin">
                <?php
                    $user_pic = $one_depth."/ch/img/no_img/no_img_user1.jpg";
                    $user_city = "City";
                    $user_country = "Country";
                ?>
                 <figure id="mb-user_pic">
                    <img src=<?=$user_pic?>></img>
                </figure>
                <span id="mb-user_info">
                    <span id="mb-user_name"><?=$user_name?></span>
                    <span id="mb-user_location"><i class="fa fa-map-marker"></i><?=$user_city?>, <?=$user_country?></span>
                </span>
            </div> 
        </header>
        <ul class="mb-menu_group">
            <li class="mb-menu_list">
                <i class="fa fa-font fa-1x"></i><a href="<?=$two_depth?>/contents/








?cate=artwork">Artwork</a>
            </li>
            <li class="mb-menu_list">
                <i class="fa fa-square fa-1x"></i><a href="<?=$two_depth?>/contents/contents_page.php?cate=vector">Vector</a>
            </li>
            <li class="mb-menu_list">
                <i class="fa fa-cube fa-1x"></i><a href="<?=$two_depth?>/contents/contents_page.php?cate=threed">3D Model</a>
            </li>
        </ul>
        <ul class="mb-menu_group">
            <li class="mb-menu_list">
                <i class="fa fa-pencil fa-1x"></i><a href="<?=$two_depth?>/creators_page/creators.php">Creator</a>
            </li>
            <li class="mb-menu_list">
            	<i class="fa fa-comments-o fa-1x"></i><a href="<?=$two_depth?>/community/community_page.php?cate=forum">Forum</a>
            </li>
        </ul>
        <ul class="mb-menu_group">
            <li class="mb-menu_list">
                <i class="fa fa-tachometer fa-1x"></i><a href="<?=$two_depth?>/personal_page/personal_page.php?cate=dashboard&usernum=<?=$usercode?>">Dashboard</a>
            </li>
            <li class="mb-menu_list">
                <i class="fa fa-line-chart fa-1x"></i><a href="<?=$two_depth?>/personal_page/personal_page.php?cate=insight&usernum=<?=$usercode?>">Insight</a>
            </li>
            <li class="mb-menu_list">
                <i class="fa fa-gear fa-1x"></i><a href="<?=$two_depth?>/personal_page/personal_page.php?cate=account_setting&usernum=<?=$usercode?>">Account Setting</a>
            </li>
        </ul>
        <ul class="mb-menu_group">
            <li class="mb-menu_list"><i class="fa fa-power-off fa-1x"></i>Log out</li>
        </ul>
    </aside>
    <div class="editor_popup modal fadeInDown animated"> <!-- popup start -->
        <p>Which content will you upload?</p>
        <ul>
            <li>
                <a href="<?=$two_depth?>/editor/core/2d/editor2d.php?cate=artwork">
                <i class="fa fa-font"></i>
                <p>Artwork</p>
                </a>
            </li>
            <li>
                <a href="<?=$two_depth?>/editor/core/2d/editor2d.php?cate=vector">
                <i class="fa fa-stop"></i>
                <p>Vector</p>
                </a>
            </li>
            <li>
                <a href="<?=$two_depth?>/editor/core/3d/editor3d.php?cate=threed">
                <i class="fa fa-cube"></i>
                <p>3D Model</p>
                </a>
            </li>
        </ul>
        <button class="modal-closebt" data-value="modal-closebt"></button>
    </div><!-- popup end -->
    <header class="main_header">
        <div id="mb-menu" class="visible-mb"><i class="fa fa-bars"></i></div>
        <h1>
            <a href="<?=$one_depth?>/index.php">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1813.8 368.3" width="130px" height="40px" style="enable-background:new 0 0 1813.8 368.3;" xml:space="preserve">
                <style type="text/css">
                    .st0{fill:#FFFFFF;}
                </style>
                <g>
                    <path class="st0" d="M296.4,129.2L190.5,45.6c-1.2-1-2.9-1.1-4.3-0.5c-1.4,0.7-2.3,2.1-2.3,3.6v17l-25.5-20.2c-1.5-1.2-3.5-1.2-5,0
                        L47.5,129.3c0,0,0,0,0,0.1c-0.2,0.2-0.4,0.4-0.6,0.6c0,0,0,0.1-0.1,0.1c-0.1,0.2-0.3,0.4-0.4,0.6c0,0,0,0.1-0.1,0.1
                        c-0.1,0.2-0.2,0.5-0.3,0.7c0,0.1-0.1,0.1-0.1,0.2c-0.1,0.3-0.2,0.5-0.2,0.8v120.8c0,1.2,0.6,2.4,1.6,3.2l106,83.6
                        c0.7,0.6,1.6,0.9,2.5,0.9c0.6,0,1.1-0.1,1.7-0.4c1.4-0.7,2.2-2.1,2.2-3.6v-17l25.6,20.2c0.7,0.6,1.6,0.9,2.5,0.9
                        c0.9,0,1.8-0.3,2.5-0.9l105.9-83.7c0,0,0,0,0.1-0.1c0.2-0.2,0.4-0.4,0.6-0.6c0,0,0-0.1,0.1-0.1c0.1-0.2,0.3-0.4,0.4-0.6
                        c0,0,0-0.1,0.1-0.1c0.1-0.2,0.2-0.5,0.3-0.7c0-0.1,0-0.1,0-0.2c0.1-0.3,0-0.5,0-0.8V132.3C297.9,131.1,297.4,129.9,296.4,129.2z
                         M191.9,57l98,77.2v110.6l-82-64.7l56.6-44.5c1-0.8,1.5-1.9,1.5-3.2s-0.7-2.4-1.6-3.2l-72.4-57.2V57z M151.9,217.9v85.4l-63.3-50.1
                        l54-42.6L151.9,217.9z M156,210.8l-6.8-5.4l38.9-30.6l6.8,5.4L156,210.8z M191.9,167.7V82.4l63.5,50.1l-54.1,42.6L191.9,167.7z
                         M155.9,53.9l28,22.2v91.7l-41.3,32.6l-52.7-41.6l-33.4-26.3L155.9,53.9z M151.9,328.6l-98-77.2V140.8l19,14.9l63.3,49.8L79.6,250
                        c-1,0.8-1.5,1.9-1.5,3.2c0,1.2,0.5,2.4,1.5,3.2l72.3,57.2V328.6z M188,331.8l-28.1-22.2v-91.7l41.4-32.6l86.1,67.9L188,331.8z"/>
                    <g>
                        <g>
                            <path class="st0" d="M546.2,268.1v17.1c0,2.4-0.8,4.4-2.5,6.1c-1.7,1.7-3.7,2.5-6.1,2.5H409.5c-2.4,0-4.4-0.8-6.1-2.5
                                c-1.7-1.7-2.5-3.7-2.5-6.1V100.5c0-2.4,0.8-4.4,2.5-6.1s3.7-2.5,6.1-2.5H431c2.4,0,4.4,0.8,6.1,2.5s2.5,3.7,2.5,6.1V251
                                c0,2.4,0.8,4.4,2.5,6.1c1.7,1.7,3.7,2.5,6.1,2.5h89.6c2.4,0,4.4,0.8,6.1,2.5C545.4,263.7,546.2,265.7,546.2,268.1z"/>
                            <path class="st0" d="M621.5,291.2c-11-4.2-20.1-9.9-27.3-17.1c-7.7-7.3-13.6-16.3-17.6-26.7c-4-10.3-6.1-22-6.1-35v-46.6
                                c0-2.4,0.8-4.4,2.5-6.1c1.7-1.7,3.6-2.5,5.8-2.5h21.8c2.4,0,4.4,0.8,6.1,2.5c1.7,1.7,2.5,3.7,2.5,6.1v46.4
                                c0,10.1,1.7,18.5,5,25.1c3.3,6.4,7.3,11.7,12.1,15.7c5.1,4,10.4,6.7,15.7,8c2.9,0.7,5.7,1.3,8.1,1.7c2.5,0.4,4.8,0.6,7,0.6
                                c4,0,9-0.7,14.9-2.2c5.7-1.3,10.9-3.9,15.7-8c5-3.9,9.1-9.1,12.4-15.7s5-15,5-25.1v-46.4c0-2.4,0.8-4.4,2.5-6.1
                                c1.7-1.7,3.7-2.5,6.1-2.5H735c2.4,0,4.4,0.8,6.1,2.5c1.7,1.7,2.5,3.7,2.5,6.1v46.6c0,6.4-0.5,12.5-1.5,18.3
                                c-1,5.8-2.5,11.3-4.5,16.7c-4,10.3-9.8,19.2-17.4,26.7c-7.4,7.2-16.4,12.9-27.3,17.1c-10.5,4-22.4,6.1-35.8,6.1
                                C643.6,297.3,631.8,295.3,621.5,291.2z"/>
                            <path class="st0" d="M933,161.1c-1.8,4.8-4,9-6.6,12.7c-2.8,3.9-6.2,7.1-10.5,9.6c-1.8,1.3-4,2.4-6.3,3.3c-1.8,0.6-2.7,1-2.5,1.2
                                c0.2,0.3,1.3,0.7,3.3,1.2c2.6,0.9,5,1.8,7.2,2.8c4.8,2.4,9.1,5.8,13,10.2c4,4.2,7.3,9.1,9.6,14.6c2.4,5.3,3.6,11.1,3.6,17.4
                                c0,11-1.7,20.4-5,28.1c-3.5,7.9-8,14.1-13.5,18.5c-5.5,4.8-12.1,8.1-19.8,9.9c-3.9,0.9-7.8,1.7-11.9,2.2c-4,0.6-8.3,0.8-12.7,0.8
                                h-84.6c-2.4,0-4.4-0.8-6.1-2.5c-1.7-1.7-2.5-3.7-2.5-6.1V100.5c0-2.4,0.8-4.4,2.5-6.1s3.7-2.5,6.1-2.5h80.2
                                c4.2,0,8.2,0.2,11.9,0.6c3.7,0.4,7.3,0.9,11,1.7c7.5,1.8,13.8,4.8,18.7,8.8c5.5,4,9.7,9.7,12.7,17.1c3.1,6.8,4.7,16.1,4.7,27.8
                                C935.4,152.1,934.6,156.5,933,161.1z M834.8,174.1h38.9c3.9,0,7.3-0.7,10.2-2.2c2.6-1.3,5-3.2,7.2-5.8c1.8-2.2,3.3-5,4.4-8.3
                                c0.9-2.6,1.4-5.6,1.4-9.1c0-2.9-0.6-5.8-1.7-8.5c-1.3-3.1-2.8-5.5-4.4-7.2c-1.7-1.8-3.8-3.5-6.3-5c-2.4-1.3-5.1-1.9-8-1.9h-41.6
                                c-2.4,0-4.4,0.8-6.1,2.5c-1.7,1.7-2.5,3.7-2.5,6.1v30.9c0,2.4,0.8,4.4,2.5,6.1C830.4,173.2,832.4,174.1,834.8,174.1z M890.2,257
                                c2.8-1.3,5.3-3.4,7.7-6.3c2.4-2.8,4.1-5.7,5.2-8.8c1.3-2.8,1.9-6,1.9-9.6c0-6.6-2.5-12.3-7.4-17.1c-4.8-4.6-11.8-6.9-20.9-6.9
                                h-41.9c-2.4,0-4.4,0.8-6.1,2.5c-1.7,1.7-2.5,3.7-2.5,6.1V251c0,2.4,0.8,4.4,2.5,6.1c1.7,1.7,3.7,2.5,6.1,2.5h46
                                C884.3,259.5,887.5,258.7,890.2,257z"/>
                            <path class="st0" d="M1131.7,99.4c-2,3.3-4.1,6.8-6.3,10.3s-4.6,7.4-7.2,11.4c-3.3,5.3-6.7,10.8-10.1,16.3
                                c-3.4,5.5-6.8,11.1-10.3,16.8c-3.7,5.7-7.2,11.3-10.6,17c-3.4,5.6-6.8,11.1-10.1,16.4c-2.6,4-5,7.9-7.3,11.6
                                c-2.3,3.7-4.5,7.3-6.5,10.8c-1.3,2-2.3,4.6-3,7.7c-0.7,3.1-1.1,5.9-1.1,8.3v59.3c0,2.4-0.8,4.4-2.5,6.1c-1.7,1.7-3.7,2.5-6.1,2.5
                                h-21.8c-2.4,0-4.4-0.8-5.9-2.5c-1.6-1.7-2.3-3.7-2.3-6.1v-59.3c0-2.4-0.4-5.1-1.2-8.3c-0.8-3.1-1.9-5.7-3.2-7.7
                                c-5.3-9.4-10.8-18.6-16.4-27.7c-5.6-9.1-11.3-18.2-17.2-27.4c-6.1-9.4-11.9-18.6-17.6-27.7c-5.7-9.1-11.2-18.3-16.5-27.7
                                c-1.3-2-1.5-3.7-0.7-5.1c0.8-1.4,2.4-2.1,4.8-2.1h28.1c2.4,0,4.8,0.7,7.3,2.1c2.5,1.4,4.3,3.1,5.4,5.1c3.5,5.9,7,11.8,10.5,17.6
                                c3.5,5.9,7.1,11.9,10.8,17.9c3.5,6.1,7,12,10.5,17.9c3.5,5.9,7,11.8,10.5,17.6c1.1,2,2.5,3,4.3,3c1.7,0,3.3-1,4.5-3
                                c1.3-2.2,2.6-4.4,4-6.6c1.4-2.2,2.8-4.5,4.3-6.9l13.2-22.3c2.2-3.7,4.4-7.3,6.5-11c2.1-3.7,4.3-7.3,6.5-11
                                c1.5-2.2,2.8-4.4,4.1-6.6c1.3-2.2,2.6-4.4,3.9-6.6c1.1-2,2.9-3.7,5.4-5.1c2.5-1.4,4.9-2.1,7.3-2.1h28.1c2.4,0,4,0.7,4.7,2.1
                                C1133,95.6,1132.8,97.3,1131.7,99.4z"/>
                            <path class="st0" d="M1325.5,251.3c-1.8,2.6-3.7,5.1-5.7,7.6c-1.9,2.5-4,4.8-6.2,7c-6.1,6.4-13.2,12-21.5,16.8
                                c-3.9,2.4-7.9,4.5-12.1,6.3c-4.2,1.8-8.6,3.4-13.2,4.7c-9.4,2.6-18.7,3.9-28.1,3.9c-14.3,0-27.8-2.8-40.5-8.3s-23.8-13-33.4-22.6
                                c-9.4-9.4-16.8-20.4-22.3-33.1c-5.5-12.7-8.3-26.2-8.3-40.5c0-14.3,2.8-27.8,8.3-40.5c5.5-12.5,13-23.6,22.3-33.4
                                c9.7-9.4,20.9-16.8,33.4-22.3c12.7-5.5,26.2-8.3,40.5-8.3c9.4,0,18.7,1.3,28.1,3.9c9.2,2.6,17.6,6.2,25.4,10.8
                                c4,2.4,7.9,5,11.4,7.9c3.6,2.9,6.9,5.8,10.1,9c4.6,4.8,8.5,9.6,11.9,14.6c1.3,2,1.6,4,0.8,5.9c-0.7,1.9-2.2,3.4-4.4,4.3
                                l-20.4,8.3c-2,0.9-4.3,1.1-6.8,0.4c-2.5-0.6-4.5-1.9-5.9-3.7c-0.9-0.9-1.8-1.9-2.8-2.9c-0.9-1-1.8-2-2.8-2.9
                                c-2-2-4.1-3.9-6.2-5.5c-2.1-1.7-4.4-3.2-6.8-4.7c-2.4-1.5-4.9-2.8-7.4-3.9c-2.6-1.1-5.1-2.1-7.7-3c-5.3-1.7-10.8-2.5-16.5-2.5
                                c-9,0-17.6,1.8-25.9,5.5c-8.1,3.9-15,8.9-20.7,15.2c-5.9,6.4-10.6,13.7-14.1,21.8c-3.5,8.3-5.2,17-5.2,26.2
                                c0,9.4,1.7,18.1,5.2,26.2c3.5,8.1,8.2,15.3,14.1,21.8c5.7,6.4,12.6,11.4,20.7,14.9c7.9,3.9,16.5,5.8,25.9,5.8
                                c5.7,0,11.2-0.8,16.5-2.5c2.6-0.9,5.1-1.9,7.7-3c2.6-1.1,5.1-2.4,7.4-3.9c2.4-1.5,4.6-3.1,6.8-4.8c2.1-1.7,4.2-3.6,6.2-5.7
                                c0.9-0.9,1.8-1.9,2.8-2.9c0.9-1,1.8-2,2.8-2.9c1.5-1.8,3.4-3.1,5.9-3.9c2.5-0.7,4.7-0.6,6.8,0.3l20.4,8.3
                                c2.2,0.9,3.7,2.4,4.4,4.4C1327,247.2,1326.8,249.2,1325.5,251.3z"/>
                            <path class="st0" d="M1453.9,297.6c-14.3,0-27.8-2.8-40.5-8.3c-12.7-5.5-23.8-13-33.2-22.5c-9.5-9.5-17-20.5-22.5-33.2
                                c-5.5-12.7-8.3-26.3-8.3-40.8c0-14.3,2.8-27.9,8.3-40.7c5.5-12.8,13-23.9,22.5-33.4c9.5-9.5,20.5-17,33.2-22.5
                                c12.7-5.5,26.2-8.3,40.5-8.3c14.5,0,28.1,2.8,40.8,8.3c12.7,5.5,23.7,13,33.2,22.5c9.5,9.5,17,20.6,22.5,33.4
                                c5.5,12.8,8.3,26.3,8.3,40.7c0,14.5-2.8,28.1-8.3,40.8c-5.5,12.7-13,23.8-22.5,33.2c-9.5,9.5-20.5,17-33.2,22.5
                                S1468.5,297.6,1453.9,297.6z M1454.1,124.2c-9.2,0-17.7,1.9-25.7,5.7c-8,3.8-14.9,8.8-20.9,15c-6,6.2-10.7,13.6-14.2,21.9
                                c-3.5,8.4-5.2,17-5.2,26c0,9.2,1.7,17.9,5.2,26.2s8.2,15.6,14.2,21.9s12.9,11.4,20.9,15.2c8,3.8,16.6,5.7,25.7,5.7
                                c9.2,0,17.7-1.9,25.7-5.7c8-3.8,14.9-8.8,20.9-15.2c6-6.3,10.7-13.6,14.2-21.9s5.2-17,5.2-26.2c0-9-1.7-17.7-5.2-26
                                c-3.5-8.4-8.2-15.7-14.2-21.9c-6-6.2-12.9-11.3-20.9-15C1471.8,126.1,1463.2,124.2,1454.1,124.2z"/>
                            <path class="st0" d="M1631.5,182.3v102.8c0,2.4-0.8,4.4-2.5,6.1c-1.7,1.7-3.7,2.5-6.1,2.5h-21.8c-2.2,0-4.1-0.8-5.8-2.5
                                c-1.7-1.7-2.5-3.7-2.5-6.1V96.6c0-2.4,1.1-3.8,3.4-4.3c2.3-0.5,4.3,0,5.9,1.5l121,114.4c1.8,1.7,3.4,2.2,4.5,1.7
                                c1.2-0.6,1.8-2,1.8-4.4V100.7c0-2.4,0.8-4.4,2.5-6.1c1.7-1.7,3.7-2.5,6.1-2.5h21.5c2.4,0,4.4,0.8,6.1,2.5
                                c1.7,1.7,2.5,3.7,2.5,6.1V289c0,2.4-1.2,3.8-3.4,4.3c-2.3,0.5-4.4,0-6.2-1.5l-120.7-112.5c-1.8-1.5-3.4-1.9-4.5-1.4
                                C1632,178.5,1631.5,180,1631.5,182.3z"/>
                        </g>
                        <path class="st0" d="M601.1,134.5h-22.6c-4.4,0-8-3.6-8-8v-26.3c0-4.4,3.6-8,8-8h22.6c4.4,0,8,3.6,8,8v26.3
                            C609.1,130.9,605.5,134.5,601.1,134.5z"/>
                        <path class="st0" d="M735.6,134.5H713c-4.4,0-8-3.6-8-8v-26.3c0-4.4,3.6-8,8-8h22.6c4.4,0,8,3.6,8,8v26.3
                            C743.6,130.9,740,134.5,735.6,134.5z"/>
                    </g>
                </g>
                </svg>
            </a>
            <span id="beta_version" class="hidden-mb-b">BETA</span><!--beta mark-->
        </h1><!--LUBYCON LOGO-->

        <nav id="main_gnb" class="hidden-mb-b">
            <ul id="gnb">
                <li class="bigsub">
                    <a href="<?=$two_depth?>/contents/contents_page.php?cate=all&mid_cate=1&page=1" class="bigsub_link">
                        Contents
                    </a>
                    <ul class="sub">
                        <li>
                            <a href="<?=$two_depth?>/contents/contents_page.php?cate=artwork&mid_cate=1&page=1"><i class="fa fa-font fa-1x"></i><p>Artwork</p></a>
                        </li>
                        <li>
                            <a href="<?=$two_depth?>/contents/contents_page.php?cate=vector&mid_cate=1&page=1"><i class="fa fa-square fa-1x"></i><p>Vector</p></a>
                        </li>
                        <li>
                            <a href="<?=$two_depth?>/contents/contents_page.php?cate=threed&mid_cate=1&page=1"><i class="fa fa-cube fa-1x"></i><p>3D Model</p></a>
                        </li>
                    </ul>	<!--end Contents menu-->
                </li>
                <li class="menu_bar"></li>
                <li class="bigsub">
                    Community
                    <ul class="sub">
                        <li><!--ranking-->
                            <a href="<?=$two_depth?>/creators_page/creators.php"><i class="fa fa-pencil fa-1x"></i><p>Creators</p></a>
                        </li>
                        <li><!--forum-->
                            <a href="<?=$two_depth?>/community/community_page.php?cate=forum"><i class="fa fa-comments-o fa-1x"></i><p>Forum</p></a>
                        </li>
                        <li><!--tutorial-->
                            <a href="<?=$two_depth?>/community/community_page.php?cate=tutorial"><i class="fa fa-book fa-1x"></i><p>Tutorial</p></a>
                        </li>
                        <li><!--Q&A-->
                            <a href="<?=$two_depth?>/community/community_page.php?cate=qaa"><i class="fa fa-question fa-1x"></i><p>Q&amp;A</p></a>
                        </li>
                    </ul>	<!--end Community menu-->
                </li>
            </ul> <!-- end gnb ul -->
        </nav>	<!--end main_gnb-->
        <div id="signin_bt" class="hidden-mb-b"><!-- before sign in -->
            <div id="signin">
                <a href="<?=$one_depth?>/login_page.php">
                    <p class="signicon"><i class="fa fa-unlock-alt fa-lg"></i></p>
                    <p class="signin">SIGN IN</p>
                </a>
            </div>  <!-- end signin -->
        </div><!-- before sign in -->
        <div id="after_signin" class="hidden-mb-b">   <!-- after sign in -->
                <div id="display_user">
                    <figure id="accountImg"><img src="<?=$two_depth?>/../../../Lubycon_Contents/user/<?=$usercode?>/profile.jpg" alt="profile_img" /></figure>
                    <span id="user_id"><?=$username?></span>
                    <i class="fa fa-angle-down"></i>
                </div>  
            <ul>
                <i class="fa fa-caret-up"></i>
                <div class="userMenuGroup">
                    <li><a href="<?=$two_depth?>/personal_page/personal_page.php?cate=dashboard&usernum=<?=$usercode?>">
                        <i class="fa fa-tachometer fa-1x"></i>Dashboard
                    </a></li>
                    <li><a href="<?=$two_depth?>/personal_page/personal_page.php?cate=my_contents&usernum=<?=$usercode?>">
                        <i class="fa fa-picture-o fa-1x"></i>My Contents
                    </a></li>
                    <li><a href="<?=$two_depth?>/personal_page/personal_page.php?cate=insight&usernum=<?=$usercode?>">
                        <i class="fa fa-line-chart fa-1x"></i>Insight
                    </a></li>
                    <li><a href="<?=$two_depth?>/personal_page/personal_page.php?cate=bookmark&usernum=<?=$usercode?>">
                        <i class="fa fa-star fa-1x"></i>Bookmarks
                    </a></li>
                </div>
                <div class="userMenuGroup">
                    <li><a href="<?=$two_depth?>/personal_page/personal_page.php?cate=account_setting&usernum=<?=$usercode?>">
                        <i class="fa fa-gear fa-1x"></i>Account Setting
                    </a></li>
                    <li style="display:none;"><a href="<?=$two_depth?>/personal_page/personal_page.php?cate=message">
                        <i class="fa fa-envelope fa-1x"></i>Message
                    </a></li>
                    <li id="sign_out"><a href="<?=$one_depth?>/logout.php">
                        <i class="fa fa-power-off fa-1x"></i>Sign Out
                    </a></li>
                </div>
            </ul>
        </div><!-- end after sign in -->
        <button id="addcontent_bt" class="btn hidden-mb-b" data-tip="add content"><i class="fa fa-plus"></i>Add Contents</button>
        <!--��� ǿ��-->
        <?php
            if($LoginState == true){
                echo ('<script>$("#signin_bt").remove();$("#after_signin,#addcontent_bt").show();</script>');
            }
        ?>
        <div id="lang_select_bt" class="hidden-mb-b"><!--end content button-->
            <ul>
                <li class="lang_selected">ENG</li>
                <ul class="lang_list">
                    <li>CHI</li>
                    <li class="selected_language">ENG</li>
                    <li>FRA</li>
                    <li>GER</li>
                    <li>JPN</li>
                    <li>KOR</li>
                    <li>RUS</li>
                    <li>SPA</li>
                </ul>	<!-- end lang_list -->
            </ul>	<!-- end lang_all -->
        </div>	<!-- end lang_select_bt -->
        <div id="mb-search" class="visible-mb"><i class="fa fa-search icon1"></i><i class="fa fa-angle-up icon2"></i></div>
    </header><!---------------- header end ---------------->
    <div id="main_search_bar" class="search-bar"><!---------------- search bar start ---------------->
        <input type="text" class="search-bar-text" value="Enter The Keyword" />
        <button class="out search-btn">
            <i class="fa fa-search"></i>
        </button>

        <div class="select-box">|
            <select class="searchFilter">
                <option data-value="All">All</option>
                <option data-value="Contents">Contents</option>
                <option data-value="Creatorr">Creator</option>
                <option data-value="Community">Community</option>
            </select>
        </div>
        <script>
            var searchFilter = $("body").find(".searchFilter");
            searchFilter.lubySelector({
                width: 130,
                theme: "transparent",
                icon: ""
            });
        </script>
        <!-- end select_box -->
    </div><!---------------- search bar end ---------------->
    <!---------------- common parts end ---------------->
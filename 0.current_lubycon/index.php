<?php
session_start();
    if(isset($_COOKIE)){
        if(isset($_COOKIE['login'])){
            $info = unserialize($_COOKIE['login']);
            setcookie('login', serialize($info), time()+500000000);
        }else if(!isset($_COOKIE['login'])){
            session_destroy();
        }
    }
?>
<!DOCTYPE html>

<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta name="subject" content="Lubycon" />
    <meta name="description" content="free sources" />
    <meta name="developer" content="Daniel ZEPOT" />
    <meta name="designer" content="Dart" />
    <meta name="robots" content="index" />
    <meta name="copyright" content="copyrights 2015 LUBYCON" />
    <meta name="keywords" content="design, font ,vector, 3D design, community, designers, engineer, 3D printer, Illustration, Lubycon" />

    <title>Lubycon</title>

    <link rel="shortcut icon" href="./ch/img/logo/lubycon.ico" /> <!-- favicon -->
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Source Sans Pro:200,400,600" type="text/css" />	<!--google web font-->
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" /> <!--icon font-->

    <link href="css/layout/normalize.css" rel="stylesheet" type="text/css" />  <!-- web normalize -->
    <link href="css/layout/common.css" rel="stylesheet" type="text/css" />  <!-- common css -->
    <link href="css/layout/media.css" rel="stylesheet" type="text/css" /> <!-- media query-->
    <link href="css/selectordie.css" rel="stylesheet" type="text/css" /> <!-- selector decoration css -->
    <link href="css/layout/animate.css" rel="stylesheet" type="text/css" /><!--animation for objects-->
    <link href="css/slider.css" rel="stylesheet" type="text/css" /><!--slider css-->

    <script type="text/javascript" src="js/jquery-1.11.3.min.js"></script> <!-- jquery library -->
    <script type="text/javascript" src="js/slider.js"></script><!--slider plugin-->
    <script type="text/javascript" src="js/jquery.lubySelector.js"></script><!--lubySelector-->
    <script type="text/javascript" src="js/jquery.lubyAlert.js"></script><!--lubyAlert-->
    <script type="text/javascript" src="js/resizeObject.js"></script>
    <script type="text/javascript" src="js/index.js"></script> <!-- index file js -->
    <script type="text/javascript" src="js/luby_ui.js"></script><!-- ui file js -->
    <script type="text/javascript" src="js/account.js"></script> <!-- account file js -->
    
    <meta name="viewport" content="width=device-width, height=device-height, user-scalable=no"><!--responsive design enable-->
    <meta name="theme-color" content="#222222"><!--mobile web browser address window will be changed to #222-->
    <!--[if lt IE 9]>
    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
</head>
<body id="bodyer">
<div id="loading_icon">
    <i class="fa fa-spinner fa-spin"></i>
</div>
<div id="wrapper"> 
    <div class="dark_overlay"></div>
    <div id="cancel_layer"></div>
    <div id="gotop_bt"><i class="fa fa-angle-up"></i></div>
    <aside id="mb-menu_panel" class="visible-mb"><!--mobile panel menu-->
        <header id="mb-user_section">
            <div id="mb-signin">
                <a href="./login_page.php">
                    <p class="signicon"><i class="fa fa-unlock-alt fa-lg"></i></p>
                    <p class="signin">SIGN IN</p>
                </a>
            </div>
            <div id="mb-after_signin">
                <?php
                    $user_pic = "./ch/img/no_img/no_img_user1.jpg";
                    $user_name = "Lorem ipsum";
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
                <i class="fa fa-font fa-1x"></i><a href="./index.php?1=contents&2=contents_page&3=artwork">Artwork</a>
            </li>
            <li class="mb-menu_list">
                <i class="fa fa-square fa-1x"></i><a href="./index.php?1=contents&2=contents_page&3=vector">Vector</a>
            </li>
            <li class="mb-menu_list">
                <i class="fa fa-cube fa-1x"></i><a href="./index.php?1=contents&2=contents_page&3=3d">3D Model</a>
            </li>
        </ul>
        <ul class="mb-menu_group">
            <li class="mb-menu_list">
                <i class="fa fa-pencil fa-1x"></i><a href="./index.php?1=creators_page&2=creators">Creator</a>
            </li>
            <li class="mb-menu_list">
            	<i class="fa fa-comments-o fa-1x"></i><a href="./index.php?1=community&2=community_page&3=forum">Forum</a>
            </li>
        </ul>
        <ul class="mb-menu_group">
            <li class="mb-menu_list">
                <i class="fa fa-home fa-1x"></i><a href="./index.php?1=personal_page&2=personal_page&3=dashboard">Dashboard</a>
            </li>
            <li class="mb-menu_list">
                <i class="fa fa-line-chart fa-1x"></i><a href="./index.php?1=personal_page&2=personal_page&3=insight">Insight</a>
            </li>
            <li class="mb-menu_list">
                <i class="fa fa-gear fa-1x"></i><a href="./index.php?1=personal_page&2=personal_page&3=account_setting">Account Setting</a>
            </li>
        </ul>
        <ul class="mb-menu_group">
            <li class="mb-menu_list"><i class="fa fa-power-off fa-1x"></i>Log out</li>
        </ul>
    </aside>
    <!-- popup start -->
    <div class="editor_popup fadeInDown animated">
        <p>Which content will you upload?</p>
        <ul>
            <li>
                <a href="./index.php?1=editor&2=editor&3=artwork">
                <i class="fa fa-font"></i>
                <p>Artwork</p>
                </a>
            </li>
            <li>
                <a href="./index.php?1=editor&2=editor&3=vector">
                <i class="fa fa-stop"></i>
                <p>Vector</p>
                </a>
            </li>
            <li>
                <a href="./index.php?1=editor&2=editor&3=3d">
                <i class="fa fa-cube"></i>
                <p>3D Model</p>
                </a>
            </li>
        </ul>
        <button class="editor_popup_cancel animate_scale"><i class="fa fa-times"></i></button>
    </div>
    <!-- popup end -->
    <!---------------- common parts start ---------------->
    <!---------------- header start ---------------->
    <header id="main_header">
        <div id="mb-menu" class="visible-mb"><i class="fa fa-bars"></i></div>
        <h1>
            <a href="./index.php">
                <svg version="1.1" id="logoImg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="35px" height="35px" viewBox="0 0 2000 2000" enable-background="new 31.824 0 119.987 40" xml:space="preserve">
                <path fill="#ffffff" d="M1658.1,614.1l-560.1-442c-6.4-5.1-15.1-6-22.5-2.4c-7.3,3.6-12,11-12,19.1v90.1L928.4,172.1
                    c-7.7-6.1-18.7-6.1-26.4,0L341.9,614.9c-0.2,0.2-0.4,0.4-0.6,0.5c-0.3,0.2-0.5,0.4-0.8,0.7c-0.5,0.4-0.9,0.9-1.3,1.3
                    c-0.2,0.2-0.4,0.4-0.6,0.6c-0.6,0.7-1.1,1.4-1.6,2.2c0,0.1-0.1,0.2-0.1,0.2c-0.4,0.7-0.8,1.4-1.1,2.1c-0.1,0.3-0.2,0.5-0.3,0.8
                    c-0.2,0.6-0.4,1.1-0.6,1.7c-0.1,0.3-0.2,0.6-0.3,0.9c-0.2,0.6-0.3,1.2-0.4,1.8c-0.1,0.3-0.1,0.6-0.1,0.9c-0.1,0.9-0.2,1.8-0.2,2.7
                    c0,0,0,0,0,0.1v639c0,6.5,3,12.7,8.1,16.7l560.1,442c3.8,3,8.5,4.6,13.2,4.6c3.2,0,6.3-0.7,9.3-2.1c7.3-3.6,12-11,12-19.1v-90.1
                    l135.1,106.8c3.9,3.1,8.5,4.6,13.2,4.6c4.7,0,9.3-1.5,13.2-4.6l560.1-442.8c0.2-0.2,0.4-0.4,0.6-0.5c0.3-0.2,0.5-0.4,0.8-0.7
                    c0.5-0.4,0.9-0.9,1.3-1.3c0.2-0.2,0.4-0.4,0.6-0.6c0.6-0.7,1.1-1.4,1.6-2.2c0-0.1,0.1-0.1,0.1-0.2c0.4-0.7,0.8-1.4,1.2-2.2
                    c0.1-0.3,0.2-0.5,0.3-0.8c0.2-0.6,0.5-1.2,0.6-1.7c0.1-0.3,0.2-0.6,0.3-0.9c0.2-0.6,0.3-1.2,0.4-1.8c0.1-0.3,0.1-0.6,0.1-0.9
                    c0.1-0.9,0.2-1.8,0.2-2.7c0,0,0,0,0-0.1v-639C1666.2,624.2,1663.2,618.1,1658.1,614.1z M1106.1,232.7l517.6,408.4v584.8l-434.1-342
                    l299-235.6c5.1-4,8.1-10.2,8.1-16.7c0-6.5-3-12.7-8.1-16.7l-382.6-302.4V232.7z M893.9,1083.3v451.3l-335-264.8l285.9-225.2
                    L893.9,1083.3z M915.2,1045.9l-36-28.4l205.6-162l32.5,25.6l3.5,2.8L915.2,1045.9z M1106.1,818.1V366.8l335,264.8l-285.9,225.2
                    L1106.1,818.1z M915.2,215.9l148.3,117.3v485L844.8,990.4L528.2,741L389.4,631.6L915.2,215.9z M893.9,1668.7l-517.6-408.4V675.5
                    l120.2,94.7l313.9,247.3L511.4,1253c-5.1,4-8.1,10.2-8.1,16.7c0,6.5,3,12.7,8.1,16.7l382.6,302.4V1668.7z M1084.8,1685.5
                    l-148.3-117.2v-485L1155.2,911l455.4,358.8L1084.8,1685.5z"/>
                </svg>
                <svg version="1.1" id="logoText" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
     width="130px" height="40px" viewBox="31.824 0 119.987 40" enable-background="new 31.824 0 119.987 40" xml:space="preserve"
    >
                <g>
                    <path fill="#FFFFFF" stroke="#FFFFFF" stroke-width="0.7" stroke-miterlimit="10" d="M35.359,25.615h8.193
                        c0.202,0,0.355-0.045,0.459-0.137c0.104-0.093,0.189-0.254,0.254-0.488h0.313v3.447h-0.313c-0.064-0.234-0.149-0.396-0.254-0.488
                        c-0.104-0.092-0.257-0.137-0.459-0.137H31.824V27.5c0.233-0.064,0.396-0.15,0.487-0.254s0.138-0.258,0.138-0.459V15.508
                        c0-0.202-0.046-0.355-0.138-0.459s-0.254-0.189-0.487-0.254v-0.313h4.159v0.313c-0.233,0.059-0.396,0.142-0.487,0.249
                        c-0.092,0.107-0.138,0.262-0.138,0.464V25.615z"/>
                    <path fill="#FFFFFF" stroke="#FFFFFF" stroke-width="0.7" stroke-miterlimit="10" d="M61.422,15.508v7.471
                        c0,1.412-0.261,2.472-0.781,3.174c-0.938,1.265-2.875,1.896-5.811,1.896c-2.123,0-3.747-0.342-4.873-1.024
                        c-0.658-0.396-1.113-0.938-1.367-1.621c-0.248-0.678-0.371-1.484-0.371-2.422v-7.472c0-0.202-0.045-0.355-0.137-0.459
                        s-0.254-0.189-0.488-0.254v-0.313h4.16v0.313c-0.231,0.059-0.394,0.142-0.486,0.249s-0.139,0.262-0.139,0.464v6.65
                        c0,0.768,0.042,1.336,0.127,1.704c0.085,0.367,0.244,0.675,0.479,0.923c0.625,0.664,1.693,0.996,3.203,0.996
                        c1.518,0,2.588-0.332,3.213-0.996c0.229-0.248,0.386-0.556,0.47-0.923c0.085-0.368,0.127-0.938,0.127-1.704v-6.65
                        c0-0.202-0.046-0.355-0.138-0.459s-0.254-0.189-0.487-0.254v-0.313h3.926v0.313c-0.234,0.065-0.397,0.15-0.488,0.254
                        S61.422,15.306,61.422,15.508z"/>
                    <path fill="#FFFFFF" stroke="#FFFFFF" stroke-width="0.7" stroke-miterlimit="10" d="M78.051,20.83
                        c1.497,0.566,2.246,1.615,2.246,3.145c0,1.217-0.438,2.172-1.31,2.861c-0.441,0.346-0.954,0.594-1.537,0.747
                        s-1.305,0.229-2.163,0.229h-9.111V27.5c0.234-0.064,0.397-0.15,0.488-0.254s0.137-0.258,0.137-0.459V15.508
                        c0-0.202-0.046-0.355-0.137-0.459s-0.254-0.189-0.488-0.254v-0.313h9.023c0.865,0,1.562,0.065,2.09,0.195
                        c0.526,0.13,0.988,0.352,1.387,0.664c0.788,0.619,1.182,1.51,1.182,2.676C79.857,19.32,79.255,20.257,78.051,20.83z M69.711,19.785
                        h5.106c0.774,0,1.315-0.114,1.621-0.342c0.346-0.26,0.519-0.664,0.519-1.211c0-0.56-0.163-0.958-0.488-1.196
                        c-0.325-0.238-0.876-0.356-1.65-0.356h-5.106L69.711,19.785L69.711,19.785z M69.711,25.615h4.94c0.918,0,1.579-0.127,1.982-0.381
                        c0.462-0.293,0.693-0.771,0.693-1.437c0-0.657-0.231-1.137-0.693-1.437c-0.397-0.254-1.058-0.381-1.982-0.381h-4.94V25.615z"/>
                    <path fill="#FFFFFF" stroke="#FFFFFF" stroke-width="0.7" stroke-miterlimit="10" d="M91.34,22.23v4.557
                        c0,0.201,0.047,0.354,0.14,0.459c0.094,0.104,0.255,0.189,0.485,0.254v0.312h-4.18V27.5c0.233-0.064,0.399-0.15,0.498-0.254
                        c0.098-0.104,0.146-0.258,0.146-0.459V22.23l-4.307-6.061c-0.371-0.521-0.662-0.87-0.874-1.049
                        c-0.212-0.179-0.464-0.288-0.757-0.327v-0.313h5.264v0.313c-0.438,0.072-0.654,0.273-0.654,0.605c0,0.117,0.133,0.375,0.4,0.771
                        l2.401,3.566l2.473-3.566c0.267-0.384,0.399-0.644,0.399-0.781c0-0.149-0.059-0.278-0.176-0.385s-0.277-0.177-0.479-0.21v-0.313
                        h5.154v0.313c-0.293,0.039-0.545,0.148-0.757,0.327c-0.212,0.179-0.503,0.528-0.874,1.049L91.34,22.23z"/>
                    <path fill="#FFFFFF" stroke="#FFFFFF" stroke-width="0.7" stroke-miterlimit="10" d="M112.197,23.232l1.855,2.777l-0.254,0.178
                        c-0.183-0.17-0.332-0.256-0.449-0.256s-0.446,0.157-0.986,0.471c-1.119,0.646-2.062,1.082-2.826,1.307
                        c-0.765,0.225-1.676,0.338-2.729,0.338c-2.103,0-3.828-0.498-5.176-1.494c-0.794-0.58-1.419-1.299-1.875-2.158
                        c-0.527-0.981-0.791-2.065-0.791-3.252c0-1.615,0.472-3.018,1.416-4.208c1.419-1.791,3.563-2.686,6.436-2.686
                        c1.056,0,1.96,0.111,2.716,0.332c0.755,0.221,1.698,0.658,2.831,1.309c0.54,0.306,0.869,0.459,0.986,0.459s0.268-0.084,0.449-0.254
                        l0.254,0.176l-1.855,2.783l-0.264-0.175c0.013-0.104,0.021-0.191,0.021-0.263c0-0.188-0.081-0.364-0.244-0.53
                        s-0.452-0.365-0.869-0.599c-1.152-0.648-2.373-0.973-3.662-0.973c-1.523,0-2.737,0.38-3.643,1.142
                        c-1.067,0.891-1.603,2.055-1.603,3.491c0,1.438,0.534,2.603,1.603,3.492c0.904,0.762,2.118,1.143,3.643,1.143
                        c1.289,0,2.51-0.326,3.662-0.977c0.417-0.234,0.706-0.436,0.869-0.602s0.244-0.344,0.244-0.532c0-0.071-0.008-0.155-0.021-0.254
                        L112.197,23.232z"/>
                    <path fill="#FFFFFF" stroke="#FFFFFF" stroke-width="0.7" stroke-miterlimit="10" d="M125.003,14.248
                        c2.325,0,4.169,0.628,5.531,1.885c1.438,1.315,2.158,3.014,2.158,5.098c0,1.275-0.346,2.468-1.035,3.574
                        c-1.35,2.162-3.561,3.242-6.636,3.242c-2.307,0-4.14-0.629-5.502-1.885c-0.729-0.67-1.283-1.475-1.661-2.412
                        c-0.332-0.826-0.498-1.695-0.498-2.607c0-1.333,0.343-2.555,1.026-3.662C119.696,15.365,121.902,14.287,125.003,14.248z
                         M125.013,16.514c-1.271,0-2.33,0.377-3.177,1.132c-1.004,0.891-1.506,2.058-1.506,3.502c0,1.443,0.502,2.61,1.506,3.502
                        c0.847,0.755,1.912,1.132,3.196,1.132c1.283,0,2.347-0.377,3.187-1.132c0.502-0.448,0.887-0.998,1.154-1.648
                        c0.233-0.579,0.352-1.177,0.352-1.795c0-1.509-0.502-2.696-1.506-3.561C127.365,16.904,126.297,16.527,125.013,16.514z"/>
                    <path fill="#FFFFFF" stroke="#FFFFFF" stroke-width="0.7" stroke-miterlimit="10" d="M140.074,18.682v8.105
                        c0,0.201,0.046,0.355,0.137,0.459s0.254,0.189,0.488,0.254v0.312h-3.916V27.5c0.233-0.064,0.396-0.15,0.487-0.254
                        s0.138-0.258,0.138-0.459V15.498c0-0.195-0.047-0.345-0.138-0.449s-0.254-0.189-0.487-0.254v-0.313h4.53v0.313
                        c-0.279,0.072-0.42,0.221-0.42,0.449c0,0.156,0.091,0.329,0.273,0.518l7.354,7.646v-7.91c0-0.195-0.046-0.345-0.137-0.449
                        s-0.254-0.189-0.488-0.254v-0.313h3.916v0.313c-0.233,0.065-0.396,0.15-0.487,0.254c-0.092,0.104-0.138,0.254-0.138,0.449v11.289
                        c0,0.201,0.046,0.355,0.138,0.459c0.091,0.104,0.254,0.189,0.487,0.254v0.312h-4.199V27.5c0.273-0.059,0.41-0.199,0.41-0.42
                        c0-0.131-0.158-0.357-0.479-0.684L140.074,18.682z"/>
                </g>
                </svg>
            </a>
            <span id="beta_version" class="hidden-mb-b">BETA</span><!--beta mark-->
        </h1><!--LUBYCON LOGO-->

        <nav id="main_gnb" class="hidden-mb-b">
            <ul id="gnb">
                <li class="bigsub">
                    <a href="./index.php?1=contents&2=contents_page&3=all" class="bigsub_link">
                        Contents
                    </a>
                    <ul class="sub">
                        <li>
                            <a href="./index.php?1=contents&2=contents_page&3=artwork"><i class="fa fa-font fa-1x"></i><p>Artwork</p></a>
                        </li>
                        <li>
                            <a href="./index.php?1=contents&2=contents_page&3=vector"><i class="fa fa-square fa-1x"></i><p>Vector</p></a>
                        </li>
                        <li>
                            <a href="./index.php?1=contents&2=contents_page&3=3d"><i class="fa fa-cube fa-1x"></i><p>3D Model</p></a>
                        </li>
                    </ul>	<!--end Contents menu-->
                </li>
                <li class="menu_bar"></li>
                <li class="bigsub">
                    Community
                    <ul class="sub">
                        <li><!--ranking-->
                            <a href="./index.php?1=creators_page&2=creators"><i class="fa fa-pencil fa-1x"></i><p>Creators</p></a>
                        </li>
                        <li><!--forum-->
                            <a href="./index.php?1=community&2=community_page&3=forum"><i class="fa fa-comments-o fa-1x"></i><p>Forum</p></a>
                        </li>
                        <li><!--tutorial-->
                            <a href="./index.php?1=community&2=community_page&3=tutorial"><i class="fa fa-book fa-1x"></i><p>Tutorial</p></a>
                        </li>
                        <li><!--Q&A-->
                            <a href="./index.php?1=community&2=community_page&3=qna"><i class="fa fa-question fa-1x"></i><p>Q&amp;A</p></a>
                        </li>
                    </ul>	<!--end Community menu-->
                </li>
                <li class="menu_bar"></li>
                <li class="bigsub">
                    Company
                    <ul class="sub">
                        <li>
                            <a href="./index.php?1=company&2=about_us"><i class="fa fa-building fa-1x"></i><p>About us</p></a>
                        </li>
                        <li>
                            <a href="./index.php?1=company&2=terms_of_service"><i class="fa fa-book"></i><p>TOS</p></a>
                        </li>
                        <li>
                            <a href="./index.php?1=company&2=private_policy"><i class="fa fa-book"></i><p>PP</p></a>
                        </li>
                    </ul>	<!--end Company menu-->
                </li>
            </ul> <!-- end gnb ul -->
        </nav>	<!--end main_gnb-->

        <!-- before sign in -->
        <div id="signin_bt" class="hidden-mb-b">
            <div id="signin">
                <a href="./login_page.php">
                    <p class="signicon"><i class="fa fa-unlock-alt fa-lg"></i></p>
                    <p class="signin">SIGN IN</p>
                </a>
            </div>  <!-- end signin -->
        </div>
        <!-- before sign in -->

        <!-- after sign in -->
        <div id="after_signin" class="hidden-mb-b">
                <figure><img src="./ch/img/no_img/no_img_user1.jpg" alt="profile_img" /></figure>
                <div id="display_user">
                    <span id="user_id">Admin_User</span>
                    <i class="fa fa-angle-down"></i>
                </div>  
            <ul>
                <li><a href="./index.php?1=personal_page&2=personal_page&3=dashboard">Dashboard</a></li>
                <li><a href="./index.php?1=personal_page&2=personal_page&3=my_contents">My Contents</a></li>
                <li><a href="./index.php?1=personal_page&2=personal_page&3=insight">Insight</a></li>
                <li><a href="./index.php?1=personal_page&2=personal_page&3=bookmark">Bookmarks</a></li>
                <li><a href="./index.php?1=personal_page&2=personal_page&3=account_setting">Account Setting</a></li>
                <li style="display:none;"><a href="./index.php?1=personal_page&2=personal_page&3=message">Message</a></li>
                <li id="sign_out"><a href="./logout.php">Sign Out</a></li>
            </ul>
        </div>
        <!-- end after sign in -->

        <button id="addcontent_bt" class="animate_width hidden-mb-b"><i class="fa fa-plus"></i>Add Contents</button>
        <!--세션 여기-->
        
        <?php
            if(isset($_COOKIE)){
                //echo '<script>console.log("if 1-1");</script>';
                if(isset($_COOKIE['login'])){
                    echo ('<script>$("#signin_bt").remove();$("#after_signin,#addcontent_bt").show();</script>');
                }
            }
        ?>

        <!--end content button-->
        <div id="lang_select_bt" class="hidden-mb-b">
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
    </header>	
    <!---------------- header end ---------------->
    <!---------------- search bar start ---------------->
    <div id="main_search_bar">
        <input type="text" id="main_search_text" value="Enter The Keyword" />
        <button id="main_search_btn" class="out">
            <i class="fa fa-search"></i>
        </button>

        <div id="select_box">|
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
    </div>
    <!---------------- search bar end ---------------->
    <!---------------- common parts end ---------------->
    <?php
        if( empty($_GET['1']) == false ) {
            include_once("php/".$_GET['1']."/".$_GET['2'].".php");
        }
        else{
            include_once("index_body.php");
        }
    ?>
    <footer id="footer" class="footer">
        <span id="luby_copyright"><i class="fa fa-copyright"></i>Lubycon 2016</span>
        <span id="about_lubycon">
            <span id="about_us_foot"><a href="./index.php?1=company&2=about_us">About us</a></span>
            <span id="contact_us_foot"><a href="mailto:contact@lubycon.com" target="_blank">Contact us</a></span>
        </span>
        <span id="luby_link">
            <a href="#"><i class="fa fa-facebook-square"></i></a>
            <a href="#"><i class="fa fa-twitter-square"></i></a>
            <a href="#"><i class="fa fa-google-plus-square"></i></a>
            <a href="#"><i class="fa fa-instagram"></i></a>
            <a href="#"><i class="fa fa-pinterest-square"></i></a>
            <a href="#"><i class="fa fa-tumblr-square"></i></a>
        </span>
        <span id="luby_policies">
            <span id="termsOfService_foot"><a href="./index.php?1=company&2=terms_of_service" class="document">Terms of service</a></span>
            <span id="privatePolicy_foot"><a href="./index.php?1=company&2=private_policy" class="document">Private policy</a></span>
        </span>
    </footer>   <!--end footer-->
</div>
</body>

</html>
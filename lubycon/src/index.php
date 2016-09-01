<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html" charset="utf-8" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta name="subject" content="Lubycon" />
    <meta name="description" content="free sources" />
    <meta name="developed" content="Lubycon" />
    <meta name="designed" content="Lubycon" />
    <meta name="robots" content="index" />
    <meta name="copyright" content="copyrights 2015 LUBYCON" />
    <meta name="keywords" content="design, font ,vector, 3d design, community, designers, engineer, 3d printer, illustration, lubycon" />
    <meta name="viewport" content="width=device-width, height=device-height, user-scalable=no" />
    <meta name="theme-color" content="#222222" />

    <title>Lubycon</title>

    <link rel="icon" href="../asset/img/logo/lubycon.ico" />
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Source Sans Pro:200,400,600" type="text/css" />
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" />

    <link href="./component/view/index/normalize.css" rel="stylesheet" type="text/css" />
    <link href="./common/common.css" rel="stylesheet" type="text/css" />
    <link href="./component/view/index/media.css" rel="stylesheet" type="text/css" />
    <link href="../plugin/JS/lubySelector.css" rel="stylesheet" type="text/css" />
    <link href="../plugin/JS/lubyAlert.css" rel="stylesheet" type="text/css" />
    <link href="../plugin/JS/lubySlider.css" rel="stylesheet" type="text/css" />
    <link href="../plugin/JS/checkBox.css" rel="stylesheet" type="text/css" />
    <link href="../plugin/lib/animate.css" rel="stylesheet" type="text/css" />

    <script type="text/javascript" src="../plugin/lib/jquery-1.12.2.min.js"></script>
    <script type="text/javascript" src="../plugin/lib/jquery-ui.min.js"></script>

    <script type="text/javascript" src="../plugin/JS/jquery.lubySelector.js"></script>
    <script type="text/javascript" src="../plugin/JS/jquery.lubyAlert.js"></script>
    <script type="text/javascript" src="../plugin/JS/jquery.lubySlider.js"></script>
    <script type="text/javascript" src="../plugin/JS/resizeObject.js"></script>
    <script type="text/javascript" src="../plugin/JS/checkBox.js"></script>

    <script type="text/javascript" src="./common/Module/_prototype.js"></script>
    <script type="text/javascript" src="./api/Authentication.module.js"></script>
    <script type="text/javascript" src="./api/Request.module.js"></script>
    <script type="text/javascript" src="./config/router.config.js"></script>
    <script type="text/javascript" src="./common/common.js"></script>

    <script type="text/javascript" src="./service/controller/infinite_scroll/infinite_scroll_module.js"></script>
    <script type="text/javascript" src="./component/view/contents_card/contents_card.tmpl.js"></script>
    <script type="text/javascript" src="./component/view/creator_card/creator_card.tmpl.js"></script>
    <script type="text/javascript" src="./component/view/mainboard/mainboard.tmpl.js"></script>

    <!--[if lt IE 9]>
    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
</head>
<body id="bodyer">
<div id="wrapper">
    <div id="loading_icon"><i class="fa fa-spinner fa-spin"></i></div>
    <div class="dark_overlay" data-value="dark_overlay"></div>
    <div id="cancel_layer"></div><!--for mobile, It's transparent-->
    <div class="alertKey hidden"></div>
    <header id="main-header"></header>
    <aside id="mobile-menu"></aside>
    <div id="app-wrapper" class="app-wrapper"></div>
    <footer id="footer" class="footer"></footer>
</div>
</body>

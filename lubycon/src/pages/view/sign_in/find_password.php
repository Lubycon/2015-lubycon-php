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
	
	<link rel="shortcut icon" href="../asset/img/logo/lubycon.ico" />  <!-- favicon -->
	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" />
	<link href='http://fonts.googleapis.com/css?family=Source Sans Pro:200,400' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="../plugin/lib/animate.css" />

    <link rel="stylesheet" href="./service/view/messagePage.css" />

    <script type="text/javascript" src="../plugin/lib/jquery-1.12.2.min.js"></script> <!-- jquery library -->

    <script type="text/javascript" src="./service/view/messagePage.js"></script>
</head>
<body ondragstart="return false" onselectstart="return false">
    <section class="message message-wrapper bounceInDown animated">
        <i class="message-icon fa fa-key orange-color"></i>
        <div class="message-box">
            <article class="main-message">Find Password</article>
            <article class="sub-message">Plesase write your E-mail</article>
        </div>
        <div class="message-box">
            <form class="message-form" enctype="multipart/form-dat" method="post" action="./pages/controller/sign_in/find_password.php">
                <label class="label-message">E-mail</label>
                <input name="changePw" class="input-message" type="email" data-value="email" />
            </form>
        </div>
        <div class="message-box">
            <div class="btn cancel-bt">Not now</div>
            <div class="btn submit-bt">SUBMIT</div>
        </div>
    </section>
</body>
</html>
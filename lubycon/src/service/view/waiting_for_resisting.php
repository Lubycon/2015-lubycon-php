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
	<link rel='stylesheet' href='http://fonts.googleapis.com/css?family=Source Sans Pro:200,400' />
	<link rel="stylesheet" href="../plugin/lib/animate.css" />
	<link rel="stylesheet" href="./service/view/messagePage.css" />

	<script type="text/javascript" src="../plugin/lib/jquery-1.12.2.min.js"></script> <!-- jquery library -->

	<!-- doesn't have Core.js file --------------------------------------------------------- -->
    <!-- <script type="text/javascript" src="../../js/core/core.js"></script> -->
    <!-- ----------------------------------------------------------------------------------- -->

    <script type="text/javascript" src="./messagePage.js"></script>
</head>
<body ondragstart="return false" onselectstart="return false">
	
	<?php
		if(!isset($_SESSION['lubycon_nick']))
			$username = "Admin";
		else
			$username = $_SESSION['lubycon_nick'];
	?>
	
	<section class="message message-wrapper bounceInDown animated">
		<div class="message-box">
			<article class="sub-message mint-color">Hello, <?=$username?></article>
			<article class="main-message">Your Account is ready</article>
			<article class="sub-message">Plesase check your E-mail</article>
		</div>
		<div class="message-box">
			<article class="time-wrapper">
				<span class="time-box day-box">0</span> Days
				<span class="time-box hour-box">0</span> Hours
				<span class="time-box minute-box">0</span> Minute
			</article>
		</div>
		<div class="message-box">
			<form class="message-form" enctype="multipart/form-data" method="post" action="./pages/controller/sign_up/certificateEmail.php">
				<label class="label-message">Certification Code</label>
				<input name="certificationCode" class="input-message" type="text" data-value="code" />
			</form>
		</div>
		<div class="message-box">
			<div class="btn cancel-bt" href="./pages/controller/sign_out/logoutCertifi.php">Not now</div>
			<div class="btn submit-bt">SUBMIT</div>
			<div class="btn other-bt" data-value="resend" href="./pages/controller/sign_up/reCertifiEmail.php">Resend</div>
		</div>
	</section>
</body>
</html>
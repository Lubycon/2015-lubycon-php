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
	
	<link rel="shortcut icon" href="../../CH/img/logo/lubycon.ico" />  <!-- favicon -->
	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" />
	<link rel='stylesheet' href='http://fonts.googleapis.com/css?family=Source Sans Pro:200,400' />
	<link rel="stylesheet" href="../../css/layout/animate.css" />
	<link rel="stylesheet" href="../../css/messagePage.css" />

	<script type="text/javascript" src="../../js/core/jquery-1.12.2.min.js"></script> <!-- jquery library -->
    <script type="text/javascript" src="../../js/core/core.js"></script>
    <script type="text/javascript" src="../../js/messagePage.js"></script>
</head>
<body ondragstart="return false" onselectstart="return false">
	<?php
		$username = "Admin";
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
			<form id="certification" enctype="multipart/form-data" method="post" action="#">
				<label class="label-message">Certification Code</label>
				<input name="certificationCode" class="input-message" type="text" data-value="number" />
			<form>
		</div>
		<div class="message-box">
			<div class="btn cancel-bt">Not now</div>
			<div class="btn submit-bt">SUBMIT</div>
			<div class="btn other-bt" data-value="resend">Resend</div>
		</div>
	</section>
</body>
</html>
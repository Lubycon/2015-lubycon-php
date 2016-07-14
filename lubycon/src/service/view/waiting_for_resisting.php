<!DOCTYPE html>
<html lang="en">
<head>
	<link rel="stylesheet" href="./service/view/messagePage.css" />
    <script type="text/javascript" src="./service/view/messagePage.js"></script>
</head>
	
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
</html>
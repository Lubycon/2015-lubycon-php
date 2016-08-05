<link rel="stylesheet" href="./service/view/messagePage.css" />
<section class="message message-wrapper bounceInDown animated">
	<div class="message-box">
		<article class="sub-message mint-color">Hello, <span></span></article>
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
		<label class="label-message">Certification Code</label>
		<input name="certificationCode" class="input-message" type="text" data-value="code" />
	</div>
	<div class="message-box">
		<div class="btn cancel-bt" href="./pages/controller/sign_out/logoutCertifi.php">Not now</div>
		<div class="btn submit-bt">SUBMIT</div>
		<div class="btn other-bt" data-value="resend" href="./pages/controller/sign_up/reCertifiEmail.php">Resend</div>
	</div>
</section>
<script type="text/javascript" src="./service/view/messagePage.js"></script>
<script type="text/javascript" src="./service/controller/authentication/waiting_for_resisting_renderer.js"></script>

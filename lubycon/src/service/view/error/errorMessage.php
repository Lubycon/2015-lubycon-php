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
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Source Sans Pro:200,400" />
	<link rel="stylesheet" href="../../css/layout/animate.css" />
	<link rel="stylesheet" href="../../css/messagePage.css" />

	<script type="text/javascript" src="../../js/core/jquery-1.12.2.min.js"></script> <!-- jquery library -->
	<script type="text/javascript" src="../../js/core/core.js"></script>
	<script type="text/javascript" src="../../js/messagePage.js"></script>
</head>
<body ondragstart="return false" onselectstart="return false">
<?php
	if(!$errorCode)
		$errorCode = "zr2Djfiwll01sj2";
?>
	<section class="message message-wrapper bounceInDown animated">
		<i class="message-icon fa fa-chain-broken red-color"></i>
		<div class="message-box">
			<article class="main-message">Error</article>
			<article class="sub-message">Error code : <?=$errorCode?></article>
		</div>
		<div class="message-box">
			<div class="btn other-bt" data-value="gotoBack">BACK</div>
			<div class="btn other-bt" data-value="report">REPORT</div>
		</div>
	</section>
</body>
</html>
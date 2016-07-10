<?php

# COMMON FUNCTION

#---------------------------------------------------------------------------------
#	Catch URL for index header
#---------------------------------------------------------------------------------

function CatchURL(){
	$param = NULL;
	if(isset($_GET))
		$param = isset($_GET['dir']) ? $_GET['dir'] : NULL;
	
	return isset($param) ? $param.".php" : false;
}

#---------------------------------------------------------------------------------
#	TOKEN
#---------------------------------------------------------------------------------

# Make a Token of specific size 
# argument is specific size

function MakeToken($size){
	
	static $feed = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	$randStr = null;

	for($i=0; $i< $size; $i++)
		$randStr .= substr($feed, rand(0, strlen($feed)-1), 1);
	
	return $randStr;
}

#---------------------------------------------------------------------------------
#	Make HTML Page
#---------------------------------------------------------------------------------

# Make a Html Page for specific purpose 
# argument is add message

function MakeHtml($category,$message=NULL,$param=NULL){
	$contents = NULL;
	$html = NULL;
	switch($category){ 
		case EMAIL :
		$html = fopen("./account/Email.php") or die("Couldn't create Email");
		$contetns = 
			'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1-strict.dtd">
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
			</head>
			<body>
			<table align="center" width="620" height="270" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0">
			<tbody>
				<tr id="mail_lubycon_logo">
					<td>
						<img src="../../CH/img/resist_mail/mail_header.png" class="mail_header" >
					</td>
				</tr>
		       	<tr id="mail_hello">
		           	<td align="left" style="font-family:Arial, Helvetica, sans-serif; font-size: 40px; color:#444444;">
		               	<br />
		    	       	&nbsp;Hello. <font size="40px" color="#48cfad">:)</font>
		                <br />
		                <br />
		                </td>
		        </tr>
		        <tr id="mail_description">
		          	<td align="left" style="font-family:Arial, Helvetica, sans-serif; font-size: 15px; color:#444444; line-height:25px;">
		           			&nbsp;&nbsp;&nbsp;
		                    You or someone with your e-mail ID has singed up at LUBYCON.<br />
		                    &nbsp;&nbsp;&nbsp;
							your new account is almost ready.<br />
		                    &nbsp;&nbsp;&nbsp;
							but before you can login, you need to confirm your e-mail ID <br /> 
							&nbsp;&nbsp;&nbsp;
							by check the certification Code. <br /><br />
							&nbsp;&nbsp;&nbsp;
							<font size="4px">
							Here your certification Code : '.$param.'
							</font>
							<br /><br />
							&nbsp;&nbsp;&nbsp;
		                    Please Input certification Code in LUBYCON </font>
		                    <br />
		                    <br />
		            	</td>
		            </tr>
		            <tr>
		                <td align="left" style="font-family:Arial, Helvetica, sans-serif; font-size: 15px; color:#444444; line-height:20px;">
		                	<br />
		                    &nbsp;&nbsp;&nbsp;
		                	If you have any problems or questions, please send e-mail to 
		                    <a id="mailadress" href="mailto:contact@lubycon.com" style="text-decoration:none;">
		                    	<font color="#48cfad" size="+1">contact@lubycon.com</font>
		                    </a>
		                </td>
		            </tr>
		        </tbody>
			</table>
			</body>
			';
			break;
		case PWD :
			$html = fopen("./account/Pwd.php") or die("Couldn't create Email");
			$contents = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1-strict.dtd">
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
		</head>
		<body>
		<table align="center" width="620" height="270" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0">
		<tbody>
			<tr id="mail_lubycon_logo">
				<td>
					<img src="../../CH/img/resist_mail/mail_header.png" class="mail_header" >
				</td>
			</tr>
        	<tr id="mail_hello">
            	<td align="left" style="font-family:Arial, Helvetica, sans-serif; font-size: 40px; color:#444444;">
                	<br />
                	 &nbsp;Hello. <font size="40px" color="#48cfad">:)</font>
                    <br />
                    <br />
                </td>
            </tr>
            <tr id="mail_description">
            	<td align="left" style="font-family:Arial, Helvetica, sans-serif; font-size: 15px; color:#444444; line-height:25px;">
           			&nbsp;&nbsp;&nbsp;
                    Your temporary password has been sent to the registered email.<br /><br />
					&nbsp;&nbsp;&nbsp;
					<font size="4px">
					Here your temporary password is : '.$param.'
					</font>
					<br /><br />
					&nbsp;&nbsp;&nbsp;

					If this is not you, Please Contact.<br />
                    &nbsp;&nbsp;&nbsp;
                    <br />
                    <br />
            	</td>
            </tr>
            <tr>
                <td align="left" style="font-family:Arial, Helvetica, sans-serif; font-size: 15px; color:#444444; line-height:20px;">
                	<br />
                    &nbsp;&nbsp;&nbsp;
                	If you have any problems or questions, please send e-mail to 
                    <a id="mailadress" href="mailto:contact@lubycon.com" style="text-decoration:none;">
                    	<font color="#48cfad" size="+1">contact@lubycon.com</font>
                    </a>
                </td>
            </tr>
        </tbody>
		</table>
		</body>
		';
			break;
		case ERROR:
		$html = fopen("./account/Email.php") or die("Couldn't create Error Contents");
		$contents = '<!DOCTYPE html>
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
				$errorCode = "'.$message.'";
			else
				$errorCode = "Unknown";
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
		</html>';
		break;

					
	}

}

#--------------------------------------------------------------------------
# PHP ERROR HANDLING LOGIC
#--------------------------------------------------------------------------

function ErrorHandling($error, $message){
	$ErrorPage = $error.".php";

	if(file_exists($ErrorPage))
		echo '<script>document.location.href="./'.$ErrorPage.'"</script>';
	else{
		MakeHtml($error, $message);
		sleep(1);
		echo '<script>document.location.href="./'.$ErrorPage.'"</script>';
	}

}

?>
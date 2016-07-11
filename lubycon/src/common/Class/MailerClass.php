<?php

# For Certificate Mail

#--------------------------------------------------------------------------
# Send Certificate Mail using PHPMailer(plugin) #--------------------------------------------------------------------------

require_once '../../../../plugin/PHP/PHPMailer/PHPMailerAutoload.php';

function mailer($fromaddress, $toaddress, $subject, $password, $category)
{
	date_default_timezone_set('Etc/UTC');

	$mail = new PHPMailer();

	$mail->isSMTP();
	$mail->CharSet = 'UTF-8';
	//$mail->SMTPDebug = 1;
	$mail->Host = 'smtp.gmail.com';
	$mail->SMTPSecure = 'ssl';
	$mail->Port = 465;
	$mail->SMTPAuth = true;
	$mail->Username = $fromaddress;
	$mail->Password = $password;
	$mail->setFrom($fromaddress, $fromaddress);
	$mail->addAddress($toaddress, $toaddress);
	$mail->Subject = $subject;

	if($category === 'mail')
		$mail->msgHTML(file_get_contents("../../../../../CertifiEmail.php"));
	else if($category === 'password')
		$mail->msgHTML(file_get_contents("../../../../../FindPw.php"));
	
	$mail->Altbody = 'This is a plain-text message body';

	if(!$mail->send())
	{
		echo "Mailer Error : ".$mail->ErrorInfo;
		return false;
	}
	else
	{
		return true;
	}
		
}


#--------------------------------------------------------------------------
# Make Certificate Mail using file I/O Stream
#--------------------------------------------------------------------------

Class MakeMail{

	private $host;
	private $relativePath;
	public $token;

	public function __construct($token){
		$this->token = $token;
		$this->host = $_SERVER['HTTP_HOST'];
		$this->relativePath = preg_replace("`\/[^/]*\.php$`i", "/", $_SERVER['PHP_SELF']);
	}

	public function CertifiMail(){
		
		$html = fopen("../../../../../CertifiEmail.php","w") or die("unable to make email");

		$contents = 
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
					Here your certification Code : '.$this->token.'
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

	fwrite($html, $contents);
	fclose($html);
	}

#--------------------------------------------------------------------------
# Make Find Password Mail using file I/O Stream
#--------------------------------------------------------------------------

	public function FindPw(){
		
		$html = fopen("../../../../../FindPw.php","w") or die("unable to make email");

		$contents = 
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
                    Your temporary password has been sent to the registered email.<br /><br />
					&nbsp;&nbsp;&nbsp;
					<font size="4px">
					Here your temporary password is : '.$this->token.'
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

		fwrite($html, $contents);
		fclose($html);
	}
}


?>
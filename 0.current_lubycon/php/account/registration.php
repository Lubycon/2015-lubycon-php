<?php
	require_once '../database/database_class.php';
    require_once "../class/regex_class.php";

    $regex_vali = new regex_validate;

	$db = new Database();
	$rand_str=null;

	// password encryption -> using bycrypt
	$hash = password_hash($_POST['pass'], PASSWORD_DEFAULT);
    
	//regular expression
	$mail_vali = "/^[0-9a-zA-Z]([\-.\w]*[0-9a-zA-Z\-_+])*@([0-9a-zA-Z][\-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9}$/";	
	// email validation check
	$pass_vali[0] = "/[^0-9]/";
	$pass_vali[1] = "/[`;',.\/~!@\#$%<>^&*\()\-=+_\¡¯]/";
	$nick_vali = "/^[A-Za-z0-9+]*$/";	//only english & number

	//confirm password
	$confirm_pass = ($regex_vali->pass_check($_POST['pass']) && $regex_vali->sametext_check($_POST['pass'],$_POST['repass'])); // insert 2 value 1:pass 2:repass

	//confirm email
	$confirm_email = $regex_vali->email_check($_POST['email']);

	//confirm nickname
	$confirm_nick = $regex_vali->nickname_check($_POST['nick']);

	//email validation check
	($confirm_email==true)?$email_validation = true : $email_validation = false;

	//password validation check
	($confirm_pass == true) ? $pass_validation = true : $pass_validation = false;

	//nickname validation check
	($confirm_nick === true)? $nick_validation=true : $nick_validation=false;

	//term validation check
	($_POST['terms_check'] == "on") ? $terms_validation = true : $terms_validation = false;

	//private plicy validation check
	($_POST['private_check'] == "on")?$private_validation = true : $private_validation = false;

	//newsletter
	(isset($_POST['email_send_check']))? $newsletter = 'true' : $newsletter = 'false';

	if($email_validation && $pass_validation && $nick_validation && $private_validation && $terms_validation){
		
		$feed = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
		$size = 6;
		
		for ($i=0; $i < $size; $i++){
			$rand_str .= substr($feed, rand(0, strlen($feed)-1), 1);
		}

		$mailContents = ('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"></head><body><table align="center" width="620" height="270" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0"><tbody><tr id="mail_lubycon_logo"><td><img src="../../CH/img/resist_mail/mail_header.png" class="mail_header" ></td></tr><tr id="mail_hello"><td align="left" style="font-family:Arial, Helvetica, sans-serif; font-size: 40px; color:#444444;"><br />&nbsp;Hello. <font size="40px" color="#48cfad">:)</font><br /><br /></td></tr><tr id="mail_description"><td align="left" style="font-family:Arial, Helvetica, sans-serif; font-size: 15px; color:#444444; line-height:25px;">&nbsp;&nbsp;&nbsp;You or someone with your e-mail ID has singed up at LUBYCON.<br />&nbsp;&nbsp;&nbsp;your new account is almost ready.<br />&nbsp;&nbsp;&nbsp;but before you can login, you need to confirm your e-mail ID by clicking the button below.</font><br /><br /></td></tr><tr id="confirm_bt"><td align="center"><a href="./certificateEmail.php?Token="'.$rand_str.'"><img src="../../CH/img/resist_mail/mail_bt.png"></a></td></tr><tr><td align="left" style="font-family:Arial, Helvetica, sans-serif; font-size: 15px; color:#444444; line-height:20px;"><br />&nbsp;&nbsp;&nbsp;If you have any problems or questions, please send e-mail to<a id="mailadress" href="mailto:contact@lubycon.com" style="text-decoration:none;"><font color="#48cfad" size="+1">contact@lubycon.com</font></a></td></tr></tbody></table></body>');   

		$db->query = "insert into userbasic(email,nick,pass,date,termCheck, policyCheck, subscription, validationToken)values('".$_POST['email']."', '".$_POST['nick']."', '".$hash."', '".date('Y-m-d H:i:s')."', '".'true'."', '".'true'."', '".$newsletter."', '".$rand_str."')";

		//'".$_POST['country_code']."',
		$db->askQuery();
		
		if(!$db->result){
			echo "회원가입에 실패하였습니다. 5초 후에 이전 페이지로 이동합니다.";
			$db->disconnectDb();
			sleep(5);
			//echo("<script>history.back();</script>");
		}
		else{
			
			//google smtp mailer start		
			
			$DOCUMENT_ROOT = $_SERVER['DOCUMENT_ROOT'];
			$fromaddress = "Lubycon@gmail.com";
			$toaddress = $_POST['email'];
			$subject = "Confirmation Mail for Lubycon account";

			function sendMail($fromaddress, $toaddress, $subject){
			date_default_timezone_set('Etc/UTC');
		
			require '../PHPMailer/PHPMailerAutoload.php';

			$mail = new PHPMailer;
			$mail->isSMTP();
			$mail->CharSet='UTF-8';
			//$mail->SMTPDebug=1;
			//$mail->Debugoutput='html';
			$mail->Host='smtp.gmail.com';
			$mail->SMTPSecure='ssl';
			$mail->Port=465;
			$mail->SMTPAuth=true;
			$mail->Username=$fromaddress;
			$mail->Password="hmdwdgdhkr2015";
			$mail->setFrom($fromaddress,$fromaddress);
			$mail->addAddress($toaddress,$toaddress);
			$mail->Subject=$subject;
			$mail->msgHTML($mailContents);
			$mail->Altbody='This is a plain-text message body';
		
			if(!$mail->send()){
				echo "Mailer Error : ".$mail->ErrorInfo;
			}
		}
	
		sendMail($fromaddress, $toaddress, $subject);

		//redirecting
		//'<script>document.location.href="./waiting_for_resisting.php"</script>'  
		exit;
		}
	}
	else{
		echo "registration fail back to the website.";
		sleep(5);
		//echo("<script>history.back();</script>");
		exit;
	}

?>
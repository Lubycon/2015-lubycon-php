<?php
	require_once '../database/database_class.php';

	$db = new Database();
	$db->askQuery();

	// password encryption -> using bycrypt
	$hash = password_hash($_POST['pass'], PASSWORD_DEFAULT);

	//regular expression
	$mail_vali = "/^[0-9a-zA-Z]([\-.\w]*[0-9a-zA-Z\-_+])*@([0-9a-zA-Z][\-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9}$/";	
	// email validation check
	$pass_vali[0] = "/[^0-9]/";
	$pass_vali[1] = "/[`;',.\/~!@\#$%<>^&*\()\-=+_\¡¯]/";
	$nick_vali = "/^[A-Za-z0-9+]*$/";	//only english & number

	//confirm password
	$confirm_pass = (strtolower($_POST['pass']) == strtolower($_POST['repass'])) && preg_match($pass_vali[0], $_POST['pass']) &&((int)strlen($_POST['pass'])) > 7 && ((int)strlen($_POST['pass']) < 21 && !($_POST['pass'] == ' '));	//length & pass same check

	//confirm email
	$confirm_email = strlen($_POST['email']) > 0 && !($_POST['email'] == ' ') && preg_match($mail_vali, $_POST['email']);

	//confirm nickname
	$confirm_nick = ((int)strlen($_POST['nick'])) > 0 && ((int)strlen($_POST['nick'])) < 17 && !($_POST['nick'] == ' ') && preg_match($nick_vali, $_POST['nick']);

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
		
		$db->query = "insert into luby_user(user_email,user_nick,user_pass,user_date,country_code,term_check, private_check, newsletter)values('".$_POST['email']."', '".$_POST['nick']."', '".$hash."', '".date('Y-m-d H:i:s')."', '".$_POST['country_code']."', '".'true'."', '".'true'."', '".$newsletter."')";
		$db->askQuery();

		if(!$db->result){
			echo "회원가입에 실패하였습니다. 5초 후에 이전 페이지로 이동합니다.";
			$db->disconnectDb();
			sleep(5);
			echo("<script>history.back();</script>");
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
				$mail->msgHTML(file_get_contents('./mail_for_resist.php'));
				$mail->Altbody='This is a plain-text message body';
		
				if(!$mail->send()){
					echo "Mailer Error : ".$mail->ErrorInfo;
				}
			}
	
			sendMail($fromaddress, $toaddress, $subject);


			$db->disconnectDb();
			//redirecting
			//echo('<script>document.location.href="./waiting_for_resisting.php"</script>');  
			exit;
		}
	}
	else{
		echo "회원가입에 실패하였습니다. 5초 후에 이전 페이지로 이동합니다.";
		sleep(5);
		echo("<script>history.back();</script>");
		exit;
	}
?>
<?php
    $terms_check = $_POST['terms_check'];
    $private_check = $_POST['private_check'];
    $email_send_check = $_POST['email_send_check'];
	
	require_once '../database/database_class.php';

	$database = new DBConnect;
	$database->DBInsert();

	$email = $_POST['email'];
	$nick = $_POST['nick'];
	$pass = $_POST['pass'];
	$repass = $_POST['repass'];
	$date = date('Y-m-d H:i:s');
	$country_code = $_POST['country_code'];

	// password encryption -> using bycrypt
	$hash = password_hash($pass, PASSWORD_DEFAULT);

	//regular expression
	$mail_vali = "/^[0-9a-zA-Z]([\-.\w]*[0-9a-zA-Z\-_+])*@([0-9a-zA-Z][\-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9}$/";	// email validation check
	$pass_vali[0] = "/[^0-9]/";
	$pass_vali[1] = "/[`;',.\/~!@\#$%<>^&*\()\-=+_\¡¯]/";
	$nick_vali = "/^[A-Za-z0-9+]*$/";	//only english & number

	//confirm password
	$nomali_pass = strtolower($pass);	//string nomalization -> to lower
	$nomali_repass = strtolower($repass);
	$confirm_pass = ($nomali_pass == $nomali_repass) && preg_match($pass_vali[0], $pass) &&((int)strlen($pass)) > 7 && ((int)strlen($pass) < 21 && !($pass == ' '));	//length & pass same check

	//confirm email
	$mail_length = strlen($email);	//length email (deny null & space)
	$confirm_email = $mail_length > 0 && !($email == ' ') && preg_match($mail_vali, $email);

	//confirm nickname
	$nick_length = ((int)strlen($nick));

	$confirm_nick = $nick_length > 0 && $nick_length < 17 && !($nick == ' ') && preg_match($nick_vali, $nick);

	//email validation check
	if($confirm_email){	//check to length & validation
		$email_validation = true;
	}
	else{
		$email_validation = false;
	}

	//password validation check
	if($confirm_pass){
		$pass_validation = true;
	}
	else{
		$pass_validation = false;
	}

	//nickname validation check
	if($confirm_nick){
		$nick_validation = true;
	}
	else{
		$nick_validation = false;
	}

	//term validation check
	if($terms_check == "on"){
		$terms_validation = true;
	}
	else{
		$terms_validation = false;
	}

	//private plicy validation check
	if($private_check == "on"){
		$private_validation = true;
	}else{
		$private_validation = false;
	}

	//newsletter
	if($email_send_check == ""){
		$newsletter = 'true';
	}else{
		$newsletter = 'false';
	}

	if($email_validation && $pass_validation && $nick_validation && $private_validation && $terms_validation){
		
		$database->query = "insert into luby_user(user_email,user_nick,user_pass,user_date,country_code,term_check, private_check, newsletter)values('".$email."', '".$nick."', '".$hash."', '".$date."', '".$country_code."', '".'true'."', '".'true'."', '".$newsletter."')";
		$database->DBQuestion();

		if(!$database->result){
			echo "회원가입에 실패하였습니다. 5초 후에 이전 페이지로 이동합니다.";
			$database->DBOut();
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
				$mail->Password="hmdwdg2015";
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


			$database->DBOut();
			//redirecting
			echo('<script>document.location.href="./waiting_for_resisting.php"</script>');  
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
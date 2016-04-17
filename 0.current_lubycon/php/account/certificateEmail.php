<?php

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

	//redirecting
	//echo('<script>document.location.href="./waiting_for_resisting.php"</script>');  
	exit;

?>
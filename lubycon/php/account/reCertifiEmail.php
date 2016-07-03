<?php

include_once '../class/session_class.php';
include_once '../class/MailerClass.php';
include_once '../class/database_class.php';
include_once '../commonFunc.php';

$session = new Session();
$db = new Database();

if(isset($_SESSION['lubycon_email']))
{
	
	$to = $_SESSION['lubycon_email'];
	$from = "Lubycon@gmail.com";
	$subject = "Confirmation Mail for Lubycon account";
	$password = "hmdwdgdhkr2015";

	$token = makeToken(12);
	$certifimail = new MakeMail($token);

	$certifimail->certifiMail();

	if(mailer($from, $to, $subject, $password, 'mail'))
	{
		$db->query = "UPDATE userbasic SET validationToken = '".$token."' WHERE (email = '".$_SESSION['lubycon_email']."')";

		if($db->askQuery() !== false){
			echo '<script>document.location.href="./success_account.php"</script>';
		}else{
			echo ("쿼리 전송 실패");
		}
	}
	else{
		echo ("메일 전송 실패");
	}
}else{
	echo "세션 이메일 값 없음";
}
 
?>
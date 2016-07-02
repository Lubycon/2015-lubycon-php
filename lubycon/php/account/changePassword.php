<?php
require_once '../database/database_class.php';
require_once '../commonFunc.php';

$db = new Database();

$to = $_POST['email'];
$from = "Lubycon@gmail.com";
$subject = "Check your temporary password";
$password = "hmdwdgdhkr2015";

$tmpPw = makeToken(20);
$encrypt = password_hash($tmpPw, PASSWORD_DEFAULT);

$FindPw = new MakeMail($tmpPw);
$FindPw->FindPw();

if(mailer($from, $to, $subject, $password, 'password'))
{
	$db->query = "UPDATE userbasic SET pass = ".$encrypt."";
	if(%db->askQuery() != false){
		header('location:success_find_password.php');
	}

}else{
	echo "메일 전송 실패하였습니다.";
}

?>
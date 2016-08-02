<?php
require_once '../../../common/Class/database_class.php';
require_once '../../../common/common.php';
include_once '../../../common/Class/MailerClass.php';

$db = new Database();

$to = $_POST['changePw'];
$from = "Lubycon@gmail.com";
$subject = "Check your temporary password";
$password = "hmdwdgdhkr2015";

$tmpPw = makeToken(20);
$encrypt = password_hash($tmpPw, PASSWORD_DEFAULT);

$FindPw = new MakeMail($tmpPw);
$FindPw->FindPw();

if(mailer($from, $to, $subject, $password, 'password'))
{
	$db->query = "UPDATE userbasic SET pass = '".$encrypt."' WHERE (email='".$to."')";
	if($db->askQuery() !== false){
		header('location:../../../index.php?dir=service/view/success_find_password');
	}else
	{
	  $total_array = array(
	    'status' => array(
	      'code' => '1000',
	      'msg' => "database query ask fail"
	      ),
	    'result' => (object)array()
	  );
	  $data_json = json_encode($total_array);
	  die($data_json);
	}

}else
{
	$total_array = array(
		'status' => array(
			'code' => '1400',
			'msg' => "find pass mail send fail",
			),
		'result' => (object)array()
		);
	$data_json = json_encode($total_array);
	die($data_json);
}



?>
<?php

include_once '../../../common/Class/session_class.php';
include_once '../../../common/Class/MailerClass.php';
include_once '../../../common/Class/database_class.php';
include_once '../../../common/common.php';

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
			//$db->query = "UPDATE userbasic SET validationToken = NULL";
			if($db->askQuery() !== false)
				header('location:../../../index.php?dir=service/view/success_account');
		}else
		{
			$total_array = array(
				'status' => array(
					'code' => '1000',
					'msg' => "database query ask fail",
					),
				'result' => (object)array()
				);
			$data_json = json_encode($total_array);
			die($data_json);
		}
	}
	else
	{
		$total_array = array(
			'status' => array(
				'code' => '1400',
				'msg' => "mail send fail",
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
			'code' => '0201',
			'msg' => "can't found email in session",
			),
		'result' => (object)array()
		);
	$data_json = json_encode($total_array);
	die($data_json);
}
 
?>
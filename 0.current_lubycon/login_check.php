<?php
	error_reporting(E_ALL);
	ini_set("display_errors",1);

	require_once './php/session/session_class.php';
	//session_start();
	require_once './php/database/database_class.php';
	$session = new Session();
	
	$db = new Database('localhost', 'lubycon', 'hmdwdgdhkr2015', 'lubycon');
	$db->query = "SELECT user_email, user_pass, user_code, user_nick FROM luby_user WHERE (user_email='".$_POST['login_id']."')";
	$db->askQuery();
	$result = mysqli_fetch_array($db->result);

	if(password_verify($_POST['login_pass'],$result['user_pass'])){
		$session->WriteSession('lubycon',$result['user_email'], $result['user_nick']);
		header('location:index.php');
	}else{
		echo "false <br/>";
	}

?>
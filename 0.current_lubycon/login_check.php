<?php
	error_reporting(E_ALL);
	ini_set("display_errors",1);

	require_once './php/session/session_class.php';
	//session_start();
	require_once './php/database/database_class.php';
	$session = new Session();
	
	$db = new Database('localhost', 'lubycon', 'hmdwdgdhkr2015', 'lubyconuser');
	$db->query = "SELECT email, pass, userCode, nick FROM userbasic WHERE (email='".$_POST['login_id']."')";
	$db->askQuery();
	$result = mysqli_fetch_array($db->result);

	if(password_verify($_POST['login_pass'],$result['pass'])){
		$session->WriteSession('lubycon',$result['email'], $result['nick'] , $result['userCode']);
		header('location:index.php');
	}else{
		echo "false <br/>";
	}

?>
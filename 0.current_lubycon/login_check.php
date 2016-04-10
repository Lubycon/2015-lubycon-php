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
		
		//echo $result['user_email']. '<br/>';
		//echo $result['user_nick'].'<br/>';
		
		//echo $_SESSION['lubycon_session_id'].'<br />';
		//echo $_SESSION['lubycon_id'].'<br />';
		//echo $_SESSION['lubycon_nick'].'<br/>';


		//$session->FreeResource();
		//$session = null;
		/*
		$db->disconnectDb();
		// 로그인 기록 로그 테이블에 남겨놔야함.
		$info[0] = $login_id;
		$info[1] = $result['user_nick'];
		$info[2] = $result['user_code'];
		$info[3] = time();
		setcookie('login', serialize($info), time()+500000);
		$_SESSION['id'] = $login_id;
		*/
		header('location:index.php');
		//echo "<script>document.location.href='index.php'</script>";
	}else{
		echo "false <br/>";
	}

?>
<?php
	require_once './php/session/session_class.php';
	//session_start();
	require_once './php/database/database_class.php';
	$session = new Session();
	
    $user_email = $_POST['login_id'];

	$db = new Database('localhost', 'lubycon', 'hmdwdgdhkr2015', 'lubyconuser');
	$db->query = "
        SELECT `userbasic`.`userCode`,`userbasic`.`email`, `userbasic`.pass, `userbasic`.userCode, `userbasic`.nick , `userinfo`.`countryCode` , `userinfo`.`jobCode`, `userinfo`.`city` 
        FROM `lubyconuser`.`userbasic` 
        LEFT JOIN `lubyconuser`.`userinfo` 
        ON `userbasic`.`userCode` = `userinfo`.`userCode` 
        WHERE `userbasic`.`email`='$user_email'
    ";
	$db->askQuery();
	$result = mysqli_fetch_array($db->result);

	if(password_verify($_POST['login_pass'],$result['pass'])){
		$session->WriteSession('lubycon',$result['email'], $result['nick'] , $result['userCode'],$result['countryCode'],$result['jobCode'],$result['city'],'normal');
		header('location:index.php');
	}else{
		header('location:login_page.php?login=0');
	}

?>
<?php
	require_once '../../../common/Class/session_class.php';
	require_once '../../../common/Class/database_class.php';

	$session = new Session();
    $user_email = $_POST['login_id'];

	$db = new Database('localhost', 'lubycon', 'hmdwdgdhkr2015', 'lubyconuser');
	$db->query = "
        SELECT `userbasic`.`userCode`,`userbasic`.`email`, `userbasic`.pass, `userbasic`.userCode, `userbasic`.nick, `userbasic`.validation , `userinfo`.`countryCode` , `userinfo`.`jobCode`, `userinfo`.`city` 
        FROM `lubyconuser`.`userbasic` 
        LEFT JOIN `lubyconuser`.`userinfo` 
        ON `userbasic`.`userCode` = `userinfo`.`userCode` 
        WHERE `userbasic`.`email`='$user_email'
    ";

	$db->askQuery();
	$result = mysqli_fetch_array($db->result);

	if(password_verify($_POST['login_pass'],$result['pass'])){
		
		$session->WriteSession('lubycon',$result);

		if($result['validation'] === 'active')
			// 인증 회원 페이지 구현
			//echo "index페이지로 이동";
			header('location:../../../index.php');
		else if($result['validation'] == 'inactive')
			// 비인증 회원 페이지 구현
			//echo "waiting_for_resisting 으로 페이지 이동";
			//echo '<script>document.location.href="../../../index.php"</script>';
			header('location:../../../index.php');
		else
			die("result['validation'] wrong value");

/*
		$session->WriteSession('lubycon',$result['email'], $result['nick'] , $result['userCode'],$result['countryCode'],$result['jobCode'],$result['city'],'normal');
		header('location:index.php');
*/
	}else{
		// 로그인실패시 반응 구현
		header('location:./index.php?=dir/');
	}

?>
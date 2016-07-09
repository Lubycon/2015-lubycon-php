<?php
require_once '../database/database_class.php';
include_once '../class/session_class.php';

$session = new Session();
$db = new Database();
$db->query = "SELECT validation FROM userbasic WHERE (validationToken = '".$_POST['certificationCode']."')";

if($db->askQuery() != false){
	
	$result = mysqli_fetch_array($db->result);
	
	if($result['validation'] == 'inactive'){
	
		$db->query = "UPDATE userbasic SET validation = 'active' WHERE (validationToken = '".$_POST['certificationCode']."')";
		
		if($db->askQuery() != false){

			$db->query = "UPDATE userbasic SET validationToken = NULL";
			
			if($db->askQuery() != false)
			{
				$_SESSION['lubycon_validation'] = 'active';
				header('location:success_account.php');
			}
		
		}else{
			echo "fail active account";
		}
	}else{
		echo "존재하지 않는 계정이거나, 이미 활성화된 계정입니다.";
	}
}

else{
	echo "해당 정보와 맞는 계정이 없습니다.";
}
?>
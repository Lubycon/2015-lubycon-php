<?php
require_once '../database/database_class.php';

$db = new Database();
$db->query = "SELECT validation FROM userbasic WHERE (validationToken = '".$_POST['certification']."')";

if($db->askQuery() != false){
	
	$result = mysqli_fetch_array($db->result);
	
	if($result['validation'] == 'inactive'){
	
		$db->query = "UPDATE userbasic SET validation = 'active' WHERE (validationToken = '".$_POST['certification']."')";
	
		if($db->askQuery() != false){
	
			$db->query = "UPDATE userbasic SET validationToken = ''";
			header('location:success_account.php');
	
		}else{
			echo "fail active account";
		}
	}else if($result['validation'] == 'active'){
		echo "이미 활성화된 계정입니다.";
	}else{
		echo "존재하지 않는 계정입니다.";
		echo "<br />";
		echo $_POST['certification'];
	}
}else{
	echo "해당 정보와 맞는 계정이 없습니다.";
}
?>
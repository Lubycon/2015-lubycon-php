<script language = "javascript">

	function overlap(){
		document.form.id1.value = "이미 등록된 계정입니다.";
	}

	function non_overlap(){
		document.form.id1.value = "사용가능한 계정입니다.";
	}


</script>

<?php

	require_once './Database.php';

	$database = new DBConnect;
	$database->DBInsert();

	$check=$_REQUEST["check"];
	$database->query = "select exists(select * from member where email = '".$check."')";
	$database->DBQuestion();
	$result = $database->result->fetch_array();

	if($result[0]){
		echo ("<script>alert('중복');</script>");
	}
	else{
		echo ("<script>alert('등록가능')</script>");
	}
?>
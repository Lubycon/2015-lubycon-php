<?php
	
	// include DB class
	require_once '../database/database_class.php';

	// object instance
	$database = new DBConnect;
	$database->DBInsert();

	//get variable
	$data = $_POST['data'];
	$id = $_POST['id'];

	if($id == "email"){
		$id = "user_email";
	}else if($id == "nick"){
		$id = "user_nick";
	}

	//overlap check
	$database->query = "select exists(select * from luby_user where ".$id." = '".$data."')";
	$database->DBQuestion();
	$result = $database->result->fetch_array();

	//return to xml
	if($result[0]){
		$database->DBOut();
		echo ($result[0]);
	}else{
		$database->DBOut();
		echo ($result[0]);
	}
	

	


?>
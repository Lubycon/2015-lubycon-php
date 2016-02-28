<?php
	
	//include DB class 
	require_once './Database.php';

	// object instance
	$database = new DBConnect;
	$database->DBInsert();

	//get variable
	$data = $_POST['data'];
	$id = $_POST['id'];

	//overlap check
	$database->query = "select exists(select * from member where ".$id." = '".$data."')";
	$database->DBQuestion();
	$result = $database->result->fetch_array();


	//return to xml
	echo ($result[0]);

?>
<?php

	require_once './Database.php';

	$database = new DBConnect;
	$database -> DBInsert();

	$email = $_POST['email'];
	$pass = $_POST['pass'];

	

?>
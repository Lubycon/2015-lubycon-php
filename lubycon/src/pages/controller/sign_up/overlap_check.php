<?php
	
	// include DB class
	require_once '../database/database_class.php';

	// object instance
	$db = new Database();

	($_POST['id'] == "email") ? $id="email" : $id="nick";

	//overlap check
	$db->query = "select exists(select * from userbasic where ".$id." = '".$_POST['data']."')";
	$db->askQuery();
	$result = mysqli_fetch_array($db->result);

	//return to xml
	echo $result[0];
	$db->disconnectDb();

?>
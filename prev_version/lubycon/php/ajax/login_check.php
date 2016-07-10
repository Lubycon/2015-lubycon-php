<?php
	// include DB class
	require_once '../database/database_class.php';

	// Object instance
	$database = new DBConnect;
	$database -> DBInsert();

	// get data
	if(!isset($_POST['is_ajax'])) exit;
	if(!isset($_POST['user_id'])) exit;
	if(!isset($_POST['user_pw'])) exit;
	
	$is_ajax=$_POST['is_ajax'];
	$user_id = $_POST['user_id'];
	$user_pw = $_POST['user_pw'];

	//Confirm return value. It's Okay
	/*
	echo $user_id;
	echo $user_pw;
	*/

	// Sign In check
	$database->query = "select exists(select * from luby_user where user_email='".$user_id."' and user_pass='".$user_pw."')";
	$database->DBQuestion();
	$result = $database->result->fetch_array();

echo $user_pw;

/*
	if($result[0]){
		//setcookie('user_id', $user_id);
		//setcookie('user_name', $members[$user_id]['name']);

		$database->DBOut();
		echo "true";
	}else{
		$database->DBOut();
		echo "false";
	}
*/
	/*
	$members = array('user1'=>array('pw'=>'pw1', 'name'=>'한놈'),
			'user2'=>array('pw'=>'pw2', 'name'=>'두시기'),
	        'user3'=>array('pw'=>'pw3', 'name'=>'석삼'));
	//you should change $members to mySQL later
	
	if(!$is_ajax) exit;
	if(!isset($members[$user_id])) exit;
	if($members[$user_id]['pw'] != $user_pw) exit;
	
	setcookie('user_id',$user_id);
	setcookie('user_name',$members[$user_id]['name']);
	
	echo true;
	*/	
?>
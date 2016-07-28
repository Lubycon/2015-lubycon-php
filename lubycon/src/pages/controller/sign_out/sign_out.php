<?php

	require_once '../../../common/Class/session_class.php';
	require_once "../../../common/Class/json_class.php";
	$json_control = new json_control;

	$session = new Session();
	$session->DestroySession();

	$request = array(
		"code" => "0000",
		"message" => "sign_out"
	);
	$toJSON = json_encode($request);
	echo $toJSON;
?>

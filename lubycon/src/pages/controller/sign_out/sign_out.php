<?php

	require_once '../../../common/Class/session_class.php';
	require_once "../../../common/Class/json_class.php";
	$json_control = new json_control;

	$session = new Session();
	$session->DestroySession();


	$total_array = array(
		'status' => array(
			'code' => '0000',
			'msg' => "sign out succsess"
			),
		'result' => (object)array()
		);
	$data_json = json_encode($total_array);
	die($data_json);

?>

<?php 
	error_reporting(E_ALL);
	ini_set("display_errors", 1);

	require_once "./common/common.php";
	require_once "./common/Module/url_controller.php";
	require_once "./common/Class/json_class.php";
	require_once "./commom/Class/session_class.php";

	$jason_control = new json_control;
	$session = new Session();
	$inactive_user = false;

	$json_control->json_decode('job', "../data/job.json");



?>
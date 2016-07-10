<?php
	require_once './php/session/session_class.php';
	$session = new Session();

	$session->DestroySession();
	header('location:index.php');
?>
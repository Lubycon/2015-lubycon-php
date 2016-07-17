<?php
	include_once '../../../common/Class/session_class.php';

	$session = new Session();

	$session->DestroySession();

	header('location:../../../index.php');

?>
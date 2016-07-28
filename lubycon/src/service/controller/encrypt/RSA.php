<?php

	require_once '../../../common/common.php';
	require_once '../../../common/Class/session_class.php';

	$session = new Session();

	$Keys = rsa_generate_keys('hmdwdgdhkr2015');

	$session->WriteSession('lubycon',$Keys);
	echo $session;
?>

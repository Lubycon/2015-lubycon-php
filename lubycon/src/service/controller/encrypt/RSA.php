<?php

	require_once '../../../common/common.php';
	require_once '../../../common/Class/session_class.php';

	$session = new Session();

	$Keys = rsa_generate_keys('hmdwdgdhkr2015');

	if($Keys){
		$session->WriteSession('lubycon',$Keys);
		$result = array(
			"code"=>"0000",
			"publicKey"=>$Keys['public_key'],
			"message"=>"get Key"
			);	
	}else{
		$result = array(
			"code"=>"0400",
			"message"=>"fail get Key"
			);
	}

	$toJSON = json_encode($result);

	echo $toJSON;
	
?>

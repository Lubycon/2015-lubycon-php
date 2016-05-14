<?php

	require_once './cookie_class.php';

	$obj = new Cookie('lubycon');

	echo $obj->cNAME . "<br />";
	echo $obj->cTIME . "<br />";
	echo $obj->cPATH . "<br />";

	$contents = array('Hello'=>100,'Lubycon'=>200,'fighting'=>300);

	$obj->WriteCookie($contents);

	$data = $obj->ReadCookie('Lubycon');

	echo $data . "<br />";
	echo "<br />";

	$obj->DestroyCookies();

	if(isset($_COOKIE)){
		foreach($_COOKIE as $name=>$val){
			echo "<br />";
			echo $name . "<br />";
			echo $val . "<br />";
		}
	}else{
		echo "cookie doesn't exist";
	}

?>
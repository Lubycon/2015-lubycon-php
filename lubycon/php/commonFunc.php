<?php

# COMMON FUNCTION

#---------------------------------------------------------------------------------
#	TOKEN
#---------------------------------------------------------------------------------

# Make a Token of specific size 
# argument is specific size

function MakeToken($size){
	
	static $feed = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	$randStr = null;

	for($i=0; $i< $size; $i++)
		$randStr .= substr($feed, rand(0, strlen($feed)-1), 1);
	
	return $randStr;
}


?>
<?php

require_once "../class/regex_class.php";
$regex_vali = new regex_validate;

$regex_vali->email_check('q@naer.com');
$regex_vali->pass_check('12345678zz'); 
$regex_vali->sametext_check('12345678zz','12345678zz'); // insert 2 value 1:pass 2:repass
$regex_vali->nickname_check('bitch'); 

?>
<?php

require_once "../class/regex_class.php";
$regex_vali = new regex_validate;

$regex_vali->email_check('q@naer.com'); 

$regex_vali->pass_check('qwe!rqwer'); 

$regex_vali->sametext_check($_POST['pass'],$_POST['repass']); 

$regex_vali->nickname_check($_POST['nick']); 

?>
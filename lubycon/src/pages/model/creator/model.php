<?php
require_once '../../../common/Class/database_class.php';
$db = new Database();
require_once "../../../common/Class/session_class.php";
$session = new Session();

if($session->SessionExist()){
	$db->query = "SELECT * FROM `userbasic` LEFT JOIN `userinfo` on `userbasic`.`userCode` = `userinfo`.`userCode` WHERE `userbasic`.`userCode` = '$Loginuser_code'";
	$db->askQuery();
	$myrow = mysqli_fetch_assoc($db->result);
}

$db->query = 
"
		SELECT  `userbasic`.`userCode` , `nick` , `jobCode` , `boardCode` , `city` , `countryCode` , `userDirectory`
		
		FROM lubyconboard.`artwork` 
		
		INNER join lubyconuser.`userbasic` 
		INNER join lubyconuser.`userinfo` 
		ON `artwork`.`userCode` = `userbasic`.`userCode` 
		and `userbasic`.`userCode` = `userinfo`.`userCode` 
		
		ORDER BY `boardCode` DESC
";
$db->askQuery();
$creator_row = mysqli_fetch_assoc($db->result)


?>
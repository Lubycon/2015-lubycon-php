<?php
require_once '../../../common/Class/database_class.php';
$db = new Database();


$db->query = "SELECT * FROM `userbasic` INNER JOIN `userinfo` ON `userbasic`.`userCode` = `userinfo`.`userCode` WHERE `userbasic`.`userCode` = $usernumber ";
$db->askQuery();
$userdata_row = mysqli_fetch_assoc($db->result);
$db->query = "SELECT `languageLevel`,`languageName` FROM `userlanguage` WHERE `userCode` = $usernumber";
$db->askQuery();
$language_result = $db->result;
$db->query = "SELECT `historyContents`,`historyDateYear`,`historyDateMonth`,`historyCategory` FROM `userhistory` WHERE `userCode` = $usernumber";
$db->askQuery();
$history_result = $db->result;
?>
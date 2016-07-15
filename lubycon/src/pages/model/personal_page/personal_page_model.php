<?php
require_once '../../../common/Class/database_class.php';
$db = new Database();

$usernumber = $_POST['usernum'];

/*target user data sql*/
$db->query = "SELECT * FROM `userbasic` INNER JOIN `userinfo` ON `userbasic`.`userCode` = `userinfo`.`userCode` WHERE `userbasic`.`userCode` = $usernumber ";
$db->askQuery();
$userdata_row = mysqli_fetch_assoc($db->result);
/*target user data sql*/

?>
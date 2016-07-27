<?php

require_once '../../../common/Class/database_class.php';
$db = new Database();

$db->query = "
SELECT `userbasic`.`userCode`,`userbasic`.`email`, `userbasic`.pass, `userbasic`.nick, `userbasic`.validation , `userinfo`.`countryCode` , `userinfo`.`jobCode`, `userinfo`.`city` , `userinfo`.`profileImg`
FROM `lubyconuser`.`userbasic`
LEFT JOIN `lubyconuser`.`userinfo`
ON `userbasic`.`userCode` = `userinfo`.`userCode`
WHERE `userbasic`.`email`='$user_email'
";
$db->askQuery();
$sign_in_result = $db->result;
?>
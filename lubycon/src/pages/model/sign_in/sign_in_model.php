<?php

require_once '../../../common/Class/database_class.php';
$db = new Database();

$db->query = "
SELECT ub.`userCode`,ub.`email`, ub.`pass`, ub.`date`,ub.`nick`, ub.`validation` , ui.`countryCode` , ui.`jobCode`, ui.`city` , ui.`profileImg`
FROM `lubyconuser`.`userbasic` as ub
LEFT JOIN `lubyconuser`.`userinfo` as ui
USING (`userCode`)
WHERE ub.`email`= '$user_email'
";
$db->askQuery();
$sign_in_result = $db->result;
?>
<?php
require_once '../../../common/Class/database_class.php';
$db = new Database();

$db->query = 
"
UPDATE `userbasic` 
SET 
`validation` = 'drop'
WHERE `userCode` = $userCode
";

$db->askQuery();
?>
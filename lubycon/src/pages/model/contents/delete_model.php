<?php
require_once '../../../common/Class/database_class.php';
$db = new Database();

$db->query = 
"
UPDATE lubyconboard.`$topCateName`
SET 
`contentStatus` = 'delete'
WHERE `userCode` = $userCode
AND `boardCode` = '$boardCode'
";

$db->askQuery();
?>
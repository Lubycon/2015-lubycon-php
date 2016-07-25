<?php
require_once '../../../common/Class/database_class.php';
$db = new Database();
$db->query = 
" 
UPDATE lubyconboard.`$topCateName` 
SET 
`contentTitle` = '$contentTitle',
`contentDate` = '$contentDate',
`contents` = '$contents'
WHERE `userCode` = $userCode
AND `topCategoryCode` = '$topCateCode';
";

$db->askQuery();

?>
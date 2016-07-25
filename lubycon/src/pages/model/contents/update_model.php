<?php
require_once '../../../common/Class/database_class.php';
$db = new Database();
$db->query = 
" 
UPDATE lubyconboard.`$topCateName` 
SET 
`contentTitle` = '$title',
`contentDate` = '$contentDate',
`contentDescription` = '$desc',
`downloadAble` = '$downloadAble',
`ccCode` = '$cc_code',
`ccLicense` = '$cc_license'
WHERE `userCode` = $userCode
AND `topCategoryCode` = '$topCateCode';
";
$db->askQuery();

$db->query = 
" 
UPDATE lubyconboard.`$topCateName"."midcategory`
SET
`midcategory0` = '$midCate[0],
`midcategory1` = '$midCate[1]',
`midcategory2` = '$midCate[2]'
";
$db->askQuery();

$db->query = 
" 
UPDATE lubyconboard.`$topCateName"."tag`
SET
$tagQuery
";
$db->askQuery();
?>
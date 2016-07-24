<?php
require_once '../../../common/Class/database_class.php';
$db = new Database();
$db->query = 
" 
INSERT INTO `lubyconboard`.`$topCateName` 
(`userCode`, `topCategoryCode`, `contentTitle`, `contentDate`, `contents`, `userDirectory`) 
VALUES 
('$userCode', '$topCateCode', '$contentTitle', '$contentDate', '$contents', '$userDir');
";

$db->askQuery();

?>
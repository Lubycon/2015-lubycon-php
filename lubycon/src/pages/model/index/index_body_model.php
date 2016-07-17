<?php

require_once '../../../common/Class/database_class.php';
$db = new Database();
$db->changeDb('lubyconboard');
$db->query = "
SELECT a.`boardCode`, a.`topCategoryCode` ,a.`contentTitle`,  a.`userDirectory` , b.`nick`
FROM 
( 
    (SELECT * FROM lubyconboard.`artwork` ORDER BY `viewCount` DESC LIMIT $limit )
    UNION 
    (SELECT * FROM lubyconboard.`vector` ORDER BY `viewCount` DESC LIMIT $limit )
    UNION 
    (SELECT * FROM lubyconboard.`threed` ORDER BY `viewCount` DESC LIMIT $limit )
) AS a 
LEFT JOIN lubyconuser.`userbasic` AS b 
ON a.`userCode` = b.`userCode`
";
$db->askQuery();
$contents_data_row = $db->result;

/*$db->query = "SELECT boardCode,title,viewCount,likeCount,contents,nick FROM lubyconboard.`forum` LEFT JOIN lubyconuser.`userbasic` ON `forum`.`userCode` = `userbasic`.`userCode` UNION SELECT boardCode,title,viewCount,likeCount,contents,nick FROM lubyconboard.`qaa` LEFT JOIN lubyconuser.`userbasic` ON `qaa`.`userCode` = `userbasic`.`userCode` UNION SELECT boardCode,title,viewCount,likeCount,contents,nick FROM lubyconboard.`tutorial` LEFT JOIN lubyconuser.`userbasic` ON `tutorial`.`userCode` = `userbasic`.`userCode` ORDER BY `viewCount` DESC LIMIT 5 ";
$db->askQuery();
$forum_data_row = $db->result;*/
?>
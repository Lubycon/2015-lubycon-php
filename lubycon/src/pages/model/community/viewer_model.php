<?php
require_once '../../../common/Class/database_class.php';
$db = new Database();
$db->changedb('lubyconboard');

$db->query =
"
SELECT *
FROM lubyconboard.`forum` AS a
LEFT JOIN lubyconuser.`userbasic` 
USING (`userCode`)
LEFT JOIN lubyconuser.`userinfo` 
USING (`userCode`)
";

if($LoginState)
{
	$db->query .= 
	"
	LEFT JOIN lubyconboard.`communitylike` as cl
	ON a.`boardCode` = cl.`boardCode` 
	AND cl.`likeGiveUserCode` = $Loginuser_code
	";
}

$db->query .=  " WHERE a.`boardCode` = $boardCode";
$db->askQuery();

$row = mysqli_fetch_assoc($db->result);

$db->query = 
"
SELECT * 
FROM lubyconboard.`communitycomment` as a
RIGHT JOIN lubyconuser.`userbasic` as b 
ON a.`commentGiveUserCode` = b.`userCode`
LEFT JOIN lubyconuser.`userinfo` as c 
USING (`userCode`)
WHERE a.`boardCode` = '$boardCode' 
AND a.`topCategoryCode` = '$cateCode' 
AND a.`commentStatus` = 'normal'
";
$db->askQuery();
$comment_row = mysqli_fetch_assoc($db->result);
?>
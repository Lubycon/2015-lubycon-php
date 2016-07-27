<?php
require_once '../../../common/Class/database_class.php';
$db = new Database();

$foundRow = 'SELECT FOUND_ROWS()';

/* like bookmark give and take */
$db->query = "SELECT SQL_CALC_FOUND_ROWS * FROM lubyconboard.`contentsbookmark` as a WHERE a.`bookmarkGiveUserCode` = $userCode LIMIT 1";
$db->askQuery();
$db->query = $foundRow;
$db->askQuery();
$bookmarkGiveResultFound = mysqli_fetch_assoc($db->result);


$db->query = "SELECT SQL_CALC_FOUND_ROWS * FROM lubyconboard.`contentsbookmark` as a WHERE a.`bookmarkTakeUserCode` = $userCode LIMIT 1";
$db->askQuery();
$db->query = $foundRow;
$db->askQuery();
$bookmarkTakeResultFound = mysqli_fetch_assoc($db->result);

$db->query = "SELECT SQL_CALC_FOUND_ROWS * FROM lubyconboard.`contentslike` as a WHERE a.`likeGiveUserCode` = $userCode LIMIT 1";
$db->askQuery();
$db->query = $foundRow;
$db->askQuery();
$likeGiveResultFound = mysqli_fetch_assoc($db->result);
$db->query = "SELECT SQL_CALC_FOUND_ROWS * FROM lubyconboard.`contentslike` as a WHERE a.`likeTakeUserCode` = $userCode LIMIT 1";
$db->askQuery();
$db->query = $foundRow;
$db->askQuery();
$likeTakeResultFound = mysqli_fetch_assoc($db->result);
/* like bookmark give and take */

$db->query = 
"
SELECT COUNT(*), ui.`countryCode`
FROM lubyconboard.`contentslike` as clike
LEFT JOIN lubyconuser.`userinfo` as ui
ON clike.`likeGiveUserCode` = ui.`userCode`
WHERE clike.`likeTakeUserCode` = $userCode
GROUP BY ui.`countryCode`
ORDER BY COUNT(*) DESC
LIMIT 5;
";
$db->askQuery();
$countryRank = $db->result;

/*
SELECT COUNT(*),DATE_FORMAT(base.`likeDate`, '%Y-%c-%e')
FROM lubyconboard.`contentslike` as base

WHERE (base.`likeDate` BETWEEN DATE_ADD(NOW(), INTERVAL -3 MONTH) AND now())
GROUP BY DATE_FORMAT(base.`likeDate`, '%Y-%c-%e')

ORDER BY base.`likeDate` DESC
*/



/* contents ranking */
$db->query = 
"
SELECT count(*),base.`boardCode`,base.`topCategoryCode`,a.`contentTitle`,a.`userDirectory`
FROM
( 
	SELECT * FROM lubyconboard.`artwork`
	UNION SELECT * FROM lubyconboard.`vector` 
	UNION SELECT * FROM lubyconboard.`threed` 
) AS a 
RIGHT JOIN lubyconboard.`contentslike` as base
USING (`boardCode`)
WHERE a.`userCode`= $userCode
GROUP BY base.`boardCode`
ORDER BY count(*) DESC
LIMIT 5
";
$db->askQuery();
$contentsLikeRank = $db->result;
$db->query = 
"
SELECT count(*),base.`boardCode`,base.`topCategoryCode`,a.`contentTitle`,a.`userDirectory`
FROM
( 
	SELECT * FROM lubyconboard.`artwork`
	UNION SELECT * FROM lubyconboard.`vector` 
	UNION SELECT * FROM lubyconboard.`threed` 
) AS a 
RIGHT JOIN lubyconboard.`contentsView` as base
USING (`boardCode`)
WHERE a.`userCode`= $userCode
GROUP BY base.`boardCode`
ORDER BY count(*) DESC
LIMIT 5
";
$db->askQuery();
$contentsViewRank = $db->result;
$db->query = 
"
SELECT count(*),base.`boardCode`,base.`topCategoryCode`,a.`contentTitle`,a.`userDirectory`
FROM
( 
	SELECT * FROM lubyconboard.`artwork`
	UNION SELECT * FROM lubyconboard.`vector` 
	UNION SELECT * FROM lubyconboard.`threed` 
) AS a 
RIGHT JOIN lubyconboard.`contentsComment` as base
USING (`boardCode`)
WHERE a.`userCode`= $userCode
GROUP BY base.`boardCode`
ORDER BY count(*) DESC
LIMIT 5
";
$db->askQuery();
$contentsCommentRank = $db->result;
/* contents ranking */
/* community ranking */
$db->query = 
"
SELECT count(*),base.`boardCode`,a.`contentTitle`
FROM
( 
	SELECT * FROM lubyconboard.`forum`
	UNION SELECT * FROM lubyconboard.`tutorial` 
	UNION SELECT * FROM lubyconboard.`qaa` 
) AS a 
RIGHT JOIN lubyconboard.`communityLike` as base
USING (`boardCode`)
WHERE a.`userCode`= $userCode
GROUP BY base.`boardCode`
ORDER BY count(*) DESC
LIMIT 5
";
$db->askQuery();
$communityLikeRank = $db->result;
echo $db->database->error;
$db->query = 
"
SELECT count(*),base.`boardCode`,a.`contentTitle`
FROM
( 
	SELECT * FROM lubyconboard.`forum`
	UNION SELECT * FROM lubyconboard.`tutorial` 
	UNION SELECT * FROM lubyconboard.`qaa` 
) AS a 
RIGHT JOIN lubyconboard.`communityView` as base
USING (`boardCode`)
WHERE a.`userCode`= $userCode
GROUP BY base.`boardCode`
ORDER BY count(*) DESC
LIMIT 5
";
$db->askQuery();
$communityViewRank = $db->result;$db->query = 
"
SELECT count(*),base.`boardCode`,a.`contentTitle`
FROM
( 
	SELECT * FROM lubyconboard.`forum`
	UNION SELECT * FROM lubyconboard.`tutorial` 
	UNION SELECT * FROM lubyconboard.`qaa` 
) AS a 
RIGHT JOIN lubyconboard.`communityComment` as base
USING (`boardCode`)
WHERE a.`userCode`= $userCode
GROUP BY base.`boardCode`
ORDER BY count(*) DESC
LIMIT 5
";
$db->askQuery();
$communityCommentRank = $db->result;
/* community ranking */

?>
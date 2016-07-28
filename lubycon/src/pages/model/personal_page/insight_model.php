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


/*   timeline    */

$db->query = 
"
SELECT DATE_FORMAT(cl.`likeDate`, '%Y-%c-%e') as ck , COUNT(*) as value , cal.`calendar_date` as date
FROM lubyconboard.`calendar` as cal 
LEFT JOIN lubyconboard.`contentslike` as cl
ON cal.`calendar_date` = DATE_FORMAT(cl.`likeDate`, '%Y-%c-%e')
WHERE cal.`calendar_date` BETWEEN DATE_ADD(NOW(), INTERVAL -3 MONTH) AND now()
GROUP BY DATE_FORMAT(cal.`calendar_date`, '%Y-%c-%e')
ORDER BY cal.`calendar_date` DESC
";
$db->askQuery();
$timelineLike = $db->result;
$db->query = 
"
SELECT DATE_FORMAT(cl.`bookmarkDate`, '%Y-%c-%e') as ck , COUNT(*) as value , cal.`calendar_date` as date
FROM lubyconboard.`calendar` as cal 
LEFT JOIN lubyconboard.`contentsbookmark` as cl
ON cal.`calendar_date` = DATE_FORMAT(cl.`bookmarkDate`, '%Y-%c-%e')
WHERE cal.`calendar_date` BETWEEN DATE_ADD(NOW(), INTERVAL -3 MONTH) AND now()
GROUP BY DATE_FORMAT(cal.`calendar_date`, '%Y-%c-%e')
ORDER BY cal.`calendar_date` DESC
";
$db->askQuery();
$timelineBookmark = $db->result;
$db->query = 
"
SELECT DATE_FORMAT(cl.`viewDate`, '%Y-%c-%e') as ck , COUNT(*) as value , cal.`calendar_date` as date
FROM lubyconboard.`calendar` as cal 
LEFT JOIN lubyconboard.`contentsview` as cl
ON cal.`calendar_date` = DATE_FORMAT(cl.`viewDate`, '%Y-%c-%e')
WHERE cal.`calendar_date` BETWEEN DATE_ADD(NOW(), INTERVAL -3 MONTH) AND now()
GROUP BY DATE_FORMAT(cal.`calendar_date`, '%Y-%c-%e')
ORDER BY cal.`calendar_date` DESC
";
$db->askQuery();
$timelineView = $db->result;
$db->query = 
"
SELECT DATE_FORMAT(cl.`commentDate`, '%Y-%c-%e') as ck , COUNT(*) as value , cal.`calendar_date` as date
FROM lubyconboard.`calendar` as cal 
LEFT JOIN lubyconboard.`contentscomment` as cl
ON cal.`calendar_date` = DATE_FORMAT(cl.`commentDate`, '%Y-%c-%e')
WHERE cal.`calendar_date` BETWEEN DATE_ADD(NOW(), INTERVAL -3 MONTH) AND now()
GROUP BY DATE_FORMAT(cal.`calendar_date`, '%Y-%c-%e')
ORDER BY cal.`calendar_date` DESC
";
$db->askQuery();
$timelineComment = $db->result;


/*   timeline    */




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
SELECT count(*),base.`boardCode`,a.`contentTitle`,a.`topCategoryCode`
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
SELECT count(*),base.`boardCode`,a.`contentTitle`,a.`topCategoryCode`
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
SELECT count(*),base.`boardCode`,a.`contentTitle`,a.`topCategoryCode`
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
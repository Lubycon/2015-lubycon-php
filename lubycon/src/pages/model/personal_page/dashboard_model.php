<?php
require_once '../../../common/Class/database_class.php';
$db = new Database();


$db->query = "SELECT * FROM `userbasic` INNER JOIN `userinfo` ON `userbasic`.`userCode` = `userinfo`.`userCode` WHERE `userbasic`.`userCode` = $usernumber ";
$db->askQuery();
$userdata_row = mysqli_fetch_assoc($db->result);
$db->query = "SELECT `languageLevel`,`languageName` FROM `userlanguage` WHERE `userCode` = $usernumber";
$db->askQuery();
$language_result = $db->result;
$db->query = "SELECT `historyContents`,`historyDateYear`,`historyDateMonth`,`historyCategory` FROM `userhistory` WHERE `userCode` = $usernumber";
$db->askQuery();
$history_result = $db->result;



/* total data */
$db->query = "
SELECT COUNT(*) as count
FROM lubyconboard.`contentslike` as cl
WHERE cl.`likeTakeUserCode` = $usernumber";
$db->askQuery();
$likeResultFound = mysqli_fetch_assoc($db->result);

$db->query = "
SELECT COUNT(*) as count
FROM lubyconboard.`contentsview` as cl
WHERE cl.`viewTakeUserCode` = $usernumber";
$db->askQuery();
$viewResultFound = mysqli_fetch_assoc($db->result);

$db->query = "
SELECT COUNT(*) as count
FROM lubyconboard.`contentsupload` as cl
WHERE cl.`uploadTakeUserCode` = $usernumber";
$db->askQuery();
$uploadResultFound = mysqli_fetch_assoc($db->result);

$db->query = "
SELECT COUNT(*) as count
FROM lubyconboard.`contentsdownload` as cl
WHERE cl.`downloadTakeUserCode` = $usernumber";
$db->askQuery();
$downloadResultFound = mysqli_fetch_assoc($db->result);
/* total data */


/*   timeline    */
$db->query = 
"
SELECT * 
FROM 
(
    SELECT COUNT(*) as count,DATE_FORMAT(cl.`likeDate`, '%Y-%c-%e') as checked
    FROM lubyconboard.`contentslike` as cl
    WHERE cl.`likeTakeUserCode` = $usernumber
    GROUP BY DATE_FORMAT(cl.`likeDate`, '%Y-%c-%e')
) as cl
RIGHT JOIN lubyconboard.`calendar` as cal
ON cal.`calendar_date` = checked
WHERE cal.`calendar_date` BETWEEN DATE_ADD(NOW(), INTERVAL -1 WEEK) AND now()
ORDER BY `cal`.`calendar_date`  ASC
";
$db->askQuery();
$likeTimeline = $db->result;

$db->query = 
"
SELECT * 
FROM 
(
    SELECT COUNT(*) as count,DATE_FORMAT(cl.`viewDate`, '%Y-%c-%e') as checked
    FROM lubyconboard.`contentsview` as cl
    WHERE cl.`viewTakeUserCode` = $usernumber
    GROUP BY DATE_FORMAT(cl.`viewDate`, '%Y-%c-%e')
) as cl
RIGHT JOIN lubyconboard.`calendar` as cal
ON cal.`calendar_date` = checked
WHERE cal.`calendar_date` BETWEEN DATE_ADD(NOW(), INTERVAL -1 WEEK) AND now()
ORDER BY `cal`.`calendar_date`  ASC
";
$db->askQuery();
$viewTimeline = $db->result;


$db->query = 
"
SELECT * 
FROM 
(
    SELECT COUNT(*) as count,DATE_FORMAT(cl.`uploadDate`, '%Y-%c-%e') as checked
    FROM lubyconboard.`contentsupload` as cl
    WHERE cl.`uploadTakeUserCode` = $usernumber
    GROUP BY DATE_FORMAT(cl.`uploadDate`, '%Y-%c-%e')
) as cl
RIGHT JOIN lubyconboard.`calendar` as cal
ON cal.`calendar_date` = checked
WHERE cal.`calendar_date` BETWEEN DATE_ADD(NOW(), INTERVAL -1 WEEK) AND now()
ORDER BY `cal`.`calendar_date`  ASC
";
$db->askQuery();
$uploadTimeline = $db->result;

$db->query = 
"
SELECT * 
FROM 
(
    SELECT COUNT(*) as count,DATE_FORMAT(cl.`downloadDate`, '%Y-%c-%e') as checked
    FROM lubyconboard.`contentsdownload` as cl
    WHERE cl.`downloadTakeUserCode` = $usernumber
    GROUP BY DATE_FORMAT(cl.`downloadDate`, '%Y-%c-%e')
) as cl
RIGHT JOIN lubyconboard.`calendar` as cal
ON cal.`calendar_date` = checked
WHERE cal.`calendar_date` BETWEEN DATE_ADD(NOW(), INTERVAL -1 WEEK) AND now()
ORDER BY `cal`.`calendar_date`  ASC
";
$db->askQuery();
$downloadTimeline = $db->result;
/*   timeline    */
?>
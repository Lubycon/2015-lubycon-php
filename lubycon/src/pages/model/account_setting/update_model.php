<?php
require_once '../../../common/Class/database_class.php';
$db = new Database();

$db->query = 
"
UPDATE `userinfo` 
SET 
`jobCode` = $job_code, 
`company` = '$company',
`userDescription` = '$user_description',
`countryCode` = '$location_code',
`city` = '$location_text',
`telNumber` = '$mobile_number',
`fax` = '$fax_number',
`web` = '$website_url',
`emailPublic` = '$email_public',
`mobilePublic` = '$mobile_public',
`faxPublic` = '$fax_public',
`webPublic` = '$website_public'
WHERE `userCode` = $usercode
";

$db->askQuery(); // viewcount up
$db->query = 
"
DELETE `lubyconuser`.`userhistory` , `lubyconuser`.`userlanguage`
FROM `lubyconuser`.`userhistory` LEFT JOIN `lubyconuser`.`userlanguage`
WHERE `lubyconuser`.`userhistory`.userCode = `lubyconuser`.`userlanguage`.userCode 
AND `lubyconuser`.`userhistory`.userCode = $usercode
";
$db->askQuery(); //delete original data

$db->query = $history_query;
$db->askQuery(); // insert user history

$db->query = $language_query;
$db->askQuery(); // insert user history



?>
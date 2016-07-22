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
`countryCode` = '$location',
`city` = '$city',
`profile` = '$profile_path',
`emailPublic` = '$email_public',
`telNumber` = '$mobile_number',
`mobilePublic` = '$mobile_public',
`fax` = '$fax_number',
`faxPublic` = '$fax_public',
`web` = '$website_url',
`webPublic` = '$website_public'
WHERE `userCode` = $userCode
";

$db->askQuery(); 

$db->query = 
"
DELETE `lubyconuser`.`userhistory` , `lubyconuser`.`userlanguage`
FROM `lubyconuser`.`userhistory` LEFT JOIN `lubyconuser`.`userlanguage`
USING (`userCode`)
WHERE `lubyconuser`.`userhistory`.userCode = `lubyconuser`.`userlanguage`.userCode 
AND `lubyconuser`.`userhistory`.userCode = $userCode
";
$db->askQuery(); //delete original data

$db->query = $history_query;
$db->askQuery(); // insert user history

$db->query = $language_query;
$db->askQuery(); // insert user history
?>
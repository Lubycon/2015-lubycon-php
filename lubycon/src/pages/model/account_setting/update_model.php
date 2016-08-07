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
`profileImg` = '$profile_path',
`emailPublic` = '$email_public',
`telNumber` = '$mobile_number',
`mobilePublic` = '$mobile_public',
`fax` = '$fax_number',
`faxPublic` = '$fax_public',
`web` = '$website_url',
`webPublic` = '$website_public'
WHERE `userCode` = $userCode
";

if(!$db->askQuery())
{
	$total_array = array(
		'status' => array(
			'code' => '1000',
			'msg' => "update query ask error"
			),
		'result' => (object)array()
		);
	$data_json = json_encode($total_array);
	die($data_json);
}

$db->query = 
"
DELETE `lubyconuser`.`userhistory` , `lubyconuser`.`userlanguage`
FROM `lubyconuser`.`userhistory` LEFT JOIN `lubyconuser`.`userlanguage`
USING (`userCode`)
WHERE `lubyconuser`.`userhistory`.userCode = `lubyconuser`.`userlanguage`.userCode 
AND `lubyconuser`.`userhistory`.userCode = $userCode
";

if(!$db->askQuery())
{
	$total_array = array(
		'status' => array(
			'code' => '1000',
			'msg' => "delete history, language query ask error"
			),
		'result' => (object)array()
		);
	$data_json = json_encode($total_array);
	die($data_json);
}

$db->query = $history_query;
if(!$db->askQuery())
{
	$total_array = array(
		'status' => array(
			'code' => '1000',
			'msg' => "history insert query ask error"
			),
		'result' => (object)array()
		);
	$data_json = json_encode($total_array);
	die($data_json);
}

$db->query = $language_query;
if(!$db->askQuery())
{
	$total_array = array(
		'status' => array(
			'code' => '1000',
			'msg' => "language insert query ask error"
			),
		'result' => (object)array()
		);
	$data_json = json_encode($total_array);
	die($data_json);
}
?>
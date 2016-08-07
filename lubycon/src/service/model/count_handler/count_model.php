<?php
require_once '../../../common/Class/database_class.php';
$db = new Database();
$db->query =
"
select * from `lubyconboard`.`$contentsKind$countType`
WHERE `$contentsKind$countType`.`".$countType."GiveUserCode` = '$giveUserCode'
and `$contentsKind$countType`.`boardCode` = '$number'
and `$contentsKind$countType`.`topCategoryCode` = '$topCate'
";
$db->askQuery();
$select_result =  $db->result;
print_r($db->database->error);

if( $select_result->num_rows == 0 )
{
	$stat_check = '+1';
	$db->query =
	"
	INSERT INTO `lubyconboard`.`$contentsKind$countType`
	( `".$countType."GiveUserCode`, `".$countType."TakeUserCode` , `boardCode`, `topCategoryCode`, `".$countType."Date`) VALUES
	( '$giveUserCode','$takeUserCode','$number', '$topCate', '$activeDate');
	";
}else if ($select_result->num_rows > 0 )
{
	$stat_check = '-1';
	$db->query =
	"
	DELETE FROM
	`lubyconboard`.`$contentsKind$countType`
	WHERE `$contentsKind$countType`.`".$countType."GiveUserCode` = '$giveUserCode'
	and `$contentsKind$countType`.`boardCode` = '$number'
	and `$contentsKind$countType`.`topCategoryCode` = '$topCate'
	";
}else
{
	$total_array = array(
		'status' => array(
			'code' => '1000',
			'msg' => 'select query ask fail'
			),
		'result' => (object)array()
		);
	$data_json = json_encode($total_array);
	die($data_json);
}
$db->askQuery();
print_r($db->database->error);

//echo $db->query;
$db->query = "UPDATE `lubyconboard`.`$topCateName` SET `$countTypeName` = `$countTypeName` $stat_check WHERE `$topCateName`.`boardCode` = $number";

//echo $db->query;
if(!$db->askQuery())
{
	print_r($db->database->error);
	$total_array = array(
		'status' => array(
			'code' => '1000',
			'msg' => 'update query ask fail'
			),
		'result' => (object)array()
		);
	$data_json = json_encode($total_array);
	die($data_json);
}

//echo $db->query;


?>

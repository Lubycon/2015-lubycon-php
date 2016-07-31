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


if( $select_result->num_rows == 0 )
{
	$stat_check = '+1';
	$db->query =
	"
	INSERT INTO `lubyconboard`.`$contentsKind$countType`
	( `".$countType."GiveUserCode`, `".$countType."TakeUserCode` , `boardCode`, `topCategoryCode`, `".$countType."Date`) VALUES
	( '$giveUserCode','$takeUserCode','$number', '$topCate', '$activeDate');
	";

}else if ($select_result->num_rows <= 1 )
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
	$status = array(
		'code' => '1000',
		'msg' => 'query ask fail'
		);
	$result = null;
	$res->fillArray($status,$result);
}
$db->askQuery();

//echo $db->query;
$db->query = "UPDATE `lubyconboard`.`$topCateName` SET `$countTypeName` = `$countTypeName` $stat_check WHERE `$topCateName`.`boardCode` = $number";

//echo $db->query;
if(!$db->askQuery())
{
	$status = array(
		'code' => '1000',
		'msg' => 'query ask fail'
		);
	$result = null;
	$res->fillArray($status,$result);
}

//echo $db->query;


?>

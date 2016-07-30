<?php
require_once '../../../common/Class/database_class.php';
$db = new Database();
$db->query =
"
select * from `lubyconboard`.`$contentsKind$countType`
WHERE `$contentsKind$countType`.`".$countType."GiveUserCode` = '$giveUserCode'
and `$contentsKind$countType`.`boardCode` = '$number'
and `$contentsKind$countType`.`topCategoryCode` = '$topCate'
and `$contentsKind$countType`.`".$countType."BoardKind` = '$contentsKind'
";
$db->askQuery();
$select_result =  $db->result;

//echo $db->query;

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
	`lubyconboard`.`$contentsKind".$countType."`
	WHERE `$contentsKind".$countType."`.`".$countType."GiveUserCode` = '$giveUserCode'
	and `$contentsKind".$countType."`.`boardCode` = '$number'
	and `$contentsKind".$countType."`.`topCategoryCode` = '$topCate'
	and `$contentsKind".$countType."`.`".$countType."BoardKind` = '$contentsKind'
	";
}else
{
	die('select query is wrong');
}
$db->askQuery();

//echo $db->query;
$db->query = "UPDATE `lubyconboard`.`$topCateName` SET `$countTypeName` = `$countTypeName` $stat_check WHERE `$topCateName`.`boardCode` = $number";
$db->askQuery();

//echo $db->query;


?>

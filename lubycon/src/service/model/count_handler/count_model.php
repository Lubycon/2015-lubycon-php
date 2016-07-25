<?php
require_once '../../../common/Class/database_class.php';
$db = new Database();
$db->query = 
"
select * from `lubyconboard`.`contents$ajax_countkind`
WHERE `contents$ajax_countkind`.`".$ajax_countkind."GiveUserCode` = '$ajax_usercode'
and `contents$ajax_countkind`.`boardCode` = '$ajax_nummber'
and `contents$ajax_countkind`.`topCategoryCode` = '$ajax_cate_code'
and `contents$ajax_countkind`.`".$ajax_countkind."BoardKind` = '$content_kind'
";
$db->askQuery();
$select_result =  $db->result;

//echo $db->query;

if( $select_result->num_rows == 0 )
{
	$stat_check = '+1';
        //echo $ajax_countkind.$ajax_usercode.$ajax_nummber.$ajax_cate_name;
	$db->query =
	"
	INSERT INTO `lubyconboard`.`contents$ajax_countkind`
	( `".$ajax_countkind."GiveUserCode`, `boardCode`, `topCategoryCode`, `".$ajax_countkind."BoardKind`, `".$ajax_countkind."Date`) VALUES
	( '$ajax_usercode', '$ajax_nummber', '$ajax_cate_code', '$content_kind', '$active_date');
	";
}else if ($select_result->num_rows <= 1 )
{
	$stat_check = '-1';
	$db->query =
	"
	DELETE FROM
	`lubyconboard`.`contents".$ajax_countkind."`
	WHERE `contents".$ajax_countkind."`.`".$ajax_countkind."GiveUserCode` = '$ajax_usercode'
	and `contents".$ajax_countkind."`.`boardCode` = '$ajax_nummber'
	and `contents".$ajax_countkind."`.`topCategoryCode` = '$ajax_cate_code'
	and `contents".$ajax_countkind."`.`".$ajax_countkind."BoardKind` = '$content_kind'
	";
}else
{
	die('select query is wrong');
}
$db->askQuery();

//echo $db->query;
$db->query = "UPDATE `lubyconboard`.`$ajax_cate_name` SET `$ajax_countkind_name` = `$ajax_countkind_name` $stat_check WHERE `$ajax_cate_name`.`boardCode` = $ajax_nummber";
$db->askQuery(); 

//echo $db->query;


?>
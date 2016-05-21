<?php
$check_id = $_POST['check_id'];

if($check_id == 'call_thumb')
{
    include_once('../editor/editor_thumbnail.php');
}else if($check_id == 'call_setting')
{
    include_once('../editor/editor_setting.php');
}else if($check_id == 'back_bt_editor')
{
	include_once('../editor/editor_thumbnail.php');
}

?>
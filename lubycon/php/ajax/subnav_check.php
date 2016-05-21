<?php
$third_param = $_POST['id'];
//echo $id;
switch($third_param)
{
    case 'dashboard':include_once('../personal_page/dashboard.php'); break;
    case 'my_contents':include_once('../personal_page/my_contents.php'); break;
    case 'my_forums':include_once('../personal_page/my_forums.php'); break;
    case 'insight':include_once('../personal_page/insight.php'); break;
    case 'bookmark':include_once('../personal_page/bookmark.php'); break;
    case 'account_setting':include_once('../personal_page/account_setting.php'); break;
    default:echo $id + 'HTTP 404 not found';
}

//include_once('../account/create_account.php');
?>
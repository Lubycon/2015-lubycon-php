<?php
require_once "../../../common/Class/json_class.php";
$json_control = new json_control;
require_once "../../../common/Class/session_class.php";
$session = new Session();
if(($session->GetSessionId() == null) && $session->GetSessionName() == null){
	$LoginState = false;
}else{
	if($session->SessionExist()){
		$LoginState = true;
		$Loginuser_code= $_SESSION['lubycon_userCode'];
	}else{
		$LoginState = false;
	}
}
if(!isset($Loginuser_code)){$Loginuser_code='';} // not login stat , valuable is ''

/*
if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
	$postData = json_decode(file_get_contents("php://input"));
}else
{
	die('it is not post data error code 0000');
}

$number = $postData->bno;
$cate = (int)$postData->cate;
*/

$boardCode = $_POST['code'];
$topCateCode = $_POST['topCate'];
if( $topCateCode < 3 )
{
	$json_control->json_decode('contents_top_category',"../../../../data/top_category.json");
	$topCate_decode = $json_control->json_decode_code;

	$topCateName = $topCate_decode[$topCateCode]['name'];
}else
{
	die ('category code error 1001'); 
}

$title = $_POST['title'];
$date = date("YmdHis");
$desc = $_POST['desc'];
$thumbnail = $_POST['thumbnail'];
$downloadAble = $_POST['downloadAble'];
$midCate = $_POST['midCate'];
$tag = $_POST['tag'];
$tagQuery;
$cc = $_POST['cc'];



$cc_code = ((int)$post->cc->by.(int)$postData->cc->nc.(int)$postData->cc->nd.(int)$postData->cc->sa);
if( !$postData->cc->ccused ) // cc licence 
{
	$cc_license = 'No-Distribution';
	$cc_code = '0';
}else if($postData->cc->nd || $postData->cc->sa) // cc licence 
{
	$cc_license = 'No-Distribution';
}else if($postData->cc->nc)
{
	$cc_license = 'No-Commercial';
}else if($postData->cc->by)
{
	$cc_license = 'Free';
}
foreach($tag as $key => $value) // for tag query
{
	$tagQuery .= " tag$key = $value ";
}

include_once('../../model/contents/update_model.php');
?>
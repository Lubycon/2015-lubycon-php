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
  $total_array = array(
    'status' => array(
      'code' => '1200',
      'msg' => "nothing receive post data"
      ),
    'result' => (object)array()
  );
  $data_json = json_encode($total_array);
  die($data_json);
}

$number = $postData->bno;
$cate = (int)$postData->cate;
*/

$topCateCode = $_POST['topCate'];
if( $topCateCode < 3 )
{
	$json_control->json_decode('community_top_category',"../../../../data/top_category.json");
	$topCate_decode = $json_control->json_decode_code;

	$topCateName = $topCate_decode[$topCateCode]['name'];
}else
{
  $total_array = array(
    'status' => array(
      'code' => '1001',
      'msg' => "not allow category code"
      ),
    'result' => (object)array()
  );
  $data_json = json_encode($total_array);
  die($data_json);
}

$userCode = $_SESSION['lubycon_userCode'];
$contentTitle = $_POST['title'];
$contentDate = date("YmdHis");
$contents = htmlspecialchars($_POST['contents']);
//$userDir = "../../../../../../Lubycon_Contents/community/$topCateName/$contentDate"."_$userCode";

include_once('../../model/community/update_model.php');
?>
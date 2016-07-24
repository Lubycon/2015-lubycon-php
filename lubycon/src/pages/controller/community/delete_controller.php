<?php
//////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////            session              /////////////////////////////////////
////////////////////////////            session              /////////////////////////////////////
////////////////////////////            session              /////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
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
//////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////            session              /////////////////////////////////////
////////////////////////////            session              /////////////////////////////////////
////////////////////////////            session              /////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
if ($_SERVER['REQUEST_METHOD'] == 'POST')
    {
      $postData = json_decode(file_get_contents("php://input"));
  }else
  {
    die('it is not post data error code 0000');
}

$json_control->json_decode('community_top_category',"../../../../data/top_category.json");
$topCate_decode = $json_control->json_decode_code;


$userCode = $_SESSION['lubycon_userCode'];
$boardCode = $postData->result->boardCode;
$topCateCode = $postData->result->cate;
$topCateName = $topCate_decode[$topCateCode]['name'];

if( $_SESSION['lubycon_userCode'] === $userCode )
{
	require_once '../../model/community/delete_model.php';
}else
{
	die('error code : 300');
}



?>
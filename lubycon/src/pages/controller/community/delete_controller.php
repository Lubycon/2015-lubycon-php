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
  $total_array = array(
    'status' => array(
      'code' => '300',
      'msg' => "diffrent session user code and receive user code data"
      ),
    'result' => (object)array()
  );
  $data_json = json_encode($total_array);
  die($data_json);
}



?>
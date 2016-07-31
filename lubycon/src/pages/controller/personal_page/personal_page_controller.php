<?php
require_once "../../../common/Class/session_class.php";
$session = new Session();
if(($session->GetSessionId() == null) && $session->GetSessionName() == null){
	$LoginState = false;
}else{
	if($session->SessionExist()){
		$LoginState = true;
		$Loginuser_code= $_SESSION['lubycon_userCode'];
		$Loginuser_nick= $_SESSION['lubycon_nick'];
	}else{
		$LoginState = false;
	}
}
if(!isset($Loginuser_code)){$Loginuser_code='';} // not login stat , valuable is ''
require_once "../../../common/Class/json_class.php";
$json_control = new json_control;
$job_json = $json_control->json_decode('job',"../../../../data/job.json");
$job_decode = $json_control->json_decode_code;
$country_json = $json_control->json_decode('country',"../../../../data/country.json");
$country_decode = $json_control->json_decode_code;
/*data render setting*/

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

$usernumber = $postData->usernum;
$page_title = $postData->cate;


include '../../model/personal_page/personal_page_model.php';

/*target user data*/


$user_data = array(
	'code' => $usernumber,
	'name' =>	$userdata_row['nick'],
	'profile' => "../../../../Lubycon_Contents/user/$usernumber/profile.jpg",
	'country' => $country_decode[$userdata_row['countryCode']]['name'],
	'city' => $userdata_row['city'],
	'intro' => $userdata_row['userDescription']
);

$total_array = array(
	'pageTitle' => $page_title,
	'userData' => $user_data
);

$data_json = json_encode($total_array);
echo $data_json;
/*target user data*/


?>
<?php
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
require_once "../../../common/Class/json_class.php";
$json_control = new json_control;
$job_json = $json_control->json_decode('job',"../../../../data/job.json");
$job_decode = $json_control->json_decode_code;
$country_json = $json_control->json_decode('country',"../../../../data/country.json");
$country_decode = $json_control->json_decode_code;
/*data render setting*/

$usernumber = $_POST['usernum'];

include '../../model/personal_page/dashboard_model.php';

$user_data = array(
		'utc' => $country_decode[$userdata_row["countryCode"]]["utc"],
		'job' => $job_decode[$userdata_row['jobCode']]['name'],
		'position' => $userdata_row['company'],
		'website' => $userdata_row['web']
);

$user_language = array();
while ($row = mysqli_fetch_array($language_result)) {
	$language_name = $row['languageName'];
	$user_language[] = $language_name;
}

$user_history = array();
while ($row = mysqli_fetch_array($history_result)) {
	$historyYear = $row['historyDateYear'];
	$historyMonth = $row['historyDateMonth'];
	$historyCategory = strtolower(str_replace(' ', '_', $row['historyCategory']));
	$historyContents = $row['historyContents'];

	$user_history[] = array(
			'year' => $historyYear,
			'month' => $historyMonth,
			'category' => $historyCategory,
			'contents' => $historyContents
	);
}

$public_option = array(
		'email' => $userdata_row["emailPublic"],
		'mobile' => $userdata_row["mobilePublic"],
		'fax' => $userdata_row["faxPublic"],
		'web' => $userdata_row["webPublic"]
);
$insight_data = array(
		'total_like' => 0,
		'total_view' => 0,
		'total_upload' => 0,
		'total_download' => 0,
		'last_7days_like' => 0,
		'last_7days_view' => 0,
		'last_7days_upload' => 0,
		'last_7days_download' => 0
);
$total_array = array(
		'user_data' => $user_data,
		'user_language' => $user_language,
		'user_history' => $user_history,
		'public_option' => $public_option,
		'insight_data' => $insight_data
);

$data_json = json_encode($total_array);
echo $data_json;



//target user data
/*
$userjob = $job_json_Code[$userdata_row["jobCode"]]['name'];
$usercountry = $country_json_Code[$userdata_row["countryCode"]]['name'];
$utc = $country_json_Code[$userdata_row["countryCode"]]["utc"];
echo "<script>var UTC = $utc</script>"; //for watch

$user_position = $userdata_row["company"];
$usercity = $userdata_row["city"];
$language1 = $lang_name[0]; //not yet
$language2 = $lang_name[1]; //not yet

$total_like = 0;
$total_view = 0;
$total_up = 0;
$total_down = 0;

$username = $userdata_row["nick"];
$userWebsite = $userdata_row["web"];
$userEmail = $userdata_row["email"];

//target user data

//login user data
$usernumber = $Loginuser_code;

$localcountry = $Loginuser_country;
$localcity = $Loginuser_city;
//login user data
*/

?>
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


include '../../model/personal_page/dashboard_model.php';

$user_data = array(
		'utc' => $country_decode[$userdata_row["countryCode"]]["utc"],
		'job' => $job_decode[$userdata_row['jobCode']]['name'],
		'position' => $userdata_row['company'],
		'website' => $userdata_row['web'],
		'location' => array(
			'country' => $country_decode[$userdata_row['countryCode']]['name'],
			'city' => $userdata_row['city'],
		)
);

$user_language = array();
while ($row = mysqli_fetch_array($language_result)) {
	$name = $row['languageName'];
	$level = $row['languageLevel'];

	array_push(
		$user_language, 
		array( 
			'name' => $name, 
			'level' => $level
		) 
	);
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






/* like bookmark give and take */
$likeNumber = $likeResultFound['count'];
$viewNumber = $viewResultFound['count'];
$uploadNumber = $uploadResultFound['count'];
$downloadNumber = $downloadResultFound['count'];
/* like bookmark give and take */


$likeTimelineArray = array();
$viewTimelineArray = array();
$uploadTimelineArray = array();
$downloadTimelineArray = array();
while ($row = mysqli_fetch_array($likeTimeline)) 
{
	array_push(
		$likeTimelineArray,
		array( 
			'date' => $row['calendar_date'],
			'value' => $row['count'] == null ? 0 : $row['count']
			) 
		);
}
while ($row = mysqli_fetch_array($viewTimeline)) 
{
	array_push(
		$viewTimelineArray,
		array( 
			'date' => $row['calendar_date'],
			'value' => $row['count'] == null ? 0 : $row['count']
			) 
		);
}
while ($row = mysqli_fetch_array($uploadTimeline)) 
{
	array_push(
		$uploadTimelineArray,
		array( 
			'date' => $row['calendar_date'],
			'value' => $row['count'] == null ? 0 : $row['count']
			) 
		);
}
while ($row = mysqli_fetch_array($downloadTimeline)) 
{
	array_push(
		$downloadTimelineArray,
		array( 
			'date' => $row['calendar_date'],
			'value' => $row['count'] == null ? 0 : $row['count']
			) 
		);
}

$insight_data = array(
	'total' => array(
		'like' => $likeNumber,
		'view' => $viewNumber,
		'upload' => $uploadNumber,
		'download' => $downloadNumber
	),
	'timeline' => array(
		'like' => $likeTimelineArray,
		'view' => $viewTimelineArray,
		'upload' => $uploadTimelineArray,
		'download' => $downloadTimelineArray
	)
);




$total_array = array(
    'status' => array(
      'code' => '0000',
      'msg' => "community contents call succsess"
      ),
    'result' => (object)array(
		'userData' => $user_data,
		'userLanguage' => $user_language,
		'userHistory' => $user_history,
		'publicOption' => $public_option,
		'insightData' => $insight_data
    )
);
$data_json = json_encode($total_array);
die($data_json);
?>
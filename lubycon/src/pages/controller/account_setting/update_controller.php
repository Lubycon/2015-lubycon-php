<?php
require_once '../../../common/Class/json_class.php';
$json_control = new json_control;
$json_control->json_decode('job',"../../../../data/job.json");
$job_json = $json_control->json_decode_code;
$json_control->json_decode('country', "../../../../data/country.json");
$country_json = $json_control->json_decode_code;
    
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

$userCode = $postData->userData->code;
$job = $postData->userData->job;
$json_control->json_search($job_json,'jobCode','name',$job);
$job_code = $json_control->search_key;

$company = $postData->userData->position;

$location = $postData->userData->location;
$json_control->json_search($country_json,'countryCode','name',$location);
$location_code = $json_control->search_key;
$city = $postData->userData->city;

$user_description = isset($postData->description) ? $postData->userData->description : null;

$email_public = $postData->publicOption->email;
$mobile_number = $postData->userData->mobile;
$mobile_public = $postData->publicOption->mobile;
$fax_number = $postData->userData->fax;
$fax_public = $postData->publicOption->fax;
$website_url = $postData->userData->webSite;
$website_public = $postData->publicOption->web;

$history = $postData->userHistory;
$language = $postData->userLanguage;
// 여기서 모델로 넘어가는거, 쿼리 분할 질의 짜야함.

$history_query = 
"
INSERT INTO `lubyconuser`.`userhistory` 
(`userCode`, `historyContents`, `historyDateYear`, `historyDateMonth`, `historyCategory`) VALUES
";
for($i=0 ; $i < count($history); $i++)
{
    $history_query .= "($usercode, '$history[$i]->contents', '$history[$i]->year', '$history[$i]->month', '$history[$i]->category,";
}
$history_query = substr($history_query, 0, -1);

$language_query = 
"INSERT INTO `lubyconuser`.`UserLanguage` (`userCode`,`languageLevel`,`languageName`) VALUES 
";
for($i=0 ; $i < count($language); $i++)
{
    $language_query .= "($usercode,'$language[$i]->level','$language[$i]->name'),";
}
$language_query = substr($language_query, 0, -1);
?>
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
//print_r($postData);

$userCode = $postData->result->userData->code;
$job = $postData->result->userData->job;
$json_control->json_search($job_json,'code','name',$job);
$job_code = $json_control->search_key;

$company = $postData->result->userData->position;

$location = $postData->result->userData->country->code;
$city = $postData->result->userData->city;

$profile = $postData->result->userData->profile;
$check_profile = explode(':',$profile);
$profile_upload = false;
if( $check_profile[0] === 'data' )
{
    $profile_upload = true;
    $profile_path = "../../../../Lubycon_Contents/user/$userCode/profile.jpg";
    $profile_array = array(
        'profile' => $profile
    );
    require_once '../../../common/Class/upload_class.php';
    $uploader = new upload($_FILES,$profile_array,'profile');
    $uploader->fill_array_data(); // fill array data for validate things // preview image able , thumb image able
    $uploader->validate_extension_and_size();
    $uploader->file_upload_control();

}else
{
    $profile_path = $profile;
}
$user_description = $postData->result->userData->description;

$email_public = $postData->result->publicOption->email;
$mobile_number = $postData->result->userData->mobile;
$mobile_public = $postData->result->publicOption->mobile;
$fax_number = $postData->result->userData->fax;
$fax_public = $postData->result->publicOption->fax;
$website_url = $postData->result->userData->website;
$website_public = $postData->result->publicOption->website;

$history = $postData->result->userHistory;
$language = $postData->result->userLanguage;

$history_query = "
INSERT INTO `lubyconuser`.`userhistory` 
(`userCode`, `historyContents`, `historyDateYear`, `historyDateMonth`, `historyCategory`) VALUES
";
foreach( $history as $key => $value )
{
    //key is index value is array
    //print_r($value->category);
    $history_query .= "($userCode, '$value->contents', '$value->year', '$value->month', '$value->category'),";
}
$history_query = substr($history_query, 0, -1);

$language_query = "
INSERT INTO `lubyconuser`.`UserLanguage` (`userCode`,`languageLevel`,`languageName`) VALUES 
";
foreach( $language as $key => $value )
{
    //key is index value is array
    //print_r($value->category);
    $language_query .= "($userCode,'$value->level','$value->name'),";
}
$language_query = substr($language_query, 0, -1);

require_once '../../model/account_setting/update_model.php';
?>
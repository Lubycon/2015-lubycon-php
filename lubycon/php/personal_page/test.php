<?php
    require_once '../session/session_class.php';
    //session_start();
    $session = new Session();

    if(($session->GetSessionId() == null) && $session->GetSessionName() == null){
        $LoginState = false;
    }else{
        if($session->SessionExist()){
            $LoginState = true;
            $username= $_SESSION['lubycon_nick'];
            $userid= $_SESSION['lubycon_id'];
            $usercode= $_SESSION['lubycon_code'];
        }else{
            $LoginState = false;    
        }  
    }

    
    require_once "../class/json_class.php";


echo "<hr/><br/>";


echo "<br/><br/>-------------vali setting--------------<br/>";

$email_public = $_POST['email_public'];


if(isset($_POST['now_pass']))
{
$now_password = $_POST['now_pass'];
$change_password = $_POST['pass'];
$repeat_password = $_POST['repass'];
}

$pass_change = false;


$job = $_POST['job'];
$job_code;

$json_control = new json_control;
$json_control->json_decode('job',"../../data/job.json");
$job_json = $json_control->json_decode_code;
$json_control->json_search($job_json,'jobCode',$job);
$job_code = $json_control->search_key;

$company = $_POST['company'];


$location = $_POST['location'];
$location_code;
$json_control->json_decode('country',"../../data/country.json");
$country_json = $json_control->json_decode_code;
$json_control->json_search($country_json,'countryCode',$location);
$location_code = $json_control->search_key;

echo 'location code is = '.$location_code;
$location_text = $_POST['location_text'];

if(isset($_POST['desc']))
{
    $user_description = $_POST['desc'];
}else
{
    $user_description = null;
}


if( $_POST['history_text'][0] != '' )
{
    $history_year = $_POST['history_year'];
    $history_month = $_POST['history_month'];
    $history_kind = $_POST['history_kind'];
    $history_text = $_POST['history_text'];
}else
{
    $history_year = null;
    $history_month = null;
    $history_kind = null;
    $history_text = null;
}

if( $_POST['language'][0] != '' )
{
    $language = $_POST['language'];
    $lang_ability = $_POST['lang_ability'];
}else{
    $language = null;
    $lang_ability = null;
}



$mobile_number = $_POST['mobile_number'];
$mobile_public = $_POST['mobile_public'];
$fax_number = $_POST['fax_number'];
$fax_public = $_POST['fax_public'];
$website_url = $_POST['website_url'];
$website_public = $_POST['website_public'];


echo "<br/><br/>-------------vali setting--------------<br/>";






echo "<br/><br/>-------------basic information--------------<br/>";

echo "email public option = " . $email_public;

if( isset($_POST['now_pass']) )
{
    echo "<br/>origin password = " . $now_password; //password check
    echo "<br/>changed password = " . $change_password;
    echo "<br/>repeat password = " . $repeat_password;
    $pass_change = true;
}
echo "<br/><br/>-------------basic information--------------<br/>";

echo "<br/><br/>-------------crop thumbnail image--------------<br/>";

$upload_path= "../../../../Lubycon_Contents/temp/profile/$usercode/profile.jpg" ; // realative uploaded path
$last_path = "../../../../Lubycon_Contents/user/$usercode";
if( file_exists($upload_path) )
{
    if( is_dir($last_path) ? chmod($last_path,0777) : mkdir($last_path,0777))
    {
    $save_path= "$last_path/profile.jpg" ; // realative save path
    }
    copy($upload_path,$save_path);
    echo 'profile upload ok';
}else
{
    echo 'profile upload fails';
    $save_path= null; // realative save path
}

echo "<br/><br/>-------------crop thumbnail image--------------<br/>";

echo "<br/><br/>user job = " . $job;
echo "<br/>user job code = " . $job_code;
echo "<br/>select location = " . $location_code;
echo "<br/>city = " . $location_text;
echo "<br/>user description = " . $user_description;


if(isset($history_text[0]))
{
    for($i=0 ; $i< count($history_year); $i++)
    {
        echo "<br/><br/>history_year". $i . " = " . $history_year[$i];
        echo "<br/>history_month". $i . " = " . $history_month[$i];
        echo "<br/>history_kind". $i . " = " . $history_kind[$i];
        echo "<br/>history_text". $i . " = " . $history_text[$i];
    };
}

if( isset($lang_ability[0]) )
{
    for($i=0 ; $i< count($language); $i++)
    {
        echo "<br/><br/>language". $i . " = " . $language[$i];
        echo "<br/>lang ability". $i . " = " . $lang_ability[$i];
        //echo "<br/>lang_public". $i . " = " . $lang_public[$i];
    };
}

echo "<br/><br/>mobile number = " . $mobile_number;
echo "<br/>mobile public = " . $mobile_public;

echo "<br/><br/>fax number = " . $fax_number;
echo "<br/>fax public = " . $fax_public;

echo "<br/><br/>website url = " . $website_url;
echo "<br/>website public = " . $website_public;

require_once '../database/database_class.php';
$db = new Database();
$db->query = 
"
UPDATE `userinfo` 
SET 
`jobCode` = $job_code, 
`company` = '$company',
`profileImg` = '$save_path' ,
`userDescription` = '$user_description',
`countryCode` = '$location_code',
`city` = '$location_text',
`telNumber` = '$mobile_number',
`fax` = '$fax_number',
`web` = '$website_url',
`emailPublic` = '$email_public',
`mobilePublic` = '$mobile_public',
`faxPublic` = '$fax_public',
`webPublic` = '$website_public'

WHERE `userCode` = $usercode";
$db->askQuery(); // viewcount up
echo $db->query;

echo "<hr/><br/>";
print_r($_POST);
echo "<br/><hr/>";
?>
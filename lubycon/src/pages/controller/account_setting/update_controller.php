<?php
require_once './common/common.php';
require_once './common/Class/session_class.php';
require_once './common/Class/json_class.php';
require_once './common/Class/database_class.php';
    
$session = new Session();
$json_control = new json_control;
$db = new Database();

if(($session->GetSessionId() === null) && $session->GetSessionName() === null){
    $LoginState = false;
}
else
{
    if($session->SessionExist()){
            
        if(isset($_SESSION['lubycon_validation'])){
    
            $activity = NULL;
                
            if($_SESSION['lubycon_validation'] === "active")
                $activity = true;
            else if($_SESSION['lubycon_validation'] === "inactive")
                $activity = false;
            else
                $activity = false;

            if($activity === false)
                echo '<script>document.location.href="../../../service/view/waiting_for_resisting.php"</script>';
        }
        else{
            $session->DestroySession();
        } 

        $LoginState = true;
        $Loginuser_name = isset($_SESSION['lubycon_nick']) ? $_SESSION['lubycon_nick'] : NULL;
        $Loginuser_id= isset($_SESSION['lubycon_id']) ? $_SESSION['lubycon_id'] : NULL;
        $Loginuser_code= isset($_SESSION['lubycon_userCode']) ? $_SESSION['lubycon_userCode'] : NULL;
        $Loginuser_country = isset( $_SESSION['lubycon_countryCode'] ) ? $country_json_Code[$_SESSION['lubycon_countryCode']]['name'] : NULL;
        $Loginuser_job = isset($_SESSION['lubycon_jobCode']) ? $job_json_Code[$_SESSION['lubycon_jobCode']]['name'] : NULL;
        $Loginuser_city = isset($_SESSION['lubycon_city']) ? $_SESSION['lubycon_city'] : NULL;
            // login menu
    }else{
        $LoginState = false;    
    }
}

$email_public = $_POST['email_public'];

if(isset($_POST['now_pass'])){

    $now_password = $_POST['now_pass'];
    $change_password = $_POST['pass'];
    $repeat_password = $_POST['repass'];
}

$pass_change = false;

$job = $_POST['job'];
$job_code;

$json_control->json_decode('job',"../data/country.json");
$job_json = $json_control->json_decode_code;
$json_control->json_search($job_json,'jobCode','name',$job);
$job_code = $json_control->search_key;

$company = $_POST['company'];

$location = $_POST['location'];
$location_code;
$json_control->json_decode('country', "../data/country.json");
$country_json = $json_control->json_decode_code;
$json_control->json_search($country_json,'countryCode','name',$location);
$location_code = $json_control->search_key;
$location_text = $_POST['location_text'];

if(isset($_POST['desc']))
{
    $user_description = $_POST['desc'];
}
else
{
    $user_description = null;
}


if( $_POST['history_text'][0] != '' )
{
    $history_year = $_POST['history_year'];
    $history_month = $_POST['history_month'];
    $history_kind = $_POST['history_kind'];
    $history_text = $_POST['history_text'];
}
else
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
}
else{
    $language = null;
    $lang_ability = null;
}

$mobile_number = $_POST['mobile_number'];
$mobile_public = $_POST['mobile_public'];
$fax_number = $_POST['fax_number'];
$fax_public = $_POST['fax_public'];
$website_url = $_POST['website_url'];
$website_public = $_POST['website_public'];

if( isset($_POST['now_pass']) )
{
    $pass_change = true;
}


$db->query = 
            "
            UPDATE `userinfo` 
            SET 
            `jobCode` = $job_code, 
            `company` = '$company',
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

$db->query = 
            "
            DELETE `lubyconuser`.`userhistory` , `lubyconuser`.`userlanguage`
            FROM `lubyconuser`.`userhistory` INNER JOIN `lubyconuser`.`userlanguage`
            WHERE `lubyconuser`.`userhistory`.userCode = `lubyconuser`.`userlanguage`.userCode 
            AND `lubyconuser`.`userhistory`.userCode = $usercode
            ";

$db->askQuery(); //delete original data

$children_query = 
            "
            INSERT INTO `lubyconuser`.`userhistory` 
            (`userCode`, `historyContents`, `historyDateYear`, `historyDateMonth`, `historyCategory`) VALUES
            ";

for($i=0 ; $i < count($history_year); $i++)
{
    $children_query .= "($usercode, '$history_text[$i]', '$history_year[$i]', '$history_month[$i]', '$history_kind[$i]'),";
}

$children_query = substr($children_query, 0, -1);
$db->query = $children_query;
$db->askQuery(); // insert user history

$children_query = 
            "INSERT INTO `lubyconuser`.`UserLanguage` (`userCode`,`languageLevel`,`languageName`) 
             VALUES 
            ";

for($i=0 ; $i < count($language); $i++)
{
    $children_query .= "($usercode,'$lang_ability[$i]','$language[$i]'),";
}

$children_query = substr($children_query, 0, -1);
$db->query = $children_query;
$db->askQuery(); // insert user history


?>
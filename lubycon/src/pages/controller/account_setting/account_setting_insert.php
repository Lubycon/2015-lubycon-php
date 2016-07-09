<?php

$root_path = $_SERVER['HTTP_HOST'].'/Lubycon_Website';
$lubycon_path= $root_path.'/Lubycon_Website';

require_once '../session/session_class.php';
    
    $session = new Session();

    if(($session->GetSessionId() == null) && $session->GetSessionName() == null){
        $LoginState = false;
    }else{
        if($session->SessionExist()){
            
            if(isset($_SESSION['lubycon_validation']))
            {
                $activity = NULL;
                
                if($_SESSION['lubycon_validation'] === "active")
                    $activity = true;
                else if($_SESSION['lubycon_validation'] === "inactive")
                    $activity = false;
                else
                    $activity = false;

                if($activity === false)
                    echo '<script>document.location.href="./php/account/waiting_for_resisting.php"</script>';

            }else{
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
$json_control->json_search($job_json,'jobCode','name',$job);
$job_code = $json_control->search_key;

$company = $_POST['company'];


$location = $_POST['location'];
$location_code;
$json_control->json_decode('country',"../../data/country.json");
$country_json = $json_control->json_decode_code;
$json_control->json_search($country_json,'countryCode','name',$location);
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


echo '<hr>';

require_once '../database/database_class.php';
$db = new Database();
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
echo '<br/>update query = '.$db->query;

$db->query = 
"
DELETE `lubyconuser`.`userhistory` , `lubyconuser`.`userlanguage`
FROM `lubyconuser`.`userhistory` INNER JOIN `lubyconuser`.`userlanguage`
WHERE `lubyconuser`.`userhistory`.userCode = `lubyconuser`.`userlanguage`.userCode 
AND `lubyconuser`.`userhistory`.userCode = $usercode
";
$db->askQuery(); //delete original data
echo '<br/>'.$db->database->error;


$children_query = 
"
INSERT INTO `lubyconuser`.`userhistory` 
(`userCode`, `historyContents`, `historyDateYear`, `historyDateMonth`, `historyCategory`) VALUES
";
for($i=0 ; $i < count($history_year); $i++)
{
    $children_query .= "($usercode, '$history_text[$i]', '$history_year[$i]', '$history_month[$i]', '$history_kind[$i]'),";
};
$children_query = substr($children_query, 0, -1);
$db->query = $children_query;
$db->askQuery(); // insert user history

echo '<br/>'.$db->database->error;

$children_query = "INSERT INTO `lubyconuser`.`UserLanguage` (`userCode`,`languageLevel`,`languageName`) VALUES ";
for($i=0 ; $i < count($language); $i++)
{
    $children_query .= "($usercode,'$lang_ability[$i]','$language[$i]'),";
}
$children_query = substr($children_query, 0, -1);
$db->query = $children_query;
$db->askQuery(); // insert user history

echo '<br/>'.$db->database->error;
//echo "<hr/><br/>";
//print_r($_POST);
//echo "<br/><hr/>";
?>
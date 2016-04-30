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


print_r($_SESSION);

echo "<hr/><br/>";

echo "<br/><br/>-------------basic information--------------<br/>";
echo "email public option = " . $_POST['email_public'];

if( isset($_POST['now_pass']) )
{
echo "<br/>origin password = " . $_POST['now_pass'];
echo "<br/>changed password = " . $_POST['pass'];
echo "<br/>repeat password = " . $_POST['repass'];
}
echo "<br/><br/>-------------basic information--------------<br/>";

echo "<br/><br/>-------------crop thumbnail image--------------<br/>";
$upload_path= "../../../../Lubycon_Contents/temp/profile/$usercode/profile.jpg" ; // realative uploaded path
$save_path= "../../../../Lubycon_Contents/user/$usercode/profile.jpg" ; // realative save path

require_once "../class/upload_class.php";
$uploader = new upload;
$uploader->ajax_move($files , $upload_path , $save_path);
echo "<br/><br/>-------------crop thumbnail image--------------<br/>";

echo "<br/><br/>user job = " . $_POST['job'];
echo "<br/>select location = " . $_POST['location'];
echo "<br/>type location = " . $_POST['location_text'];
echo "<br/>type location = " . $_POST['desc'];

$history_year = $_POST['history_year'];
$history_month = $_POST['history_month'];
$history_kind = $_POST['history_kind'];
$history_text = $_POST['history_text'];
for($i=0 ; $i< count($history_year); $i++)
{
    echo "<br/><br/>history_year". $i . " = " . $history_year[$i];
    echo "<br/>history_month". $i . " = " . $history_month[$i];
    echo "<br/>history_kind". $i . " = " . $history_kind[$i];
    echo "<br/>history_text". $i . " = " . $history_text[$i];
};

$language = $_POST['language'];
$lang_ability = $_POST['lang_ability'];
//$lang_public = $_POST['lang_public'];
for($i=0 ; $i< count($language); $i++)
{
    echo "<br/><br/>language". $i . " = " . $language[$i];
    echo "<br/>lang ability". $i . " = " . $lang_ability[$i];
    //echo "<br/>lang_public". $i . " = " . $lang_public[$i];
};

echo "<br/><br/>mobile number = " . $_POST['mobile_number'];
echo "<br/>mobile public = " . $_POST['mobile_public'];

echo "<br/><br/>fax number = " . $_POST['fax_number'];
echo "<br/>fax public = " . $_POST['fax_public'];

echo "<br/><br/>website url = " . $_POST['website_url'];
echo "<br/>website public = " . $_POST['website_public'];

echo "<hr/><br/>";
print_r($_POST);
echo "<br/><hr/>";
?>
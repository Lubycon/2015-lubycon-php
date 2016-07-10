<?php
// session
require_once './common/Class/session_class.php';
$session = new Session();
require_once "./common/Class/json_class.php";
$json_control = new json_control;
$json_control->json_decode('top_category',"../data/top_category.json");
require_once "./common/Class/upload_class.php";
$uploader = new upload($_FILES,$_POST,'editor');
include_once './common/Class/database_class.php';
$db = new Database();


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
            // login menu
        }else{
            $LoginState = false;    
        }
    }
// session

// variable
// variable

$uploader->fill_array_data(); // fill array data for validate things // preview image able , thumb image able
$uploader->validate_extension_and_size();
$uploader->file_upload_control();
$uploader->html_image_path(); //only 2d editor . modified html src
if($uploader->downable){$uploader->zip_attach('attach');} // if user didn't upload attach files and zip attach option is saved folder name

$topCate_json_Code = $json_control->json_decode_code;
$json_control->json_search($topCate_json_Code,'topCateCode','name',$uploader->top_category);
$topCate_code = $json_control->search_key; // search top category name to index form json files


$query = 
"INSERT INTO `lubyconboard`.`$uploader->top_category` 
(`userCode`, `topCategoryCode`, `contentTitle`, `contentDate`, `contentDescription`, `contents`, `userDirectory`, `ccCode`, `ccLicense`, `downloadAble`) VALUES 
('$Loginuser_code', '$topCate_code', '$uploader->subject', '$uploader->upload_date', '$uploader->desc', '$uploader->contentHTML', '$uploader->upload_path', '$uploader->cc_code', '$uploader->cc_license', '$uploader->downable')";

//echo $query;
$db->query = $query;
$db->askQuery(); //insert contents data

$query = "SELECT `boardCode` FROM `lubyconboard`.`$uploader->top_category` WHERE `userCode` = '$Loginuser_code' ORDER BY `boardCode` DESC limit 0,1";
$db->query = $query;
$db->askQuery(); //insert contents data
$select_row = mysqli_fetch_row($db->result); // inserted boardCode
$seleced_userCode = $select_row[0];
$query = 
"INSERT INTO `lubyconboard`.`$uploader->top_category"."midcategory` 
(`boardCode`, `midCategoryCode0`, `midCategoryCode1`) VALUES "; 

$query = 
    "
    INSERT INTO `lubyconboard`.`$uploader->top_category"."midcategory` 
    (`boardCode` $uploader->mid_category_key) VALUES 
    ('$seleced_userCode' $uploader->mid_category_value);
    ";
$db->query = $query;
//echo $query;
$db->askQuery(); //insert contents data

$query = 
    "
    INSERT INTO `lubyconboard`.`$uploader->top_category"."tag` 
    (`boardCode` $uploader->tag_key) VALUES 
    ('$seleced_userCode' $uploader->tag_value);
    ";
//echo $query;
$db->query = $query;
$db->askQuery(); //insert contents data

?>
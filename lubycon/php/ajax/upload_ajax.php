<?php
// session

require_once '../session/session_class.php';
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
// session

// variable
// variable

require_once "../class/upload_class.php";
$uploader = new upload($_FILES,$_POST);
$uploader->fill_array_data(); // fill array data for validate things // preview image able , thumb image able
$uploader->validate_extension_and_size();
$uploader->file_upload_control();
$uploader->html_image_path($uploader->contentHTML); //only 2d editor
$uploader->zip_attach('attach'); // folder name

$twod_query = "INSERT INTO `lubyconboard`.`$uploader->top_category` 
(`boardCode`, `userCode`, `title`, `date`, `description`, `contents`, `imgDirectory`, `downDirectory`, `downloadPermission`, `downloadCount`, `viewCount`, `likeCount`, `preview`, `CategoryCode`) 
VALUES 
(null,'$usercode','$uploader->subject','$uploader->upload_date','$uploader->desc','$uploader->contentHTML',null,null,1111111,0,0,0,'','')";

//echo $twod_query;

include_once '../class/database_class.php';
$db = new Database();
$db->query = $twod_query;
$db->askQuery();

?>
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
$uploader->zip_attach('attach'); // folder name

?>
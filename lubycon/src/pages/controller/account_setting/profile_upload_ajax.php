<?php
/*

dont use anymore

require_once './common/Class/session_class.php';
require_once './common/Class/json_class.php';
$db->query = 
require_once './common/Class/upload_class.php';
include_once './common/Class/database_class.php';

$db = new Database();
$session = new Session();
$uploader = new upload($_FILES,$_POST,'profile');

$uploader->fill_array_data(); // fill array data for validate things // preview image able , thumb image able
$uploader->validate_extension_and_size();
$uploader->file_upload_control();

            "UPDATE `lubyconuser`.`userinfo` 
             SET `profileImg` = '$uploader->last_path' 
             WHERE `userinfo`.`userCode` = '$Loginuser_code' 
            ";
$db->askQuery();
*/
?>
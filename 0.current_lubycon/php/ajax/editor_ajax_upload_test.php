<?php
    $base64_string = $_POST['data'];
    $temp_path = '../../../../Lubycon_Contents/contents/temp/'; //temp path
    $user_name = 'daniel_zepp'; //from db
    $upload_path = $temp_path.$user_name.'/'; // setting upload path after temp
    $file_name = 'thumb.jpg'; //file name

    $limit_size = 100*1024; // kb

    require_once "../class/ajax_upload_class.php";
    
    $ajax_uploader = new ajax_upload($base64_string);
    $ajax_uploader->base64_convert_image($limit_size , $upload_path , $file_name);
?>
<?php
    $post_data = $_POST;
    $post_type = $_POST['type'];
    $post_data64 = $_POST['data64'];

    require_once "../class/upload_class.php";
    
    $uploader = new upload;
    $uploader->ajax_check_type($post_type);
    $uploader->ajax_validate_ext($post_data64);
    $uploader->ajax_validate_size($post_data64);
    $uploader->ajax_saveto_temp($post_data64)
?>
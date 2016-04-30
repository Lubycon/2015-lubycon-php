<?php
    $post_data = $_POST['ajax_data'];

    require_once "../class/upload_class.php";

    $uploader = new upload;
    $uploader->ajax_check_type($post_data);
    $uploader->ajax_validate_ext($post_data , 'img');
    $uploader->ajax_validate_size($post_data , 10000);
    $uploader->ajax_saveto_temp($post_data);

    //echo 'done';
?>
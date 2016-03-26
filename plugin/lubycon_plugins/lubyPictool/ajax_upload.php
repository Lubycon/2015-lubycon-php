<?php

    //임시 ajax임. 보안 강화된 업로더는 웹 클래스에서 적용시킬것


    $base64_string = $_POST['data'];
    $temp_path = './temp/';
    $user_name = 'daniel_zepp'; //from db
    $upload_path = $temp_path.$user_name.'/';
    $file_name = 'thumb.jpg';

	$img = str_replace('data:image/jpeg;base64,', '', $base64_string);
	$img = str_replace(' ', '+', $img);
	$img_data = base64_decode($img);

    $data = explode(',', $base64_string);
    $string_length = strlen($base64_string);

    $limit_size = 100 * 1024; // kb

    if( $data[0] !== 'data:image/jpeg;base64')
    {
        echo 'it is not image file';
    }else if ( $string_length  >= $limit_size )
    {
        echo 'file size over limit';
    }else if ( is_dir($upload_path) ? chmod($upload_path,0777) : mkdir($upload_path,0777) )
    {
        echo 'done';
        file_put_contents($upload_path.$file_name, $img_data);
    }


?>
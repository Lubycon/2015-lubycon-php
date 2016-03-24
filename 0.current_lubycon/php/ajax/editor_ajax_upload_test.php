<?php
    $base64_string = $_POST['data'];
    $output_file = '../../../../Lubycon_Contents/contents/temp/';
    $user_name = 'daniel_zepp'; //from db
    $file_name = 'thumb';
    $data = explode(',', $base64_string);

    echo $base64_string;


    if( $data[0] !== 'data:image/jpeg;base64')
    {
        echo 'it is not image file';
    }else
    {
        echo( getimagesizefromstring($base64_string));
    }


    //base64_to_jpeg($base64_string, $output_file);

    function base64_to_jpeg($base64_string, $output_file) 
    {
    $ifp = fopen($output_file, "wb"); 

    $data = explode(',', $base64_string);

    fwrite($ifp, base64_decode($data[1])); 
    fclose($ifp); 

    return $output_file; 
    }

?>
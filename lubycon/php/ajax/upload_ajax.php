<?php

require_once "../class/upload_class.php";
$uploader = new upload($_FILES,$_POST);

print_r($uploader->_upload_post_thumbnail);

/*
$file_array = []; //for upload attachfiles
$img_array = []; //for upload images
$img_name_array = []; //for html src set
$down_able = true;

foreach( $_FILES as $key => $value )
{
    $key_explode = explode('_',$key); //devide array name
    if( $key_explode[0] == 'image' ) //if image files
    {
        array_push($img_array,$_FILES[$key]);
        $img_name_array[$key_explode[1]] = $_FILES[$key]['name']; //for src fill names
    }else if( $key_explode[0] == 'file' && $down_able ) //if attached files
    {
        array_push($file_array,$_FILES[$key]);
    }
}

$i = 0;
foreach( $_POST as $key => $value ) 
{
    $key_explode = explode('_',$key); //devide array name
    if( $key_explode[0] == 'image' ) //if image files
    {
        $base64_array = array 
        (
            'name' => "grid_$i.jpg",
            'data' => $value
        );
        array_push($img_array,$base64_array);
        $img_name_array[$key_explode[1]] = 'grid_'.$i.'.jpg'; //for src fill names
        $i++;
    }
}


foreach( $img_array as $key => $value )
{
    //print_r( $img_array[$key]);

    if( isset($img_array[$key]['tmp_name']) )
    {
        echo 'file upload data';
    }else if( isset($img_array[$key]['data']) )
    {
        echo 'base64 file';
    }
}



//print_r($file_array);
//print_r($_POST['thumbnail']);
//print_r($img_array);
//print_r($img_name_array);
//print_R( $_FILES );
//print_r( $_POST );
*/
?>
<?php

require_once "../../../php/class/json_class.php";
$json_control = new json_control;
$json_control->json_decode('country',"../../../data/country.json");
$country_decode = $json_control->json_decode_code;

//print_R( $country_decode);

foreach( $country_decode as $index=>$value )
{
    $file_rename = str_replace(" ", "-", $value);


    if( file_exists($file_rename.'.png') )
    {
        //echo $file_rename.'.png <br/>';
        copy( $file_rename.'.png' , "$index.png" );
        unlink( $file_rename.'.png');
    }else
    {
        echo $index.' '.$file_rename.'<br/>';
    }
}

?>
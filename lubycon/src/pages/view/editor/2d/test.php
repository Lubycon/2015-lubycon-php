<?php
    //$attectced = $_POST['fileUploader'];
    
    print_r($_FILES);






    /*

    echo "<hr/>-------------zip file upload--------------<hr/><br/>";
    $set_date = date("YmdHis");
    $con_cate = $_POST['contents_cate_name'];
    $user_name = 'daniel_zepp'; // from db
    $files = $_FILES['upload_file']; // input name
    $upload_path= '../../../../Lubycon_Contents/contents/' . $con_cate . '/' . $user_name . $set_date . '/' ; // realative uploaded path
    $whitelist = 'media'; //you cans choice 'media','txt','img','zip' ,'all' all is so dangurus
    $limit_size = 3 * 1024 * 1024; // byte
    $fileupload_zip_compress = true;
    /*
        if you want modified limite size, change in this php '$limit_size' in editor.js '$size_setting' and in server side php.ini setting
    */


    /*

    require_once "../class/upload_class.php";
    $uploader = new upload;
    $uploader->validate_size($files,$limit_size); // files , admin setting limit size
    $uploader->validate_ext($files,$whitelist); // files , admin setting suppot ext
    $uploader->file_move($files,$upload_path,$fileupload_zip_compress); // files , admin setting zip compress , save path
    $uploader->zipfile($files,$fileupload_zip_compress,$upload_path,$upload_path.$user_name.'_luby.zip'); // // files , admin setting zip compress , save path , save file name

    echo "<hr/><br/>-------------zip file upload--------------<hr/>";

    echo "<br/><br/>-------------crop thumbnail image--------------<br/>";

    $croppic_url = $_POST['croppicurl']; // temp file
    $croppic_zip_compress = false;
    $uploader->file_move($croppic_url,$upload_path,$croppic_zip_compress);


    echo "<br/><br/>-------------crop thumbnail image--------------<br/>";

    
    echo "<br/><br/>-------------contents image--------------<br/>";
    
    $conimg_url = $_POST['contents_image']; // temp file
    $conimg_zip_compress = false;
    $uploader->file_move($conimg_url,$upload_path,$conimg_zip_compress);


    echo "<br/><br/>-------------contents image--------------<br/>";


    
    echo "<br/>-------------contents subject name--------------<br/><br/>";

    echo "contents_subject = " . $_POST['contents_subject'];
    
    echo "<br/><br/>-------------contents subject name--------------<br/>";

    /*if($con_article)
    {
        for($k=0 ; $k< count($con_article); $k++)
        {
            echo "<br/>contents article".$k."=";
            echo $con_article[$k];
        };
    };*/
    
    // it's for multiple select box
    /*
    $sel_cate = $_POST['user_selected_category'];
    $sel_tag = $_POST['user_selected_tag'];

    echo "<br/><br/>-------------user seleced categories--------------<br/>";
    if($sel_cate) 
    {
        echo "<br/>user selectd categories = ";
        for($i=0 ; $i< count($sel_cate); $i++)
        {
            echo $sel_cate[$i] . " ";
        };
    };
    echo "<br/><br/>-------------user seleced categories--------------<br/>";

    echo "<br/><br/>-------------user seleced tags--------------<br/>";
    if($sel_tag)
    {
        echo "<br/>user selectd tags = ";
        for($j=0 ; $j< count($sel_tag); $j++)
        {
            echo $sel_tag[$j] . " ";
        };
    };
    
    echo "<br/><br/>-------------user seleced tags--------------<br/>";
    
    echo "<br/><br/>-------------contents description--------------<br/>";

    echo "<br/>setting_desc = " . $_POST['setting_desc'];

    echo "<br/><br/>-------------contents description--------------<br/>";

    echo "<br/>-------------text editor html--------------<br/><br/>";
    
    echo htmlspecialchars($_POST['text_editor']);
    
    echo "<br/><br/>-------------text editor html--------------<br/>";
    */
    
    echo "<br/><br/>-------------post data--------------<br/>";
    print_r($_POST);
?>

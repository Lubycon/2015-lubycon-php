<?php
    echo "<hr/>-------------zip file upload--------------<hr/><br/>";
    $set_date = date("YmdHis");
    $con_cate = 'artwork';
    $user_name = 'daniel_zepp'; // from db

    $files = $_FILES['upload_file']; // input name
    
    $upload_path= '../../../../Lubycon_Contents/contents/' . $con_cate . '/' . $user_name . $set_date . '/' ; // uploaded path
    $whitelist = 'media'; //you cans choice 'media','txt','img','zip' ,'all' 
    $limit_size = 3 * 1024 * 1024; // byte

    $zip_compress = true;

    /*
        if you want modified limite size, change in this php '$limit_size' in editor.js '$size_setting' and in server side php.ini setting
    */
    require_once "../class/upload_class.php";
    $uploader = new upload;
    $uploader->validate_size($files,$limit_size);
    $uploader->validate_ext($files,$whitelist);
    $uploader->filemovetotemp($files,$zip_compress,$upload_path);
    $uploader->finalsave($files,$zip_compress,$upload_path,$upload_path.$user_name.'_luby.zip');

    echo "<hr/><br/>-------------zip file upload--------------<hr/>";

    echo "<br/><br/>-------------crop thumbnail image--------------<br/>";

    $oldfile = $_POST['croppicurl']; // temp file
    $newfile = $upload_dir.'profile.jpg'; // copyed file

    if(file_exists($oldfile)) {
        if(!copy($oldfile, $newfile)) {
            echo "file";
        } else if(file_exists($newfile)) {
            echo '<br/>' . $newfile . "<br/>"; //uploaded file path
        }
    }


    echo "<br/><br/>-------------crop thumbnail image--------------<br/>";

    
    echo "<br/><br/>-------------contents image--------------<br/>";
    $contens_image = $_POST['contents_image'];
    $contens_image_temp_url = '../../../../Lubycon_Contents/contents/temp/';
    if($contens_image) 
    {
        echo "<br/>user upload image = <br/>";
        for($i=0 ; $i< count($contens_image); $i++)
        {
             $oldfile = $contens_image_temp_url.$contens_image[$i]; // temp file
             $newfile = $upload_dir.$contens_image[$i]; // copyed file

             if(file_exists($oldfile)) {
                  if(!copy($oldfile, $newfile)) {
                        echo "file";
                  } else if(file_exists($newfile)) {
                        echo $upload_dir.$contens_image[$i] . "<br/>"; //uploaded file path
                  }
             } 
        };
    };
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

    print_r($_POST);
?>

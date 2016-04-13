<?php
    //echo "<hr/>-------------zip file upload--------------<hr/><br/>";
    $set_date = date("YmdHis");
    $con_cate = 'artwork';
    $user_name = 'daniel_zepp'; // from db
    $big_cate = 'contents';
    //$files = $_FILES['upload_file']; // input name
    $upload_path= '../../../../Lubycon_Contents/'.$big_cate.'/' . $con_cate . '/' . $user_name . $set_date . '/' ; // realative uploaded path
    $whitelist = 'media'; //you cans choice 'media','txt','img','zip' ,'all' all is so dangurus
    $limit_size = 3 * 1024 * 1024; // byte
    $fileupload_zip_compress = true;

    /*
        if you want modified limite size, change in this php '$limit_size' in editor.js '$size_setting' and in server side php.ini setting
    */

    require_once "../class/upload_class.php";
    $uploader = new upload;
    //$uploader->validate_size($files,$limit_size); // files , admin setting limit size
    //$uploader->validate_ext($files,$whitelist); // files , admin setting suppot ext
    //$uploader->file_move($files,$upload_path,$fileupload_zip_compress); // files , admin setting zip compress , save path
    //$uploader->zipfile($files,$fileupload_zip_compress,$upload_path,$upload_path.$user_name.'_luby.zip'); // // files , admin setting zip compress , save path , save file name

    //echo "<hr/><br/>-------------zip file upload--------------<hr/>";

    echo "<br/><br/>-------------contents image--------------<br/>";
    
    
    $image_array = $_POST['content_img'];
    $image_json = json_decode($image_array,true);
    $editor_contents_temp_path = 'editor/contents/'.$user_name.'/';

    //$uploader->ajax_move($image_json , $editor_contents_temp_path ,$upload_path); //contents image upload move

    echo "<br/><br/>-------------contents image--------------<br/>";
    

    echo "<br/><br/>-------------crop thumbnail image--------------<br/>";

    $thumb_array[] = array('contentID' => 'thumb', 'ext' => 'jpg');
    $editor_thumb_temp_path = 'editor/thumb/'.$user_name.'/';

    //$uploader->ajax_move($thumb_array , $editor_thumb_temp_path ,$upload_path); //contents thumb upload move

    echo "<br/><br/>-------------crop thumbnail image--------------<br/>";

    
    echo "<br/>-------------contents html data-------------<br/><br/>";
    $html_post = $_POST['content_html'];
    $html_data = htmlspecialchars($html_post); // save db content html
    echo "<br/>-------------contents html data--------------<br/><br/>";

    
    echo "<br/>-------------contents subject name--------------<br/><br/>";

    echo "contents_subject = " . $_POST['content-name'];
    
    echo "<br/><br/>-------------contents subject name--------------<br/>";


    require_once '../database/database_class.php';
    require_once "../class/regex_class.php";
    $db = new Database();

    switch($_POST['contents_cate']){
    case 'artwork' : $contents_cate = 1; break;
    case 'vector' : $contents_cate = 2;  break;
    case '3d' : $contents_cate = 3;  break;
    default : $contents_cate = die('no category');  break;
    };
    
    $db->query = "insert into luby_artwork(board_code,contents_date,user_code,contents_code,board_title,board_desc,board_contents,board_down_public,board_down_count,board_view_count,board_like_count,board_preview)values('','".$set_date."', '".$contents_cate."', 'artwork', '".$_POST['content-name']."', '".$_POST['contenst_description']."', '".$html_data."','','','','','')";
	$db->askQuery();
    echo '1';

    ///*if($con_article)
    //{
    //    for($k=0 ; $k< count($con_article); $k++)
    //    {
    //        echo "<br/>contents article".$k."=";
    //        echo $con_article[$k];
    //    };
    //};*/
    
    //// it's for multiple select box

    //$sel_cate = $_POST['user_selected_category'];
    //$sel_tag = $_POST['user_selected_tag'];

    //echo "<br/><br/>-------------user seleced categories--------------<br/>";
    //if($sel_cate) 
    //{
    //    echo "<br/>user selectd categories = ";
    //    for($i=0 ; $i< count($sel_cate); $i++)
    //    {
    //        echo $sel_cate[$i] . " ";
    //    };
    //};
    //echo "<br/><br/>-------------user seleced categories--------------<br/>";

    //echo "<br/><br/>-------------user seleced tags--------------<br/>";
    //if($sel_tag)
    //{
    //    echo "<br/>user selectd tags = ";
    //    for($j=0 ; $j< count($sel_tag); $j++)
    //    {
    //        echo $sel_tag[$j] . " ";
    //    };
    //};
    
    //echo "<br/><br/>-------------user seleced tags--------------<br/>";
    
    //echo "<br/><br/>-------------contents description--------------<br/>";

    //echo "<br/>setting_desc = " . $_POST['setting_desc'];

    //echo "<br/><br/>-------------contents description--------------<br/>";

    echo "<hr><hr><hr><hr>";
    print_r($_POST);
?>

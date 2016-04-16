<?php
    require_once '../database/database_class.php';
    require_once "../class/regex_class.php";
    $db = new Database();


    switch($_POST['contents_cate']){
    case 'forum' : $contents_cate = 1; break;
    case 'tutorial' : $contents_cate = 2;  break;
    case 'qna' : $contents_cate = 3;  break;
    default : $contents_cate = die('no category');  break;
    };


    $db->query = "insert into luby_board(board_code,user_code,contents_code,board_title,board_desc,board_contents,board_down_public,board_down_count,board_view_count,board_like_count,board_preview)values('', '".$_POST['userid']."', '".$contents_cate."', '".$_POST['contents_subject']."', '', '".htmlspecialchars($_POST['text_editor'])."','','','','','')";
	$db->askQuery();


    //echo "<br/><br/>-------------contents image--------------<br/>";
    //$contens_image = $_POST['contents_image'];
    //if($contens_image) 
    //{
    //    echo "<br/>user upload image = <br/>";
    //    for($i=0 ; $i< count($contens_image); $i++)
    //    {
    //        echo "../contents_data/temp/".$contens_image[$i] . "<br/>";
    //    };
    //};
    //echo "<br/><br/>-------------contents image--------------<br/>";

    


    //echo "<br/><br/>-------------user upload file--------------<br/>";

    //$uploaddir = '../../../contents_data/temp/';
    //$uploadfile = $uploaddir . basename($_FILES['user_upload_file']['name']);

    //echo '<pre>';
    //if (move_uploaded_file($_FILES['user_upload_file']['tmp_name'], $uploadfile)) {
    //    echo "user upload file = ".$uploadfile;
    //} else {
    //    print "faild";
    //}

    //echo "<br/><br/>-------------user upload file--------------<br/>";



    print_r($_POST);
?>

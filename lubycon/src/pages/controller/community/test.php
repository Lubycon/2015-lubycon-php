<?php
    require_once '../database/database_class.php';
    require_once "../class/regex_class.php";
    $db = new Database();


    switch($_POST['contents_cate'])
    {
        case 'forum' : 
            $contents_cate = 1; 
            break;
        
        case 'tutorial' : 
            $contents_cate = 2;  
            break;
        
        case 'qaa' : 
            $contents_cate = 3;  
            break;
        default : 
            $contents_cate = die('no category');  
            break;
    };


    $db->query = 
                " INSERT INTO luby_board(board_code,user_code,contents_code,board_title,board_desc,board_contents,board_down_public,board_down_count,board_view_count,board_like_count,board_preview)
                  VALUES('', '".$_POST['userid']."', '".$contents_cate."', '".$_POST['contents_subject']."', '', '".htmlspecialchars($_POST['text_editor'])."','','','','','')
                ";

	$db->askQuery();

    echo "<script>location.href='../../../service/view/successUploadForum.php';</script>";
?>

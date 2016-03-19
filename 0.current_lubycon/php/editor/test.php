<?php
    echo "<br/>-------------zip file upload--------------<br/><br/>";
    $set_date = date("YmdHis");
    $con_cate = $_POST['contents_cate_name'];
    $user_name = 'daniel_zepp';
    
    $upload_dir= '../../../../Lubycon_Contents/contents/' . $con_cate . '/' . $user_name . $set_date . '/' ;
    $whitelist = array('jpg','jpeg','png','psd','gif','bmp','pdd','tif','raw','ai','esp','svg','svgz','iff','fpx','frm','pcx','pct','pic','pxr','sct','tga','vda','icb','vst','alz','zip','rar','jar','7z','hwp','txt','doc','xls','xlsx','docx','pptx','pdf','ppt','me');  
    $limit_size = 3 * 1024 * 1024; // byte

    /*
        if you want modified limite size, change in this php '$limit_size' in editor.js '$size_setting' and in server side php.ini setting
    */

    if(1) //서브밋한거라면
    {
        for($i=0; $i<count($_FILES['upload_file']['name']); $i++) 
        {
            $filename = $_FILES['upload_file']['name'][$i]; // 오리지날 파일이름
            $ext = substr(strrchr($filename, '.'), 1); // 확장자 추출
            if ( !in_array($ext, $whitelist) )  // 확장자 검사
            {
                echo $filename.' not allow<br/>';
                return false;
            }
            $filesize_array[$i] = $_FILES['upload_file']['size'][$i]; // 각 파일사이즈 크기 배열에 푸시
        }
        if( !array_sum($filesize_array) >= $limit_size ) // 파일크기 검사
        {
            echo array_sum($filesize_array) . 'beyond limite size';
            return false;
        }
        else
        {
            if( mkdir( $upload_dir , 0777) ) // 디렉토리 생성
            {
                foreach ($_FILES["upload_file"]["error"] as $key => $error)  // 파일 갯수만큼 foreach 하며 에러 상태메세지 
                {
                    if ($error == UPLOAD_ERR_OK) //이상없다면
                    {
                        $tmp_name = $_FILES["upload_file"]["tmp_name"][$key];
                        $name = $_FILES["upload_file"]["name"][$key];
                        move_uploaded_file($tmp_name, "temp/$name"); // 파일 이동
                        $filepath_array[$key] = "temp/$name"; // 최종 업로드된 경로
                    }
                }
            }
        }
    }

    require_once "../class/zipfile.php"; // 클래스파일 리콰이어
    $zipper = new Zipper; //지퍼생성
    $zipper->add($filepath_array); //파일추가
    $zipper->store($upload_dir.$user_name.'_luby.zip'); //저장될 zip파일 경로
    echo $upload_dir.$user_name.'_luby.zip';

    foreach ($_FILES["upload_file"]["error"] as $key => $error)  // 파일 갯수만큼 foreach 하며 에러 상태메세지 
    {
        unlink( $filepath_array[$key] ); //임시파일 제거
    }

    echo "<br/><br/>-------------zip file upload--------------<br/>";

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

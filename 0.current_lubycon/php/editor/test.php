<?php
    echo "<br/>-------------zip file upload--------------<br/><br/>";
    $set_date = date("YmdHis");
    $con_cate = $_POST['contents_cate_name'];
    $user_name = 'daniel_zepp';
    $uploaddir = '../../../../Lubycon_Contents/contents/' . $con_cate . "/" . $user_name . $set_date . "/" ;
    $upload_basename = basename($_FILES['upload_file']['name']);
    $uploadfile = $uploaddir . $upload_basename;

    // 데이터베이스에 입력하기 위한 기본 변수

    // about zip file
    $zip_name;
    $zip_category;
    $zip_date;
    $zip_path;

    // about contents_image
    $contents_image_path;

    // category
    $contents_tag;
    $contents_category

    if( mkdir($uploaddir,0777) )
    {
        //echo "directory is making<br/>";
        if (move_uploaded_file($_FILES['upload_file']['tmp_name'], $uploadfile)) 
        {
            // allocate variable
            $zip_name = $upload_basename;
            $zip_category = $con_cate;
            $zip_date = $set_date;
            $zip_path = "localhost/contensts_data/".$con_cate."/".$set_date."/".$upload_basename;
            
            //echo "zip file upload succece<br/>";              // 알집파일<첨부파일 관련>
            echo "file name : " . $upload_basename . "<br/>"; // 파일 이름
            echo "contents category : " . $con_cate . "<br/>"; // 콘텐츠 디렉토리
            echo "upload date : " . $set_date . " (year-month-day-hour-minite-second)<br/>";// 올린날짜
            echo "upload path : localhost/contensts_data/". $con_cate . "/" . $set_date . "/" . $upload_basename;// 업로드 경로 upload_basename;
        } else {
            print "zip file upload failed<br/>";
        }
    }else
    {
        echo "make directory fail";
    };
    echo "<br/><br/>-------------zip file upload--------------<br/>";

    echo "<br/><br/>-------------crop thumbnail image--------------<br/>";

    $oldfile = $_POST['croppicurl']; // temp file
    $newfile = $uploaddir.'profile.jpg'; // copyed file

    if(file_exists($oldfile)) {
        if(!copy($oldfile, $newfile)) {
            echo "file";
        } else if(file_exists($newfile)) {
            echo $newfile . "<br/>";
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
             $newfile = $uploaddir.$contens_image[$i]; // copyed file

             if(file_exists($oldfile)) {
                  if(!copy($oldfile, $newfile)) {
                        echo "file";
                  } else if(file_exists($newfile)) {
                        $contents_image_path = $uploaddir.$contens_image[$i];
                        echo $uploaddir.$contens_image[$i] . "<br/>"; // 컨텐츠 이미지 디렉토리
                  }
             } 
        };
    };
    echo "<br/><br/>-------------contents image--------------<br/>";


    
    echo "<br/>-------------contents subject name--------------<br/><br/>";

    echo "contents_subject = " . $_POST['contents_subject'];리 // 집파일 이
    
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
    //
    echo "<br/><br/>-------------user seleced categories--------------<br/>";
    if($sel_cate) 
    {
        echo "<br/>user selectd categories = ";
        for($i=0 ; $i< count($sel_cate); $i++)
        {
            echo $sel_cate[$i] . " ";// 유저 셀렉트 카테고리
        };
    };
    echo "<br/><br/>-------------user seleced categories--------------<br/>";

    echo "<br/><br/>-------------user seleced tags--------------<br/>";
    if($sel_tag)
    {
        echo "<br/>user selectd tags = ";
        for($j=0 ; $j< count($sel_tag); $j++)
        {
            echo $sel_tag[$j] . " "; // 유저 입력 태그
        };
    };
    
    echo "<br/><br/>-------------user seleced tags--------------<br/>";
    
    echo "<br/><br/>-------------contents description--------------<br/>";

    echo "<br/>setting_desc = " . $_POST['setting_desc'];

    echo "<br/><br/>-------------contents description--------------<br/>";

    echo "<br/>-------------text editor html--------------<br/><br/>";
    
    echo htmlspecialchars($_POST['text_editor']); // html내용
    
    echo "<br/><br/>-------------text editor html--------------<br/>";

    print_r($_POST);
?>

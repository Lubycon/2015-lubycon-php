<?php
    echo "<br/><br/>-------------contents image--------------<br/>";
    $contens_image = $_POST['contents_image'];
    if($contens_image) 
    {
        echo "<br/>user upload image = <br/>";
        for($i=0 ; $i< count($contens_image); $i++)
        {
            echo "../contents_data/temp/".$contens_image[$i] . "<br/>";
        };
    };
    echo "<br/><br/>-------------contents image--------------<br/>";

    


    echo "<br/><br/>-------------user upload file--------------<br/>";

    $uploaddir = '../../../contents_data/temp/';
    $uploadfile = $uploaddir . basename($_FILES['user_upload_file']['name']);

    echo '<pre>';
    if (move_uploaded_file($_FILES['user_upload_file']['tmp_name'], $uploadfile)) {
        echo "user upload file = ".$uploadfile;
    } else {
        print "faild";
    }

    echo "<br/><br/>-------------user upload file--------------<br/>";



    
    echo "<br/>-------------contents subject name--------------<br/><br/>";

    echo "contents_subject = " . $_POST['contents_subject'];
    
    echo "<br/><br/>-------------contents subject name--------------<br/>";



    echo "<br/>-------------text editor html--------------<br/><br/>";
    
    echo htmlspecialchars($_POST['text_editor']);
    
    echo "<br/><br/>-------------text editor html--------------<br/>";



    print_r($_POST);
?>

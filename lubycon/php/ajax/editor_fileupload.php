 <?php
//file upload to ajax source
    if(!file_exists("upload")) 
    {
     mkdir("upload"); //make directory
     chmod("upload", 0777); //take permition
    }

    if($_FILES['upload_file']['name'] != "")  //check file exist
    {
     $file_name = $_FILES['upload_file']['name']; //set file name
     $target = "./upload/".$file_name; //upload place

     

     if (move_uploaded_file($_FILES['upload_file']['tmp_name'], $target)) 
     {
      chmod("$target", 0666);
      //echo $file_name;
      //echo filesize($target)."byte";

      $zip = new ZipArchive; 
     $zipfile = $target;
     $zip_inside_array = array();


         if($zip->open($zipfile) !== false)
         { //zip파일이 열렸을때
            for($i=0; $i<$zip->numFiles; $i++)
            { //zip파일안의 파일 개수동안 반복
            $zip_inside = $zip->getNameIndex($i); //zip파일의 이름을 가져오고
            $zip_inside_name = basename($zip_inside);

            array_push($zip_inside_array,$zip_inside_name);
            //echo $zip_inside;
            //array_push($file_info,$zip_inside_array);
            }
         } 
         $zip->close(); //zip 종료
     }


      $file_info = array("filename" => $file_name , "filesize" => filesize($target) , "zip_inside" => $zip_inside_array);
      echo json_encode($file_info);
     }
?>
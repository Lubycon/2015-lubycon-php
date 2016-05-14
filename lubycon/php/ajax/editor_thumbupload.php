<?php
if(!file_exists("thumb_upload")) 
{
 mkdir("thumb_upload"); //make directory
 chmod("thumb_upload", 0777); //take permition
}

if($_FILES['formfile']['name'] != "")  //check file exist
{
 $file_name = $_FILES['formfile']['name']; //set file name
 $target = "./thumb_upload/".$file_name; //upload place

 if (move_uploaded_file($_FILES['formfile']['tmp_name'], $target)) 
 {
  chmod("$target", 0666);
  echo $file_name;
 }
}
?>
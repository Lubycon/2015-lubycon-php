<?php
    echo "<hr/>-------------zip file upload--------------<hr/><br/>";
    $set_date = date("YmdHis");
    $con_cate = 'artwork';
    $user_name = 'daniel_zepp'; // from db

    $files = $_FILES['upload_file']; // input name
    
    $upload_path= '../../../../Lubycon_Contents/contents/' . $con_cate . '/' . $user_name . $set_date . '/' ; // uploaded path
    $whitelist = array('jpg','jpeg','png','psd','gif','bmp','pdd','tif','raw','ai','esp','svg','svgz','iff','fpx','frm','pcx','pct','pic','pxr','sct','tga','vda','icb','vst','alz','zip','rar','jar','7z','hwp','txt','doc','xls','xlsx','docx','pptx','pdf','ppt','me');  
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
?>

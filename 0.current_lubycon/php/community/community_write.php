<?php
    $one_depth = '../..'; //css js load
    $two_depth = '..'; // php load
    include_once('../layout/index_header.php');
?>

<link href="<?=$one_depth?>/css/bootstrap.min.css" type="text/css" rel="stylesheet"> 
<link href="<?=$one_depth?>/css/summernote.css" type="text/css" rel="stylesheet" />
<link href="<?=$one_depth?>/css/community_write.css" rel="stylesheet" type="text/css" />  <!-- community_view css -->
<link href="<?=$one_depth?>/css/community.css" rel="stylesheet" type="text/css" />  <!-- community css -->
<script src="<?=$one_depth?>/js/module/bootstrap.min.js" type="text/javascript"></script> 
<script src="<?=$one_depth?>/js/community.js" type="text/javascript"></script>


<form id="writer_form" enctype="multipart/form-data" method="post" action="./test.php">

<input type="hidden" id="contents_cate" name="contents_cate" value="<?=$_GET['cate']?>"/>
<input type="hidden" id="userid" name="userid" value="<?=$usercode?>"/>

<section class="container">
    <section id="work_space" class="con_wrap">
        <div id="work_inner">
            <div class="properties_box">
                <p class="work_title">Title</p>
                <input type="text" class="write_box_com" id="write_box_title" name="contents_subject"/>
            </div><!--title end-->
            
            <div class="properties_box">
                <p class="work_title">Contents</p>
                <div id="main_work_space">
                    <textarea name="text_editor" id="summernote" title="Contents"></textarea>
                </div><!--main_work_space end-->
            </div><!--main textbox end-->
            
            <div class="properties_box hidden-mb-ib" id="uploader_com">
                <p class="work_title animate_opacity">File Upload</p>
                <input type="text" id="file_text_com" val="please select file..." readonly />
                <span id="file_import_bt">Find the file</span>
                <input type="file" id="file_import_com" name="user_upload_file"/>
            </div><!--link2 end-->
        </div>
        <input type="submit" value="SUBMIT" id="community_submit" class="animate_width" />
    </section><!--work_space end-->        
</section>  <!-- end contents section -->
</form>
<script src="<?=$one_depth?>/js/module/summernote.js" type="text/javascript" ></script>


<?php
    include_once($two_depth.'/layout/index_footer.php');
?>
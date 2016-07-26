<link href="../plugin/lib/bootstrap.min.css" type="text/css" rel="stylesheet">
<link href="../plugin/JS/summernote.css" type="text/css" rel="stylesheet" />
<link href="./pages/view/community/community_editor.css" rel="stylesheet" type="text/css" />  <!-- community_view css -->
<link href="./pages/view/community/community.css" rel="stylesheet" type="text/css" />  <!-- community css -->
<script src="../plugin/lib/bootstrap.min.js" type="text/javascript"></script>
<script src="../plugin/JS/summernote.min.js" type="text/javascript"></script>
<script src="./pages/controller/community/community_editor_renderer.js" type="text/javascript"></script>


<input type="hidden" id="contents_cate" name="contents_cate" value=""/>
<input type="hidden" id="userid" name="userid" value=""/>

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
                <p class="work_title">File Upload</p>
                <input type="text" id="file_text_com" val="please select file..." readonly />
                <span id="file_import_bt">Find the file</span>
                <input type="file" id="file_import_com" name="user_upload_file"/>
            </div><!--link2 end-->
        </div>
        <div id="community_submit">SUBMIT</div>
    </section><!--work_space end-->
</section>  <!-- end contents section -->

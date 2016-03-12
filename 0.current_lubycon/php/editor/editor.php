<?php
    if(isset($_COOKIE)){
        if(isset($_COOKIE['login'])){
        }else if(!isset($_COOKIE['login'])){
            echo('<script>location.href="login_page.php"</script>');
        }
    }
?>
<link href="css/spectrum.css" rel="stylesheet" type="text/css" />
<link href="css/editor.css" rel="stylesheet" type="text/css" />
<link href="css/summernote.css" rel="stylesheet" type="text/css" />
<link href="css/bootstrap.min.css" rel="stylesheet" />
<link href="css/croppic.css" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="js/editor.js"></script>
<script type="text/javascript" src="js/spectrum.js"></script>
<script type="text/javascript" src="js/summernote.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>

<!-- editor css -->

<?php
//php variable setting
    $contents_cate = $_GET["3"];
    //$upload_file = user upload file (i guess only ziped file)
    //$upload_preview_file = user upload preview image files (user can multiple images)
    //$upload_preview_url = user upload preview image url (for easy call)
    
    $uploaded_file_name;
    $uploaded_file_inside_list = "Nothing Uploaded";
    $uploaded_file_size;

?>
<form id="editor_form" enctype="multipart/form-data" method="post" action="./php/editor/test.php">
<input type="hidden" name="contents_cate_name" value="<?=$contents_cate?>" />
<section id="editor_inbody">
    <section id="editor_body" class="con_wrap">
        <section id="editor_section" class="con_main">
            <textarea name="text_editor" id="summernote" title="Contents"></textarea>
            <!--summernote-->
        </section><!--editor_section end-->
    </section><!--editor_body end-->
    <aside id="editor_aside" class="con_aside">
        <nav id="editor_aside_tab">
            <ul>
                <li class="tab_body selected_tab" id="file_tab">File</li>
                <li class="tab_body" id="thumbnail_tab">Thumbnail</li>
                <li class="tab_body" id="setting_tab">Setting</li>
            </ul>
        </nav>
        <section class="tab_section" id="edit_tab_section">
            <p id="contents_name">
                Content name
                <input id="editor_content_name" type="text" value="input text..." name="contents_subject" />
            </p>
            <div id="editor_upload_file">
                <i class="fa fa-cloud-upload"></i>Upload File
            </div>
            <span class="tooltip_bt" id="file_tooltip">Upload file to server<br/>(allow only zip file)</span><!--tooltip for upload-->
            <input type="file" id="upload_file_input" name="upload_file[]" multiple/>
        </section>
        <section class="tab_section" id="thumbnail_tab_section">
            <?php   
                //it's follow contents_card.php infomation
                $username = "Admin_User";
                $contents_name = "Contents_name";
                $price = "Free";
                $contents_thumbnail_url = "./ch/img/no_img/no_img_user1.jpg"; // it's need to change ajax
            ?>
            <header id="tnail_header">Thumbnail Image</header>
            <div id="work_space">
                <div id="tnail_preview">
                    <ul>
                        <li>
                            <div class="contents_card">
                                <div class="contents_pic">
                                    <img src="./ch/img/no_img/no_img.jpg" class="load_view" alt="contents thumbnail"/>
                                </div>
                                <!-- end contents pic -->
                            </div>
                        </li>
                    </ul>
                    <div id="croppic"></div>
                    <span class="btn" id="cropContainerHeaderButton">Choose Image</span>
                    <script src="./js/croppic.min.js"></script>
                    <script>
		                var croppicHeaderOptions = {
				                uploadUrl:'./php/img_crop/img_save_to_file.php',
				                cropData:{
					                "dummyData":1,
					                "dummyData2":"asdas"
				                },
				                cropUrl:'./php/img_crop/img_crop_to_file.php',
				                customUploadButtonId:'cropContainerHeaderButton',
                                outputUrlId:'myOutputId',
				                modal:false,
				                loaderHtml:'<div class="loader bubblingG"><span id="bubblingG_1"></span><span id="bubblingG_2"></span><span id="bubblingG_3"></span></div> ',
				                onBeforeImgUpload: function(){ console.log('onBeforeImgUpload') },
				                onAfterImgUpload: function(){ console.log('onAfterImgUpload') },
				                onImgDrag: function(){ console.log('onImgDrag') },
				                onImgZoom: function(){ console.log('onImgZoom') },
				                onBeforeImgCrop: function(){ console.log('onBeforeImgCrop') },
				                onAfterImgCrop:function(data){ console.log(data) }
		                }	
		                var croppic = new Croppic('croppic', croppicHeaderOptions);
	                </script>
                    <input type="hidden" id="myOutputId" name="croppicurl">
                </div>
            </div>
        </section>
        <section class="tab_section" id="setting_tab_section">
            <div id="top_set" class="setting_group">
                <div id="cate_editor">
                    <p class="setting_title">Categories (max 3 categories)</p>
                    <div class="set_con">
                            <!-- need save user select category max value = 3 -->
                            <select data-placeholder="Choose your contents categories" style="width:100%;" class="chosen-select" multiple tabindex="8" name="user_selected_category[]">
                                <option>Car</option>
                                <option>People</option>
                                <option>Book</option>
                                <option>Stuff</option>
                                <option>Contry</option>
                                <option>Animal</option>
                                <option>Nature</option>
                                <option>Article</option>
                                <option>Font</option>
                                <option>3D Contents</option>
                            </select>
                    </div>
                </div>
                <div id="tag_editor">
                    <p class="setting_title">Tags</p>
                    <div class="set_con">
                            <!-- need to save user select tag max value = infinite -->
                            <select data-placeholder="Choose your contents categories" style="width:100%;" class="chosen-select2" multiple tabindex="8" name="user_selected_tag[]">
                                <option>Car</option>
                                <option>People</option>
                                <option>Book</option>
                                <option>Stuff</option>
                                <option>Contry</option>
                                <option>Animal</option>
                                <option>Nature</option>
                                <option>Article</option>
                                <option>Font</option>
                                <option>3D Contents</option>
                            </select>
                    </div>
                </div>
                <div id="des_editor">
                    <p class="setting_title">Description</p>
                    <textarea id="setting_des_text" name="setting_desc"></textarea>
                </div>
            </div><!--top_set end-->
            <div id="bottom_set" class="setting_group">
                <div id="cc_editor">
                    <p class="setting_title">License</p>
                    <div class="set_con" id="cc_box">
                        <ul>
                            <a href="#" id="cc_desc_link" target="_brank">
                                <li class="cc_icon" id="cc_main">
                                    <img src="./ch/img/creative_commons/png/cc_w.png" />
                                    <span class="tooltip_bt tooltip_long cc_tooltip" id="cc_tooltip">
                                       Creative Commons License
                                    </span>
                                </li><!--cc icon-->
                                <li class="cc_icon" id="cc_by">
                                    <img src="./ch/img/creative_commons/png/by_w.png" />
                                    <span class="tooltip_bt cc_tooltip" id="by_tooltip">
                                        Attribution
                                    </span>
                                </li><!-- default icon-->
                                <li class="cc_icon" id="cc_nc">
                                    <img src="./ch/img/creative_commons/png/nc_w.png" />
                                    <span class="tooltip_bt cc_tooltip" id="nc_tooltip">
                                        Non-Commercial
                                    </span>
                                </li><!--non commercial-->
                                <li class="cc_icon" id="cc_nd">
                                    <img src="./ch/img/creative_commons/png/nd_w.png" />
                                    <span class="tooltip_bt cc_tooltip" id="nb_tooltip">
                                        Non-Derivative
                                    </span>
                                </li><!--non derivation-->
                                <li class="cc_icon" id="cc_share">
                                    <img src="./ch/img/creative_commons/png/share_w.png" />
                                    <span class="tooltip_bt cc_tooltip" id="share_tooltip">
                                        Share Alike
                                    </span>
                                </li><!--non derivation-->
                            </a>
                        </ul>
                    </div><!--cc_box end-->
                    <p id="modify_cc">modify</p>
                    <div id="cc_selector_box">
                        <div id="cc_selector_wrap">
                            <div id="cc_sector" class="cc_section">
                                <div class="cc_title_wrap">
                                    <input id="cc_radio" class="license_selector" type="radio" name="cc_info" value="cc_enable" checked="true">
                                    <span class="cc_title">Creative Commons License</span>
                                </div>
                                <ul id="cc_checkboxes">
                                    <li class="checkbox_wrap">
                                        <input id="by" class="cc_selector" type="checkbox" name="cc_check" value="by" checked="true" disabled="true">
                                        <span class="cc_desc">Free to share and adapt with appropriate credit</span>
                                    </li>
                                    <li class="checkbox_wrap">
                                        <input id="nc" class="cc_selector" type="checkbox" name="cc_check" value="nc" checked="true">
                                        <span class="cc_desc">Not allowed for commercial purpose</span>
                                    </li>
                                    <li class="checkbox_wrap">
                                        <input id="nd" class="cc_selector" type="checkbox" name="cc_check" value="nd" checked="true">
                                        <span class="cc_desc">You may not distribute the modified material</span>
                                    </li>
                                    <li class="checkbox_wrap">
                                        <input id="sa" class="cc_selector" type="checkbox" name="cc_check" value="sa">
                                        <span class="cc_desc">Free to share including the modified material under the same license as original</span>
                                    </li>                             
                                </ul>
                            </div><!--cc sector end-->
                            <div id="copyrights_sector" class="cc_section">
                                <div class="cc_title_wrap">
                                    <input id="cp_radio" class="license_selector" type="radio" name="cc_info" value="cc_disable">
                                    <span class="cc_title">NO USAGE WITHOUT OWNER’S PERMISSION</span>
                                </div>
                            </div><!--cr sector end-->
                        </div><!--cc_selector_wrap end-->
                        <a href="#" target="_blank" id="goto_cc">Learn more...</a><!--cc link-->
                    </div><!--cc_selector_box end-->
                </div><!--cc_editor end-->
            </div><!--bottom_set end-->

            <!-- multi select box css -->
            <link rel="stylesheet" href="css/chosen_prism.css">
            <link rel="stylesheet" href="css/chosen.css">
            <!-- multi select box css -->
            <!-- multi select box js -->
            <script src="js/chosen.jquery.js" type="text/javascript"></script>
            <script src="js/chosen.prism.js" type="text/javascript"></script>
            <script type="text/javascript">
                var config = {
                    '.chosen-select': {},
                    '.chosen-select-deselect': { allow_single_deselect: true },
                    '.chosen-select' : {max_selected_options: 3},
                    '.chosen-select2': {},
                    '.chosen-select2-deselect': { allow_single_deselect: true },
                    '.chosen-select2' : {max_selected_options: 12}
                }
                for (var selector in config) {
                    $(selector).chosen(config[selector]);
                }
            </script>
            <!-- multi select box js -->
        </section>
        
        <!--<div id="editor_aside_wrap">
            <ol>
                <li id="editor_upload_file">
                    <i class="fa fa-cloud-upload"></i>
                    <span class="tooltip_bt" id="file_tooltip">Upload file to server<br/>(allow only zip file)</span>
                </li>
                <li id="editor_preview_upload">
                    <i class="fa fa-picture-o"></i>
                    <span class="tooltip_bt" id="image_tooltip">Upload preview image</span>
                </li>
            </ol>

            <input type="file" id="upload_file_input" name="upload_file" accept="application/zip"/>
            <input type="file" id="preview_upload_input" name="images[]" accept="image/*" multiple />
            
            <ol>
                <li id="img_crop" class="img_crop_notallow">
                    <i class="fa fa-crop"></i>
                    <span class="tooltip_bt" id="file_tooltip">Image crop tool</span>
                </li>
                <li id="add_text">
                    <i class="fa fa-font"></i>
                    <span class="tooltip_bt" id="file_tooltip">Text tool</span>
                </li>
                <li id="change_bd_color">
                    <input type="text" id="body_color_picker"></input>
                    <span class="tooltip_bt" id="body_color_tooltip">Body color</span>
                </li>
                <li id="embed_media">
                    <i class="fa fa-code"></i>
                    <span class="tooltip_bt" id="file_tooltip">Embed media</span>
                </li>
            </ol>
        </div>-->
            
            <!-- need ajax show uploaded file zip and inside zip files-->
            <div id="file_info">
                <header id="info_header">File info<i class="fa fa-angle-down" id="info_toggle"></i></header>
                <section id="files">
                    <article id="file_name"><i class="fa fa-chevron-circle-down"></i>
                        <p id="file_info_filename"><i class="fa fa-folder"></i>Nothing Uploaded</p>
                    </article>
                    <ul id="file_info_fileinside">
                        <?php
                            //for( $i = 0 ; $i < count($uploaded_file_inside_list) ; $i++ )
                            //{
                            //    echo "<li>".$uploaded_file_inside_list[$i]."</li>";
                            //}
                        ?>
                    </ul>
                </section>
                <footer id="storage">
                    <p id="file_info_filesize"><?=$uploaded_file_size?></p>
                </footer>
            </div>
            <input type="submit" class="final_upload_bt" id="upload_final" value="SUBMIT ALL" onsubmit="return postForm()"/>
        </div>
    </aside><!--editor_aside end-->
</section><!--editor_inbody_end-->
</form>
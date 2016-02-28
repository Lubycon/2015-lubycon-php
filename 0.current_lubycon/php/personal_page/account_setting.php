<?php
     require_once '../database/database_class.php';

     $database = new DBConnect;
     $database->DBInsert();
?>
<link href="css/account_setting.css" rel="stylesheet" type="text/css" />
<link href="css/croppic.css" rel="stylesheet" type="text/css" />
<!-- account_setting page css -->
<script type="text/javascript" src="js/luby_ui.js"></script>
<script type="text/javascript" src="js/account_setting.js"></script>
<script type="text/javascript" src="js/jquery.mousewheel.min.js"></script>

<form id="account_setting_form" enctype="multipart/form-data" method="post" action="./php/personal_page/test.php">
    <section id="account_section">
        <section id="account_setting_section" class="setting_card">
            <p class="setting_title">Account Setting</p>
                <label>E-mail</label><input type="text" value="loremIpsum@lubycon.com" disabled />
                <div class="public_option">
                    <i class="fa fa-lock"></i>
                    <select class="basic_filter" name="email_public">
                        <option value="Public">Public</option>
                        <option value="Followers">Followers</option>
                        <option value="Private">Private</option>
                    </select>
                </div>
                <!-- end select box -->
                
                <label>Nickname</label><input type="text" value="loremIpsum" disabled />
                <label>Password</label><input type="password" name="now_pass" id="now_pass_id" disabled /><i></i><span id="change_pass">Change Password</span><br />
                <p id="now_pass_check" class="form_check"></p>
                <label>New Password</label><input type="password" name="pass" id="pass_id" disabled /><i></i>
                <p id="pass_check" class="form_check"></p>
                <label>Repeat Password</label><input type="password" name="repass" id="re_pass_id" disabled /><i></i>
                <p id="re_pass_check" class="form_check"></p>
        </section>
        <section id="basic_info_section" class="setting_card">
            <p class="setting_title">Basic Infomation</p>
                <label>Profile Photo</label>
                <div id="croppic_account"></div>
                    <span class="btn" id="cropContainerHeaderButton">Find Image</span>
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
				                onAfterImgCrop:function(){ console.log('onAfterImgCrop') }
		                }	
		                var croppic = new Croppic('croppic_account', croppicHeaderOptions);
	                </script>
                    <input type="hidden" id="myOutputId" name="croppicurl">
                <label>Occupation / Job</label>
                <div class="job_option">
                    <select class="basic_filter" name="job">
                        <option value="artist">Artist</option>
                        <option value="creator">Creator</option>
                        <option value="designer">Designer</option>
                        <option value="engineer">Engineer</option>
                        <option value="student">Student</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <label>Location</label>
                <div class="location_option">
                    <select class="basic_filter" name="location">
                         <?php
                                $database->query = "SELECT * FROM luby_country";
                                $database->DBQuestion();
                                while($row = mysqli_fetch_array($database->result)){
                                     echo ("<option value = ".$row['country_code'].">".$row['country_name']."</option>");
                                }
                           ?>
                    </select>
                </div>
                <input type="text" id="location_text" name="location_text" />
                <label>Language</label>
                <div id="lang_option_id" class="language_option">
                    <select class="basic_filter" name="lang_ability[]">
                        <option value="Beginer">Beginner</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Fluent">Fluent</option>
                    </select>
                </div>
                <input type="text" id="lang_input_id" class="language_text" name="language[]" />
                <div id="clone_div"></div>
                <div id="lang_plus">
                    <i class="fa fa-plus"></i>
                </div>
                <div id="lang_minus_id" class="lang_minus">
                    <i class="fa fa-minus"></i>
                </div>
                <label id="basic_desc_label">Description</label><textarea id="basic_desc" maxlength="1000" name="desc"></textarea><br />
        </section>
        <section id="history_setting_section" class="setting_card">
            <p class="setting_title">History Setting</p>
            <div class="history_cell">
                <div class="history_data">
                    <div class="lubySelector hidden-mb-ib" data="history_year">
                        <span class="global_icon"><i class="fa fa-filter"></i></span>
                        <span class="lubySelector_selected history_year_changer">2016</span>
                        <span class="lubySelector_arrow"><i class="fa fa-caret-down"></i></span>
                        <ul class="lubySelector_list">
                        <?php
                            for( $i=2016 ; $i > 1939 ; $i-- )
                            {
                                echo '<li data-value='.$i.'>'.$i.'</li>';
                            }
                        ?>
                        </ul>
                    </div>

                    <div class="lubySelector hidden-mb-ib" data="history_month">
                        <span class="global_icon"><i class="fa fa-filter"></i></span>
                        <span class="lubySelector_selected history_month_changer">January</span>
                        <span class="lubySelector_arrow"><i class="fa fa-caret-down"></i></span>
                        <ul class="lubySelector_list">
                            <li data-value="1">January</li>
                            <li data-value="2">February</li>
                            <li data-value="3">March</li>
                            <li data-value="4">April</li>
                            <li data-value="5">May</li>
                            <li data-value="6">June</li>
                            <li data-value="7">July</li>
                            <li data-value="8">August</li>
                            <li data-value="9">September</li>
                            <li data-value="10">October</li>
                            <li data-value="11">November</li>
                            <li data-value="12">December</li>
                        </ul>
                    </div>

                    <div class="lubySelector hidden-mb-ib" data="history_kind">
                        <span class="global_icon"><i class="fa fa-filter"></i></span>
                        <span class="lubySelector_selected history_kind_changer">Work Expierence</span>
                        <span class="lubySelector_arrow"><i class="fa fa-caret-down"></i></span>
                        <ul class="lubySelector_list">
                            <li data-value="work_expierence">Work Experience</li>
                            <li data-value="studied">Education</li>
                            <li data-value="contest_prized">Awards</li>
                        </ul>
                    </div>

                    <input class="history_text" type="text" name="history_text[]"/>

                </div>
            </div>
            <div id="history_plus">
                <i class="fa fa-plus"></i>
            </div>
            <div id="history_minus">
                <i class="fa fa-minus"></i>
            </div>
        </section>

        <section id="contact_info_section" class="setting_card">
            <p class="setting_title">Contact Info</p>
                <label>Mobile</label><input type="text" name="mobile_number"/>
                <div class="public_option">
                    <i class="fa fa-lock"></i>
                    <select class="basic_filter" name="mobile_public">
                        <option value="Public">Public</option>
                        <option value="Followers">Followers</option>
                        <option value="Private">Private</option>
                    </select>
                </div>
                <!-- end select box -->
                
                <label>FAX</label><input type="text" name="fax_number"/>
                <div class="public_option">
                    <i class="fa fa-lock"></i>
                    <select class="basic_filter" name="fax_public">
                        <option value="Public">Public</option>
                        <option value="Followers">Followers</option>
                        <option value="Private">Private</option>
                    </select>
                </div>
                <!-- end select box -->
                
                <label>Website</label><input type="text" name="website_url"/>
                <div class="public_option">
                    <i class="fa fa-lock"></i>
                    <select class="basic_filter" name="website_public">
                        <option value="Public">Public</option>
                        <option value="Followers">Followers</option>
                        <option value="Private">Private</option>
                    </select>
                </div>
                <!-- end select box -->
                
        </section>
        <section id="delete_account_section" class="setting_card">
            <p class="setting_title">Delete Account</p>
                <p id="delete_desc">Deleting your account will delete all of your content and remove all data associated with it.</p>
                <span id="confirm_bt" class="lubyAlert_bt" data="confirm">I want delete my account</span>
        </section>
        <input type="submit" value="Submit" id="submit_bt" />
    </section>
</form>
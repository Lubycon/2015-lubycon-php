<link href="./pages/view/account_setting/account_setting.css" rel="stylesheet" type="text/css" />
<link href="../plugin/JS/cropper.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="../plugin/JS/cropper.min.js"></script>
<script type="text/javascript" src="../plugin/JS/jquery.mousewheel.min.js"></script>
<script type="text/javascript" src="./pages/controller/account_setting/account_setting_renderer.js"></script>

<form id="account_setting_form" enctype="multipart/form-data" method="post" action="./test.php">
    <section id="account_section">
        <section id="account_setting_section" class="setting_card">
            <p class="setting_title">Account Setting</p>
                <div class="account_input_wrap userinfo">
                    <label>E-mail</label><input type="text" value="" disabled data-value="email" />
                    <div class="public_option">
                        <select class="privacyFilter email_public" name="email_public">
                            <option value="Public">Public</option>
                            <option value="Private">Private</option>
                        </select>
                    </div>
                </div>
                <div class="account_input_wrap userinfo">
                    <label>Nickname</label><input type="text" value="" disabled data-value="name"/>
                </div>
                <!-- end select box -->
        </section>
        <section id="basic_info_section" class="setting_card">
            <p class="setting_title">Basic Infomation</p>
                <label>Profile Photo</label>
                <div id="cropper_account">
                    <div id="cropper-window-wrapper">
                        <div class="cropper-window" id="croped"><img src="" /></div>
                        <i class="fa fa-arrow-left" aria-hidden="true"></i>
                        <div class="cropper-window" id="cropper-preview"></div>
                    </div>
                    <div id="profile-bt-wrap">
                        <span id="profile-upload-bt" class="cropper-bt"><i class="fa fa-cloud-upload"></i></span>
                        <span id="crop-bt" class="cropper-bt"><i class="fa fa-crop"></i></span>
                    </div>
                    <div id="cropper-wrapper"><img id="cropper_img" /></div>
                    <input type="file" id="profile_uploader" />
                </div>

                <label>Occupation / Job</label>
                <div class="job_option">
                    <select class="jobFilter" name="job">
                        <!--JOB LIST-->
                    </select>
                </div>
                <label>Company</label>
                <input type="text" name="company" value=""/>
                <label>Location</label>
                <div class="location_option">
                    <select class="locationFilter" name="location">
                         <!--COUNTRY LIST-->
                    </select>
                    <input type="text" name="location_text" value=""/>
                </div>
                <label>Language</label>
                <div class="language-wrapper">
                    <div class='language'>
                        <input type='text' class='language_text' />
                        <div class='lang_option'>
                            <select class='langFilter'>
                                <option value='Beginner'>Beginner</option>
                                <option value='Advanced'>Advanced</option>
                                <option value='Fluent'>Fluent</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="optControl" data-value="add" data-target="language">
                    <i class="fa fa-plus"></i>
                </div>
                <div class="optControl" data-value="remove" data-target="language">
                    <i class="fa fa-minus"></i>
                </div>
                <label id="basic_desc_label">Description</label>
                <textarea id="basic_desc" maxlength="1000"></textarea><br />
        </section>
        <section id="history_setting_section" class="setting_card">
            <p class="setting_title">History Setting</p>
            <i class="fa fa-refresh refresh"></i>
            <div class="history-wrapper">
                <div class='history'>
                    <select class='accountFilter' data-value='year'></select>
                    <select class='accountFilter' data-value='month'>
                        <option value='January'>January</option>
                        <option value='February'>February</option>
                        <option value='March'>March</option>
                        <option value='April'>April</option>
                        <option value='May'>May</option>
                        <option value='June'>June</option>
                        <option value='July'>July</option>
                        <option value='August'>August</option>
                        <option value='September'>September</option>
                        <option value='October'>October</option>
                        <option value='November'>November</option>
                        <option value='December'>December</option>
                    </select>
                    <select class='accountFilter' data-value='kind'>
                        <option value='work_expierence'>Work Experience</option>
                        <option value='education'>Education</option>
                        <option value='awards'>Awards</option>
                    </select>
                    <input class='history_text' type='text' value=''/>
                </div>
            </div>
            <div class="optControl" data-value="add" data-target="history">
                <i class="fa fa-plus"></i>
            </div>
            <div class="optControl" data-value="remove" data-target="history">
                <i class="fa fa-minus"></i>
            </div>
        </section>

        <section id="contact_info_section" class="setting_card">
            <p class="setting_title">Contact Info</p>
                <label>Mobile</label>
                <input type="text" value="" data-value="mobile" />
                <div class="public_option">
                    <select class="privacyFilter" data-value="mobile">
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                    </select>
                </div>
                <!-- end select box -->
                <label>FAX</label>
                <input type="text" value="" data-value="fax"/>
                <div class="public_option">
                    <select class="privacyFilter" data-value="fax">
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                    </select>
                </div>
                <!-- end select box -->
                <label>Website</label>
                <input type="text" value="" data-value="web"/>
                <div class="public_option">
                    <select class="privacyFilter web_public" data-value="web">
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                    </select>
                </div>
                <!-- end select box -->

        </section>
        <section id="delete_account_section" class="setting_card">
            <p class="setting_title">Delete Account</p>
                <p id="delete_desc">Deleting your account will delete all of your content and remove all data associated with it.</p>
                <span id="delete_account_bt" class="alertKey" data-value="delete">
                    <i class="fa fa-trash"></i>I want to delete my account
                </span>
        </section>
        <div id="submit_bt">SUBMIT</div>
    </section>
</form>
<?php
    include_once('./component/view/index/index_footer.php');
?>

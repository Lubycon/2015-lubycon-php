<?php
    if( $usernumber == $usercode ) //need more security
    {
    require_once '../database/database_class.php';
    require_once "../class/regex_class.php";
    require_once "../class/json_class.php";
    $db = new Database();
    $db->query = "SELECT * FROM `userinfo` WHERE `userCode` = $usercode";
    $db->askQuery(); // viewcount up
    $row = mysqli_fetch_array($db->result);
    }else
    {
        include('../error/404.php');
        die();
    }
    
?>
<link href="<?=$one_depth?>/css/account_setting.css" rel="stylesheet" type="text/css" />
<link href="./css/cropper.css" rel="stylesheet" type="text/css" />
<!-- account_setting page css -->
<script type="text/javascript" src="./js/cropper.js"></script>
<script type="text/javascript" src="<?=$one_depth?>/js/core/jquery-ui.min.js"></script>
<script type="text/javascript" src="<?=$one_depth?>/js/account_setting.js"></script>
<script type="text/javascript" src="<?=$one_depth?>/js/module/jquery.mousewheel.min.js"></script>

<form id="account_setting_form" enctype="multipart/form-data" method="post" action="./test.php">
    <section id="account_section">
        <section id="account_setting_section" class="setting_card">
            <p class="setting_title">Account Setting</p>
                <label>E-mail</label><input type="text" value="<?=$userid?>" disabled />
                <div class="public_option">
                    <select class="privacyFilter" name="email_public">
                        <option value="Public">Public</option>
                        <option value="Followers">Followers</option>
                        <option value="Private">Private</option>
                    </select>
                </div>
                <!-- end select box -->
                <label>Nickname</label><input type="text" value="<?=$username?>" disabled />
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
                <div id="cropper_account">
                    <div id="cropper-window-wrapper">
                        <div class="cropper-window" id="croped"></div>
                        <i class="fa fa-arrow-left" aria-hidden="true"></i>
                        <div class="cropper-window" id="cropper-preview"></div>
                    </div>
                    <div id="profile-bt-wrap">
                        <span id="profile-upload-bt" class="cropper-bt"><i class="fa fa-cloud-upload"></i></span>
                        <span id="crop-bt" class="cropper-bt"><i class="fa fa-crop"></i></span>
                    </div>
                    <div id="cropper-wrapper"><img id="cropper_img"/></div>
                    <input type="file" id="profile_uploader" />
                </div>

                <label>Occupation / Job</label>
                <div class="job_option">
                    <select class="jobFilter" name="job">
                        <?php
                            $json_control = new json_control;
                            $json_control->json_decode('jobCode',"$one_depth/data/job.json");
                            $origin_select = $json_control->json_decode_code[$row['jobCode']];

                            foreach ($json_control->json_decode_code AS $index=>$value)
                            {
                                $loop_value = $value;
                                echo "<option value='$loop_value' data-value='$loop_value'>$loop_value</option>";
                            }
                            echo "<script>luby_selcetor_val_change('.job_option','$origin_select');</script>";
                        ?>
                    </select>
                </div>
                <label>Company</label>
                <input type="text" name="company" value="<?=$row['company']?>"/>
                <label>Location</label>
                <div class="location_option">
                    <select class="locationFilter" name="location">
                         <?php
                            $json_control->json_decode('country',"$one_depth/data/country.json");
                            $origin_select = $json_control->json_decode_code[$row['countryCode']];
                            foreach ($json_control->json_decode_code AS $index=>$value)
                            {
                                $loop_value = $json_control->json_decode_code[$index];
                                echo "<option value='$loop_value' data-value='$loop_value'>$loop_value</option>";
                            }
                            echo "<script>luby_selcetor_val_change('.location_option','$origin_select');</script>";
                        ?>
                    </select>
                </div>
                <input type="text" id="location_text" name="location_text" value="<?=$row['city']?>"/>
                <label>Language</label>
                <div class="langWrap">
                    <input type="text" id="lang_input_id" class="language_text" name="language[]" />
                    <div class="lang_option">
                        <select class="langFilter0" name="lang_ability[]">
                            <option value="Beginer">Beginer</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Fluent">Fluent</option>
                        </select>
                    </div>  
                </div>
                <div id="clone_div"></div>
                <div id="lang_plus" class="optControl">
                    <i class="fa fa-plus"></i>
                </div>
                <div id="lang_minus" class="optControl">
                    <i class="fa fa-minus"></i>
                </div>
                <label id="basic_desc_label">Description</label>
                <textarea id="basic_desc" maxlength="1000" name="desc"><?=$row['description']?></textarea><br />
        </section>
        <section id="history_setting_section" class="setting_card">
            <p class="setting_title">History Setting</p>
            <i class="fa fa-refresh refresh"></i>
            <div class="history_cell">
                <div class="history_data">
                    <select class="accountFilter" name="history_year[]">
                    <?php
                        for( $i=2016 ; $i > 1939 ; $i-- ){
                            echo '<option data-value='.$i.'>'.$i.'</option>';
                        }
                    ?>
                    </select>               
                    <select class="accountFilter" name="history_month[]">
                        <option data-value="1">January</option>
                        <option data-value="2">February</option>
                        <option data-value="3">March</option>
                        <option data-value="4">April</option>
                        <option data-value="5">May</option>
                        <option data-value="6">June</option>
                        <option data-value="7">July</option>
                        <option data-value="8">August</option>
                        <option data-value="9">September</option>
                        <option data-value="10">October</option>
                        <option data-value="11">November</option>
                        <option data-value="12">December</option>
                    </select>
                    <select class="accountFilter" name="history_kind[]">
                        <option data-value="work_expierence">Work Experience</option>
                        <option data-value="studied">Education</option>
                        <option data-value="contest_prized">Awards</option>
                    </select>

                    <input class="history_text" type="text" name="history_text[]"/>

                </div>
            </div>
            <div id="history_plus" class="optControl">
                <i class="fa fa-plus"></i>
            </div>
            <div id="history_minus" class="optControl">
                <i class="fa fa-minus"></i>
            </div>
        </section>

        <section id="contact_info_section" class="setting_card">
            <p class="setting_title">Contact Info</p>
                <label>Mobile</label><input type="text" name="mobile_number" value="<?=$row['telNumber']?>"/>
                <div class="public_option">
                    <select class="privacyFilter" name="mobile_public">
                        <option value="Public">Public</option>
                        <option value="Followers">Followers</option>
                        <option value="Private">Private</option>
                    </select>
                </div>
                <!-- end select box -->
                
                <label>FAX</label><input type="text" name="fax_number" value="<?=$row['fax']?>"/>
                <div class="public_option">
                    <select class="privacyFilter" name="fax_public">
                        <option value="Public">Public</option>
                        <option value="Followers">Followers</option>
                        <option value="Private">Private</option>
                    </select>
                </div>
                <!-- end select box -->
                
                <label>Website</label><input type="text" name="website_url" value="<?=$row['web']?>"/>
                <div class="public_option">
                    <select class="privacyFilter" name="website_public">
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
                <span id="delete_bt" class="alertKey" data="delete">I want delete my account</span>
        </section>
        <input type="submit" value="Submit" id="submit_bt" />
    </section>
</form>
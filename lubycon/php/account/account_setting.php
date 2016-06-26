<?php
    if( $usernumber == $usercode ) //need more security
    {
    require_once '../database/database_class.php';
    require_once "../class/regex_class.php";
    require_once "../class/json_class.php";
    $json_control = new json_control;
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
<link href="../../css/account_setting.css" rel="stylesheet" type="text/css" />
<link href="./css/cropper.css" rel="stylesheet" type="text/css" />
<!-- account_setting page css -->
<script type="text/javascript" src="../../js/account_setting.js"></script>
<script type="text/javascript" src="./js/cropper.js"></script>
<script type="text/javascript" src="../../js/core/jquery-ui.min.js"></script>
<script type="text/javascript" src="../../js/module/jquery.mousewheel.min.js"></script>

<form id="account_setting_form" enctype="multipart/form-data" method="post" action="./test.php">
    <section id="account_section">
        <section id="account_setting_section" class="setting_card">
            <p class="setting_title">Account Setting</p>
                <div class="account_input_wrap userinfo">
                    <label>E-mail</label><input type="text" value="<?=$userid?>" disabled />
                    <div class="public_option">
                        <select class="privacyFilter email_public" name="email_public">
                            <option value="Public">Public</option>
                            <option value="Private">Private</option>
                            <?php $json_control->json_find_option_original('.email_public',$row['emailPublic']);?>
                        </select>
                    </div>
                </div>
                <div class="account_input_wrap userinfo">
                    <label>Nickname</label><input type="text" value="<?=$username?>" disabled />
                </div>
                <!-- end select box -->
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
                    <div id="cropper-wrapper"><img id="cropper_img" /></div>
                    <input type="file" id="profile_uploader" />
                </div>

                <label>Occupation / Job</label>
                <div class="job_option">
                    <select class="jobFilter" name="job">
                        <?php
                            $job_json = $json_control->json_decode('job',"$one_depth/data/job.json");
                            $job_decode = $json_control->json_decode_code;
                            $job_origin_select = $job_decode[$row['jobCode']]['name'];
                            $json_control->json_spread_option($job_decode);
                            echo $json_control->json_spread_wrap;
                            $json_control->json_find_option_original('.jobFilter',$job_origin_select);
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
                            $country_decode = $json_control->json_decode_code;
                            $json_control->json_search_original($country_decode,$row['countryCode'],'name');
                            $country_origin_select = $json_control->search_key_origin;
                            $json_control->json_spread_option($country_decode);
                            echo $json_control->json_spread_wrap;
                            $json_control->json_find_option_original('.locationFilter',$country_origin_select);
                        ?>
                    </select>
                    <input type="text" id="location_text" name="location_text" value="<?=$row['city']?>"/>
                </div>
                <label>Language</label>
                <div class="clone-list">
                    <?php
                        if( isset($lang_level) )
                        {
                            foreach( $lang_level as $value => $key )
                            {
                                $lang_level_target = $lang_level[$value];
                                $lang_name_target = $lang_name[$value];
                            
                                echo "<div class='langWrap clone-wrapper'>
                                    <input type='text' class='language_text' name='language[]' value='$lang_name_target' />
                                    <div class='lang_option'>
                                        <select class='langFilter0 langnum_$value' name='lang_ability[]'>
                                            <option value='Beginer'>Beginer</option>
                                            <option value='Advanced'>Advanced</option>
                                            <option value='Fluent'>Fluent</option>
                                        </select>
                                    </div>  
                                </div>";
                                $json_control->json_find_option_original(".langnum_$value",$lang_level_target);
                            }
                        }else
                        {
                            echo "<div class='langWrap clone-wrapper'>
                                    <input type='text' class='language_text' name='language[]' value='' />
                                    <div class='lang_option'>
                                        <select class='langFilter0 langnum_0' name='lang_ability[]'>
                                            <option value='Beginer'>Beginer</option>
                                            <option value='Advanced'>Advanced</option>
                                            <option value='Fluent'>Fluent</option>
                                        </select>
                                    </div>  
                                </div>";
                        }
                    ?>
                </div>
                <div class="optControl" data-value="add">
                    <i class="fa fa-plus"></i>
                </div>
                <div class="optControl" data-value="remove">
                    <i class="fa fa-minus"></i>
                </div>
                <label id="basic_desc_label">Description</label>
                <textarea id="basic_desc" maxlength="1000" name="desc"><?=$row['userDescription']?></textarea><br />
        </section>
        <section id="history_setting_section" class="setting_card">
            <p class="setting_title">History Setting</p>
            <i class="fa fa-refresh refresh"></i>
            <div class="clone-list">
                <?php
                    if( $history_row->num_rows > 0 )
                    {
                        $j = 0;
                        while( $history_fetch_row = mysqli_fetch_array($history_row) )
                        {
                            $historyYear = $history_fetch_row['historyDateYear'];
                            $historyMonth = $history_fetch_row['historyDateMonth'];
                            $historyCategory = $history_fetch_row['historyCategory'];
                            $historyContents = $history_fetch_row['historyContents'];

                            echo "<div class='historyWrap clone-wrapper'>
                                <select class='accountFilter history_year_$j' name='history_year[]' data-value='year'>
                                <";
                                for( $i=2016 ; $i > 1939 ; $i-- )
                                {
                                    echo '<option data-value='.$i.'>'.$i.'</option>';
                                }
                            echo "</select>               
                                <select class='accountFilter history_month_$j' name='history_month[]' data-value='month'>
                                    <option data-value='1'>January</option>
                                    <option data-value='2'>February</option>
                                    <option data-value='3'>March</option>
                                    <option data-value='4'>April</option>
                                    <option data-value='5'>May</option>
                                    <option data-value='6'>June</option>
                                    <option data-value='7'>July</option>
                                    <option data-value='8'>August</option>
                                    <option data-value='9'>September</option>
                                    <option data-value='10'>October</option>
                                    <option data-value='11'>November</option>
                                    <option data-value='12'>December</option>
                                </select>
                                <select class='accountFilter history_kind_$j' name='history_kind[]' data-value='kind'>
                                    <option data-value='work_expierence'>Work Experience</option>
                                    <option data-value='education'>Education</option>
                                    <option data-value='awards'>Awards</option>
                                </select>
                                <input class='history_text' type='text' name='history_text[]' value='$historyContents'/>
                            </div>";

                            $json_control->json_find_option_original(".history_year_$j",$historyYear);
                            $json_control->json_find_option_original(".history_month_$j",$historyMonth);
                            $json_control->json_find_option_original(".history_kind_$j",$historyCategory);
                        
                            $j++;
                        }
                    }else
                    {
                        echo "<div class='historyWrap clone-wrapper'>
                                <select class='accountFilter history_year_0' name='history_year[]' data-value='year'>
                                <";
                                for( $i=2016 ; $i > 1939 ; $i-- )
                                {
                                    echo '<option data-value='.$i.'>'.$i.'</option>';
                                }
                            echo "</select>               
                                <select class='accountFilter history_month_0' name='history_month[]' data-value='month'>
                                    <option data-value='1'>January</option>
                                    <option data-value='2'>February</option>
                                    <option data-value='3'>March</option>
                                    <option data-value='4'>April</option>
                                    <option data-value='5'>May</option>
                                    <option data-value='6'>June</option>
                                    <option data-value='7'>July</option>
                                    <option data-value='8'>August</option>
                                    <option data-value='9'>September</option>
                                    <option data-value='10'>October</option>
                                    <option data-value='11'>November</option>
                                    <option data-value='12'>December</option>
                                </select>
                                <select class='accountFilter history_kind_0' name='history_kind[]' data-value='kind'>
                                    <option data-value='work_expierence'>Work Experience</option>
                                    <option data-value='education'>Education</option>
                                    <option data-value='awards'>Awards</option>
                                </select>
                                <input class='history_text' type='text' name='history_text[]' value=''/>
                            </div>";
                    }
                    
                ?>
            </div>
            <div class="optControl" data-value="add">
                <i class="fa fa-plus"></i>
            </div>
            <div class="optControl" data-value="remove">
                <i class="fa fa-minus"></i>
            </div>
        </section>

        <section id="contact_info_section" class="setting_card">
            <p class="setting_title">Contact Info</p>
                <label>Mobile</label><input type="text" name="mobile_number" value="<?=$row['telNumber']?>"/>
                <div class="public_option">
                    <select class="privacyFilter mobile_public" name="mobile_public">
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                            <?php $json_control->json_find_option_original('.mobile_public',$row['mobilePublic']);?>
                    </select>
                </div>
                <!-- end select box -->
                
                <label>FAX</label><input type="text" name="fax_number" value="<?=$row['fax']?>"/>
                <div class="public_option">
                    <select class="privacyFilter fax_public" name="fax_public">
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                            <?php $json_control->json_find_option_original('.fax_public',$row['faxPublic']);?>
                    </select>
                </div>
                <!-- end select box -->
                
                <label>Website</label><input type="text" name="website_url" value="<?=$row['web']?>"/>
                <div class="public_option">
                    <select class="privacyFilter web_public" name="website_public">
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                            <?php $json_control->json_find_option_original('.web_public',$row['webPublic']);?>
                    </select>
                </div>
                <!-- end select box -->
                
        </section>
        <section id="delete_account_section" class="setting_card">
            <p class="setting_title">Delete Account</p>
                <p id="delete_desc">Deleting your account will delete all of your content and remove all data associated with it.</p>
                <span id="delete_account_bt" class="alertKey" data="delete"><i class="fa fa-trash"></i>I want to delete my account</span>
        </section>
        <input type="submit" value="Submit" id="submit_bt" />
    </section>
</form>
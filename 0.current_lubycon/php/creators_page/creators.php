<?php
    $one_depth = '../..'; //css js load
    $two_depth = '..'; // php load
    include_once("$two_depth/layout/index_header.php");
?>
<div class="main_figure_wrap hidden-mb-b">
    <figure id="main_figure">
        <div class="dark_overlay_small"></div>
        <h2>CREATORS</h2>
    </figure>   <!-- end main_figure -->
</div>
<!-- end main_figure -->

<link href="<?=$one_depth?>/css/creators_page.css" rel="stylesheet" type="text/css" />
<!-- contents page css -->
<section class="container">
    <section class="nav_guide hidden-mb-ib">
        <select class="locationFilter hidden-mb-ib">
            <option>All Continents</option>
            <option>Africa</option>
            <option>Asia</option>
            <option>Europe</option>
            <option>North America</option>
            <option>South America</option>
            <option>Oceania</option>
        </select>
        <select class="jobFilter hidden-mb-ib">
            <option>All Jobs</option>
            <option>Artist</option>
            <option>Creator</option>
            <option>Designer</option>
            <option>Engineer</option>
            <option>Student</option>
            <option>Other</option>
        </select>
        <select class="userFilter hidden-mb-ib">
            <option>New</option>
            <option>Most Like</option>
            <option>Most Download</option>
            <option>Most Comment</option>
        </select>
        <div id="sub_search_bar" class="hidden-mb-ib">
            <div class="select_box">
                <select class="searchFilter">
                    <option value="Name">Name</option>
                    <option value="Country">Country</option>
                </select>
            </div>
            <input type="text" id="sub_search_text" value="Enter the Keyword" />
            <button id="sub_search_btn">
                <i class="fa fa-search"></i>
            </button>
        </div>
    </section>
    <!-- end nav_guide -->
    <section class="con_wrap">
        <div class="con_aside">
            <?php 
                $user_img_url = "$two_depth/../../../Lubycon_Contents/user/$usercode/profile.jpg";
                $userjob = "Designer";
                $usercity = "Seoul";
                $usercountry = "South Korea";
                $language1 = "Korean";
                $language2 = "English";
            ?>
            <?php
                if($session->SessionExist()){
                    include_once("./creators_login.php");
                }else{
                    include_once("./creators_logout.php");
                }
            ?>
        </div><!--end con_aside-->
        <div id="user_view_main" class="con_main">
            <?php
                $user_img_url = "$one_depth/../../../Lubycon_Contents/user/41/profile.jpg";
                $user_location_img = $one_depth."/ch/img/flag_icons/United-States-Of-America.png";
                $usercity = "Los Santos";
                $usercountry = "United States";
                $username = "Ssaru";
                $userjob = "Gangster";
                $randCount = rand(200,1500);
                $contents_count = $randCount < 1000 ? $randCount : (string)(round((double)($randCount/1000),1))."K";
                $user_content1 = "$one_depth/../../../Lubycon_Contents/contents/threed/Alasdair_Munro20160414050808/thumb.jpg";
                $user_content2 = "$one_depth/../../../Lubycon_Contents/contents/threed/Anushree_Dhar20160414050808/thumb.jpg";
                $user_content3 = "$one_depth/../../../Lubycon_Contents/contents/threed/Caroline_Davies20160414050808/thumb.jpg";
            ?><!--you should change to mySQL later-->
            <div id="bestCreator" class="creators_card">
                <div class="creator_menu">
                    <i class="fa fa-bars creator_menu_icon hidden-mb-b"></i>
                    <div class="creator_menu_list">
                        <ul>
                            <li><a href="<?=$two_depth?>/personal_page.php?cate=dashboard"><i class="fa fa-tachometer"></i>View Dashboard</a></li>
                            <li><a href="<?=$two_depth?>/personal_page.php?cate=my_contents"><i class="fa fa-eye"></i>View Contents</a></li>
                            <li><a href="<?=$two_depth?>/personal_page.php?cate=insight"><i class="fa fa-bar-chart"></i>View Insight</a></li>
                            <li><a href="<?=$two_depth?>/personal_page.php?cate=my_forums"><i class="fa fa-table"></i>View Forums</a></li>
                        </ul>
                    </div>
                </div>
                <div class="creator_info_wrap">
                    <div class="creator_top_info">
                        <div class="creator_pic">
                            <img src="<?=$user_img_url?>" alt="user_pic"/>
                        </div>
                        <div class="creator_location_img">
                            <img src="<?=$user_location_img?>" alt="user_location"/>
                        </div>
                    </div>
                    <div class="creator_mid_info">
                        <p class="creator_name"><a href="<?=$two_depth?>/personal_page.php?cate=dashboard"><?=$username?></a></p><!--user name-->
                        <p class="creator_job"><?=$userjob?></p><!--job-->
                        <p class="creator_location"><i class="fa fa-map-marker"></i><?=$usercity?>, <?=$usercountry?></p>
                        <article class="contents_count">
                            <p class="count_num"><?=$contents_count?></p>
                            Contents
                        </article>
                    </div>
                </div>
                <div class="creator_bot_info">
                    <ul>
                        <li class="usercontent">
                            <img src="<?=$user_content1?>" alt="user_content"/>
                        </li>
                        <li class="usercontent">
                            <img src="<?=$user_content2?>" alt="user_content"/>
                        </li>
                        <li class="usercontent">
                            <img src="<?=$user_content3?>" alt="user_content"/>
                        </li>
                    </ul>
                </div>
            </div>
            <ul id="creator_card_wrap">
            <?php
	                require_once '../database/database_class.php';
                    require_once "../class/json_class.php";
	                $db = new Database();
                    $db->query = "SELECT  `userbasic`.`userCode`, preview , nick , jobCode , boardCode , city , countryCode FROM lubyconboard.`artwork` INNER join lubyconuser.`userbasic` INNER join lubyconuser.`userinfo` ON `artwork`.`userCode` = `userbasic`.`userCode` and `userbasic`.`userCode` = `userinfo`.`userCode` ORDER BY `boardCode` DESC";
                    $db->askQuery();
                    while( $row = mysqli_fetch_array($db->result) )
                    {
                        $json_control = new json_control;
                        $json_control->json_decode('jobCode',"$one_depth/data/job.json");
                        $job_origin_select = $json_control->json_decode_code[$row['jobCode']];
                        $json_control->json_decode('country',"$one_depth/data/country.json");
                        $country_origin_select = $json_control->json_decode_code[$row['countryCode']];
                        include("$two_depth/layout/creator_card.php");
                    }
            ?>
            </ul>
        </div><!--end con_main-->
    </section><!--end user_box_total-->
</section>
<!-- end contents section -->

<?php
    include_once($two_depth.'/layout/index_footer.php');
?>
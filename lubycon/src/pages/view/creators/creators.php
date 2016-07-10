<?php
	require_once './common/Class/database_class.php';
    $db = new Database();
    require_once "./common/Class/json_class.php";
    $json_control = new json_control;
    $job_json = $json_control->json_decode('job',"../data/job.json");
    $job_decode = $json_control->json_decode_code;
    $country_json = $json_control->json_decode('country',"../data/country.json");
    $country_decode = $json_control->json_decode_code;
?>
<div class="main_figure_wrap hidden-mb-b">
    <figure>
        <div class="dark_overlay_small"></div>
        <h2>CREATORS</h2>
    </figure>   <!-- end main_figure -->
</div>
<!-- end main_figure -->
<link href="./pages/view/creators/creators.css" rel="stylesheet" type="text/css" />
<!-- contents page css -->
<section class="container">
    <section class="nav_guide">
        <div class="nav-wrapper"> 
            <select class="locationFilter" data-param="location">
                <option>All Continents</option>
                <option>Africa</option>
                <option>Asia</option>
                <option>Europe</option>
                <option>North America</option>
                <option>South America</option>
                <option>Oceania</option>
            </select>
            <select class="jobFilter" data-param="job">
                <?php
                    $json_control->json_spread_option($job_decode);
                    echo $json_control->json_spread_wrap;
                ?>
            </select>
            <select class="userFilter" data-param="filter">
                <option>New</option>
                <option>Most Like</option>
                <option>Most Download</option>
                <option>Most Comment</option>
            </select>
            <div id="sub_search_bar" class="search-bar">
                <div class="select-box">
                    <select class="searchFilter" data-param="search_filter">
                        <option value="Name">Name</option>
                        <option value="Country">Country</option>
                    </select>
                </div>
                <input type="text" class="search-bar-text" value="Enter the keyword" />
                <button class="search-btn">
                    <i class="fa fa-search"></i>
                </button>
            </div>
        </div>  
    </section>
    <!-- end nav_guide -->
    <section class="con_wrap">
        <!--maybe it will be removed-->
        <div class="con_aside hidden-mb-ib">
            <?php
                if($session->SessionExist()){
                    $db->query = "SELECT * FROM `userbasic` LEFT JOIN `userinfo` on `userbasic`.`userCode` = `userinfo`.`userCode` WHERE `userbasic`.`userCode` = 1 ";
                    $db->askQuery();
                    $myrow = mysqli_fetch_array($db->result);
                    
                    
                    $my_job_origin_select = $job_decode[$myrow['jobCode']]['name'];
                    $my_country_origin_select = $country_decode[$myrow['countryCode']]['name'];

                    $user_img_url = "../../../../Lubycon_Contents/user/$usercode/profile.jpg";
                    $userjob = $my_job_origin_select;
                    $usercity = $myrow['city'];
                    $usercountry = $my_country_origin_select;
                    $language1 = "Korean"; //not yet
                    $language2 = "English"; //not yet
                    include_once("./pages/view/creators/creators_login.php");
                }else{
                    include_once("./pages/view/creators/creators_logout.php");
                }
            ?>
        </div><!--end con_aside-->
        <!--maybe it will be removed-->
        <div id="user_view_main" class="con_main">
            <?php
                $user_img_url = "../../../../Lubycon_Contents/user/41/profile.jpg";
                $user_location_img = "../asset/img/flag_icons/230.png";
                $usercity = "Los Santos";
                $usercountry = "United States";
                $username = "Ssaru";
                $userjob = "Gangster";
                $randCount = rand(200,1500);
                $contents_count = $randCount < 1000 ? $randCount : (string)(round((double)($randCount/1000),1))."K";
                $user_content1 = "../../../../lubycon_Contents/contents/artwork/Hortencia_Puccio20160414050808/thumbnail/thumbnail.jpg";
                $user_content2 = "../../../../lubycon_Contents/contents/threed/Anushree_Dhar20160414050808/thumbnail/thumbnail.jpg";
                $user_content3 = "../../../../lubycon_Contents/contents/threed/Caroline_Davies20160414050808/thumbnail/thumbnail.jpg";
                $temp = 'not yet';
            ?><!--you should change to mySQL later-->
            <ul id="creator_card_wrap">
                <li class="creator_card_in">
                    <div id="bestCreator" class="creators_card">
                        <div class="creator_card_header">
                            <span class="card_label">Creator of The <span class="this_month"><?php echo date("F");?></span></span>
                        </div><!--header-->
                        <div class="creator_card_body">
                            <div class="creator_pic_wrap">
                                <div class="creator_pic"><img src="<?=$user_img_url?>" alt="user_pic"></div>
                                <div class="creator_location_pic"><img src="<?=$user_location_img?>" alt="user_location"></div>
                            </div>
                            <div class="creator_info_wrap">
                                <p class="creator_name"><a href=".//personal_page.php?cate=dashboard&usernum=<?=$usercode?>"><?=$username?></a></p>
                                <p class="creator_job"></i><?=$userjob?></p>
                                <p class="creator_location hidden-mb-b"><i class="fa fa-map-marker"></i><?=$usercity?>, <?=$usercountry?></p>
                                <article class="contents_count hidden-mb-b">
                                    <p class="contents_num"><?=$contents_count?></p>
                                    Contents
                                </article>
                            </div>
                        </div><!--body-->
                        <div class="creator_card_medal">
                            <ul>
                                <li></li>
                            </ul>
                        </div><!--medals-->
                        <div class="creator_card_footer">
                            <ul>
                                <li class="usercontent" data-value="0">
                                    <?php 
                                        echo "<a class='contents_link' href='../contents/contents_view.php?cate=artwork&conno=$temp'>";
                                    ?>
                                    <img src="<?=$user_content1?>" alt="user_content">
                                    </a>
                                </li>
                                <li class="usercontent" data-value="1">
                                    <?php 
                                        echo "<a class='contents_link' href='../contents/contents_view.php?cate=artwork&conno=$temp'>";
                                    ?>
                                    <img src="<?=$user_content2?>" alt="user_content">
                                    </a>
                                </li>
                                <li class="usercontent" data-value="2">
                                    <?php 
                                        echo "<a class='contents_link' href='../contents/contents_view.php?cate=artwork&conno=$temp'>";
                                    ?>
                                    <img src="<?=$user_content3?>" alt="user_content">
                                    </a>
                                </li>
                            </ul>
                        </div><!--footer-->
                    </div><!--bestCreator card-->
                </li>
                <?php
                    $db->query = "SELECT  `userbasic`.`userCode` , `nick` , `jobCode` , `boardCode` , `city` , `countryCode` , `userDirectory` FROM lubyconboard.`artwork` INNER join lubyconuser.`userbasic` INNER join lubyconuser.`userinfo` ON `artwork`.`userCode` = `userbasic`.`userCode` and `userbasic`.`userCode` = `userinfo`.`userCode` ORDER BY `boardCode` DESC";
                    $db->askQuery();
                    while( $row = mysqli_fetch_array($db->result) )
                    {
                        $job_origin_select = $job_decode[$row['jobCode']]['name'];
                        $country_origin_select = $country_decode[$row['countryCode']]['name'];
                        include("./component/view/creator_card/creator_card.php");
                    }
                ?>
            </ul>
        </div><!--end con_main-->
    </section><!--end user_box_total-->
</section>
<!-- end contents section -->
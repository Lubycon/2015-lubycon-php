<?php
	/*require_once './common/Class/database_class.php';
    $db = new Database();
    require_once "./common/Class/json_class.php";
    $json_control = new json_control;
    $job_json = $json_control->json_decode('job',"../data/job.json");
    $job_decode = $json_control->json_decode_code;
    $country_json = $json_control->json_decode('country',"../data/country.json");
    $country_decode = $json_control->json_decode_code;*/
?>
<link href="./pages/view/creators/creators.css" rel="stylesheet" type="text/css" />
<script src="./component/view/creator_card/creator_card.tmpl.js" type="text/javascript"></script>
<script type="text/javascript" src="./pages/controller/creators/creators_page_renderer.js"></script>

<div class="main_figure_wrap hidden-mb-b">
    <figure>
        <div class="dark_overlay_small"></div>
        <h2>CREATORS</h2>
    </figure>   <!-- end main_figure -->
</div>
<!-- end main_figure -->

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
                    /*$json_control->json_spread_option($job_decode);
                    echo $json_control->json_spread_wrap;*/
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
        <div id="user_view_main" class="con_main">
            <?php
                /*$user_img_url = "../../../../Lubycon_Contents/user/41/profile.jpg";
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
                $temp = 'not yet';*/
            ?><!--you should change to mySQL later-->
            <ul id="creator_card_wrap">
                <!--CREATOR CARD-->
                <?php
                    /*$db->query = "SELECT  `userbasic`.`userCode` , `nick` , `jobCode` , `boardCode` , `city` , `countryCode` , `userDirectory` FROM lubyconboard.`artwork` INNER join lubyconuser.`userbasic` INNER join lubyconuser.`userinfo` ON `artwork`.`userCode` = `userbasic`.`userCode` and `userbasic`.`userCode` = `userinfo`.`userCode` ORDER BY `boardCode` DESC";
                    $db->askQuery();
                    while( $row = mysqli_fetch_array($db->result) )
                    {
                        $job_origin_select = $job_decode[$row['jobCode']]['name'];
                        $country_origin_select = $country_decode[$row['countryCode']]['name'];
                        include("./component/view/creator_card/creator_card.php");
                    }*/
                ?>
            </ul>
        </div><!--con_main-->
    </section><!--user_box_total-->
</section>
<!--contents section -->
<?php
    $one_depth = '../..'; //css js load
    $two_depth = '..'; // php load
    include_once('../layout/index_header.php');
    
    require_once "../class/json_class.php";
    $json_control = new json_control;
?>
<script type="text/javascript" src="<?=$one_depth?>/js/module/infinite_scroll.js"></script> <!-- scroll js -->

<div class="main_figure_wrap hidden-mb-b">
    <figure id="main_figure">
        <div class="dark_overlay_small"></div>
        <h2>CONTENTS</h2>
    </figure>	<!-- end main_figure -->
</div>
<link href="<?=$one_depth?>/css/contents_page.css" rel="stylesheet" type="text/css" />  <!-- contents page css -->
<section class="container">
    <section class="navsel hidden-mb-b">
        <nav class="lnb_nav">
            <ul>
                <li class="nav_menu" id="all">
                    <a href="./contents_page.php?cate=all">All</a>
                </li>
                <li class="nav_menu" id="artwork">
                    <a href="./contents_page.php?cate=artwork">Artwork</a>
                </li>
                <li class="nav_menu" id="vector">
                    <a href="./contents_page.php?cate=vector">Vector</a>
                </li>
                <li class="nav_menu" id="threed"> 
                    <a href="./contents_page.php?cate=threed">3D</a>
                </li>
            </ul>
        </nav>  <!-- end lnb nav -->
    </section>  <!-- end section -->


    <section class="nav_guide">
        <div class="nav-wrapper">
            <select class="categoryFilter">
            <?php
                $current_url = $_GET["cate"];//change to db query later
                $json_control->json_decode($current_url.'_category',"$one_depth/data/middle_category.json");
                $middle_cate_decode = $json_control->json_decode_code;
                foreach ($middle_cate_decode AS $index=>$value)
                {
                    $loop_value = $value;
                    echo "<option value='$loop_value' data-value='$loop_value'>$loop_value</option>";
                }
            ?>
            </select>
            <select class="preferFilter">
                <option>Featured</option>
                <option>Recent</option>
                <option>Most Like</option>
                <option>Most Download</option>
                <option>Most Comment</option>
            </select>
            <select class="copyrightFilter">
                <option>All License</option>
                <option>Free</option>
                <option>Non-Commercial</option>
                <option>Non-Derivative</option>
            </select>
            <div id="sub_search_bar">
                <div class="select_box">
                    <select class="searchFilter">
                        <option value="Title">Title</option>
                        <option value="Creator">Creator</option>
                        <option value="Tag">Tag</option>
                    </select>
                </div>
                <input type="text" id="sub_search_text" value="Enter the Keyword" />
                <button id="sub_search_btn">
                    <i class="fa fa-search"></i>
                </button>
            </div>
        </div><!--subnav_box end-->
    </section>
    <section id="contents_box" class="con_wrap">
        <ul>
            <?php
            $allow_array = ['all','artwork','vector','threed'];
            $cate_name = $_GET['cate'];
            if( in_array($_GET['cate'] , $allow_array) )
            {
	            require_once "$two_depth/database/database_class.php";
	            $db = new Database();

                $json_control->json_decode('top_category',"$one_depth/data/top_category.json");
                $top_cate_decode = $json_control->json_decode_code;
                
                $query;
                $cate_name;
                $query_all = "SELECT * FROM lubyconboard.`artwork` INNER join lubyconuser.`userbasic` INNER join lubyconuser.`userinfo` ON `artwork`.`userCode` = `userbasic`.`userCode` and `userbasic`.`userCode` = `userinfo`.`userCode` UNION SELECT * FROM lubyconboard.`vector` INNER join lubyconuser.`userbasic` INNER join lubyconuser.`userinfo` ON `vector`.`userCode` = `userbasic`.`userCode` and `userbasic`.`userCode` = `userinfo`.`userCode` UNION SELECT * FROM lubyconboard.`threed` INNER join lubyconuser.`userbasic` INNER join lubyconuser.`userinfo` ON `threed`.`userCode` = `userbasic`.`userCode` and `userbasic`.`userCode` = `userinfo`.`userCode` ORDER BY `boardCode` DESC ";
                $query_one = "SELECT * FROM lubyconboard.`$cate_name` , lubyconuser.`userbasic` , lubyconuser.`userinfo` WHERE lubyconboard.`$cate_name`.`userCode` = lubyconuser.`userbasic`.`userCode` AND lubyconuser.`userbasic`.`userCode` = lubyconuser.`userinfo`.`userCode`ORDER BY lubyconboard.`$cate_name`.`boardCode` DESC";
                
                if($cate_name == 'all')
                {
                    $db->query = $query_all;
                }else if($cate_name == 'artwork' ||$cate_name == 'vector' || $cate_name='threed')
                {
                    $db->query = $query_one;
                }
		        $db->askQuery();

                while( $row = mysqli_fetch_array($db->result) )
                {
                    $top_cagegory = $top_cate_decode[$row['CategoryCode']];
                    include('../layout/content_card.php');
                }
            }else
            {
                include_once('../../404.php');
            }
            ?>
        </ul>
    </section>  <!-- end contents box -->
</section>  <!-- end contents section -->

<?php
    include_once($two_depth.'/layout/index_footer.php');
?>
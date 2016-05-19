<?php
    $one_depth = '../..'; //css js load
    $two_depth = '..'; // php load
    include_once('../layout/index_header.php');
    require_once "$two_depth/database/database_class.php";
    $db = new Database();
    require_once "../class/json_class.php";
    $json_control = new json_control;

$allow_array = ['all','artwork','vector','threed'];
$cate_name = $_GET['cate'];
if( in_array($_GET['cate'] , $allow_array) )
{
    $json_control->json_decode('top_category',"$one_depth/data/top_category.json");
    $top_cate_decode = $json_control->json_decode_code;

    $query;
    $cate_name;
    $page = ($_GET['page'] - 1) * 30;
    $contents_limit = 30;
    $query_all = "SELECT SQL_CALC_FOUND_ROWS * FROM lubyconboard.`artwork` INNER join lubyconuser.`userbasic` INNER join lubyconuser.`userinfo` ON `artwork`.`userCode` = `userbasic`.`userCode` and `userbasic`.`userCode` = `userinfo`.`userCode` UNION SELECT * FROM lubyconboard.`vector` INNER join lubyconuser.`userbasic` INNER join lubyconuser.`userinfo` ON `vector`.`userCode` = `userbasic`.`userCode` and `userbasic`.`userCode` = `userinfo`.`userCode` UNION SELECT * FROM lubyconboard.`threed` INNER join lubyconuser.`userbasic` INNER join lubyconuser.`userinfo` ON `threed`.`userCode` = `userbasic`.`userCode` and `userbasic`.`userCode` = `userinfo`.`userCode` ORDER BY `boardCode` DESC limit $page,$contents_limit";
    $query_one = "SELECT SQL_CALC_FOUND_ROWS * FROM lubyconboard.`$cate_name` , lubyconuser.`userbasic` , lubyconuser.`userinfo` WHERE lubyconboard.`$cate_name`.`userCode` = lubyconuser.`userbasic`.`userCode` AND lubyconuser.`userbasic`.`userCode` = lubyconuser.`userinfo`.`userCode`ORDER BY lubyconboard.`$cate_name`.`boardCode` DESC limit $page,$contents_limit";
    $query_foundRow = "SELECT FOUND_ROWS()";
    if($cate_name == 'all')
    {
        $db->query = $query_all;
    }else if($cate_name == 'artwork' ||$cate_name == 'vector' || $cate_name='threed')
    {
        $db->query = $query_one;
    }
    $db->askQuery();
    $contents_data = $db->result; //contents data

    $db->query = $query_foundRow;
    $db->askQuery();
    $foundRow_result = mysqli_fetch_array($db->result); //row count
    $all_page_count = ceil($foundRow_result[0] / 30);
}else
{
    include_once('../../404.php');
}
?>
<script type="text/javascript" src="<?=$one_depth?>/js/module/infinite_scroll.js"></script> <!-- scroll js -->
<script type="text/javascript" src="<?=$one_depth?>/js/contents_page.js"></script> <!-- scroll js -->
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
                    <a href="./contents_page.php?cate=all&page=1">All</a>
                </li>
                <li class="nav_menu" id="artwork">
                    <a href="./contents_page.php?cate=artwork&page=1">Artwork</a>
                </li>
                <li class="nav_menu" id="vector">
                    <a href="./contents_page.php?cate=vector&page=1">Vector</a>
                </li>
                <li class="nav_menu" id="threed"> 
                    <a href="./contents_page.php?cate=threed&page=1">3D</a>
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
            <div id="sub_search_bar" class="search-bar">
                <div class="select-box">
                    <select class="searchFilter">
                        <option value="Title">Title</option>
                        <option value="Creator">Creator</option>
                        <option value="Tag">Tag</option>
                    </select>
                </div>
                <input type="text" class="search-bar-text" value="Enter the Keyword" />
                <button class="search-btn">
                    <i class="fa fa-search"></i>
                </button>
            </div>
        </div><!--subnav_box end-->
    </section>
    <section id="contents_box" class="con_wrap">
        <p>
            <select id="contents_pager" class="searchFilter">
            <?php
                for($i = 1 ; $i<=$all_page_count ; $i++ )
                {
                    echo "<option data-value='$i'>$i</option>";
                }
            ?>
            </select>move to page
        </p>
        <ul>
            <?php
                if($contents_data->num_rows != 0)
                {
                    while( $row = mysqli_fetch_array($contents_data) )
                    {
                        $top_category = $top_cate_decode[$row['CategoryCode']];
                        include('../layout/content_card.php');
                    }   
                }else
                {
                    echo "<p class='finish_contents'>no more contents :)</p>";
                }
                
                $cookie_string = $_COOKIE['contents_history'];
                parse_str ($cookie_string , $cookie_parse );
                $cookie_contents_number = $cookie_parse['cate'].'_'.$cookie_parse['conno'];
                if( $cate_name == $cookie_parse['cate'] && $_GET['page'] == $cookie_parse['page'])
                {
                    echo "<script>scroll_from_cookie('$cookie_contents_number');</script>";
                }else
                {
                    setCookie('contents_history','',time()-3600,"/");  // cookie delete
                }

            ?>
        </ul>
    </section>  <!-- end contents box -->
</section>  <!-- end contents section -->

<?php
    include_once($two_depth.'/layout/index_footer.php');
?>
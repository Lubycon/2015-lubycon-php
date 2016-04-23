<?php
    $one_depth = '../..'; //css js load
    $two_depth = '..'; // php load
    include_once('../layout/index_header.php');
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
                <li class="nav_menu" id="3d"> 
                    <a href="./contents_page.php?cate=3d">3D</a>
                </li>
            </ul>
        </nav>  <!-- end lnb nav -->
    </section>  <!-- end section -->


    <section class="nav_guide">
        <div class="nav-wrapper">
            <select class="categoryFilter">
            <?php
                $current_url = $_GET["cate"];//change to db query later
                switch($current_url){
                    case "all" : include_once("./php/sub_nav/categories/category_default.php"); break;
                    case "artwork" : include_once("./php/sub_nav/categories/category_artwork.php"); break;
                    case "vector" : include_once("./php/sub_nav/categories/category_vector.php"); break;
                    case "3d" : include_once("./php/sub_nav/categories/category_3d.php"); break;
                    default : include_once(""); break;
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
            $allow_array = ['all','artwork','vector','3d'];

            if( in_array($_GET['cate'] , $allow_array) )
            {
	            require_once '../database/database_class.php';
	            $db = new Database();

                switch($_GET['cate']){ //check category
                case 'artwork' : $contents_cate = 1; $cate_name = 'artwork'; break;
                case 'vector' : $contents_cate = 2; $cate_name = 'vector'; break;
                case '3d' : $contents_cate = 3; $cate_name = 'threed'; break;
                default : $contents_cate = 1;  break;
                };

                $db->query =
                "SELECT * 
                FROM lubyconboard.`$cate_name` 
                INNER join lubyconuser.`userbasic` 
                INNER join lubyconuser.`userinfo` 
                on `$cate_name`.`userCode` = `userbasic`.`userCode` and `userbasic`.`userCode` = `userinfo`.`userCode`
                ORDER BY `$cate_name`.`boardCode` DESC";
		        $db->askQuery();

                while( $row = mysqli_fetch_array($db->result) )
                {
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
<script type="text/javascript" src="js/module/infinite_scroll.js"></script> <!-- scroll js -->

<div class="main_figure_wrap hidden-mb-b">
    <figure id="main_figure">
        <div class="dark_overlay_small"></div>
        <h2>CONTENTS</h2>
    </figure>	<!-- end main_figure -->
</div>
<link href="css/contents_page.css" rel="stylesheet" type="text/css" />  <!-- contents page css -->
<section id="contents">
    <section id="navsel" class="hidden-mb-b">
        <nav id="lnb_nav">
            <ul>
                <li class="nav_menu" id="all">
                    <a href="./index.php?1=contents&2=contents_page&3=all">All</a>
                </li>
                <li class="nav_menu" id="artwork">
                    <a href="./index.php?1=contents&2=contents_page&3=artwork">Artwork</a>
                </li>
                <li class="nav_menu" id="vector">
                    <a href="./index.php?1=contents&2=contents_page&3=vector">Vector</a>
                </li>
                <li class="nav_menu" id="3d"> 
                    <a href="./index.php?1=contents&2=contents_page&3=3d">3D</a>
                </li>
            </ul>
        </nav>  <!-- end lnb nav -->
    </section>  <!-- end section -->


    <section class="nav_guide">
        <div class="subnav_box">
            <select class="categoryFilter">
            <?php
                $current_url = $_GET["3"];//change to db query later
                switch($current_url){
                    case "artwork" : include_once("./php/sub_nav/categories/category_artwork.php"); break;
                    case "vector" : include_once("./php/sub_nav/categories/category_vector.php"); break;
                    case "3d" : include_once("./php/sub_nav/categories/category_3d.php"); break;
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
            for($i=0;$i<60;$i++)
            {
                $third_param = $_GET['3'];
                $_GET["number"] = $i;
                include('php/layout/content_card.php');
            }
            ?>
        </ul>
    </section>  <!-- end contents box -->
</section>  <!-- end contents section -->

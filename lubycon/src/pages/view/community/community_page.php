<?php
    $one_depth = '../..'; //css js load
    $two_depth = '..'; // php load
    include_once('../layout/index_header.php');
?>

<script type="text/javascript" src="<?=$one_depth?>/js/module/community_infinite_scroll.js"></script> <!-- scroll js -->

<div class="main_figure_wrap hidden-mb-b">
    <figure>
        <div class="dark_overlay_small"></div>
        <h2>COMMUNITY</h2>
    </figure>   <!-- end main_figure -->
</div>
<!-- end main_figure -->

<link href="../../css/community.css" rel="stylesheet" type="text/css" />

<!-- contents page css -->
<section class="container">
    <section class="navsel hidden-mb-b">
        <nav class="lnb_nav">
            <ul>
                <li class="nav_menu" id="forum">
                    <a href="../community/community_page.php?cate=forum">Forum</a>
                </li>
                <li class="nav_menu" id="tutorial">
                    <a href="../community/community_page.php?cate=tutorial">Tutorial</a>
                </li>
                <li class="nav_menu" id="qaa">
                    <a href="../community/community_page.php?cate=qaa">Q&amp;A</a>
                </li>
            </ul>
        </nav>
        <!-- end lnb nav -->
    </section>
    <section class="nav_guide">
        <div class="nav-wrapper"> 
            <select class="preferFilter" data-param="filter">
                <option>Featured</option>
                <option>Recent</option>
                <option>Most Like</option>
                <option>Most Download</option>
                <option>Most Comment</option>
            </select>
            <div id="sub_search_bar" class="search-bar">
                <div class="select-box">
                    <select class="searchFilter" data-param="search_filter">
                        <option value="Title">Title</option>
                        <option value="Creator">Creator</option>
                    </select>
                </div>
                <input type="text" class="search-bar-text" value="Enter the keyword" />
                <button class="search-btn">
                    <i class="fa fa-search"></i>
                </button>
            </div>
        </div><!--subnav_box end-->
    </section>
    <!-- end nav_guide -->
    <section class="con_wrap">
        <?php
            $allow_array = ['forum','tutorial','qaa'];

            if( in_array($_GET['cate'] , $allow_array) )
            {
                include("../layout/main_board.php");
            }else
            {
                include_once('../../404.php');
            }
        ?><!--end main_board section -->
    </section>
    <a id="write_bt" class="write_bt" href="../community/community_editor.php?cate=<?=$_GET['cate']?>">
        <i class="fa fa-plus"></i>
    </a>
</section>
<!-- end contents section -->

<?php
    include_once($two_depth.'/layout/index_footer.php');
?>
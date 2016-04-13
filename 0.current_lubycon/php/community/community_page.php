<?php
    $one_depth = '../..'; //css js load
    $two_depth = '..'; // php load
    include_once('../layout/index_header.php');
?>

<script type="text/javascript" src="<?=$one_depth?>/js/module/community_infinite_scroll.js"></script> <!-- scroll js -->

<div class="main_figure_wrap hidden-mb-b">
    <figure id="main_figure">
        <div class="dark_overlay_small"></div>
        <h2>COMMUNITY</h2>
    </figure>   <!-- end main_figure -->
</div>
<!-- end main_figure -->

<link href="../../css/community.css" rel="stylesheet" type="text/css" />
<script src="../../js/community.js" type="text/javascript"></script>

<!-- contents page css -->
<section class="container">
    <section class="navsel hidden-mb-b">
        <nav class="lnb_nav">
            <ul>
                <li class="nav_menu" id="forum">
                    <a href="../community_page?cate=forum">Forum</a>
                </li>
                <li class="nav_menu" id="tutorial">
                    <a href="../community_page?cate=tutorial">Tutorial</a>
                </li>
                <li class="nav_menu" id="qna">
                    <a href="../community_page?cate=qna">Q&amp;A</a>
                </li>
            </ul>
        </nav>
        <!-- end lnb nav -->
        <!-- end select box -->
    </section>
    <section class="nav_guide">
        <div class="nav-wrapper"> 
            <select class="preferFilter hidden-mb-ib">
                <option>Featured</option>
                <option>Recent</option>
                <option>Most Like</option>
                <option>Most Download</option>
                <option>Most Comment</option>
            </select>
            <select class="languageFilter hidden-mb-ib">
                <option>All Language</option>
                <option>English</option>
                <option>Korean</option>
                <option>Japanese</option>
                <option>Chinese</option>
                <option>French</option>
            </select>
            <div id="sub_search_bar">
                <div class="select_box">
                    <select class="searchFilter">
                        <option value="Title">Title</option>
                        <option value="Creator">Creator</option>
                    </select>
                </div>
                <input type="text" id="sub_search_text" value="Enter the Keyword" />
                <button id="sub_search_btn">
                    <i class="fa fa-search"></i>
                </button>
            </div>
        </div><!--subnav_box end-->
    </section>
    <!-- end nav_guide -->
    <section class="con_wrap">
        <?php
            include("../layout/main_board.php");
        ?><!--end main_board section -->
    </section>
    <a href="./community_write.php?cate=<?=$_GET[cate]?>">
        <span id="write_bt" class="out animate_opacity write_bt"><i class="fa fa-plus"></i></span>
    </a>
</section>
<!-- end contents section -->

<?php
    include_once($two_depth.'/layout/index_footer.php');
?>
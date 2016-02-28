<script type="text/javascript" src="js/community_infinite_scroll.js"></script> <!-- scroll js -->

<div class="main_figure_wrap hidden-mb-b">
    <figure id="main_figure">
        <div class="dark_overlay_small"></div>
        <h2>COMMUNITY</h2>
    </figure>   <!-- end main_figure -->
</div>
<!-- end main_figure -->

<link href="css/community.css" rel="stylesheet" type="text/css" />
<script src="js/community.js" type="text/javascript"></script>

<!-- contents page css -->
<section id="contents">
    <section id="navsel" class="hidden-mb-b">
        <nav id="lnb_nav">
            <ul>
                <li class="nav_menu" id="forum">
                    <a href="./index.php?1=community&2=community_page&3=forum">Forum</a>
                </li>
                <li class="nav_menu" id="tutorial">
                    <a href="./index.php?1=community&2=community_page&3=tutorial">Tutorial</a>
                </li>
                <li class="nav_menu" id="qna">
                    <a href="./index.php?1=community&2=community_page&3=qna">Q&amp;A</a>
                </li>
            </ul>
        </nav>
        <!-- end lnb nav -->
        <!-- end select box -->
    </section>
    <section class="nav_guide">
        <div class="subnav_box"> 
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
                <span class="ls_arrow"><i class="fa fa-caret-down"></i></span>
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
            include("./php/layout/main_board.php");
        ?><!--end main_board section -->
    </section>
    <a>
        <span id="write_bt" class="out animate_opacity write_bt"><i class="fa fa-plus"></i></span>
        <span class="write_bt_background write_bt"></span>
    </a>
    <div class="tooltip_bt">Write</div>
</section>
<!-- end contents section -->

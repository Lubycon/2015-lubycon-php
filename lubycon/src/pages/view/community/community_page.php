
<link href="./pages/view/community/community.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="./pages/controller/community/community_page_renderer.js"></script>
<div class="main_figure_wrap hidden-mb-b">
    <figure>
        <div class="dark_overlay_small"></div>
        <h2>COMMUNITY</h2>
    </figure>   <!-- end main_figure -->
</div>
<!-- contents page css -->
<section class="container">
    <section class="navsel hidden-mb-b">
        <nav class="lnb_nav">
            <ul>
                <li class="nav_menu" data-value="0">
                    <a href="?dir=pages/view/community/community_page&cate=0&page=1">Forum</a>
                </li>
                <li class="nav_menu" data-value="1">
                    <a href="?dir=pages/view/community/community_page&cate=1&page=1">Tutorial</a>
                </li>
                <li class="nav_menu" data-value="2">
                    <a href="?dir=pages/view/community/community_page&cate=2&page=1">Q&amp;A</a>
                </li>
            </ul>
        </nav>
        <!-- end lnb nav -->
    </section>
    <section class="nav_guide">
        <div class="nav-wrapper">
            <select class="preferFilter" data-param="filter">
                <option selected="selected">Recent</option>
                <option>Featured</option>
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
        <!--MAINBOARD-->
    </section>
    <a id="write_bt" class="write_bt" href="?dir=pages/view/community/community_editor&cate=">
        <i class="fa fa-plus"></i>
    </a>
</section>

<div class="main_figure_wrap hidden-mb-b">
    <figure>
        <div class="dark_overlay_small"></div>
        <h2>PERSONAL PAGE</h2>
    </figure>   <!-- end main_figure -->
</div>
<!-- end main_figure -->
<link href="./pages/view/personal_page/personal_page.css" rel="stylesheet" type="text/css" />
<script src="./pages/controller/personal_page/personal_page_renderer.js"></script>
<!-- personal page css -->
<section class="container">
    <section class="nav_guide hidden-mb-b">
        <!-- end lnb nav -->
    </section>
    <section id="personal_view">
        <section class="con_wrap">
            <aside id="personal_aside" class="con_aside">
                <div id="user_information">
                    <div id="userinfo_main">
                        <figure id="user_pic">
                            <img src="#"></img>
                        </figure>
                        <span id="user-info">
                            <h4 id="user-name"></h4>
                            <h5 id="user-location"><i class="fa fa-map-marker"></i></h5>
                        </span>
                        <h5 id="user-intro"><p></p></h5>
                        <span id="user-setting">
                            <!--user menu-->
                        </span>
                    </div>
                </div>
                <div id="subnav" class="hidden-mb-b">
                    <ul>
                        <li class="subnav_li" data-value="dashboard">
                            <a href="#">Dashboard</a>
                        </li>
                        <li class="subnav_li" data-value="my_contents">
                            <a href="#">Contents</a>
                        </li>
                        <li class="subnav_li" data-value="my_forums">
                            <a href="#">Forums</a>
                        </li>
                        <li class="subnav_li" data-value="insight">
                            <a href="#">Insight</a>
                        </li>
                        <li class="subnav_li" data-value="bookmark">
                            <a href="#">Bookmark</a>
                        </li>
                    </ul>
                </div>
            </aside>
            <section id="contents_box" class="personal con_main">
            <?php
                $allow_array = ['dashboard','my_contents','my_forums','insight','bookmark'];
                $pageName = $allow_array[$_GET['cate']];

                if( in_array($pageName , $allow_array) ){
                    include_once("./pages/view/personal_page/$pageName.php");
                }else {
                    include_once('./service/view/error/404.php');
                }
            ?>
            </section><!--end con_main-->
        </section><!--end con_wrap-->
    </section><!--end personal_view-->
</section><!-- end contents section -->

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
                            <a href="#">
                                <i class="fa fa-gear fa-1x"></i>
                            </a>
                        </span><!--user menu-->
                    </div> 
                </div>
                <div id="subnav" class="hidden-mb-b">
                    <ul>
                        <li id="dashboard" class="subnav_li"><a href="?dir=pages/view/personal_page/personal_page&cate=dashboard&usernum=<?=$usernumber?>">Dashboard</a></li>
                        <li id="my_contents" class="subnav_li"><a href="?dir=pages/view/personal_page/personal_page&cate=my_contents&usernum=<?=$usernumber?>&page=1">Contents</a></li>
                        <li id="my_forums" class="subnav_li"><a href="?dir=pages/view/personal_page/personal_page&cate=my_forums&usernum=<?=$usernumber?>">Forums</a></li>
                        <li id="insight" class="subnav_li"><a href="?dir=pages/view/personal_page/personal_page&cate=insight&usernum=<?=$usernumber?>">Insight</a></li>
                        <li id="bookmark" class="subnav_li"><a href="?dir=pages/view/personal_page/personal_page&cate=bookmark&usernum=<?=$usernumber?>&page=1">Bookmark</a></li>           
                    </ul>
                </div>
            </aside>
            <section id="contents_box" class="personal con_main">
            <?php
                $allow_array = ['dashboard','my_contents','my_forums','insight','bookmark'];

                if( in_array($_GET['cate'] , $allow_array) )
                {
                    include_once('./pages/view/personal_page/'.$_GET['cate'].'.php');
                }else
                {
                    include_once('.service/view/error/404.php');
                }
            ?>
            </section><!--end con_main-->
        </section><!--end con_wrap-->
    </section><!--end personal_view-->
</section><!-- end contents section -->
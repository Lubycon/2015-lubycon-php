<div class="main_figure_wrap hidden-mb-b">
    <figure>
        <div class="dark_overlay_small"></div>
        <h2>PERSONAL PAGE</h2>
    </figure>   <!-- end main_figure -->
</div>
<!-- end main_figure -->
<link href="./pages/view/personal_page/personal_page.css" rel="stylesheet" type="text/css" />

<!-- personal page css -->
<section class="container">
    <section class="nav_guide hidden-mb-b">
        <!-- end lnb nav -->
    </section>
    <section id="personal_view">
        <section class="con_wrap">
            <?php
                include_once("./component/view/personal/personal_menu.php");
            ?><!--end con_aside-->
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
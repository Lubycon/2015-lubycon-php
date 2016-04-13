<?php
    $one_depth = '../..'; //css js load
    $two_depth = '..'; // php load
    include_once('../layout/index_header.php');
?>
<div class="main_figure_wrap hidden-mb-b">
    <figure id="main_figure">
        <div class="dark_overlay_small"></div>
        <h2>PERSONAL PAGE</h2>
    </figure>   <!-- end main_figure -->
</div>
<!-- end main_figure -->
<link href="<?=$one_depth?>/css/personal_page.css" rel="stylesheet" type="text/css" />

<!-- personal page css -->
<section class="container">
	<section class="nav_guide hidden-mb-b">
        <!-- end lnb nav -->
    </section>
    <section id="personal_view">
    	<section class="con_wrap">
		    <?php
		    	include_once($two_depth."/layout/personal_menu.php");
		    ?><!--end con_aside-->
		    <section id="contents_box" class="personal con_main">
            <?php
                include_once('./'.$_GET['cate'].'.php');
            ?>
		    </section><!--end con_main-->
		</section><!--end con_wrap-->
	</section><!--end personal_view-->
</section><!-- end contents section -->

<?php
    include_once($two_depth.'/layout/index_footer.php');
?>

<link href='https://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'>
<link href="./pages/view/index/index.css" rel="stylesheet" type="text/css" />  <!-- index file css -->
<link href="../plugin/JS/lubyImageSlider.css" rel="stylesheet" type="text/css" />
<script src="../plugin/JS/jquery.lubyImageSlider.js" type="text/javascript" ></script>
<script src="./pages/controller/index/index_body_renderer.js"></script>
<div id="index_figure_wrap" class="main_figure_wrap hidden-mb-b">
    <figure>
        <h2>Connect your <b>Creativity</b> with the <b>World</b></h2>
    </figure>
</div>
<!-- end main_figure -->

<?php 
    include_once "./pages/view/index/index_body.mobile.php";
?>

<!-- index page slider plugin -->
<section id="slide_section" class="index_pre_body hidden-mb-b">
    <nav id="slide_lnb">
        <div class="btn radioType selected" data-value="1">ARTWORK</div>
        <div class="btn radioType" data-value="2">VECTOR</div>
        <div class="btn radioType" data-value="3">3D MODEL</div>
    </nav>
    <div class="main-slider-wrapper">
        <!--MAIN SLIDER-->
    </div>
</section>
<!--CREAOR OF THE MONTH-->
<section class="index_pre_body hidden-mb-b">
    <div class="index_pre_wrap">
        <div class="index_pre_title">
            <i class="fa fa-trophy"></i>   
            <article><b>CREATOR</b> OF THE MONTH</article>
        </div>
        <div class="index_pre_inner">
            <div id="creator_info">
                <figure id="creator_info_background"></figure>
                <div id="creator_info_p">
                    <ul>
                        <li id="creator_name">LoveHara</li>
                        <li id="creator_job">Godness</li>
                        <li id="creator_location"><i class="fa fa-map-marker"></i><p>Seoul, South korea</p></li>
                    </ul>
                    <div class="viewmore_bt"><a href="?dir=pages/view/creators/creators&1=creators_page&2=creators">READ INTERVIEW</a></div>
                </div>
            </div>
            <div id="creator_desc">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
                    Cras commodo lacus at lacus bibendum imperdiet.<br />
                    Quisque in accumsan turpis. Nullam non lacus nec enim convallis iaculis.<br />
                    Vivamus a sodales sapien. Curabitur suscipit ullamcorper enim, quis hendrerit nunc tempus eu.<br />
                    Nunc porttitor mauris sapien, quis molestie quam placerat sit amet.<br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
                </p>
            </div>
        </div>  
    </div>
</section>
<!--creator of the month end-->

<section class="index_pre_body hidden-mb-b">
    <div class="index_pre_wrap">
        <div class="index_pre_title">
            <i class="fa fa-volume-up"></i>   
            <article><b>HOT TOPICS</b> OF THE MONTH</article>
        </div>
        <div class="index_pre_inner">
            <ul class="forum_cards">
                <?php
                    $db->query = "SELECT boardCode,title,viewCount,likeCount,contents,nick FROM lubyconboard.`forum` LEFT JOIN lubyconuser.`userbasic` ON `forum`.`userCode` = `userbasic`.`userCode` UNION SELECT boardCode,title,viewCount,likeCount,contents,nick FROM lubyconboard.`qaa` LEFT JOIN lubyconuser.`userbasic` ON `qaa`.`userCode` = `userbasic`.`userCode` UNION SELECT boardCode,title,viewCount,likeCount,contents,nick FROM lubyconboard.`tutorial` LEFT JOIN lubyconuser.`userbasic` ON `tutorial`.`userCode` = `userbasic`.`userCode` ORDER BY `viewCount` DESC LIMIT 5 ";
		            $db->askQuery();
                    while( $row = mysqli_fetch_array($db->result) )
                    {
                        include("./pages/view/index/index_forum.php");
                    }
                ?>
            </ul>
        </div>
    </div>
</section>
<!--community preview end-->

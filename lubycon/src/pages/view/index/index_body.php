
<link href='https://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'>
<link href="./pages/view/index/index.css" rel="stylesheet" type="text/css" />  <!-- index file css -->
<link href="../plugin/JS/lubyImageSlider.css" rel="stylesheet" type="text/css" />
<script src="../plugin/JS/jquery.lubyImageSlider.js" type="text/javascript" ></script>
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
        <input class="slide-radio" data-value="1" id="artwork_bt" type="radio" name="tap" checked="checked" />
        <input class="slide-radio" data-value="2" id="vector_bt" type="radio" name="tap" />
        <input class="slide-radio" data-value="3" id="3d_bt" type="radio" name="tap" />
        <nav>
            <label for="artwork_bt" class="la_bt btn radioType selected">ARTWORK</label>
            <label for="vector_bt" class="la_bt btn radioType">VECTOR</label>
            <label for="3d_bt" class="la_bt btn radioType">3D MODEL</label>
        </nav>
        <!-- end nav -->
    </nav>
    <div class="main-slider-wrapper">
    <!--end slide lnb-->
    <?php
        require_once './common/Class/database_class.php';
        $db = new Database();

        for( $i=1 ; $i<4 ; $i++ )//loop slider
        { 
            switch($i) //set query category
            {
                case "1" : $kind = 'artwork'; break;
                case "2" : $kind = 'vector';break;
                case "3" : $kind = 'threed'; break;
                default : break;
            };
            $db->changeDb('lubyconboard');
            $db->query = "select boardCode,userDirectory from `$kind` order by `viewCount` desc limit 30";
		    $db->askQuery();

            echo "<div class='lubyImageSlider' id='slider$i'>";
            echo "<ul>";
            $index = 1;
            while($row = mysqli_fetch_array($db->result)){
                $contents_number = $row['boardCode'];
                $contents_thumb = $row['userDirectory']."/thumbnail/thumbnail.jpg";
                echo "<li class='load_view'>
                        <a href='?dir=pages/controller/contents/contents_view&&cate=$kind&conno=$contents_number'>
                            <img src='$contents_thumb'>
                        </a>
                    </li>";
                if($index == 10 || $index == 20){
                    echo "</ul><ul>";
                }
                $index++;
            }
            echo "</ul></div>";
        }
    ?>
    </div>
    <!-- end slider div -->
</section>
<!--slide section end-->

<!--creator of the month start-->
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

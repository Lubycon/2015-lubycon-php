<script type="text/javascript">
/*
$(function(){
    var browserLanguage;
    if(navigator.appName == "Netscape"){
        browserLanguage = navigator.language;
    }
    else{
        browserLanguage = navigator.browserLanguage;
    }
    var langCode = browserLanguage.substr(0,2);
    switch(langCode){
        case "zh" : alert("Chinese"); break;
        case "en" : alert("English"); break;
        case "fr" : alert("French"); break;
        case "de" : alert("German"); break;
        case "ja" : alert("Japanese"); break;
        case "ko" : alert("Korean"); break;
        case "ru" : alert("Russian"); break;
        case "es" : alert("Spanish"); break;
        default : alert("Sorry, This Language was not provided. You will go to English page");
    }
});
*/
</script>
<link href="css/index.css" rel="stylesheet" type="text/css" />  <!-- index file css -->
<div id="index_figure_wrap" class="main_figure_wrap hidden-mb-b">
    <figure id="index_figure">
        <h2>Connect Your Creativity With The World</h2>
    </figure>
</div>
<!-- end main_figure -->
<!--index contents page for mobile start-->
<section class="mobile_wrap visible-mb">
    <?php
        $artwork_count = 0;
        $vector_count = 0;
        $threeD_count = 0;
    ?>
    <section class="mb-contents_wrap">
        <div class="mb-contents_inner">
            <div class="mb-contents_title">
                <i class="fa fa-font"></i>
                <h1>ARTWORK</h1>
                <p class="mb-contents_count"><?=$artwork_count?>&nbsp;Contents</p>
            </div>
            <div class="mb-big_content">
                <!--<img src="../../Lubycon_Contents/contents/artwork/artworkjpg/thumb/5.jpg" alt="best_img">-->
            </div>
            <div class="mb-contents_contents">
                <?php
                    /*for( $i=1 ; $i<=4 ; $i++ ){
                        echo '<div class="mb-contents">
                                <img src="../../Lubycon_Contents/contents/artwork/artworkjpg/thumb/'.$i.'.jpg" alt="artwork_thumbnail'.$i.'">
                              </div>';
                    };*/
                ?> 
            </div>
            <div class="mb-contents_footer">
                <div class="mb-view_more" id="mb-artwork_bt"><p>VIEW MORE</p></div>
            </div>
        </div><!--section 1 end-->
        <div class="mb-contents_inner">
            <div class="mb-contents_title">
                <i class="fa fa-square"></i>
                <h1>VECTOR</h1>
                <p class="mb-contents_count"><?=$vector_count?>&nbsp;Contents</p>
            </div>
            <div class="mb-big_content">
                <!--<img src="../../Lubycon_Contents/contents/vector/vectorjpg/thumb/7.jpg" alt="best_img">-->
            </div>
            <div class="mb-contents_contents">
                <?php
                    /*for( $i=1 ; $i<=4 ; $i++ ){
                        echo '<div class="mb-contents">
                                <img src="../../Lubycon_Contents/contents/vector/vectorjpg/thumb/'.$i.'.jpg" alt="vector_thumbnail'.$i.'">
                              </div>';
                    };*/
                ?>
            </div>
            <div class="mb-contents_footer">
                <<div class="mb-view_more" id="mb-vector_bt"><p>VIEW MORE</p></div>
            </div>
        </div><!--section 2 end-->
        <div class="mb-contents_inner">
            <div class="mb-contents_title">
                <i class="fa fa-cube"></i>
                <h1>3D MODEL</h1>
                <p class="mb-contents_count"><?=$threeD_count?>&nbsp;Contents</p>
            </div>
            <div class="mb-big_content">
                <!--<img src="../../Lubycon_Contents/contents/3d/3djpg/thumb/5.jpg" alt="best_img">-->
            </div>
            <div class="mb-contents_contents">
                <?php
                    /*for( $i=1 ; $i<=4 ; $i++ ){
                        echo '<div class="mb-contents">
                                <img src="../../Lubycon_Contents/contents/3d/3djpg/thumb/'.$i.'.jpg" alt="3d_thumbnail'.$i.'">
                              </div>';
                    };*/
                ?>  
            </div>
            <div class="mb-contents_footer">
                <div class="mb-view_more" id="mb-3d_bt"><p>VIEW MORE</p></div>
            </div>
        </div><!--section 3 end-->
    </section>
</section>
<!--index contents page for mobile end-->


<!-- main slider js -->
<!-- index page slider plugin -->
<script>
    jQuery(document).ready(function ($) {
        if(windowWidth > 1024){
            var _SlideshowTransitions = [{ $Duration: 1200, $Opacity: 2 }]; //Fade
            var options = {
                $AutoPlay: true,                                    //[Optional] Whether to auto play, to enable slideshow, this option must be set to true, default value is false
                $AutoPlaySteps: 1,                                  //[Optional] Steps to go for each navigation request (this options applys only when slideshow disabled), the default value is 1
                $AutoPlayInterval: 3000,                            //[Optional] Interval (in milliseconds) to go for next slide since the previous stopped if the slider is auto playing, default value is 3000
                $PauseOnHover: 1,                               //[Optional] Whether to pause when mouse over if a slider is auto playing, 0 no pause, 1 pause for desktop, 2 pause for touch device, 3 pause for desktop and touch device, 4 freeze for desktop, 8 freeze for touch device, 12 freeze for desktop and touch device, default value is 1
                $ArrowKeyNavigation: true,                          //[Optional] Allows keyboard (arrow key) navigation or not, default value is false
                $SlideDuration: 500,                                //[Optional] Specifies default duration (swipe) for slide in milliseconds, default value is 500
                //$SlideWidth: 600,                                 //[Optional] Width of every slide in pixels, default value is width of 'slides' container
                //$SlideHeight: 300,                                //[Optional] Height of every slide in pixels, default value is height of 'slides' container
                $SlideSpacing: 0,                                   //[Optional] Space between each slide in pixels, default value is 0
                $DisplayPieces: 1,                                  //[Optional] Number of pieces to display (the slideshow would be disabled if the value is set to greater than 1), the default value is 1
                $ParkingPosition: 0,
                $DragOrientation: 0, //[Optional] The offset position to park slide (this options applys only when slideshow disabled), default value is 0.

                $BulletNavigatorOptions: {                                //[Optional] Options to specify and enable navigator or not
                    $Class: $JssorBulletNavigator$,                       //[Required] Class to create navigator instance
                    $ChanceToShow: 2,                               //[Required] 0 Never, 1 Mouse Over, 2 Always
                    $AutoCenter: 1,                                 //[Optional] Auto center navigator in parent container, 0 None, 1 Horizontal, 2 Vertical, 3 Both, default value is 0
                    $Steps: 1,                                      //[Optional] Steps to go for each navigation request, default value is 1
                    $Lanes: 1,                                      //[Optional] Specify lanes to arrange items, default value is 1
                    $SpacingX: 10,                                   //[Optional] Horizontal space between each item in pixel, default value is 0
                    $SpacingY: 10,                                   //[Optional] Vertical space between each item in pixel, default value is 0
                    $Orientation: 1                                 //[Optional] The orientation of the navigator, 1 horizontal, 2 vertical, default value is 1
                },
                $ArrowNavigatorOptions: {
                    $Class: $JssorArrowNavigator$,              //[Requried] Class to create arrow navigator instance
                    $ChanceToShow: 2,                               //[Required] 0 Never, 1 Mouse Over, 2 Always
                    $Steps: 1                                       //[Optional] Steps to go for each navigation request, default value is 1
                }
            };

            var jssor_slider1 = new $JssorSlider$("slider1", options);
            var jssor_slider2 = new $JssorSlider$("slider2", options);
            var jssor_slider3 = new $JssorSlider$("slider3", options);
            //responsive code begin
            //you can remove responsive code if you don't want the slider scales while window resizes
            function ScaleSlider() {
                var parentWidth = jssor_slider1.$Elmt.parentNode.clientWidth;
                if (parentWidth)
                    jssor_slider1.$ScaleWidth(Math.min(parentWidth, 980));
                else
                    window.setTimeout(ScaleSlider, 30);
            }
            ScaleSlider();
            $(window).bind("load", ScaleSlider);
            $(window).bind("resize", ScaleSlider);
            $(window).bind("orientationchange", ScaleSlider);
            //responsive code end
        }//if end
        else{
            return;
        }      
    });
</script>

<!-- index page slider plugin -->
<section id="slide_section" class="hidden-mb-b">
    <nav id="slide_lnb">
        <input id="artwork_bt" type="radio" name="tap" checked="checked" />
        <input id="vector_bt" type="radio" name="tap" />
        <input id="3d_bt" type="radio" name="tap" />
        <nav>
            <label for="artwork_bt" class="la_bt selected">ARTWORK</label>
            <label for="vector_bt" class="la_bt">VECTOR</label>
            <label for="3d_bt" class="la_bt">3D MODEL</label>
        </nav>
        <!-- end nav -->
    </nav>
    <!--end slide lnb-->
    <?php
        require_once './php/database/database_class.php';
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
            $db->query = "select boardCode,preview from `$kind` order by `viewCount` desc limit 30";
		    $db->askQuery();

            echo "<div id='slider$i' style='width: 980px; height: 363px;'>";
            echo "<div class='slides' u='slides'><div><ul>";
            $index = 1;
            while($row = mysqli_fetch_array($db->result))
            {
                $contents_number = $row['boardCode'];
                $contents_thumb = $row['preview'];
                echo "<li class='load_view'><a href='./php/contents/contents_view.php?cate=$kind&conno=$contents_number'><img src='$contents_thumb'></a></li>";
                if($index == 10 || $index == 20)
                {
                    echo "</ul></div><div><ul>";
                }
                $index++;
            }
                echo '</ul></div></div><div u="navigator" class="slider_pager"><div u="prototype"></div></div><span u="arrowleft" class="slider_arrow_left"><i class="fa fa-angle-left"></i></span><span u="arrowright" class="slider_arrow_right"><i class="fa fa-angle-right"></i></span></div>';
            }
    ?>
    <!-- end slider div -->
</section>
<!--slide section end-->

<!--creator of the month start-->
<section class="index_pre_body">
    <div class="index_pre_wrap">
        <div class="index_pre_title">
            <i class="fa fa-trophy"></i>   
            <article><p>CREATOR</p> OF THE MONTH</article>
        </div>
        <div class="index_pre_inner">
            <div id="creator_info">
                <figure id="creator_info_background"></figure>
                <div id="creator_info_p">
                    <figure id="creator_pic_frame">
                        <img src="./ch/img/creator_of_the_month/SsaRu.png" id="creator_pic">
                    </figure>
                    <ul>
                        <li id="creator_name">SsaRu</li>
                        <li id="creator_job">Engineer</li>
                        <li id="creator_location"><i class="fa fa-map-marker"></i><p>Seoul, South korea</p></li>
                    </ul>
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
            <div class="viewmore_bt animate_width"><a href="./index.php?1=creators_page&2=creators">VIEW MORE</a></div>
        </div>  
    </div>
</section>
<!--creator of the month end-->

<section class="index_pre_body">
    <div class="index_pre_wrap">
        <div class="index_pre_title">
            <i class="fa fa-volume-up"></i>   
            <article><p>HOT TOPICS</p> OF THE MONTH</article>
        </div>
        <div class="index_pre_inner">
            <ul class="forum_cards">
                <?php
                    $db->query = "SELECT boardCode,title,viewCount,likeCount,contents,nick FROM lubyconboard.`forum` LEFT JOIN lubyconuser.`userbasic` ON `forum`.`userCode` = `userbasic`.`userCode` UNION SELECT boardCode,title,viewCount,likeCount,contents,nick FROM lubyconboard.`qaa` LEFT JOIN lubyconuser.`userbasic` ON `qaa`.`userCode` = `userbasic`.`userCode` UNION SELECT boardCode,title,viewCount,likeCount,contents,nick FROM lubyconboard.`tutorial` LEFT JOIN lubyconuser.`userbasic` ON `tutorial`.`userCode` = `userbasic`.`userCode` ORDER BY `viewCount` DESC LIMIT 5 ";
		            $db->askQuery();
                    while( $row = mysqli_fetch_array($db->result) )
                    {
                        include("./php/layout/index_forum.php");
                    }
                ?>
            </ul>
        </div>
    </div>
</section>
<!--community preview end-->

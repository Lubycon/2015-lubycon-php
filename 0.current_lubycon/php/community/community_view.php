<script type="text/javascript" src="js/call_comments.js"></script> <!-- account file js -->
<link href="css/community_view.css" rel="stylesheet" type="text/css" />  <!-- community_view css -->
<link href="css/community.css" rel="stylesheet" type="text/css" />  <!-- community css -->
<script type="text/javascript" src="js/community.js"></script>
<script type="text/javascript" src="js/module/resizeObject.js"></script>

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
    </section>
    <?php
        $post_subject = "Lorem Ipsum";
        $year = 2015;
        $month = "Nov";
        $day = 7;
        $hour = 0;
        $minute = 0;

        $post_like = 0;
        $post_view = 0;
        $comment_num = 0;

        $username = "Admin_User";
        $userjob = "Job name";
        $usercity = "City";
        $usercountry = "Country";
        $post_content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Cras commodo lacus at lacus bibendum imperdiet.
                            Quisque in accumsan turpis. Nullam non lacus nec enim convallis iaculis.
                                    Vivamus a sodales sapien. Curabitur suscipit ullamcorper enim, quis hendrerit nunc tempus eu.
                                    Nunc porttitor mauris sapien, quis molestie quam placerat sit amet.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Cras commodo lacus at lacus bibendum imperdiet.
                                    Quisque in accumsan turpis. Nullam non lacus nec enim convallis iaculis.
                                    Vivamus a sodales sapien. Curabitur suscipit ullamcorper enim, quis hendrerit nunc tempus eu.
                                    Nunc porttitor mauris sapien, quis molestie quam placerat sit amet.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    ?>

    <section class="nav_guide">
        <p id="post_subject">
            <span class="post_subject_name"><?=$post_subject?></span>
            <span class="written_date"><?=$year?>.<?=$month?>.<?=$day?> <?=$hour?>:<?=$minute?></span>
        </p>
        
        <ul id="post_info">
            <li><i id="like_icon" class="fa fa-heart count_icon"></i><?=$post_like?></li>
            <li><i id="view_icon" class="fa fa-eye count_icon"></i><?=$post_view?></li>
        </ul>
    </section>  <!-- end nav_guide -->
    <section id="post_box" class="con_wrap">
        <div id="post_banner" class="con_aside">
            <?php 
                $username = "Admin_User";
                $userjob = "Job";
                $usercity = "City";
                $usercountry = "Country";
                $language1 = "language1";
                $language2 = "language2";
                
            ?>
            <div id="author_main">
                <figure>
                    <img src="./ch/img/no_img/no_img_user1.jpg">
                </figure>
                <h4><?=$username?></h4>
            </div>
            <div id="author_sub">
                <article class="author_wrap" id="author_job">
                    <i class="fa fa-suitcase hidden-mb-ib"></i>
                    <p class="author_name" id="job_name"><?=$userjob?></p>
                </article>
                <article class="author_wrap hidden-mb-b" id="author_location">
                    <i class="fa fa-map-marker"></i>
                    <p class="author_name" id="location_name"><?=$usercity?>, <?=$usercountry?></p>
                </article>
                <article class="author_wrap hidden-mb-b" id="author_language">
                    <i class="fa fa-language"></i>
                    <p class="author_name" id="language_name"><?=$language1?>, <?=$language2?></p>
                </article>
            </div>
            <div class="my_page_bt animate_width">VIEW MORE</div>
        </div><!--end con_aside-->
        <section id="post_section" class="con_main">
            <article id="post_contents">
                <p>
                    <?=$post_content?>
                </p>
                <i id="like_bt" class="like_bt alertKey fa fa-heart" data="like"></i>
                <div id="post_edit_box">
                    <button id="delete_bt" class="alertKey post_edit_bt animate_opacity"><i class="fa fa-trash"></i>Delete</button>
                    <button class="post_edit_bt animate_opacity"><i class="fa fa-repeat"></i>Modified</button>
                </div>
            </article>  <!-- end post_contents -->
            <article id="comment_box">
                <div id="comment_writer">
                    <div id="comment_text_box">
                        <figure id="comment_my_pic" class="hidden-mb-ib">
                            <img src="ch/img/no_img/no_img_user1.jpg">
                        </figure>
                        <textarea id="comment_text"></textarea>
                        <button id="comment_bt">
                            <i class="fa fa-comments"></i>
                        </button>
                    </div>
                </div>
                <div id="comment_list">
                    <p id="comment_count"><span id="comment_counter">10</span> Comments</p>
                    <?php
                        for($i=1; $i<=10; $i++){
                            include("./php/layout/comment.php");
                        };
                    ?>
                </div><!--end comment_list-->
                <div id="comment_more_box">
                    <button id="comment_more_bt"><i class="fa fa-angle-down"></i></button>
                </div>
            </article>
        </section><!-- end post_section -->
    </section>  <!-- end post_box -->
    <?php
        include("./php/layout/main_board.php");
    ?><!--end main_board section -->
</section>  <!-- end contents section -->
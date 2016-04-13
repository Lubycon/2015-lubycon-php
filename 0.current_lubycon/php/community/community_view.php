<?php
    $one_depth = '../..'; //css js load
    $two_depth = '..'; // php load
    include_once('../layout/index_header.php');
?>

<script type="text/javascript" src="<?=$one_depth?>/js/call_comments.js"></script> <!-- account file js -->
<link href="<?=$one_depth?>/css/community_view.css" rel="stylesheet" type="text/css" />  <!-- community_view css -->
<link href="<?=$one_depth?>/css/community.css" rel="stylesheet" type="text/css" />  <!-- community css -->
<script type="text/javascript" src="<?=$one_depth?>/js/community.js"></script>
<script type="text/javascript" src="<?=$one_depth?>/js/module/resizeObject.js"></script>

<section class="container">
    <section class="navsel hidden-mb-b">
        <nav class="lnb_nav">
            <ul>
                <li class="nav_menu" id="forum">
                    <a href="./community_page.php?cate=forum">Forum</a>
                </li>
                <li class="nav_menu" id="tutorial">
                    <a href="./community_page.php?cate=tutorial">Tutorial</a>
                </li>
                <li class="nav_menu" id="qna">
                    <a href="./community_page.php?cate=qna">Q&amp;A</a>
                </li>
            </ul>
        </nav>
    </section>





    <?php
        $conn = mysqli_connect("localhost", "lubycon", "hmdwdgdhkr2015", "lubycon");

        $query = "SELECT * FROM `luby_board` WHERE `board_code` = " .$_GET['bno']. " ORDER BY `luby_board`.`board_code` ASC ";
        $result = mysqli_query($conn,$query);

        $row = mysqli_fetch_array($result);
        
        $post_subject = $row['board_title'];
        $year = 2015; //not yet
        $month = "Nov"; //not yet
        $day = 7; //not yet
        $hour = 0; //not yet
        $minute = 0; //not yet

        $post_like = $row['board_like_count'];
        $post_view = $row['board_view_count'];
        $comment_num = 0; // not yet

        $userjob = "Job name"; //not yet
        $usercity = "City"; //not yet
        $usercountry = "Country"; //not yet
        $language1 = "language1"; //not yet
        $language2 = "language2"; //not yet
        $post_content = $row['board_contents'];
        
        $query = "SELECT * FROM `luby_user` WHERE `user_code` =" . $row['user_code'];
        $result = mysqli_query($conn,$query);
        $row = mysqli_fetch_array($result);
        $username = $row['user_nick'];

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
            <div id="author_main">
                <figure>
                    <img src="<?=$one_depth?>/ch/img/no_img/no_img_user1.jpg">
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
                    <?=htmlspecialchars_decode($post_content)?>
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
                            <img src="<?=$one_depth?>/ch/img/no_img/no_img_user1.jpg">
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
                            include("../layout/comment.php");
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
        include("../layout/main_board.php");
    ?><!--end main_board section -->
</section>  <!-- end contents section -->


<?php
    include_once($two_depth.'/layout/index_footer.php');
?>
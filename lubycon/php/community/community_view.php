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
    <?php
        switch($_GET['cate']){
        case 'forum' : $contents_cate = 1; $cate_name = 'forum'; break;
        case 'tutorial' : $contents_cate = 2; $cate_name = 'tutorial'; break;
        case 'qaa' : $contents_cate = 3; $cate_name = 'qaa'; break;
        default : $contents_cate = 1;  break;
        };

        $conn = mysqli_connect("localhost", "lubycon", "hmdwdgdhkr2015", "lubyconboard");

        $query = "SELECT * FROM `".$cate_name."` WHERE `boardCode` = " .$_GET['bno']. " ORDER BY `".$cate_name."`.`boardCode` ASC ";
        $result = mysqli_query($conn,$query);

        $row = mysqli_fetch_array($result);
        
        $post_subject = $row['title'];
        $year = 2015; //not yet
        $month = "Nov"; //not yet
        $day = 7; //not yet
        $hour = 0; //not yet
        $minute = 0; //not yet

        $post_like = $row['likeCount'];
        $post_view = $row['viewCount'];
        $comment_num = 0; // not yet

        $username = 'need db';
        $userjob = "Job name"; //not yet
        $usercity = "City"; //not yet
        $usercountry = "Country"; //not yet
        $language1 = "language1"; //not yet
        $language2 = "language2"; //not yet
        $post_content = $row['contents'];
        
        //$query = "SELECT * FROM `luby_user` WHERE `user_code` =" . $row['user_code'];
        //$result = mysqli_query($conn,$query);
        //$row = mysqli_fetch_array($result);
        //$username = $row['user_nick'];

    ?>

    <section class="nav_guide">
        <p id="post_subject">
            <span class="post_subject_name"><?=$post_subject?></span>
            <span class="written_date"><?=$year?>.<?=$month?>.<?=$day?> <?=$hour?>:<?=$minute?></span>
        </p>
        
        <ul id="post_info">
            <li><i class="fa fa-heart count_icon like"></i><?=$post_like?></li>
            <li><i class="fa fa-eye count_icon view"></i><?=$post_view?></li>
        </ul>
    </section>  <!-- end nav_guide -->
    <section class="con_wrap">
        <section class="con_main">
            <div class="infoCard" id="post_contents" >
                <p>
                    <?=htmlspecialchars_decode($post_content)?>
                </p>
                <div id="post_edit_box">
                    <button class="alertKey post_edit_bt" id="delete_bt" ><i class="fa fa-trash"></i>Delete</button>
                    <button class="post_edit_bt"><i class="fa fa-repeat"></i>Modified</button>
                </div>
            </div>  <!-- end post_contents -->
            <div class="infoCard content_info">
                <p class="infoCard-title inline">Did you like this contents?</p>
                <div class="infoCard-userAction infoCard-content">
                    <div class="userAction-bt alertKey" data-value="like">
                        <i class="fa fa-heart" data-value="like"></i>Like
                    </div>
                </div>
            </div>
            <div class="infoCard creator">
                <p class="infoCard-title">Creator</p>
                <div class="creators_card" data-index="<?=$usercode?>">
                    <div class="creator_card_body">
                        <div class="creator_pic_wrap">
                            <div class="creator_pic"><img src="<?=$user_img_url?>" alt="user_pic"></div>
                        </div>
                        <div class="creator_info_wrap">
                            <p class="creator_name"><a href="../personal_page/personal_page.php?cate=dashboard&usernum=<?=$usercode?>"><?=$username?></a></p>
                            <p class="creator_job"></i><?=$userjob?></p>
                            <p class="creator_location hidden-mb-b"><i class="fa fa-map-marker"></i><?=$usercity?>, <?=$usercountry?></p>
                        </div>
                    </div><!--body-->
                    <div class="creator_card_medal">
                        <ul>
                            <li></li>
                        </ul>
                    </div><!--medals-->
                </div>
            </div>
            
            <article class="infoCard comment">
                <p class="infoCard-title"><span id="comment-counter">10</span> Comments</p>
                <div class="comment-write-wrap" class="comment-div">
                    <figure class="comment-pic" class="hidden-mb-ib">
                        <img src="<?=$one_depth?>/ch/img/no_img/no_img_user1.jpg" class="hidden-mb-ib">
                    </figure>
                    <div class="comment-input">
                        <textarea id="comment_text"></textarea>
                        <button id="comment_bt">
                            <i class="fa fa-comments"></i>Post
                        </button>
                    </div>
                </div>
                <div class="comment-list">
                    <?php
                        for($i=1; $i<=10; $i++){
                            include($two_depth."/layout/comment.php");
                        };
                    ?>
                </div><!--end comment_list-->
                <div class="viewmore_bt" data-value="comment"><i class="fa fa-angle-down"></i></div>
            </article>

            <?php
                include("../layout/main_board.php");
            ?><!--end main_board section -->
        </div><!--end con_main-->
    </section>  <!-- end post_box -->
</section>  <!-- end contents section -->


<?php
    include_once($two_depth.'/layout/index_footer.php');
?>
<li>
    <?php
        $usercode = $row['userCode'];
        $price = $row['downloadPermission'];
        $contents_thumb_url = $row['preview'];
        $title = $row['title'];
        $user_img_url = $row['profileImg'];
        $user_name = $row['nick'];
        $board_code = $row['boardCode'];
        $cate = $cate_name;
        $randCount = $row['viewCount'];
        $randCount1 = rand(400,1200); //not yet comment count
        $randCount2= $row['likeCount'];
        $viewCount = $randCount < 1000 ? $randCount : (string)(round((double)($randCount/1000),1))."K";
        $commentCount = $randCount1 < 1000 ? $randCount1 : (string)(round((double)($randCount1/1000),1))."K";
        $likeCount = $randCount2 < 1000 ? $randCount2 : (string)(round((double)($randCount2/1000),1))."K";
    ?><!--you should change to mySQL later-->
    <div class="contents_card">
        <div class="contents_pic">
            <img src="<?=$contents_thumb_url?>" class="load_view" alt="contents thumbnail"/>
        </div>
        <!-- end contents pic -->
        <div class="contents_desc">
            <div class="contents_sub">
                <?php
                    echo "<a class='contents_link' href='../contents/contents_view.php?cate=".$cate."&conno=".$board_code."'>";
                ?>
                    <h4 class="contents_title load_view"><?=$title?></h4>
                    <h5><?=$price?></h5>
                </a>
            </div>
            <span class="creator_desc">
                <a href="../personal_page/personal_page.php?cate=dashboard&usernum=<?=$usercode?>">
                    <img src="<?=$one_depth?>/../../../Lubycon_Contents/user/<?=$usercode?>/profile.jpg" class="hidden-mb-ib" alt="artist photo" />
                    <span class="by">by</span>
                    <span class="name"><?=$user_name?></span>
                </a>
            </span>
            <i id="bookmark_bt" class="bookmark_bt alertKey fa fa-star" data="bookmark"></i>
        </div>
        <!-- end contents desc -->
        <div class="contents_overlay load_view">
                <?php 
                    echo "<a class='contents_link' href='../contents/contents_view.php?cate=".$cate."&conno=".$board_code."'>";
                ?>
                <i class="fa fa-search-plus"></i>
                <ul>
                    <li>
                        <i class="fa fa-eye"></i>
                        <span class="contents_view_count"><?=$viewCount?></span>
                    </li>
                    <li>
                        <i class="fa fa-comment-o"></i>
                        <span class="contents_comments"><?=$commentCount?></span>
                    </li>
                    <li class="contents_like_li">
                        <i class="fa fa-heart"></i>
                        <span class="contents_like"><?=$likeCount?></span>
                    </li>
                </ul>
            </a>
        </div>
    </div>
</li>

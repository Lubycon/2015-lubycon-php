<li>
    <?php
        $usercode = $row['userCode'];
        $user_dir = $row['userDirectory'];
        $contents_thumb_url = $user_dir.'/thumbnail/thumbnail.jpg';
        $price = $ccCode_decode[$row['ccLicense']]['name'];
        $title = $row['contentTitle'];
        $user_name = $row['nick'];
        $board_code = $row['boardCode'];
        $cate = $top_category;
        $randCount = $row['viewCount'];
        $randCount1 = $row['commentCount']; //not yet comment count
        $randCount2= $row['likeCount'];
        $viewCount = $randCount < 1000 ? $randCount : (string)(round((double)($randCount/1000),1))."K";
        $commentCount = $randCount1 < 1000 ? $randCount1 : (string)(round((double)($randCount1/1000),1))."K";
        $likeCount = $randCount2 < 1000 ? $randCount2 : (string)(round((double)($randCount2/1000),1))."K";

        
        if(isset($_SESSION['lubycon_userCode'])) // login check
        {
            if($_SESSION['lubycon_userCode'] == $row['bookmarkActionUserCode']) //bookmark check
            {$bookmarkBoolean = true;}else{$bookmarkBoolean = false;}
        };

    ?><!--you should change to mySQL later-->
    <div class="contents_card <?=$cate.'_'.$board_code?>" data-index="<?=$usercode?>" data-cate="<?=$cate?>" data-conno="<?=$board_code?>">
        <div class="contents_pic">
            <img src="<?=$contents_thumb_url?>" class="load_view" alt="contents thumbnail"/>
        </div>
        <!-- end contents pic -->
        <div class="contents_desc">
            <div class="contents_sub">
                <?php
                    echo "<a class='contents_link' href='?dir=pages/controller/contents/contents_view&cate=".$cate."&conno=".$board_code."'>";
                ?>
                    <h4 class="contents_title load_view"><?=$title?></h4>
                    <h5><?=$price?></h5>
                </a>
            </div>
            <span class="creator_desc">
                <a href="?dir=pages/view/personal_page/personal_page&cate=dashboard&usernum=<?=$usercode?>">
                    <img src="../../Lubycon_Contents/user/<?=$usercode?>/profile.jpg" class="hidden-mb-ib" alt="artist photo" />
                    <span class="by">by</span>
                    <span class="name"><?=$user_name?></span>
                </a>
            </span>
            <i class="userAction-bt alertKey fa fa-star thumbs_page <?php if($bookmarkBoolean){echo 'selected';}?>" data-value="bookmark" data-kind="contents"></i>
        </div>
        <!-- end contents desc -->
        <div class="contents_overlay load_view">
                <?php 
                    echo "<a class='contents_link' href='?dir=pages/controller/contents/contents_view&cate=".$cate."&conno=".$board_code."'>";
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

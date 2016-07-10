<li class="forum_card">
    <?php
        $board_code = $row['boardCode'];
        $card_author = $row['nick'];
        $card_title = $row['title'];
        $view_num = $row['viewCount'];
        $like_num = $row['likeCount'];
        $comment_num = 0; //not yet
        $card_content = $row['contents'];
    ?>
    <div class="forum_card_body">
        <header class="forum_card_header">
            <div class="forum_card_info">
                <p class="forum_card_title"><?=$card_title?></p>
                <p class="forum_card_author"><?=$card_author?></p>
            </div>
            <div class="forum_card_count">
                <span class="real_count"><i class="fa fa-eye"></i><?=$view_num?></span>
                <span class="real_count"><i class="fa fa-heart"></i><?=$like_num?></span>
                <span class="real_count"><i class="fa fa-comment"></i><?=$comment_num?></span>
            </div>
        </header>
        <div class="forum_card_section">
            <p><?=$card_content?></p>
        </div>
        <div class="viewmore_bt animate_width">VIEW MORE</div>
    </div>
</li>

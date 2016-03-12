<li class="forum_card">
    <?php
        $card_title = "Lorem Ipsum";
        $card_author = "Adimin_User";
        $view_num = 0;
        $like_num = 0;
        $comment_num = 0;
        $card_content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Cras commodo lacus at lacus bibendum imperdiet.<br />
                    Quisque in accumsan turpis. Nullam non lacus nec enim convallis iaculis.
                            Vivamus a sodales sapien. Curabitur suscipit ullamcorper enim, quis hendrerit nunc tempus eu.
                            Nunc porttitor mauris sapien, quis molestie quam placerat sit amet.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Cras commodo lacus at lacus bibendum imperdiet.
                            Quisque in accumsan turpis. Nullam non lacus nec enim convallis iaculis.
                            Vivamus a sodales sapien. Curabitur suscipit ullamcorper enim, quis hendrerit nunc tempus eu.
                            Nunc porttitor mauris sapien, quis molestie quam placerat sit amet.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
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

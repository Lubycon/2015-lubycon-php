<aside id="personal_aside" class="con_aside">
    <?php
        $user_intro = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua";        
    ?>
    <div id="user_information">
        <div id="userinfo_main">
            <figure id="user_pic">
                <img src="<?=$one_depth?>/ch/img/no_img/no_img_user1.jpg">
            </figure>
            <h4><?=@$username?></h4>
            <h5><?=$user_intro?></h5>
        </div>
    </div>
    <div id="subnav" class="hidden-mb-b">
        <ul>
            <li class="subnav_li selected_subnav"><a href="../personal_page/personal_page.php?cate=dashboard">Dashboard</a></li>
            <li class="subnav_li"><a href="../personal_page/personal_page.php?cate=my_contents">Contents</a></li>
            <li class="subnav_li"><a href="../personal_page/personal_page.php?cate=my_forums">Forums</a></li>
            <li class="subnav_li"><a href="../personal_page/personal_page.php?cate=insight">Insight</a></li>
            <li class="subnav_li"><a href="../personal_page/personal_page.php?cate=bookmark">Bookmark</a></li>
            <li class="subnav_li"><a href="../personal_page/personal_page.php?cate=account_setting">Account Setting</a></li>
        </ul>
    </div>
</aside>
<aside id="personal_aside" class="con_aside">
    <?php 
        $username = "Admin_User";
        $user_intro = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua";        
    ?>
    <div id="user_information">
        <div id="userinfo_main">
            <figure id="user_pic">
                <img src="./ch/img/no_img/no_img_user1.jpg">
            </figure>
            <h4><?=$username?></h4>
            <h5><?=$user_intro?></h5>
        </div>
    </div>
    <div id="subnav" class="hidden-mb-b">
        <ul>
            <li class="subnav_li selected_subnav" id="dashboard">Dashboard</li>
            <li class="subnav_li" id="my_contents">Contents</li>
            <li class="subnav_li" id="my_forums">Forums</li>
            <li class="subnav_li" id="insight">Insight</li>
            <li class="subnav_li" id="bookmark">Bookmark</li>
            <li class="subnav_li" id="account_setting">Account Setting</li>
        </ul>
    </div>
</aside>
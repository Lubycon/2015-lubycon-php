<aside id="personal_aside" class="con_aside">
    <?php
        require_once '../database/database_class.php';
	    $db = new Database();
        $db->query = "SELECT * FROM `userbasic` INNER JOIN `userinfo` ON `userbasic`.`userCode` = `userinfo`.`userCode` WHERE `userbasic`.`userCode` = $usercode ";
        $db->askQuery();
        $row = mysqli_fetch_array($db->result);

        $user_pic = "$one_depth/../../Lubycon_Contents/user/$usercode/profile.jpg";
        $user_intro = $row['description'];        
    ?>
    <div id="user_information">
        <div id="userinfo_main">
            <figure id="user_pic">
                <img src="<?=$user_pic?>">
            </figure>
            <h4><?=$username?></h4>
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
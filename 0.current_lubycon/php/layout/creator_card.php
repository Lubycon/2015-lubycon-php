<li class="creator_card_in">
    <?php
        include($one_depth.'/../../Lubycon_Contents/contents/contents_data.php');
        $number = $_GET["number"];
        $contents_num1 = $number;
        $contents_num2 = $number + 1;
        $contents_num3 = $number + 2;
        $user_img_url = $one_depth."/../../Lubycon_Contents/contents/3d/3djpg/profile/".$number.".jpg";
        $user_location_img = $one_depth."/ch/img/flag_icons/United-States-Of-America.png";
        $usercity = "Los Santos";
        $usercountry = "United States";
        $username = $threed_author;
        $randCount = rand(200,1500);
        $contents_count = $randCount < 1000 ? $randCount : (string)(round((double)($randCount/1000),1))."K";
        $user_content1 = $one_depth."/../../Lubycon_Contents/contents/artwork/artworkjpg/thumb/".$contents_num1.".jpg";
        $user_content2 = $one_depth."/../../Lubycon_Contents/contents/artwork/artworkjpg/thumb/".$contents_num2.".jpg";
        $user_content3 = $one_depth."/../../Lubycon_Contents/contents/artwork/artworkjpg/thumb/".$contents_num3.".jpg";
    ?><!--you should change to mySQL later-->
    <div class="creators_card">
        <div class="creator_menu">
            <i class="fa fa-bars creator_menu_icon hidden-mb-b"></i>
            <div class="creator_menu_list">
                <ul>
                    <li><a href="../personal_page/personal_page.php?cate=dashboard"><i class="fa fa-tachometer"></i>View Dashboard</a></li>
                    <li><a href="../personal_page/personal_page.php?cate=my_contents"><i class="fa fa-eye"></i>View Contents</a></li>
                    <li><a href="../personal_page/personal_page.php?cate=insight"><i class="fa fa-bar-chart"></i>View Insight</a></li>
                    <li><a href="../personal_page/personal_page.php?cate=my_forums"><i class="fa fa-table"></i>View Forums</a></li>
                </ul>
            </div>
        </div>
        <div class="creator_info_wrap">
            <div class="creator_top_info">
                <div class="creator_pic">
                    <img src="<?=$user_img_url?>" alt="user_pic"/>
                </div>
                <div class="creator_location_img">
                    <img src="<?=$user_location_img?>" alt="user_location"/>
                </div>
            </div>
            <div class="creator_mid_info">
                <p class="creator_name"><a href="../personal_page/personal_page.php?cate=dashboard"><?=$username[$number]?></a></p><!--user name-->
                <p class="creator_job"><?=$userjob?></p><!--job-->
                <p class="creator_location hidden-mb-b"><i class="fa fa-map-marker"></i><?=$usercity?>, <?=$usercountry?></p>
                <article class="contents_count hidden-mb-b">
                    <p class="count_num"><?=$contents_count?></p>
                    Contents
                </article>
            </div>
        </div>
        <div class="creator_bot_info">
            <ul>
                <li class="usercontent">
                <?php 
                    echo "<a class='contents_link' href='../contents/contents_view.php?cate=artwork&conno=".$number."'>";
                ?>
                    <img src="<?=$user_content1?>" alt="user_content"/>
                </a>
                </li>
                <li class="usercontent">
                <?php 
                    echo "<a class='contents_link' href='../contents/contents_view.php?cate=artwork&conno=".$number."'>";
                ?>
                    <img src="<?=$user_content2?>" alt="user_content"/>
                </a>
                </li>
                <li class="usercontent">
                <?php 
                    echo "<a class='contents_link' href='../contents/contents_view.php?cate=artwork&conno=".$number."'>";
                ?>
                    <img src="<?=$user_content3?>" alt="user_content"/>
                </a>
                </li>
            </ul>
        </div>
        
    </div>
</li>

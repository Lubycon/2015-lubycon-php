<li class="creator_card_in">
    <?php
        @include('../contents_data/contents_data.php');
        $number = $_GET["number"];
        $contents_num1 = $number;
        $contents_num2 = $number + 1;
        $contents_num3 = $number + 3;

        $user_img_url = "../contents_data/3djpg/profile/".$number.".jpg";
        $user_location_img = "./ch/img/flag_icons/United-States-Of-America.png";
        $usercity = "Los Santos";
        $usercountry = "United States";
        $username = $threed_author;
        $userjob = $jobarray[$number];
        $contents_count = rand(3, 150);
        $user_content1 = "../contents_data/artworkjpg/thumb/".$contents_num1.".jpg";
        $user_content2 = "../contents_data/artworkjpg/thumb/".$contents_num2.".jpg";
        $user_content3 = "../contents_data/artworkjpg/thumb/".$contents_num3.".jpg";
    ?><!--you should change to mySQL later-->
    <div class="creators_card">
        <div class="creator_menu">
            <i class="fa fa-bars creator_menu_icon hidden-mb-b"></i>
            <div class="creator_menu_list">
                <ul>
                    <li><a href="./index.php?1=personal_page&2=personal_page&3=dashboard"><i class="fa fa-tachometer"></i>View Dashboard</a></li>
                    <li><a href="./index.php?1=personal_page&2=personal_page&3=my_contents"><i class="fa fa-eye"></i>View Contents</a></li>
                    <li><a href="./index.php?1=personal_page&2=personal_page&3=insight"><i class="fa fa-bar-chart"></i>View Insight</a></li>
                    <li><a href="./index.php?1=personal_page&2=personal_page&3=my_forums"><i class="fa fa-table"></i>View Forums</a></li>
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
                <p class="creator_name"><a href="./index.php?1=personal_page&2=personal_page&3=dashboard"><?=$username[$number]?></a></p><!--user name-->
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
                    <img src="<?=$user_content1?>" alt="user_content"/>
                </li>
                <li class="usercontent">
                    <img src="<?=$user_content2?>" alt="user_content"/>
                </li>
                <li class="usercontent">
                    <img src="<?=$user_content3?>" alt="user_content"/>
                </li>
            </ul>
        </div>
        
    </div>
</li>

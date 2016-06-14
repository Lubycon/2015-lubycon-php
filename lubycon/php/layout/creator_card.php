<li class="creator_card_in">
    <?php
        $usercode = $row['userCode'];
        $user_img_url = "$one_depth/../../../Lubycon_Contents/user/".$row['userCode']."/profile.jpg";
        $user_location_img = "$one_depth/ch/img/flag_icons/".$row['countryCode'].'.png';
        $usercity = $row['city'];

        $usercountry = $country_origin_select;
        $username = $row['nick'];
        $userjob = $job_origin_select;
        $randCount = rand(200,1500);
        $contents_count = $randCount < 1000 ? $randCount : (string)(round((double)($randCount/1000),1))."K";
        $user_content1 = $row['preview'];
        $user_content1_num = $row['boardCode'];
        $user_content2 = $row['preview'];
        $user_content2_num = $row['boardCode'];
        $user_content3 = $row['preview'];
        $user_content3_num = $row['boardCode'];
    ?><!--you should change to mySQL later-->
    <div class="creators_card" data-index="<?=$usercode?>">
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
                <p class="creator_name"><a href="../personal_page/personal_page.php?cate=dashboard&usernum=<?=$usercode?>"><?=$username?></a></p><!--user name-->
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
                    echo "<a class='contents_link' href='../contents/contents_view.php?cate=artwork&conno=$user_content1_num'>";
                ?>
                    <img src="<?=$user_content1?>" alt="user_content"/>
                </a>
                </li>
                <li class="usercontent">
                <?php 
                    echo "<a class='contents_link' href='../contents/contents_view.php?cate=artwork&conno=$user_content2_num'>";
                ?>
                    <img src="<?=$user_content2?>" alt="user_content"/>
                </a>
                </li>
                <li class="usercontent">
                <?php 
                    echo "<a class='contents_link' href='../contents/contents_view.php?cate=artwork&conno=$user_content3_num'>";
                ?>
                    <img src="<?=$user_content3?>" alt="user_content"/>
                </a>
                </li>
            </ul>
        </div>
        
    </div>
</li>

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


        
        $user_dir = $row['userDirectory'];

        $user_content1 = $user_dir.'/thumbnail/thumbnail.jpg';
        $user_content1_num = $row['boardCode'];
        $user_content2 = $user_dir.'/thumbnail/thumbnail.jpg';
        $user_content2_num = $row['boardCode'];
        $user_content3 = $user_dir.'/thumbnail/thumbnail.jpg';
        $user_content3_num = $row['boardCode'];
    ?><!--you should change to mySQL later-->
    <div class="creators_card" data-index="<?=$usercode?>">
        <div class="creator_card_header">
            <span class="card_label"></span>
        </div><!--header-->
        <div class="creator_card_body">
            <div class="creator_pic_wrap">
                <div class="creator_pic"><img src="<?=$user_img_url?>" alt="user_pic"></div>
                <div class="creator_location_pic"><img src="<?=$user_location_img?>" alt="user_location"></div>
            </div>
            <div class="creator_info_wrap">
                <p class="creator_name"><a href="../personal_page/personal_page.php?cate=dashboard&usernum=<?=$usercode?>"><?=$username?></a></p>
                <p class="creator_job"></i><?=$userjob?></p>
                <p class="creator_location hidden-mb-b"><i class="fa fa-map-marker"></i><?=$usercity?>, <?=$usercountry?></p>
                <article class="contents_count hidden-mb-b">
                    <p class="contents_num"><?=$contents_count?></p>
                    Contents
                </article>
            </div>
        </div><!--body-->
        <div class="creator_card_medal">
            <ul>
                <li></li>
            </ul>
        </div><!--medals-->
        <div class="creator_card_footer">
            <ul>
                <li class="usercontent" data-value="0">
                    <?php 
                        echo "<a class='contents_link' href='../contents/contents_view.php?cate=artwork&conno=$user_content1_num'>";
                    ?>
                    <img src="<?=$user_content1?>" alt="user_content">
                    </a>
                </li>
                <li class="usercontent" data-value="1">
                    <?php 
                        echo "<a class='contents_link' href='../contents/contents_view.php?cate=artwork&conno=$user_content2_num'>";
                    ?>
                    <img src="<?=$user_content2?>" alt="user_content">
                    </a>
                </li>
                <li class="usercontent" data-value="2">
                    <?php 
                        echo "<a class='contents_link' href='../contents/contents_view.php?cate=artwork&conno=$user_content3_num'>";
                    ?>
                    <img src="<?=$user_content3?>" alt="user_content">
                    </a>
                </li>
            </ul>
        </div><!--footer-->
    </div>
</li>

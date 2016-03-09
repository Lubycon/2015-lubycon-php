<li>
    <?php
        $number = $_GET["number"];
        $current_url = $third_param;

        @include('../../Lubycon_Contents/contents/contents_data.php');
        @include('../../../../Lubycon_Contents/contents/contents_data.php');

        switch($current_url){
            case "artwork" : $current_url = "artwork"; $contents_name = $artwork_subject; $username = $artwork_author;  break;
            case "vector" : $current_url = "vector"; $contents_name = $vector_subject; $username = $vector_author; break;
            case "3d" : $current_url = "3d"; $contents_name = $threed_subject; $username = $threed_author; break;
            default : $current_url = "artwork"; $contents_name = $artwork_subject;$username = $artwork_author; break;
        };
        $price = "Free";
        $contents_thumb_url = "../../Lubycon_Contents/contents/".$current_url."/".$current_url."jpg/thumb/".$number.".jpg";
        $user_img_url = "../../Lubycon_Contents/contents/".$current_url."/".$current_url."jpg/profile/".$number.".jpg";
        $randCount = rand(400,5000);
        $randCount1 = rand(400,1200);
        $randCount2= rand(400,1200);
        $viewCount = $randCount < 1000 ? $randCount : (string)(round((double)($randCount/1000),1))."K";
        $commentCount = $randCount1 < 1000 ? $randCount1 : (string)(round((double)($randCount1/1000),1))."K";
        $likeCount = $randCount2 < 1000 ? $randCount2 : (string)(round((double)($randCount2/1000),1))."K";
    ?><!--you should change to mySQL later-->
    <div class="contents_card">
        <div class="contents_pic">
            <img src="<?=$contents_thumb_url?>" class="load_view" alt="contents thumbnail"/>
        </div>
        <!-- end contents pic -->
        <div class="contents_desc">
            <div class="contents_sub">
                <?php 
                    echo "<a class='contents_link' href='./index.php?1=contents&2=contents_view&3=";
                    switch($current_url){
                        case "artwork" : echo "artwork"; break;
                        case "vector" : echo "vector"; break;
                        case "3d" : echo "3d"; break;
                        default : echo "artwork"; break;
                    };
                    echo "&4=".$number."'>";
                ?>
                    <h4 class="contents_title load_view"><?=$contents_name[$number]?></h4>
                    <h5><?=$price?></h5>
                </a>
            </div>
            <span class="creator_desc">
                <a href="./index.php?1=personal_page&2=personal_page&3=dashboard">
                    <img src="<?=$user_img_url?>" class="hidden-mb-ib" alt="artist photo" />
                    <span class="by">by</span>
                    <span class="name"><?=$username[$number]?></span>
                </a>
            </span>
            <i id="bookmark_bt" class="bookmark_bt alertKey fa fa-star" data="bookmark"></i>
        </div>
        <!-- end contents desc -->
        <div class="contents_overlay load_view">
                <?php 
                    echo "<a class='contents_link' href='./index.php?1=contents&2=contents_view&3=";
                    switch($current_url){
                        case "artwork" : echo "artwork"; break;
                        case "vector" : echo "vector"; break;
                        case "3d" : echo "3d"; break;
                        default : echo "artwork"; break;
                    };
                    echo "&4=".$number."'>";
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

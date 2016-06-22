
<script type="text/javascript" src="<?=$one_depth?>/js/contents_view.js"></script> <!-- account file js -->
<script type="text/javascript" src="<?=$one_depth?>/js/call_comments.js"></script> <!-- account file js -->
<link href="<?=$one_depth?>/css/contents_view.css" rel="stylesheet" type="text/css" /><!-- contents view css -->

<section class="container">
    <section class="nav_guide" id="contents_info_wrap">
        <div class="nav-wrapper">
            <h3 id="contents_title"><?=$contents_name?></h3>
            <div id="contents_category"><?=$category0?> > <?=$category1?>, <?=$category2?></div>
            <div id="contents_score">
                <ul>
                    <li><i class="fa fa-eye"></i></li>
                    <li id="viewCount" class="contents_view_score"><?=$file_view?></li>
                </ul>
                <ul>
                    <li><i class="fa fa-cloud-download"></i></li>
                    <li id="downloadCount" class="contents_view_score"><?=$file_down?></li>
                </ul>
                <ul>
                    <li><i class="fa fa-heart"></i></li>
                    <li id="likeCount" class="contents_view_score"><?=$file_like?></li>
                </ul>
            </div>
        </div><!--subnav_box end-->
    </section>
    <section class="con_wrap">
        <div id="contents_main" class="con_main">
            <?php
                if($cate_name == 'threed'){
                    include "viewer3d.php";
                }
                else{
                    echo htmlspecialchars_decode($contents_html);
                };
            ?>
            <div class="infoCard content_info">
                <p class="infoCard-title inline">Did you like this contents?</p>
                <div class="infoCard-userAction infoCard-content">
                    <div class="userAction-bt alertKey" data-value="bookmark">
                        <i class="fa fa-star"></i>Bookmark
                    </div>
                    <div class="userAction-bt alertKey" data-value="like">
                        <i class="fa fa-heart" data-value="like"></i>Like
                    </div>
                </div>
                <p class="infoCard-title">Creative Commons License</p>
                <div class="infoCard-cc infoCard-content">
                    <p class="cc-descipt">If you want learn about this license, click below icons</p> 
                    <ul class="cc-list">
                        <a href="http://creativecommons.org/licenses/by-nc-nd/4.0" id="cc-link" target="_brank">
                            <li class="cc-icon" data-value="cc">
                                <img src="<?=$one_depth?>/ch/img/creative_commons/png/cc_w.png" />
                            </li><!--cc icon-->
                            <li class="cc-icon" data-value="by">
                                <img src="<?=$one_depth?>/ch/img/creative_commons/png/by_w.png" />
                            </li><!-- default icon-->
                            <li class="cc-icon" data-value="nc">
                                <img src="<?=$one_depth?>/ch/img/creative_commons/png/nc_w.png" />
                            </li><!--non commercial-->
                            <li class="cc-icon" data-value="nd">
                                <img src="<?=$one_depth?>/ch/img/creative_commons/png/nd_w.png" />
                            </li><!--non derivation-->
                            <li class="cc-icon" data-value="share">
                                <img src="<?=$one_depth?>/ch/img/creative_commons/png/share_w.png" />
                            </li><!--non derivation-->
                        </a>
                    </ul>
                </div>
            </div>
            <div class="infoCard creator">
                <p class="infoCard-title">Creator</p>
                <div class="creators_card" data-index="<?=$usercode?>">
                    <div class="creator_card_body">
                        <div class="creator_pic_wrap">
                            <div class="creator_pic"><img src="<?=$user_img_url?>" alt="user_pic"></div>
                        </div>
                        <div class="creator_info_wrap">
                            <p class="creator_name"><a href="../personal_page/personal_page.php?cate=dashboard&usernum=<?=$usercode?>"><?=$username?></a></p>
                            <p class="creator_job"></i><?=$userjob?></p>
                            <p class="creator_location hidden-mb-b"><i class="fa fa-map-marker"></i><?=$usercity?>, <?=$usercountry?></p>
                        </div>
                    </div><!--body-->
                    <div class="creator_card_medal">
                        <ul>
                            <li></li>
                        </ul>
                    </div><!--medals-->
                </div>
            </div>
            
            <article class="infoCard comment">
                <p class="infoCard-title"><span id="comment-counter">10</span> Comments</p>
                <div class="comment-write-wrap" class="comment-div">
                    <figure class="comment-pic" class="hidden-mb-ib">
                        <img src="<?=$one_depth?>/ch/img/no_img/no_img_user1.jpg" class="hidden-mb-ib">
                    </figure>
                    <div class="comment-input">
                        <textarea id="comment_text"></textarea>
                        <button id="comment_bt">
                            <i class="fa fa-comments"></i>Post
                        </button>
                    </div>
                </div>
                <div class="comment-list">
                    <?php
                        for($i=1; $i<=10; $i++){
                            include($two_depth."/layout/comment.php");
                        };
                    ?>
                </div><!--end comment_list-->
                <div class="viewmore_bt" data-value="comment"><i class="fa fa-angle-down"></i></div>
            </article>
        </div><!--end con_main-->

        <div id="contents_aside" class="con_aside hidden-mb-ib">
            <div class="creator_info">
                <figure id="user_img">
                    <img src="<?=$one_depth?>/../../../Lubycon_Contents/user/<?=$usercode?>/profile.jpg" >
                </figure>
                <span id="user_info_wrap">
                    <h4><a href="<?=$two_depth?>/personal_page/personal_page.php?cate=dashboard&usernum=<?=$usercode?>"><?=$username?></a></h4>
                    <h5><?=$userjob?></h5>
                    <h5 class="user_location" data-tip="<?=$usercity?>, <?=$usercountry?>"><i class="fa fa-map-marker"></i><?=$usercity?>, <?=$usercountry?></h5>
                </span>
            </div>
            <!--<div id="content_down" class="hidden-mb-b"><i class="fa fa-cloud-download"></i></div>-->
            <div id="tag_wrap" class="info-wrap hidden-mb-b">
                <p id="tag_title" class="info-title"><i class="fa fa-tag"></i>Tags</p>
                <div id="tagbox_wrap" class="info-content">
                    <ul id="tagbox_wrap_inner">
                        <li class="tagbox">javascript</li>
                        <li class="tagbox">html</li>
                        <li class="tagbox">c++</li>
                        <li class="tagbox">php</li>
                        <li class="tagbox">python</li>
                    </ul>                       
                </div>
            </div>
            <div id="descript_wrap" class="info-wrap hidden-mb-b">
                <p id="descript_title" class="info-title"><i class="fa fa-info-circle"></i>Description</p>
                <div id="descript_content" class="info-content">
                    <p><?=$file_descript?></p>
                </div>
            </div>
        </div><!--end con_aside-->
    </section><!--end content_wrap-->
</section>  <!-- end contents section -->
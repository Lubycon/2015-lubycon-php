
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
                    echo $contents_html;
                };
            ?>
            <div class="floating_bt">
                <i id="bookmark_bt" class="bookmark_bt alertKey fa fa-star bookmark" data="bookmark"></i>
                <i id="like_bt" class="like_bt alertKey fa fa-heart" data="like"></i>
            </div>
            <div id="cc_total_wrap" class="visible-mb">
                <div id="cc_wrap">
                    <ul id="cc_wrap_inner">
                        <a href="#" id="cc_desc_link" target="_brank">
                        <li class="cc_icon" id="cc_main">
                            <img src="<?=$one_depth?>/ch/img/creative_commons/png/cc_w.png" />
                        </li><!--cc icon-->
                        <li class="cc_icon" id="cc_by">
                            <img src="<?=$one_depth?>/ch/img/creative_commons/png/by_w.png" />
                        </li><!-- default icon-->
                        <li class="cc_icon" id="cc_nc">
                            <img src="<?=$one_depth?>/ch/img/creative_commons/png/nc_w.png" />
                        </li><!--non commercial-->
                        <li class="cc_icon" id="cc_nd">
                            <img src="<?=$one_depth?>/ch/img/creative_commons/png/nd_w.png" />
                        </li><!--non derivation-->
                        <li class="cc_icon" id="cc_share">
                            <img src="<?=$one_depth?>/ch/img/creative_commons/png/share_w.png" />
                        </li><!--non derivation-->
                    </a>
                    </ul>                       
                </div>
            </div>
            
            <article id="comment_box">
                <div id="comment_writer">
                    <div id="comment_text_box">
                        <figure id="comment_my_pic" class="hidden-mb-ib">
                            <img src="<?=$one_depth?>/ch/img/no_img/no_img_user1.jpg" class="hidden-mb-ib">
                        </figure>
                        <textarea id="comment_text"></textarea>
                        <button id="comment_bt">
                            <i class="fa fa-comments"></i>
                        </button>
                    </div>
                </div>
                <div id="comment_list">
                    <p id="comment_count"><span id="comment_counter">10</span> Comments</p>
                    <?php
                        for($i=1; $i<=10; $i++){
                            include($two_depth."/layout/comment.php");
                        };
                    ?>
                </div><!--end comment_list-->
                <div id="comment_more_box">
                    <button id="comment_more_bt"><i class="fa fa-angle-down"></i></button>
                </div>
            </article>
        </div><!--end con_main-->

        <div id="contents_aside" class="con_aside">
            <div class="creator_info">
                <figure id="user_img">
                    <img src="<?=$one_depth?>/../../../Lubycon_Contents/user/<?=$usercode?>/profile.jpg" >
                </figure>
                <span id="user_info_wrap">
                    <h4><a href="<?=$two_depth?>/personal_page/personal_page.php?cate=dashboard&usernum=<?=$usercode?>"><?=$user_name?></a></h4>
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
            <div id="cc_total_wrap" class="info-wrap hidden-mb-b">
                <p id="cc_title" class="info-title"><i class="fa fa-creative-commons fa-lg"></i>Creative Commons</p>
                <div id="cc_wrap" class="info-content">
                    <ul id="cc_wrap_inner">
                        <a href="#" id="cc_desc_link" target="_brank">
                        <li class="cc_icon" id="cc_main" data-tip="Creative Commons License">
                            <img src="<?=$one_depth?>/ch/img/creative_commons/png/cc_w.png" />
                        </li><!--cc icon-->
                        <li class="cc_icon" id="cc_by" data-tip="Attribution">
                            <img src="<?=$one_depth?>/ch/img/creative_commons/png/by_w.png" />
                        </li><!-- default icon-->
                        <li class="cc_icon" id="cc_nc" data-tip="Non Commercial">
                            <img src="<?=$one_depth?>/ch/img/creative_commons/png/nc_w.png" />
                        </li><!--non commercial-->
                        <li class="cc_icon" id="cc_nd" data-tip="Non Derivative">
                            <img src="<?=$one_depth?>/ch/img/creative_commons/png/nd_w.png" />
                        </li><!--non derivation-->
                        <li class="cc_icon" id="cc_share" data-tip="Share Alike">
                            <img src="<?=$one_depth?>/ch/img/creative_commons/png/share_w.png" />
                        </li><!--non derivation-->
                    </a>
                    </ul>                       
                </div>
            </div>
            <div id="descript_wrap" class="info-wrap hidden-mb-b">
                <p id="descript_title" class="info-title"><i class="fa fa-info-circle"></i>Description</p>
                <div id="descript_content" class="info-content">
                    <p>zsakjflksajflskajflskajlfksalfskaklfksajflksajflksajflksajflksajlfksajlfksajlfkjsalkfjlsakfjlsaifjliwjlfkjaslkfjlskafjlskajflsakjfisalfisajifljsaifliwpqpqpwjfpiwjfpiwqnonwcqpnjdwqpidjpwqidpwijdpiqwjdpwjdiwjpqwidjpwqizsakjflksajflskajflskajlfksalfskaklfksajflksajflksajflksajflksajlfksajlfksajlfkjsalkfjlsakfjlsaifjliwjlfkjaslkfjlskafjlskajflsakjfisalfisajifljsaifliwpqpqpwjfpiwjfpiwqnonwcqpnjdwqpidjpwqidpwijdpiqwjdpwjdiwjpqwidjpwqizsakjflksajflskajflskajlfksalfskaklfksajflksajflksajflksajflksajlfksajlfksajlfkjsalkfjlsakfjlsaifjliwjlfkjaslkfjlskafjlskajflsakjfisalfisajifljsaifliwpqpqpwjfpiwjfpiwqnonwcqpnjdwqpidjpwqidpwijdpiqwjdpwjdiwjpqwidjpwqizsakjflksajflskajflskajlfksalfskaklfksajflksajflksajflksajflksajlfksajlfksajlfkjsalkfjlsakfjlsaifjliwjlfkjaslkfjlskafjlskajflsakjfisalfisajifljsaifliwpqpqpwjfpiwjfpiwqnonwcqpnjdwqpidjpwqidpwijdpiqwjdpwjdiwjpqwidjpwqi</p>
                </div>
            </div>
        </div><!--end con_aside-->
    </section><!--end content_wrap-->
</section>  <!-- end contents section -->
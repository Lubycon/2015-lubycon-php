<script type="text/javascript" src="./service/controller/count_handler/thumbs_control.js"></script> <!-- account file js -->
<script type="text/javascript" src="./component/view/comment_card/comment.tmpl.js"></script>
<script type="text/javascript" src="./component/view/creator_card/creator_card.tmpl.js"></script>
<script type="text/javascript" src="./pages/controller/contents/viewer_controller.js"></script>

<link href="./pages/view/contents/contents_view.css" rel="stylesheet" type="text/css" /><!-- contents view css -->

<section class="container">
    <section class="nav_guide" id="contents_info_wrap">
        <div class="nav-wrapper">
            <h3 id="contents_title"></h3>
            <div id="contents_category"></div>
            <div id="contents_score">
                <ul>
                    <li><i class="fa fa-eye"></i></li>
                    <li id="viewCount" class="contents_view_score"></li>
                </ul>
                <ul>
                    <li><i class="fa fa-cloud-download"></i></li>
                    <li id="downloadCount" class="contents_view_score"></li>
                </ul>
                <ul>
                    <li><i class="fa fa-heart"></i></li>
                    <li id="likeCount" class="contents_view_score"></li>
                </ul>
            </div>
        </div><!--subnav_box end-->
    </section>
    <section class="con_wrap">
        <div id="contents_main" class="con_main">
            <?php
           		/* how to call 3d contents?
                if($_GET['cate'] == 'threed'){
                    include "./pages/view/contents/webGL.php";
                }
                else{
                    echo htmlspecialchars_decode($contents_html);
                };
                */
            ?>
            <div class="infoCard-horizontal">
                <div class="infoCard content_info x2 left">
                    <p class="infoCard-title inline">Did you like this contents?</p>
                    <div class="infoCard-userAction infoCard-content">
                        <div class="userAction-bt alertKey thumbs_view" data-value="bookmark" data-kind="contents">
                            <i class="fa fa-star" data-value="bookmark" data-kind="contents"></i>Bookmark
                        </div>
                        <div class="userAction-bt alertKey thumbs_view" data-value="like" data-kind="contents">
                            <i class="fa fa-heart" data-value="like" data-kind="contents"></i>Like
                        </div>
                    </div>
                    <p class="infoCard-title">Creative Commons License</p>
                    <div class="infoCard-cc infoCard-content">
                        <p class="cc-descipt">If you want learn about this license, click below icons</p>
                        <ul class="cc-list" data-value="<?=$cc_code?>">
                            <a href="#" id="cc-link" target="_brank">
                                <!--CC ICONS-->
                            </a>
                        </ul>
                    </div>
                </div>
                <div class="infoCard creator x2 right">
                    <p class="infoCard-title">Creator</p>
                    
                    <!--CREATOR CARD-->
                    
                </div>
            </div>
             
            <article class="infoCard comment">
                <p class="infoCard-title"><span id="comment-counter"></span> Comments</p>
                <div class="comment-write-wrap" class="comment-div">
                    <figure class="comment-pic hidden-mb-ib">
                        <img src="#" class="hidden-mb-ib">
                    </figure>
                    <div class="comment-input">
                        <textarea id="comment_text"></textarea>
                        <button id="comment_bt">
                            <i class="fa fa-comments"></i>Post
                        </button>
                    </div>
                </div>
                <div class="comment-list">
                    <!---COMMENT CARD-->
                </div>
                <div class="viewmore_bt" data-value="comment"><i class="fa fa-angle-down"></i></div>
            </article>
        </div><!--con_main-->

        <div id="contents_aside" class="con_aside hidden-mb-ib">
            <div class="creator_info">
                <figure id="user_img">
                    <img src="#" >
                </figure>
                <span id="user_info_wrap">
                    <h4><a href="#"><!--USERNAME--></a></h4>
                    <h5 data-value="job"><!--USERJOB--></h5>
                    <h5 data-value="location" data-tip=""><i class="fa fa-map-marker"></i><!--USER LOCATION--></h5>
                </span>
            </div>
            <!--<div id="content_down" class="hidden-mb-b"><i class="fa fa-cloud-download"></i></div>-->
            <div id="tag_wrap" class="info-wrap hidden-mb-b">
                <p id="tag_title" class="info-title"><i class="fa fa-tag"></i>Tags</p>
                <div id="tagbox_wrap" class="info-content">
                    <ul id="tagbox_wrap_inner">
                        <!--TAG-->
                    </ul>                       
                </div>
            </div>
            <div id="descript_wrap" class="info-wrap hidden-mb-b">
                <p id="descript_title" class="info-title"><i class="fa fa-info-circle"></i>Description</p>
                <div id="descript_content" class="info-content">
                    <p>
                        <!--DESCRIPT-->       
                    </p>
                </div>
            </div>
        </div><!--con_aside-->
    </section><!--content_wrap-->
</section>  <!--contents section-->
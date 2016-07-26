<link href="./pages/view/community/community_view.css" rel="stylesheet" type="text/css" />  <!-- community_view css -->
<link href="./pages/view/community/community.css" rel="stylesheet" type="text/css" />  <!-- community css -->
<script type="text/javascript" src="./pages/controller/community/community_view_renderer.js"></script>
<script type="text/javascript" src="../plugin/JS/resizeObject.js"></script>

<section class="container">
    <section class="nav_guide">
        <p id="post_subject">
            <span class="post_subject_name"></span>
            <span class="written_date"></span>
        </p>

        <ul id="post_info">
            <li><i class="fa fa-heart count_icon like"></i></li>
            <li><i class="fa fa-eye count_icon view"></i></li>
        </ul>
    </section>
    <section class="con_wrap">
        <section class="con_main">
            <div class="infoCard" id="post_contents" >
                <p>
                    <!--CONTENT-->
                </p>
                <div id="post_edit_box">
                    <button class="alertKey post_edit_bt" id="delete_bt" ><i class="fa fa-trash"></i>Delete</button>
                    <button class="post_edit_bt"><i class="fa fa-repeat"></i>Modified</button>
                </div>
            </div>  <!-- end post_contents -->
            <div class="infoCard-horizontal">
                <div class="infoCard content_info x2">
                    <p class="infoCard-title inline">Did you like this contents?</p>
                    <div class="infoCard-userAction infoCard-content">
                        <div class="userAction-bt alertKey" data-value="like">
                            <i class="fa fa-heart" data-value="like"></i>Like
                        </div>
                    </div>
                </div>
                <div class="infoCard creator x2">
                    <p class="infoCard-title">Creator</p>
                    <!--CREATOR CARD-->
                </div>
            </div>

            <article class="infoCard comment">
                <p class="infoCard-title"><span id="comment-counter">10</span> Comments</p>
                <div class="comment-write-wrap" class="comment-div">
                    <figure class="comment-pic" class="hidden-mb-ib">
                        <img src="" class="hidden-mb-ib">
                    </figure>
                    <div class="comment-input">
                        <textarea id="comment_text"></textarea>
                        <button id="comment_bt">
                            <i class="fa fa-comments"></i>Post
                        </button>
                    </div>
                </div>
                <div class="comment-list">
                    <!--COMMENT CARD-->
                </div><!--end comment_list-->
                <div class="viewmore_bt" data-value="comment"><i class="fa fa-angle-down"></i></div>
            </article>
        </div><!--end con_main-->
    </section>  <!-- end post_box -->
</section>  <!-- end contents section -->

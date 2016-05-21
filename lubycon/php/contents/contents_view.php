<?php
$number = $_GET["conno"]; //contenst number form url
$cate = $_GET['cate'];
$url_parse = parse_url($_SERVER['HTTP_REFERER']);
$devide_query = (string)$url_parse['query'];
setcookie('contents_history', $devide_query.'&conno='.$number.'&concate='.$cate, time()+(60*60*3)); //3 hour cookie (for infinite scroll)
//echo $_COOKIE['contents_history'];
//echo $_SERVER['HTTP_REFERER'];
//echo $url_parse['query'];

$one_depth = '../..'; //css js load
$two_depth = '..'; // php load
include_once('../layout/index_header.php');



$allow_array = ['all','artwork','vector','threed'];
if( in_array($cate , $allow_array) )
{
    require_once '../database/database_class.php';
    $db = new Database();

    switch($cate){ //check category
    case 'artwork' : $contents_cate = 1; $cate_name = 'artwork'; break;
    case 'vector' : $contents_cate = 2; $cate_name = 'vector'; break;
    case 'threed' : $contents_cate = 3; $cate_name = 'threed'; break;
    default : $contents_cate = 1; break;
    }
}else
{
    include_once('../../404.php');
    die();
};

$db->changedb('lubyconboard');
$db->query = "UPDATE `$cate_name` SET `viewCount` = `viewCount`+1 WHERE `$cate_name`.`boardCode` = $number";
$db->askQuery(); // viewcount up

$db->query =
"
SELECT * 
FROM lubyconboard.`$cate_name` 
INNER join lubyconuser.`userbasic` 
INNER join lubyconuser.`userinfo` 
on `$cate_name`.`userCode` = `userbasic`.`userCode` and `userbasic`.`userCode` = `userinfo`.`userCode` 
WHERE `$cate_name`.`boardCode` = $number 
";
$db->askQuery(); //get db data

$row = mysqli_fetch_array($db->result);
if( !is_array($row) )
{
    include_once('../../404.php');
}



require_once "../class/json_class.php";
$json_control = new json_control;
$json_control->json_decode('jobCode',"$one_depth/data/job.json");
$job_decode = $json_control->json_decode_code;
$json_control->json_decode('country',"$one_depth/data/country.json");
$country_decode = $json_control->json_decode_code;

$my_job_origin_select = $job_decode[$row['jobCode']];
$my_country_origin_select = $country_decode[$row['countryCode']];

$contents_name = $row['title'];
$contents_html = $row['contents'];
$user_img_url = $row['profileImg'];
$category0 = $cate_name;
$category1 = "Category1";
$category2 = "Category2";

$usercode = $row['userCode'];
$user_name = $row['nick'];
$usercity = $row['city'];

$userjob = $my_job_origin_select;
$usercountry = $my_country_origin_select;

$file_descript = $row['description'];


$file_view = $row['viewCount'];
$file_down = $row['downloadCount'];
$file_like = $row['likeCount'];
?>


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
            <div id="content_down" class="hidden-mb-b"><i class="fa fa-cloud-download"></i></div>
            <div id="tag_wrap" class="hidden-mb-b">
                <p id="tag_title"><i class="fa fa-tag"></i>Tags</p>
                <div id="tagbox_wrap">
                    <ul id="tagbox_wrap_inner">
                        <li class="tagbox">javascript</li>
                        <li class="tagbox">html</li>
                        <li class="tagbox">c++</li>
                        <li class="tagbox">php</li>
                        <li class="tagbox">python</li>
                    </ul>                       
                </div>
            </div>
            <div id="cc_total_wrap" class="hidden-mb-b">
                <p id="cc_title"><i class="fa fa-creative-commons fa-lg"></i>Creative Commons</p>
                <div id="cc_wrap">
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
            <div id="file_descript" class="hidden-mb-b">
                <p id="view_descript">ABOUT THIS CONTENT</p>
                <div id="descript_box">
                    <p><?=$file_descript?></p>
                </div>
            </div>
        </div><!--end con_aside-->
    </section><!--end content_wrap-->
</section>  <!-- end contents section -->

<?php
    include_once($two_depth.'/layout/index_footer.php');
?>
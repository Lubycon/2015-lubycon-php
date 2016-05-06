<div id="myinfo_main">
    <figure>
        <img src="<?=$user_img_url?>">
    </figure>
    <h4><?=@$username?></h4>
</div>
<div id="myinfo_sub">
    <article class="myinfo_wrap" id="myinfo_job">
        <i class="fa fa-suitcase hidden-mb-ib"></i>
        <p class="myinfo_name" id="job_name"><?=$userjob?></p>
    </article>
    <article class="myinfo_wrap hidden-mb-b" id="myinfo_location">
        <i class="fa fa-map-marker"></i>
        <p class="myinfo_name" id="location_name"><?=$usercity?>, <?=$usercountry?></p>
    </article>
    <article class="myinfo_wrap hidden-mb-b" id="myinfo_language">
        <i class="fa fa-language"></i>
        <p class="myinfo_name" id="language_name"><?=$language1?>, <?=$language2?></p>
    </article>
</div>
<a href="<?=$two_depth?>/personal_page/personal_page.php?cate=dashboard">
    <div class="my_page_bt">My Page</div>
</a>
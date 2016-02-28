<div class="main_figure_wrap hidden-mb-b">
    <figure id="main_figure">
        <div class="dark_overlay_small"></div>
        <h2>CREATORS</h2>
    </figure>   <!-- end main_figure -->
</div>
<!-- end main_figure -->

<link href="css/creators_page.css" rel="stylesheet" type="text/css" />
<!-- contents page css -->
<section id="contents">
    <section class="nav_guide hidden-mb-ib">
        <div class="subnav_box">
            <div class="lubySelector">
                <span class="global_icon"><i class="fa fa-globe"></i></span>
                <span class="lubySelector_selected">All Continents</span>
                <span class="lubySelector_arrow"><i class="fa fa-caret-down"></i></span>
                <ul class="lubySelector_list">
                    <li>All Continents</li>
                    <li>Africa</li>
                    <li>Asia</li>
                    <li>Europe</li>
                    <li>North America</li>
                    <li>South America</li>
                    <li>Oceania</li>
                </ul>
            </div>
        </div>
        <div class="lubySelector hidden-mb-ib">
            <span class="global_icon"><i class="fa fa-filter"></i></span>
            <span class="lubySelector_selected">All jobs</span>
            <span class="lubySelector_arrow"><i class="fa fa-caret-down"></i></span>
            <ul class="lubySelector_list">
                <li class="selected_li">All Jobs</li>
                <li>Artist</li>
                <li>Creator</li>
                <li>Designer</li>
                <li>Engineer</li>
                <li>Student</li>
                <li>Other</li>
            </ul>
        </div>
        <div class="lubySelector hidden-mb-ib">
            <span class="global_icon"><i class="fa fa-group"></i></span>
            <span class="lubySelector_selected">New</span>
            <span class="lubySelector_arrow"><i class="fa fa-caret-down"></i></span>
            <ul class="lubySelector_list">
                <li class="selected_li">New</li>
                <li>Most Like</li>
                <li>Most Download</li>
                <li>Most Comment</li>
            </ul>
        </div>
        <div id="sub_search_bar" class="hidden-mb-ib">
            <div class="select_box">
                <select class="basic">
                    <option value="Title">Name</option>
                    <option value="Designer">Country</option>
                </select>
                <span class="lubySelector_arrow"><i class="fa fa-caret-down"></i></span>
            </div>
            <input type="text" id="sub_search_text" value="Enter the Keyword" />
            <button id="sub_search_btn">
                <i class="fa fa-search"></i>
            </button>
        </div>
    </section>
    <!-- end nav_guide -->
    <section id="user_view">
        <section class="con_wrap">
            <div id="user_view_aside" class="con_aside">
                <?php 
                    $user_img_url = "../contents_data/3djpg/profile/32.jpg";
                    $username = "Kim dongkyu";
                    $userjob = "Designer";
                    $usercity = "Seoul";
                    $usercountry = "South Korea";
                    $language1 = "Korean";
                    $language2 = "English";
                    
                ?>
                <i id="myinfo_setting" class="fa fa-bars hidden-mb-b"></i>
                <div id="myinfo_menu_list">
                    <ul>
                        <li><a href="./index.php?1=personal_page&2=personal_page&3=dashboard"><i class="fa fa-tachometer"></i>Dashboard</a></li>
                        <li><a href="./index.php?1=personal_page&2=personal_page&3=my_contents"><i class="fa fa-eye"></i>My Contents</a></li>
                        <li><a href="./index.php?1=personal_page&2=personal_page&3=insight"><i class="fa fa-bar-chart"></i>My Insight</a></li>
                        <li><a href="./index.php?1=personal_page&2=personal_page&3=bookmark"><i class="fa fa-star"></i>Bookmarks</a></li>
                    </ul>
                </div>
                <div id="myinfo_main">
                    <figure>
                        <img src="<?=$user_img_url?>">
                    </figure>
                    <h4><?=$username?></h4>
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
                <a href="./index.php?1=personal_page&2=personal_page&3=dashboard"><button id="my_page_bt">My Page</button></a>
            </div><!--end con_aside-->
            <div id="user_view_main" class="con_main">
                <?php
                    $user_img_url = "../contents_data/3djpg/profile/15.jpg";
                    $user_location_img = "./ch/img/flag_icons/United-States-Of-America.png";
                    $usercity = "Los Santos";
                    $usercountry = "United States";
                    $username = "Ssaru";
                    $userjob = "Gangster";
                    $contents_count = rand(3, 150);
                    $user_content1 = "../contents_data/artworkjpg/thumb/20.jpg";
                    $user_content2 = "../contents_data/artworkjpg/thumb/34.jpg";
                    $user_content3 = "../contents_data/artworkjpg/thumb/50.jpg";
                ?><!--you should change to mySQL later-->
                <div id="bestCreator" class="creators_card">
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
                            <p class="creator_name"><a href="./index.php?1=personal_page&2=personal_page&3=dashboard"><?=$username?></a></p><!--user name-->
                            <p class="creator_job"><?=$userjob?></p><!--job-->
                            <p class="creator_location"><i class="fa fa-map-marker"></i><?=$usercity?>, <?=$usercountry?></p>
                            <article class="contents_count">
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
                <ul id="creator_card_wrap">
                <?php
                    $bestCreator_img_url = "../contents_data/3djpg/profile/60.jpg";
                    $bestCreator_location_img = "./ch/img/flag_icons/United-States-Of-America.png";
                    $bestCreator_contents_num = rand(3, 150);
                    for($i=0;$i<60;$i++){
                        $_GET["number"] = $i;
                        include('php/layout/creator_card.php');
                    }
                ?>
                </ul>
            </div><!--end con_main-->
        </section><!--end user_box_total-->
    </section><!--end user_view-->
</section>
<!-- end contents section -->

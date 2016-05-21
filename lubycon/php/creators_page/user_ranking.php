<div class="main_figure_wrap hidden-mb-b">
    <figure id="main_figure">
        <div class="dark_overlay_small"></div>
        <h2>RANKING</h2>
    </figure>   <!-- end main_figure -->
</div>
<!-- end main_figure -->

<link href="css/user_ranking.css" rel="stylesheet" type="text/css" />
<!-- contents page css -->
<section class="container">
    <section class="navsel">
        <!-- end lnb nav -->
    </section>
    <section class="nav_guide">
        <div class="nav-wrapper">
            <div class="contents_bt">
                <span class="global_icon">
                    <img src="./ch/img/grobal_icon.png" width="24" height="24" /></span>
                <span class="subnav_selected">All Continents</span>
                <span class="subnav_arrow"><i class="fa fa-caret-down"></i></span>
                <ul class="subnav_list">
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
        <div class="contents_bt">
            <span class="global_icon"><i class="fa fa-filter"></i></span>
            <span class="subnav_selected">All</span>
            <span class="subnav_arrow"><i class="fa fa-caret-down"></i></span>
            <ul class="subnav_list">
                <li class="selected_li">All</li>
                <li>Most Like</li>
                <li>Most Download</li>
                <li>Most Comment</li>
            </ul>
        </div>
        <div id="sub_search_bar">
            <div class="select_box">
                <select class="basic">
                    <option value="Title">Name</option>
                    <option value="Designer">Country</option>
                </select>
                <span class="subnav_arrow"><i class="fa fa-caret-down"></i></span>
            </div>
            <input type="text" id="sub_search_text" value="Enter the Keyword" />
            <button id="sub_search_btn">
                <i class="fa fa-search"></i>
            </button>
        </div>

    </section>
    <!-- end nav_guide -->
    <section>
        <?php
            $top_country = "Country";
            $top_username = "Admin_User";
            $top_like = 0;
            $top_follow = 0;//designer of the month

            $rank_country = "Country";
            $rank_username = "Admin_User";
            $rank_like = 0;
            $rank_follow = 0;
        ?>
        <table id="designers_rank_table">
            <thead>
                <th class="rank_number"></th>
                <th class="rank_updown"></th>
                <th class="rank_contry"></th>
                <th class="rank_photo"></th>
                <th class="rank_name"></th>
                <th class="rank_like"><i class="fa fa-heart"></i></th>
                <th class="rank_follow"><i class="fa fa-user-plus"></i></th>
            </thead>
            <tbody>
                <tr id="top_rank">
                    <td><i class="fa fa-trophy"></i></td>
                    <td></td>
                    <td><?=$top_country?></td>
                    <td>
                        <img src="./ch/img/no_img/no_img_user1.jpg" /></td>
                    <td class="rank_name">
                        <a href="./index.php?1=personal_page&2=personal_page&3=main&4=my_contents">
                            <?=$top_username?>
                        </a>
                    </td>
                    <td class="rank_like"><?=$top_like?></td>
                    <td class="rank_follow"><?=$top_follow?></td>
                </tr>
                
                <?php
                    for($i=1; $i<=20; $i++){
                        if($i%2!=0){
                            echo 
                            "<tr id='rankers'>
                                <td>{$i}</td>
                                <td><i class='fa fa-caret-up rankup'></i></td>
                                <td>{$rank_country}</td>
                                <td>
                                    <img src='ch/img/no_img/no_img_user1.jpg' /></td>
                                <td class='rank_name'>
                                    <a href='./index.php?1=personal_page&2=personal_page&3=main&4=my_contents'>
                                        {$rank_username}
                                    </a>
                                </td>
                                <td class='rank_like'>{$rank_like}</td>
                                <td class='rank_follow'>{$rank_follow}</td>
                            </tr>";
                        }//if end
                        elseif($i%2==0){
                            echo 
                            "<tr id='rankers'>
                                <td>{$i}</td>
                                <td><i class='fa fa-caret-down rankdown'></i></td>
                                <td>{$rank_country}</td>
                                <td>
                                    <img src='ch/img/no_img/no_img_user1.jpg' /></td>
                                <td class='rank_name'>
                                    <a href='./index.php?1=personal_page&2=personal_page&3=main&4=my_contents'>
                                        {$rank_username}
                                    </a>
                                </td>
                                <td class='rank_like'>{$rank_like}</td>
                                <td class='rank_follow'>{$rank_follow}</td>
                            </tr>";
                        }//elseif end
                    }//for end
                ?>
            </tbody>
        </table>
        <?php
            include_once('php/layout/pager.php');
        ?>
    </section>
</section>
<!-- end contents section -->

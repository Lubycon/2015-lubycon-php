<aside id="personal_aside" class="con_aside">
    <?php
        require_once '../database/database_class.php';
	    $db = new Database();
        
        $usernumber = $_GET['usernum'];
        $db->query = "SELECT * FROM `userbasic` INNER JOIN `userinfo` ON `userbasic`.`userCode` = `userinfo`.`userCode` WHERE `userbasic`.`userCode` = $usernumber ";
        $db->askQuery();
        $userdata_row = mysqli_fetch_array($db->result);
        $db->query = "SELECT `languageLevel`,`languageName` FROM `userlanguage` WHERE `userCode` = $usernumber";
        $db->askQuery();
        while( $row = mysqli_fetch_array($db->result) )
        {
            $lang_level[] = $row['languageLevel'];
            $lang_name[] = $row['languageName'];
        }
        $db->query = "SELECT `historyContents`,`historyDateYear`,`historyDateMonth`,`historyCategory` FROM `userhistory` WHERE `userCode` = $usernumber";
        $db->askQuery();
        $history_row = $db->result;

        $username = $userdata_row['nick'];
        $userpic = "$one_depth/../../Lubycon_Contents/user/$usernumber/profile.jpg";

        $usercity = $userdata_row['city'];
        $usercountry = $country_json_Code[$userdata_row['countryCode']]['name'];

        $userIntro = $userdata_row['userDescription'];
    ?>
    <div id="user_information">
        <div id="userinfo_main">
            <figure id="user_pic">
                <img src=<?=$userpic?>></img>
            </figure>
            <span id="user-info">
                <h4 id="user-name"><?=$username?></h4>
                <h5 id="user-location"><i class="fa fa-map-marker"></i><?=$usercity?>, <?=$usercountry?></h5>
            </span>
            <h5 id="user-intro"><p><?=$userIntro?></p></h5>
            <?php
                if($usernumber == $Loginuser_code){
                    echo '<span id="user-setting">
                            <a href="<?=$two_depth?>/personal_page/personal_page.php?cate=account_setting&usernum=<?=$usercode?>">
                                <i class="fa fa-gear fa-1x"></i>
                            </a>
                        </span>';
                }
            ?>
            
        </div> 
    </div>
    <div id="subnav" class="hidden-mb-b">
        <ul>
            <li id="dashboard" class="subnav_li"><a href="../personal_page/personal_page.php?cate=dashboard&usernum=<?=$usernumber?>">Dashboard</a></li>
            <li id="my_contents" class="subnav_li"><a href="../personal_page/personal_page.php?cate=my_contents&usernum=<?=$usernumber?>&page=1">Contents</a></li>
            <li id="my_forums" class="subnav_li"><a href="../personal_page/personal_page.php?cate=my_forums&usernum=<?=$usernumber?>">Forums</a></li>
            <li id="insight" class="subnav_li"><a href="../personal_page/personal_page.php?cate=insight&usernum=<?=$usernumber?>">Insight</a></li>
            <li id="bookmark" class="subnav_li"><a href="../personal_page/personal_page.php?cate=bookmark&usernum=<?=$usernumber?>&page=1">Bookmark</a></li>           
        </ul>
    </div>
</aside>
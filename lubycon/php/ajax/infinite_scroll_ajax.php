<?php
    $one_depth = '../..'; //css js load
    $two_depth = '..'; // php load
    $cate_name = $_POST['cate_param'];
    $page_param = $_POST['page_param'];

    require_once "../database/database_class.php";
    $db = new Database();
    require_once "../class/json_class.php";
    $json_control = new json_control;

    $json_control->json_decode('top_category',"../../data/top_category.json");
    $top_cate_decode = $json_control->json_decode_code;

    $query;
    $cate_name;
    $page = ($page_param - 1) * 30;
    $contents_limit = 30;
    $query_all = "SELECT * FROM lubyconboard.`artwork` INNER join lubyconuser.`userbasic` INNER join lubyconuser.`userinfo` ON `artwork`.`userCode` = `userbasic`.`userCode` and `userbasic`.`userCode` = `userinfo`.`userCode` UNION SELECT * FROM lubyconboard.`vector` INNER join lubyconuser.`userbasic` INNER join lubyconuser.`userinfo` ON `vector`.`userCode` = `userbasic`.`userCode` and `userbasic`.`userCode` = `userinfo`.`userCode` UNION SELECT * FROM lubyconboard.`threed` INNER join lubyconuser.`userbasic` INNER join lubyconuser.`userinfo` ON `threed`.`userCode` = `userbasic`.`userCode` and `userbasic`.`userCode` = `userinfo`.`userCode` ORDER BY `boardCode` DESC limit $page,$contents_limit";
    $query_one = "SELECT * FROM lubyconboard.`$cate_name` , lubyconuser.`userbasic` , lubyconuser.`userinfo` WHERE lubyconboard.`$cate_name`.`userCode` = lubyconuser.`userbasic`.`userCode` AND lubyconuser.`userbasic`.`userCode` = lubyconuser.`userinfo`.`userCode`ORDER BY lubyconboard.`$cate_name`.`boardCode` DESC limit $page,$contents_limit";

    if($cate_name == 'all')
    {
        $db->query = $query_all;
    }else if($cate_name == 'artwork' ||$cate_name == 'vector' || $cate_name='threed')
    {
        $db->query = $query_one;
    }
    $db->askQuery();
    if( $db->result->num_rows != 0 )
    {
        //echo "<div class='scroll_checker page_top_$page_param'></div>";
        while( $row = mysqli_fetch_array($db->result) )
        {
            $top_category = $top_cate_decode[$row['CategoryCode']];
            include('../layout/content_card.php');
        }
        echo "<div class='scroll_checker page_bottom_$page_param'></div>";
    }else
    {
        echo "<p class='finish_contents'>no more contents :)</p>";
    }
    sleep(1);
?>
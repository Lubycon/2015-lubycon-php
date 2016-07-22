<?php
    require_once "../../../common/Class/database_class.php";
    $db = new Database();

    $db->query =
     $infinite_scroll->select_query
    .$infinite_scroll->from_query
    .$infinite_scroll->where_query
    .$infinite_scroll->order_query
    .$infinite_scroll->limit_query;
    $db->askQuery();
    $contents_result = $db->result;


    $best_creator_result = array();
    if( $postData->cardType == 'creator' ) //need change logic form creator of the month
    {
        $db->query =
        "
        SELECT  `userbasic`.`userCode` , `nick` , `jobCode` , `boardCode` , `city` , `countryCode` , `userDirectory`
        FROM lubyconboard.`artwork` INNER join lubyconuser.`userbasic` 
        INNER join lubyconuser.`userinfo` 
        ON `artwork`.`userCode` = `userbasic`.`userCode` 
        and `userbasic`.`userCode` = `userinfo`.`userCode` 
        ORDER BY `nick` DESC  limit 1
        ";
        $db->askQuery();
        $best_creator_result = $db->result;
    }

    $result = [
        'contents' => $contents_result,
        'bestCreator' => $best_creator_result
    ]; //contents data
    
    /*
    $db->query = $infinite_scroll->query_foundRow;
    $db->askQuery();
    $foundRow_result = $db->result; //row count
    */
?>
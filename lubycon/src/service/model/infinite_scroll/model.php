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
        SELECT  ub.`userCode` , ub.`nick` , ui.`jobCode` , a.`boardCode` , ui.`city` , ui.`countryCode` , a.`userDirectory`, a.`topCategoryCode`, com.`comDate` ,com.`comIntroduce`, com.`comInterviewUrl`
        FROM 
        ( 
            SELECT * FROM lubyconboard.`artwork`
            LEFT JOIN lubyconboard.`artworkmidcategory`
            USING (`boardCode`)
                    
            UNION SELECT * FROM lubyconboard.`vector` 
            LEFT JOIN lubyconboard.`vectormidcategory`
            USING (`boardCode`)
                    
            UNION SELECT * FROM lubyconboard.`threed` 
            LEFT JOIN lubyconboard.`threedmidcategory`
            USING (`boardCode`)
        ) AS a 
        LEFT join lubyconuser.`userbasic` as ub
        USING (`userCode`)
        LEFT join lubyconuser.`userinfo`  as ui
        USING (`userCode`)
        LEFT JOIN lubyconuser.`creatorofthemonth` as com
        USING (`userCode`)

        WHERE date(com.`comDate`) >= date_format(now(), '%Y-%m-01') and date(com.`comDate`) <= last_day(now())
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
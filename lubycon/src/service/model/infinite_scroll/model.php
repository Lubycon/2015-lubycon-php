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

	//echo $db->query;

    $contents_result = $db->result; //contents data
    
    /*
    $db->query = $infinite_scroll->query_foundRow;
    $db->askQuery();
    $foundRow_result = $db->result; //row count
    */
?>
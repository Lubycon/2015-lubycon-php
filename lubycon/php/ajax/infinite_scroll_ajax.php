<?php
    $one_depth = '../..'; //css js load
    $two_depth = '..'; // php load

    require_once "$two_depth/session/session_class.php";
    $session = new Session();
    if(($session->GetSessionId() == null) && $session->GetSessionName() == null){
    $LoginState = false;
    }else{
    if($session->SessionExist()){
    $LoginState = true;
    $Loginuser_code= $_SESSION['lubycon_code'];
    }else{
    $LoginState = false;
    }
    }

    /* require class set value */
    require_once "$two_depth/database/database_class.php";
    $db = new Database();
    require_once "../class/json_class.php";
    $json_control = new json_control;
    require_once "../class/infinite_scroll_class.php";

    $cate_name = $_POST['cate_param']; //form infinite scroll js post ajax
    $page_param = $_POST['page_param']; //form infinite scroll js post ajax
    $now_page_param = $_POST['now_page_param']; //form infinite scroll js post ajax
    $filter = 
    [ 
        'search_kind' => null, //search kind 
        'search_word' => null, //search word
        'middle_cateogry' => null, //middle category
        'a.`ccLicense`' => null, //cc license
        'a.`userCode`' => null, //my contens
        'b.`bookmarkActionUserCode`' => null //my bookmark
    ];
    $sort = null;
    $ajax_boolean = true; 




    /* require class */
    
    $infinite_scroll = new infinite_scroll('content',$cate_name);
    $infinite_scroll->validate_category();
    $infinite_scroll->set_option($filter,$sort,$now_page_param,$ajax_boolean,$page_param);
    $infinite_scroll->set_query($Loginuser_code);
    $db->query = $infinite_scroll->query;
    $db->askQuery();
    $contents_result = $db->result; //contents data
    $db->query = $infinite_scroll->query_foundRow;
    $db->askQuery();
    $foundRow_result = $db->result; //row count
    $infinite_scroll->count_page($foundRow_result);
    $infinite_scroll->spread_contents($contents_result,$one_depth,$ajax_boolean);
    //$infinite_scroll->check_cookie();
    sleep(0.5);
?>
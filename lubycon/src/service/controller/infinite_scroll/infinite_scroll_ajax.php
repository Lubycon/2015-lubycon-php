<?php
    require_once "../../../common/Class/session_class.php";
    $session = new Session();
    if(($session->GetSessionId() == null) && $session->GetSessionName() == null){
    $LoginState = false;
    }else{
    if($session->SessionExist()){
    $LoginState = true;
    $Loginuser_code= $_SESSION['lubycon_userCode'];
    }else{
    $LoginState = false;
    }
    }
    if(!isset($Loginuser_code)){$Loginuser_code='';} // not login stat , valuable is ''


    /* require class set value */
    require_once "../../../common/Class/database_class.php";
    $db = new Database();
    require_once "../../../common/Class/json_class.php";
    $json_control = new json_control;
    require_once "../../../common/Class/infinite_scroll_class.php";


    $cate_name = $_POST['cate_param']; //form infinite scroll js post ajax
    $page_param = $_POST['page_param']; //form infinite scroll js post ajax
    $now_page_param = $_POST['now_page_param']; //form infinite scroll js post ajax

    switch($_POST['search_filter'])
    {
        case 0 : $search_filter = 'a.`contentTitle`' ; break;
        case 1 : $search_filter = 'c.`nick`' ; break;
        case 2 : $search_filter = 'a.`contentTitle`' ; break;
        default : die('search filter error'); break;
    }

    $filter = 
    [
        ['value' => $_POST['search_word'] != '' ? $_POST['search_word'] : null , 'query' => $search_filter." like '%".$_POST['search_word']."%'" ], //search word
        ['value' => $_POST['mid_cate_value'] > 0 ? $_POST['mid_cate_value'] : null , 'query' => $_POST['mid_cate_value'].' IN (a.`midCategoryCode0`,a.`midCategoryCode1`,a.`midCategoryCode2`)'], //middle category
        ['value' => $_POST['copyright_value'] > 0 ? $_POST['copyright_value'] : null , 'query' => 'a.`ccLicense` = '.($_POST['copyright_value']-1) ], //cc license
        ['value' => null , 'query' => ''], //my contens
        ['value' => null , 'query' => ''] //my bookmark
    ];
    $sort = $_POST['prefer_value'] > 0 ? $_POST['prefer_value'] : null;
    $ajax_boolean = true; 

    //print_r($filter);


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
    $infinite_scroll->spread_contents($contents_result,'../../',$ajax_boolean);
    echo "<script>$('.sliderKey').attr('max','$infinite_scroll->all_page_count')</script>";

    //$infinite_scroll->check_cookie();
    sleep(0.5);
?>
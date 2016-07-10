<?php

    /* require class set value */
    require_once "./common/Class/database_class.php";
    $db = new Database();
    require_once "./common/Class/json_class.php";
    $json_control = new json_control;
    require_once "./common/Class/infinite_scroll_class.php";

    $cate_name = 'all';
    $page_number = $_GET['page'];

    $filter = 
    [ 
        'search_kind' => null, //search kind 
        'search_word' => null, //search word
        'middle_cateogry' => null, //middle category
        'a.`ccLicense`' => null, //cc license
        'a.`userCode`' => $Loginuser_code, //my contens
        'b.`bookmarkActionUserCode`' => null //my bookmark
    ];
    $sort = null;

    
        //'orderby' => 'contentDate', //Featured


    $middle_category = 0;
    $sortlist = [];
    $ajax_boolean = false;
    $query_user_code = isset($Loginuser_code) ? $query_user_code=$Loginuser_code : $query_user_code=false ;
    /* require class */

    /* json control */
    $current_url = $cate_name;
    $json_control->json_decode($current_url.'_category',"../data/middle_category.json");
    $middle_cate_decode = $json_control->json_decode_code;
    /* json control */
    
    $infinite_scroll = new infinite_scroll('content',$cate_name);
    $infinite_scroll->validate_category();
    $infinite_scroll->set_option($filter,$sort,$page_number,$ajax_boolean,null);
    $infinite_scroll->set_query($query_user_code);
    $db->query = $infinite_scroll->query;
    $db->askQuery();
    $contents_result = $db->result; //contents data
    $db->query = $infinite_scroll->query_foundRow;
    $db->askQuery();
    $foundRow_result = $db->result; //row count
    $infinite_scroll->count_page($foundRow_result);
    //echo $infinite_scroll->all_page_count; //count row result
?>

<script>var PRESET_DEPTH = "../../"</script>

<link type="text/css" href="../../css/module/chosen.css" rel="stylesheet" />
<link type="text/css" href="../../css/module/modifyWindow.css" rel="stylesheet" />
<script type="text/javascript" src="../../js/module/modalClass.js"></script>
<script type="text/javascript" src="../../js/module/chosen.jquery.js"></script>
<script type="text/javascript" src="../../data/module/keyCode.json"></script>
<script type="text/javascript" src="../../data/creative_commons.json"></script>
<script type="text/javascript" src="../../js/my_contents.js"></script>


<ul class="contents_wrap">
<?php
    $infinite_scroll->spread_contents($contents_result,'../../',$ajax_boolean);
    $infinite_scroll->check_cookie();
?>
</ul>

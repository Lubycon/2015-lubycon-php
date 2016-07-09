<?php
    /* include layout (imfortant) */
    $one_depth = '../..'; //css js load
    $two_depth = '..'; // php load
    /* include layout (imfortant) */

    /* require class set value */
    require_once "$two_depth/database/database_class.php";
    $db = new Database();
    require_once "../class/json_class.php";
    $json_control = new json_control;
    require_once "../class/infinite_scroll_class.php";

    $cate_name = 'all';
    $page_number = $_GET['page'];

    $filter = 
    [ 
        'search_kind' => null, //search kind 
        'search_word' => null, //search word
        'middle_cateogry' => null, //middle category
        'a.`ccLicense`' => null, //cc license
        'a.`userCode`' => null, //my contens
        'b.`bookmarkActionUserCode`' => $Loginuser_code //my bookmark
    ];
    $sort = null;

    $middle_category = 0;
    $sortlist = [];
    $ajax_boolean = false;
    $query_user_code = isset($Loginuser_code) ? $query_user_code=$Loginuser_code : $query_user_code=false ;
    /* require class */

    /* json control */
    $current_url = $cate_name;
    $json_control->json_decode($current_url.'_category',"$one_depth/data/middle_category.json");
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



<ul class="contents_wrap">
<?php
    $infinite_scroll->spread_contents($contents_result,$one_depth,$ajax_boolean);
    $infinite_scroll->check_cookie();
?>
</ul>

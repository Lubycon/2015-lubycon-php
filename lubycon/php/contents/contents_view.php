<?php
$number = $_GET["conno"]; //contenst number form url
$cate = $_GET['cate'];
$url_parse = parse_url($_SERVER['HTTP_REFERER']);
if( isset($url_parse['query']) )
{
    $devide_query = (string)$url_parse['query'];
    setcookie('contents_history', $devide_query.'&conno='.$number.'&concate='.$cate, time()+(60*60*3),'/'); //3 hour cookie (for infinite scroll)
}
//echo $_COOKIE['contents_history'];
//echo $_SERVER['HTTP_REFERER'];
//echo $url_parse['query'];
//print_r( $url_parse);
$one_depth = '../..'; //css js load
$two_depth = '..'; // php load
include_once('../layout/index_header.php');



$allow_array = ['all','artwork','vector','threed'];
if( in_array($cate , $allow_array) )
{
    require_once '../database/database_class.php';
    $db = new Database();

    switch($cate){ //check category
    case 'artwork' : $contents_cate = 1; $cate_name = 'artwork'; break;
    case 'vector' : $contents_cate = 2; $cate_name = 'vector'; break;
    case 'threed' : $contents_cate = 3; $cate_name = 'threed'; break;
    default : $contents_cate = 1; break;
    }
}else
{
    include_once('../../404.php');
    die();
};

$db->changedb('lubyconboard');
$db->query = "UPDATE `$cate_name` SET `viewCount` = `viewCount`+1 WHERE `$cate_name`.`boardCode` = $number";
$db->askQuery(); // viewcount up

$db->query =
"
SELECT * 
FROM lubyconboard.`$cate_name` 
INNER join lubyconuser.`userbasic` 
INNER join lubyconuser.`userinfo` 
on `$cate_name`.`userCode` = `userbasic`.`userCode` and `userbasic`.`userCode` = `userinfo`.`userCode` 
WHERE `$cate_name`.`boardCode` = $number 
";
$db->askQuery(); //get db data

$row = mysqli_fetch_array($db->result);
if( !is_array($row) )
{
    include_once('../../404.php');
}

require_once "../class/json_class.php";
$json_control = new json_control;

$json_control->json_decode('job',"$one_depth/data/job.json");
$job_decode = $json_control->json_decode_code;
$json_control->json_decode('country',"$one_depth/data/country.json");
$country_decode = $json_control->json_decode_code;

$my_job_origin_select = $job_decode[$row["jobCode"]]['name'];
$my_country_origin_select = $country_decode[$row["countryCode"]]['name'];

$contents_name = $row['title'];
$contents_html = $row['contents'];
$user_img_url = $row['profileImg'];
$category0 = $cate_name == "threed" ? "3D" : $cate_name;
$category1 = "Category1";
$category2 = "Category2";

$usercode = $row['userCode'];
$user_name = $row['nick'];
$usercity = $row['city'];

$userjob = $my_job_origin_select;
$usercountry = $my_country_origin_select;

$file_descript = $row['description'];


$file_view = $row['viewCount'];
$file_down = $row['downloadCount'];
$file_like = $row['likeCount'];

include_once("viewer2d.php");
include_once($two_depth.'/layout/index_footer.php');
?>
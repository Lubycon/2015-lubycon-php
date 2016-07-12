<?php
require_once "../../../common/Class/json_class.php";
$json_control = new json_control;
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

$number = $_POST['conno']; //contenst number form url
$cate = $_POST['cate']; 

/* cookie is later..
$url_parse = parse_url($_SERVER['HTTP_REFERER']);
if( isset($url_parse['query']) )
{
    $devide_query = (string)$url_parse['query'];
    //3 hour cookie (for infinite scroll)
    setcookie('contents_history', $devide_query.'&conno='.$number.'&concate='.$cate, time()+(60*60*3),'/'); 
    
    //6 hour cookie (board hit)
    setcookie("contents_hit-$cate-$number", 'conno='.$number.'&concate='.$cate.'&userip='.$_SERVER['REMOTE_ADDR'], time()+(60*60*6),'/'); 
}
*/

$allow_array = ['all','artwork','vector','threed'];
if( in_array($cate , $allow_array) )
{
    //check category
    switch($cate)
    { 
        case 'artwork' : 
            $contents_cate = 1; 
            $cate_name = 'artwork'; 
            break;
        case 'vector' : 
            $contents_cate = 2; 
            $cate_name = 'vector'; 
            break;
        case 'threed' : 
            $contents_cate = 3; 
            $cate_name = 'threed'; 
            break;
        default : 
            $contents_cate = 1; 
            break;
    }
}
else
{
    include_once('../../404.php');
    die('wrong category');
};

include_once('./contents_view_model.php');

// contetnts data
$json_control->json_decode('job',"../../../../data/job.json");
$job_decode = $json_control->json_decode_code;
$json_control->json_decode('country',"../../../../data/country.json");
$country_decode = $json_control->json_decode_code;
$json_control->json_decode("$cate_name"."_category","../../../../data/middle_category.json");
$mid_cate_decode = $json_control->json_decode_code;
$json_control->json_decode("ccCode","../../../../data/ccCode.json");
$cc_code_decode = $json_control->json_decode_code;
$my_job_origin_select = $job_decode[$row["jobCode"]]['name'];
$my_country_origin_select = $country_decode[$row["countryCode"]]['name'];

$category0 = $cate_name == "threed" ? "3D" : $cate_name;
$category1 = $mid_cate_decode[$row['midCategoryCode0']]['name'];
$category2 = isset($mid_cate_decode[$row['midCategoryCode1']]['name']) ? $mid_cate_decode[$row['midCategoryCode1']]['name'] : '';
$category3 = isset($mid_cate_decode[$row['midCategoryCode2']]['name']) ? $mid_cate_decode[$row['midCategoryCode2']]['name'] : '';
if($LoginState)
{
	$like_check = false;

	if( $row['likeActionUserCode'] != null )
		$like_check=true;

		$bookmark_check = false;

		if( $row['bookmarkActionUserCode'] != null  )
			$bookmark_check=true;
}
$json_control->json_search($cc_code_decode,'url','ccCode',$row['ccCode']);



$contents_tag_data = array();
$tagnum = 0;
while( isset($row['tag'.$tagnum]) ){
	$contents_tag_data[$tagnum] = $row['tag'.$tagnum];
	$tagnum++;
}

$contents_data = array(
	'title' => $row['contentTitle'], 
	'content' => $row['contents'],
	'category' => [ strtoupper($category0), $category1, $category2, $category3 ],
	'descript' => $row['contentDescription'],
	'tag' => $contents_tag_data,
	'bookmark' => $bookmark_check,
	'like' => $like_check,
	'counter' => array(
		'view' => $row['viewCount'],
		'download' => $row['downloadCount'],
		'like' => $row['likeCount']
	),
	'file_path' => $row['userDirectory'],
	'cc' => [ $row['ccCode'], $json_control->search_key ]
);

// write user data
$write_user_data = array(
	'code' => $row['userCode'],
	'name' => $row['nick'],
	'job' => $my_job_origin_select,
	'country' => $my_country_origin_select,
	'city' => $row['city'],
	'profile' => "../../../../../../Lubycon_Contents/user/".$row['userCode']."/profile.jpg"
);

// contetnts data
$comment_data = array(
	'usercode' => $comment_row['commentActionUserCode'],
	'username' => $comment_row['nick'],
	'profile' => $comment_row['profileImg'],
	'date' => $comment_row['commentDate'],
	'content' => $comment_row['commentContents']
);

// comment data
// commnet data

$total_array = [
	'contents' => $contents_data,
	'creator' => $write_user_data,
	'comment' => $comment_data
];

$data_json = json_encode($total_array);
//print_r($data_json);

echo $data_json;


?>
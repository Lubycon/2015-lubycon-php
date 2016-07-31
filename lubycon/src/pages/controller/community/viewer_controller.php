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


if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
	$postData = json_decode(file_get_contents("php://input"));
}else
{
	die('it is not post data error code 0000');
}

$boardCode = $postData->bno;
$cateCode = (int)$postData->cate;


$json_control->json_decode('job',"../../../../data/job.json");
$job_decode = $json_control->json_decode_code;
$json_control->json_decode('country',"../../../../data/country.json");
$country_decode = $json_control->json_decode_code;


if( $cateCode < 3)
{
    //check category
    switch($cateCode)
    {
        case 0:
            $cate_name = 'forum';
            break;
        case 1 :
            $cate_name = 'tutorial';
            break;
        case 2 :
            $cate_name = 'qaa';
            break;
        default :
            die ('category code error 1001');
            break;
    }
}
else
{
	die ('category code error 1001');
};

include_once('../../model/community/viewer_model.php');

// contetnts data
$my_job_origin_select = $job_decode[$row["jobCode"]]['name'];
$my_country_origin_select = $country_decode[$row["countryCode"]]['name'];

$like_check = false;
$bookmark_check = false;
if($LoginState)
{
	if( $row['likeGiveUserCode'] != null )
	{
		$like_check=true;
	}
}

$contents_data = array(
	'title' => $row['contentTitle'],
	'content' => $row['contents'],
	'date' => $row['contentDate'],
	'like' => $like_check,
	'counter' => array(
		'view' => $row['viewCount'],
		'like' => $row['likeCount']
	),
	'file_path' => $row['userDirectory'],
);

// write user data
$write_user_data = array(
	'code' => $row['userCode'],
	'name' => $row['nick'],
	'job' => $my_job_origin_select,
	'country' => $my_country_origin_select,
	'city' => $row['city'],
	'profile' => $row['profileImg']
);

// contetnts data
/*$comment_data = array( //REAL CODE....from Daniel
	'usercode' => $comment_row['commentGiveUserCode'],
	'username' => $comment_row['nick'],
	'profile' => $comment_row['profileImg'],
	'date' => $comment_row['commentDate'],
	'content' => $comment_row['commentContents']
);*/

$comment_data = array(); // TESTING CODE....from Evan

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

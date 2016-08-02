<?php

require_once "../../../common/Class/session_class.php";
$session = new Session();
require_once "../../../common/Class/json_class.php";
$json_control = new json_control;
$json_control->json_decode('country',"../../../../data/country.json");
$country_decode = $json_control->json_decode_code;

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
/*data render setting*/


if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
	$postData = json_decode(file_get_contents("php://input"));
}else
{
  $total_array = array(
    'status' => array(
      'code' => '1200',
      'msg' => "nothing receive post data"
      ),
    'result' => (object)array()
  );
  $data_json = json_encode($total_array);
  die($data_json);
}



$userCode = $postData->userCode;
//$userCode = 181;


if( $userCode == $_SESSION['lubycon_userCode'] )
{
	
	require_once '../../model/personal_page/insight_model.php';

	/* like bookmark give and take */
	$bookmarkGiveNumber = $bookmarkGiveResultFound['FOUND_ROWS()'];
	$bookmarkTakeNumber = $bookmarkTakeResultFound['FOUND_ROWS()'];
	$likeGiveNumber = $likeGiveResultFound['FOUND_ROWS()'];
	$likeTakeNumber = $likeTakeResultFound['FOUND_ROWS()'];
	/* like bookmark give and take */

	$worldmap = array();
	while ($row = mysqli_fetch_assoc($countryRank))
	{
		array_push(
			$worldmap,
			array( 
				'id' => $row['countryCode'],
				'title' => $country_decode[$row['countryCode']]['name'],
				'color' => "$48cfad", 
				'mouseEnabled' => 'false'
			) 
		);
	}
	for($i=$countryRank->lengths; $i<5; $i++)
	{
		array_push(
			$worldmap,
			array( 
				'id' => '-1',
				'title' => 'No Country',
				'color' => "#aaa", 
				'mouseEnabled' => 'false'
			) 
		);
	}

	
	$likeTimelineArray = array();
	$viewTimelineArray = array();
	$uploadTimelineArray = array();
	$downloadTimelineArray = array();
	while ($row = mysqli_fetch_array($likeTimeline)) 
	{
		array_push(
			$likeTimelineArray,
			array( 
				'date' => $row['calendar_date'],
				'value' => $row['count'] == null ? 0 : $row['count']
			) 
		);
	}
	while ($row = mysqli_fetch_array($viewTimeline)) 
	{
		array_push(
			$viewTimelineArray,
			array( 
				'date' => $row['calendar_date'],
				'value' => $row['count'] == null ? 0 : $row['count']
			) 
		);
	}
	while ($row = mysqli_fetch_array($uploadTimeline)) 
	{
		array_push(
			$uploadTimelineArray,
			array( 
				'date' => $row['calendar_date'],
				'value' => $row['count'] == null ? 0 : $row['count']
			) 
		);
	}
	while ($row = mysqli_fetch_array($downloadTimeline)) 
	{
		array_push(
			$downloadTimelineArray,
			array( 
				'date' => $row['calendar_date'],
				'value' => $row['count'] == null ? 0 : $row['count']
			) 
		);
	}



	$contentsLikeRankArray = array();
	$contentsViewRankArray = array();
	$contentsCommentRankArray = array();
	$communityLikeRankArray = array();
	$communityViewRankArray = array();
	$communityCommentRankArray = array();

	while ($row = mysqli_fetch_assoc($contentsLikeRank)) 
	{
		array_push(
			$contentsLikeRankArray,
			array( 
				'title' => $row['contentTitle'],
				'topCate' => $row['topCategoryCode'],
				'code' => $row['boardCode'],
				'value' => $row['count(*)'],
				'thumbnail' => $row['userDirectory']."/thumbanil/.thumbnail.jpg"
			) 
		);
	}
	while ($row = mysqli_fetch_assoc($contentsViewRank))
	{
		array_push(
			$contentsViewRankArray,
			array(
				'title' => $row['contentTitle'],
				'topCate' => $row['topCategoryCode'],
				'code' => $row['boardCode'],
				'value' => $row['count(*)'],
				'thumbnail' => $row['userDirectory']."/thumbanil/.thumbnail.jpg"
			) 
		);
	}
	while ($row = mysqli_fetch_assoc($contentsCommentRank))
	{
		array_push(
			$contentsCommentRankArray,
			array( 
				'title' => $row['contentTitle'],
				'topCate' => $row['topCategoryCode'],
				'code' => $row['boardCode'],
				'value' => $row['count(*)'],
				'thumbnail' => $row['userDirectory']."/thumbanil/.thumbnail.jpg"
			) 
		);
	}
	while ($row = mysqli_fetch_assoc($communityLikeRank))
	{
		array_push(
			$communityLikeRankArray,
			array( 
				'title' => $row['contentTitle'],
				'topCate' => $row['topCategoryCode'],
				'code' => $row['boardCode'],
				'value' => $row['count(*)']
			) 
		);
	}
	while ($row = mysqli_fetch_assoc($communityViewRank))
	{
		array_push(
			$communityViewRankArray,
			array( 
				'title' => $row['contentTitle'],
				'topCate' => $row['topCategoryCode'],
				'code' => $row['boardCode'],
				'value' => $row['count(*)']
			) 
		);
	}
	while ($row = mysqli_fetch_assoc($communityCommentRank))
	{
		array_push(
			$communityCommentRankArray,
			array( 
				'title' => $row['contentTitle'],
				'topCate' => $row['topCategoryCode'],
				'code' => $row['boardCode'],
				'value' => $row['count(*)']
			) 
		);
	}
}else
{
  $total_array = array(
    'status' => array(
      'code' => '300',
      'msg' => "diffrent session user code and receive user code data"
      ),
    'result' => (object)array()
  );
  $data_json = json_encode($total_array);
  die($data_json);
}


$total_array = array(
    'status' => array(
      'code' => '0000',
      'msg' => "infinite scroll success"
      ),
    'result' => (object)array(
		'giveTake' => array(
			"like" => [$likeGiveNumber,$likeTakeNumber],
			"bookmark" => [$bookmarkGiveNumber,$bookmarkTakeNumber]
		),
		'worldmap' => $worldmap,
		'timeLine' => array(
			'like' => $likeTimelineArray,
			'view' => $viewTimelineArray,
			'upload' => $uploadTimelineArray,
			'download' => $downloadTimelineArray
		),
		'ranking' => array(
			'contents' => array(
				'like' => $contentsLikeRankArray,
				'view' => $contentsViewRankArray,
				'comment' => $contentsCommentRankArray,
			),
			'community' => Array(
				'like' => $communityLikeRankArray,
				'view' => $communityViewRankArray,
				'comment' => $communityCommentRankArray,
			),
		)
    )
);
$data_json = json_encode($total_array);
die($data_json);
?>
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
	die('it is not post data error code 0000');
}


$userCode = $_POST['userCode'];

//print_R($_SESSION);


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
				'value' => $row['count(*)']
			) 
		);
	}
	/*
	$commentTake = $commentTakeResult;
	$commentTakeFound = mysqli_fetch_assoc($commentTakeResultFound);
	$commentTakeNumber = $commentTakeFound['FOUND_ROWS()'];

	$viewTake = $viewTakeResult;
	$viewTakeFound = mysqli_fetch_assoc($viewTakeResultFound);
	$viewTakeNumber = $viewTakeFound['FOUND_ROWS()'];

	$likeArray = array();
	while( $row = mysqli_fetch_array($likeTakeResult) )
	{
		$likeArray[] = array(
			'date' => $row['likeDate']
		);
	}
	$bookmarkArray = array();
	while( $row = mysqli_fetch_array($bookmarkTakeResult) )
	{
		$bookmarkArray[] = array(
			'date' => $row['bookmarkDate']
		);
	}
	$commentArray = array();
	while( $row = mysqli_fetch_array($commentTakeResult) )
	{
		$commentArray[] = array(
			'date' => $row['commentDate']
		);
	}
	$viewArray = array();
	while( $row = mysqli_fetch_array($viewTakeResult) )
	{
		$viewArray[] = array(
			'date' => $row['viewDate']
		);
	}*/


}else
{
	$total_array = array(
		'errorCode' => '0001', // session and post user number not same
	);
}


$total_array = array(
	'giveTake' => array(
		"like" => [$likeGiveNumber,$likeTakeNumber],
		"bookmark" => [$bookmarkGiveNumber,$bookmarkTakeNumber]
	),
	'worldmap' => $worldmap,
	'timeLine' => array(
		/*
		'like' => $likeArray,
		'bookmark' => $bookmarkArray,
		'comment' => $bookmarkArray,
		'view' => $bookmarkArray,
		*/
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
);


$data_json = json_encode($total_array);
print_r($total_array);
//echo $data_json;

?>
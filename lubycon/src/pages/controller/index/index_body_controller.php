<?php
    require_once "../../../common/Class/json_class.php";

    $json_control = new json_control;
    $job_json = $json_control->json_decode('job',"../../../../data/job.json");
    $job_decode = $json_control->json_decode_code;
    $country_json = $json_control->json_decode('country',"../../../../data/country.json");
    $country_decode = $json_control->json_decode_code;

	$contents_data = array(array(),array(),array());
	$forum_data = array();


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


	$limit = $postData->isMobile == 'true' ? 10 : 30;


	include '../../model/index/index_body_model.php';

	while($contents_row = mysqli_fetch_assoc($contents_result)){
		array_push(
			$contents_data[$contents_row['topCategoryCode']], 
			array( 
				'name' => $contents_row['contentTitle'],
				'creator' => $contents_row['nick'],
				'boardCode' => $contents_row['boardCode'], 
				'thumbnail' => $contents_row['userDirectory']."/thumbnail/thumbnail.jpg"
			) 
		);
    }
    while($forum_data_row = mysqli_fetch_assoc($forum_result)){
		$forum_data = array( 
			'userData' => array(
				'name' => $forum_data_row['nick'], 
			),
			'contentData' => array(
				'boardCode' => $forum_data_row['boardCode'], 
				'title' => $forum_data_row['contentTitle'],  
				'contents' => $forum_data_row['contents'],
				'count' => array(
					'view' => $forum_data_row['viewCount'], 
					'like' => $forum_data_row['likeCount'], 
					'comment' => $forum_data_row['commentCount']
				)
			)
		);
    }
    while($bestCreator_row = mysqli_fetch_assoc($bestCreator_result)){
		$bestCreator_data = array(
			'userData' => array(
				'userCode' => $bestCreator_row['userCode'],
				'job' => $job_decode[$bestCreator_row['jobCode']]['name'],
				'country' => array(
					'city' => $bestCreator_row['city'],
					'country' => $country_decode[$bestCreator_row['countryCode']]['name']
				)
			),
			'creatorOfTheMonth' => array(
				'introduce' => $bestCreator_row['comIntroduce'],
				'url' => $bestCreator_row['comInterviewUrl']
			)
		);
    }
$total_array = array(
    'status' => array(
      'code' => '0000',
      'msg' => "community contents call succsess"
      ),
    'result' => (object)array(
    	'contentData' => $contents_data,
    	'bestCreator' => $bestCreator_data,
    	'forumData' => $forum_data
    )
);
$data_json = json_encode($total_array);
die($data_json);
?>
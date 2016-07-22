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
	    die('it is not post data error code 0000');
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
    /*
    while($forum_data_row = mysqli_fetch_assoc($forum_result)){
		array_push(
			$contents_data[$forum_data_row['topCategoryCode']], 
			array( 
				'boardCode' => $forum_data_row['boardCode'], 
				'name' => $forum_data_row['nick'], 
				'title' => $forum_data_row['title'], 
				'viewCount' => $forum_data_row['viewCount'], 
				'likeCount' => $forum_data_row['likeCount'], 
				'commentCount' => $forum_data_row['commentCount'], 
				'contents' => $forum_data_row['contents'], 
			) 
		);
    }
	*/
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
    	'contentData' => $contents_data,
    	'forumData' => $forum_data,
    	'bestCreator' => $bestCreator_data
    );

    $data_json = json_encode($total_array);
    echo $data_json;
?>
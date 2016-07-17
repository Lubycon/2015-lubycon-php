<?php

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

	while($contents_data_row = mysqli_fetch_assoc($db->result)){
		array_push(
			$contents_data[$contents_data_row['topCategoryCode']], 
			array( 
				'name' => $contents_data_row['contentTitle'],
				'creator' => $contents_data_row['nick'],
				'boardCode' => $contents_data_row['boardCode'], 
				'thumbnail' => $contents_data_row['userDirectory']."/thumbnail/thumbnail.jpg"
			) 
		);
    }

    while($forum_data_row = mysqli_fetch_assoc($db->result)){
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

    $total_array = array(
    	'contentData' => $contents_data,
    	'forumData' => $forum_data
    	);

    $data_json = json_encode($total_array);
    echo $data_json;
?>
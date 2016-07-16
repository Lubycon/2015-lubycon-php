<?php   
    require_once "../../../common/Class/json_class.php";

    $json_control = new json_control;
    $job_json = $json_control->json_decode('job',"../../../../data/job.json");
    $job_decode = $json_control->json_decode_code;
    $country_json = $json_control->json_decode('country',"../../../../data/country.json");
    $country_decode = $json_control->json_decode_code;
    /*data render setting*/
    
    include '../../model/creator/model.php';
     
    /* creator of month userdata */
    $creator_of_month_data = array(
		'code' => '0',
        'profile' => '../../../../Lubycon_Contents/user/41/profile.jpg',
		'name' => 'daniel',
        'job' => "Gangster",
		'countryCode' => '230',
        'country' => "United States",
		'city' => "Los Santos",
		'randCount' => rand(200,1500),
		'contentsCount' => '0',
		'contents' => array(
            array(
                'id' => '24',
                'img' => '../../../../lubycon_Contents/contents/artwork/Hortencia_Puccio20160414050808/thumbnail/thumbnail.jpg'
            ),
            array(
                'id' => '32',
                'img' => '../../../../lubycon_Contents/contents/threed/Anushree_Dhar20160414050808/thumbnail/thumbnail.jpg'
            ),
            array(
                'id' => '42',
                'img' => '../../../../lubycon_Contents/contents/threed/Caroline_Davies20160414050808/thumbnail/thumbnail.jpg'
            )
		),
		'temp' => 'not yet'
    );
    /* creator of month userdata */

   	/* creators data */
    $creators_data = array();
    while( $creator_row = mysqli_fetch_array($db->result) )
    {
    	$job_origin_select = $job_decode[$creator_row['jobCode']]['name'];
    	$country_origin_select = $country_decode[$creator_row['countryCode']]['name'];
    	
    	$creators_data[] = array(
			'code' => $creator_row['userCode'],
	        'profile' => "../../../../Lubycon_Contents/user/".$creator_row['userCode']."/profile.jpg",
            'name' => $creator_row['nick'],
            'job' => $job_origin_select,
	        'countryCode' => $creator_row['countryCode'],
            'country' => $country_origin_select,
	        'city' => $creator_row['city'],
	        
	        'randCount' => rand(200,1500),
	        'contentsCount' => '0',
			'contents' => array(
                array(
                    'id' => $creator_row['boardCode'],
                    'img' => $creator_row['userDirectory'].'/thumbnail/thumbnail.jpg'
                ),
                array(
                    'id' => $creator_row['boardCode'],
                    'img' => $creator_row['userDirectory'].'/thumbnail/thumbnail.jpg'
                ),
                array(
                    'id' => $creator_row['boardCode'],
                    'img' => $creator_row['userDirectory'].'/thumbnail/thumbnail.jpg'
                )
			)
    	);

    }
   	/* creators data */
    
    
    $total_array = [
		'bestCreator' => $creator_of_month_data,
		'creators' => $creators_data
    ];
    
    $data_json = json_encode($total_array);
    //print_r($data_json);
    
    echo $data_json;  
?>
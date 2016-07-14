<?php
    require_once "../../../common/Class/session_class.php";
    $session = new Session();
    if(($session->GetSessionId() == null) && $session->GetSessionName() == null){
    	$LoginState = false;
    }else{
    	if($session->SessionExist()){
    		$LoginState = true;
    		$Loginuser_code= $_SESSION['lubycon_userCode'];
    		$Loginuser_nick= $_SESSION['lubycon_nick'];
    	}else{
    		$LoginState = false;
    	}
    }
    if(!isset($Loginuser_code)){$Loginuser_code='';} // not login stat , valuable is ''
    require_once "../../../common/Class/json_class.php";
    $json_control = new json_control;
    $job_json = $json_control->json_decode('job',"../../../../data/job.json");
    $job_decode = $json_control->json_decode_code;
    $country_json = $json_control->json_decode('country',"../../../../data/country.json");
    $country_decode = $json_control->json_decode_code;
    /*data render setting*/
    
    include '../../model/creator/model.php';
    
    
	/* my data */
    $login_user_data = array(
    		'usercode' => $Loginuser_code,
    		'username' => $Loginuser_nick,
    		'profile' => "../../../../Lubycon_Contents/user/$Loginuser_code/profile.jpg",
    		'job' => $job_decode[$myrow['jobCode']]['name'],
    		'country' => $country_decode[$myrow['countryCode']]['name'],
    		'city' => $myrow['city'],
    		'language' => array(
    				'language0' => 'korean',
    				'language1' => 'english'
    		)
    );
	/* my data */
    
    
   
    /* creator of month userdata */
    $creator_of_month_data = array(
    		'usercode' => '0',
    		'username' => 'daniel',
    		'profile' => '../../../../Lubycon_Contents/user/41/profile.jpg',
    		'user_location_img' => '../asset/img/flag_icons/230.png',
    		'usercity' => "Los Santos",
    		'usercountry' => "United States",
    		'userjob' => "Gangster",
    		'randCount' => rand(200,1500),
    		'contents_count' => '0',
    		'content' => array(
    				'user_content0' => "../../../../lubycon_Contents/contents/artwork/Hortencia_Puccio20160414050808/thumbnail/thumbnail.jpg",
    				'user_content1' => "../../../../lubycon_Contents/contents/threed/Anushree_Dhar20160414050808/thumbnail/thumbnail.jpg",
    				'user_content2' => "../../../../lubycon_Contents/contents/threed/Caroline_Davies20160414050808/thumbnail/thumbnail.jpg",
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
    			'usercode' => $creator_row['userCode'],
		        'user_img_url' => "../../../../Lubycon_Contents/user/".$creator_row['userCode']."/profile.jpg",
		        'user_location_img' => "../asset/img/flag_icons/".$creator_row['countryCode'].'.png',
		        'usercity' => $creator_row['city'],
		        'usercountry' => $country_origin_select,
		        'username' => $creator_row['nick'],
		        'userjob' => $job_origin_select,
		        'randCount' => rand(200,1500),
		        'contents_count' => '0',
		        'user_dir' => $creator_row['userDirectory'],
    			'content' => array(
    					'user_content0' => $creator_row['userDirectory'].'/thumbnail/thumbnail.jpg',
    					'user_content0_num' => $creator_row['boardCode'],
    					'user_content1' => $creator_row['userDirectory'].'/thumbnail/thumbnail.jpg',
    					'user_content1_num' => $creator_row['boardCode'],
    					'user_content2' => $creator_row['userDirectory'].'/thumbnail/thumbnail.jpg',
    					'user_content2_num' => $creator_row['boardCode']
    					)
		    	);
    }
   	/* creators data */
    
    
    $total_array = [
    		'my_data' => $login_user_data,
    		'creator_of_month' => $creator_of_month_data,
    		'creators' => $creators_data
    ];
    
    $data_json = json_encode($total_array);
    //print_r($data_json);
    
    echo $data_json;
    
    
?>
<?php
	require_once '../../../common/Class/session_class.php';
	require_once "../../../common/Class/json_class.php";
	
	$json_control = new json_control;
	$json_control->json_decode('country',"../../../../data/country.json");
	$country_decode = $json_control->json_decode_code;

	$session = new Session();
    $sessionArray;

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

    $user_email = $postData->id;
    $user_pass = $postData->password;

	include_once('../../model/sign_in/sign_in_model.php');

	if($sign_in_result)
	{
		// success send query to database
		$result = mysqli_fetch_array($sign_in_result);

		if(password_verify($user_pass,$result['pass']))
		{
		// login is success
			foreach($result as $key=>$value)
			{

				switch((string)$key)
				{
					case "email" : $sessionArray[$key] = $value; break;
					case "userCode": $sessionArray[$key] = $value; break;
					case "nick" : $sessionArray[$key] = $value; break;
					case "countryCode" : $sessionArray[$key] = $value; break;
					case "city" : $sessionArray[$key] = $value; break;
					case "name" : $sessionArray['country'] = $country_decode[$value]['name']; break;
					case "profileImg" : $sessionArray['profile'] = $value; break;
					case "validation" : $sessionArray[$key] = $value; break;
					case "date" : $sessionArray[$key] = $value; break;
					default : break;
				}
			}
			$session->WriteSession('lubycon', $sessionArray);

			$total_array = array(
			  'status' => array(
			    'code' => "0000",
			    'msg' => "success login"
			    ),
			  'result' => (object)array()
			);
			$data_json = json_encode($total_array);
			die($data_json);

		}else
		{
		  $total_array = array(
		    'status' => array(
		      'code' => '0100',
		      'msg' => "login fail"
		      ),
		    'result' => (object)array()
		  );
		  $data_json = json_encode($total_array);
		  die($data_json);
		}
	}
?>
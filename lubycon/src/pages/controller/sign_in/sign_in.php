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
		die('it is not post data error code 0000');
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
					case "userCode": $sessionArray[$key] = $value; break;
					case "nick" : $sessionArray[$key] = $value; break;
					case "countryCode" : $sessionArray[$key] = $value; break;
					case "city" : $sessionArray[$key] = $value; break;
					case "name" : $sessionArray['country'] = $country_decode[$value]['name']; break;
					case "profileImg" : $sessionArray['profile'] = $value; break;
					case "validation" : $sessionArray[$key] = ($value === "active") ? true : false; break;
					default : break;
				}
			}
			$session->WriteSession('lubycon', $sessionArray);
			$request = array(
				"code" => "0000",
				"message" => "login"
			);
		}else
		{
			$request = array(
				"code" => "0100",
				"message" => "login failed"
			);
		}

		$toJSON = json_encode($request);

		echo $toJSON;
	}
?>

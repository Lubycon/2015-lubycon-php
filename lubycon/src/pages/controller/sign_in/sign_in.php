<?php
	require_once '../../../common/Class/session_class.php';
	require_once '../../../common/Class/database_class.php';

	$session = new Session();
    $user_email = $_POST['login_id'];
    $sessionArray;

	$db = new Database('localhost', 'lubycon', 'hmdwdgdhkr2015', 'lubyconuser');
	
	$db->query = "
        SELECT `userbasic`.`userCode`,`userbasic`.`email`, `userbasic`.pass, `userbasic`.nick, `userbasic`.validation , `userinfo`.`countryCode` , `userinfo`.`jobCode`, `userinfo`.`city` 
        FROM `lubyconuser`.`userbasic` 
        LEFT JOIN `lubyconuser`.`userinfo` 
        ON `userbasic`.`userCode` = `userinfo`.`userCode` 
        WHERE `userbasic`.`email`='$user_email'
    ";

    if(!$db->askQuery()){

		$sessionArray['serverError'] = (string)500;
		echo "query error <br />";
	
	}
	else{

		$result = mysqli_fetch_array($db->result);	

		if(password_verify($_POST['login_pass'],$result['pass'])){
		
			foreach($result as $key=>$value){
				//echo (string)$key ." is " . (string)$value . "<br />";
				switch((string)$key){
					case "userCode": $sessionArray[$key] = $value; break;
					case "nick" : $sessionArray[$key] = $value; break;
					case "countryCode" : $sessionArray[$key] = $value; break;
					case "city" : $sessionArray[$key] = $value; break;
					case "name" : $sessionArray['country'] = $value; break;
					case "validation" : $sessionArray[$key] = ($value === "active") ? true : false; break;
					default : break;
				}
			}

			$db->query = "
				SELECT `country`.`name`
				FROM `lubyconuser`.`country`
				WHERE `country`.`countryCode` = '".$sessionArray['countryCode']."'
				";

			if(!$db->askQuery()){
				
				$sessionArray['serverError'] = (string)500;
				echo "country query error";
			}
			else{

				$result = mysqli_fetch_array($db->result);
				foreach($result as $key=>$value){
					switch((string)$key){
						case "name" : $sessionArray['country'] = (string)$value; break;
						default : break;
					}
				}
					
			}

			foreach($sessionArray as $key => $value)
				echo $key ." is ". $value . "<br />";

			//foreach($sessionArray as $key=>$value)
			//		echo "Key : ". $key . " => ". $value . " <br /> ";
		}
	}

/*
		$session->WriteSession('lubycon',$result);

		if($result['validation'] === 'active'){
			$login['LoginState'] = true;
			$session->WriteSession('lubycon',$login);
			header('location:../../../index.php');
		}
		else if($result['validation'] == 'inactive'){
			$login['LoginState'] = true;
			$session->WriteSession('lubycon',$login);
			header('location:../../../index.php');
		}
		else{
			$session->WriteSession('lubycon',$login);
			die("result['validation'] wrong value");
		}
	}
	else{
		header('location:./index.php?=dir/');
	}
*/

?>
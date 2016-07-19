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
    	// can not send query to database
		
		//$sessionArray['serverError'] = (string)500;
		
		echo 1000;
	}
	else{
		// success send query to database
		$result = mysqli_fetch_array($db->result);	

		if(password_verify($_POST['login_pass'],$result['pass'])){
		// login is success
			foreach($result as $key=>$value){

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
			//can not send query to database
				//$sessionArray['serverError'] = (string)500;
				
				echo 1000;
			}
			else{
			// success send query to database
				$result = mysqli_fetch_array($db->result);
				foreach($result as $key=>$value){
					switch((string)$key){
						case "name" : $sessionArray['country'] = (string)$value; break;
						default : break;
					}
				}

				$session->WriteSession('lubycon', $sessionArray);	
				
				//$_SESSION['serverError'] = (string)0000
				
				echo 0000;	
			}
		}
		else{
			// login is fail
			echo 0100;
		}
	}
?>
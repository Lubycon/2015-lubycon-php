<?php

	require_once '../../../common/Class/database_class.php';
    require_once '../../../common/Class/regex_class.php';
    require_once '../../../common/Class/MailerClass.php';
    require_once '../../../common/Class/session_class.php';
    require_once '../../../common/Class/json_class.php';
    require_once '../../../common/common.php';
    
    $regex_vali = new regex_validate;
	$db = new Database();
	$session = new Session();
	$json_control = new json_control();
	$country_json = $json_control->json_decode('country',"../../../../data/country.json");
	$country_decode = $json_control->json_decode_code;
	
	$json_control->json_search($country_decode,'countryCode','name',$_POST['country_code']);
	$country_code = $json_control->search_key;

	$json_control->json_search($country_decode,'continentCode','name',$_POST['country_code']);
	$continent_code = $json_control->search_key;
	

	
	// password encryption -> using bycrypt
	$hash = password_hash($_POST['pass'], PASSWORD_DEFAULT);

	//email validation check
	($regex_vali->email_check($_POST['email']) == true) ? $email_validation = true : $email_validation = false;

	//password validation check
	(($regex_vali->pass_check($_POST['pass']) && $regex_vali->sametext_check($_POST['pass'],$_POST['repass'])) == true) ? $pass_validation = true : $pass_validation = false;

	//nickname validation check
	($confirm_nick = $regex_vali->nickname_check($_POST['nick']) === true) ? $nick_validation=true : $nick_validation=false;

	//term validation check
	($_POST['terms_check'] == "on") ? $terms_validation = true : $terms_validation = false;

	//private plicy validation check
	($_POST['private_check'] == "on") ? $private_validation = true : $private_validation = false;

	//newsletter
	(isset($_POST['email_send_check'])) ? $newsletter = 'true' : $newsletter = 'false';

	$host = $_SERVER['HTTP_HOST'];
	$uri = $_SERVER['REQUEST_URI'];

	if($email_validation && $pass_validation && $nick_validation && $private_validation && $terms_validation){

		$to = $_POST['email'];
		$from = "Lubycon@gmail.com";
		$subject = "Confirmation Mail for Lubycon account";
		$password = "hmdwdgdhkr2015";
		
		$token = makeToken(12);
		$certifimail = new MakeMail($token);
		
		$certifimail->CertifiMail();

		if(mailer($from, $to, $subject, $password, 'mail', $token))
		{
			$db->query = "insert into userbasic(email,nick,pass,date,termCheck, policyCheck, subscription, validationToken,validation)values('".$_POST['email']."', '".$_POST['nick']."', '".$hash."', '".date('Y-m-d H-i-s')."', '".'true'."', '".'true'."', '".$newsletter."', '".$certifimail->token."', 'inactive')";

			$db->askQuery();

			$db->query = "
			INSERT INTO `lubyconuser`.`userinfo` 
			(`countryCode`, `continentCode` , `profileImg`, `emailPublic`, `mobilePublic`, `faxPublic`, `webPublic`) VALUES 
			('$country_code',$continent_code,'../asset/img/no_img/no_img_user.jpg','public', 'public', 'public', 'public');";
			$db->askQuery();


			if(!$db->result)
			{
				echo "회원가입에 실패하였습니다. 5초 후에 이전 페이지로 이동합니다.2";
				$db->disconnectDb();
				sleep(5);
				echo("<script>history.back();</script>");
			}
			else
			{
				$db->query = "
      			SELECT `userbasic`.`userCode`,`userbasic`.`email`, `userbasic`.pass, `userbasic`.userCode, `userbasic`.nick, `userbasic`.validation , `userinfo`.`countryCode` , `userinfo`.`jobCode`, `userinfo`.`city` 
        		FROM `lubyconuser`.`userbasic` 
        		LEFT JOIN `lubyconuser`.`userinfo` 
        		ON `userbasic`.`userCode` = `userinfo`.`userCode` 
        		WHERE `userbasic`.`email`='".$_POST['email']."'
    			";

    			if($db->askQuery()){

    				$result = mysqli_fetch_array($db->result);
					$session->WriteSession('lubycon',$result);
					echo "<script>docuemnt.location.href='../../../index.php'</script>";
    			}
			}
		}
		else
		{
			echo "회원가입에 실패하였습니다. 5초 후에 이전 페이지로 이동합니다.1";
			echo("<script>history.back();</script>");
		}
	}
	else
	{
		echo "유효하지 않은 데이터가 입력되었습니다";
		echo "<br />";
		echo "5초 후에 이전 페이지로 이동합니다.";
		echo("<script>history.back();</script>");
	}

?>
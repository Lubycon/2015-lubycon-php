<?php

# COMMON FUNCTION

#---------------------------------------------------------------------------------
#	RSA Part(encrypt)
#---------------------------------------------------------------------------------

#
# 출처 : https://gist.github.com/kijin/8573062
#	  : http://d2.naver.com/helloworld/318732
#
# $bit : bits내 크기만큼의 RSA 키 쌍을 생성한다.
# 		 2016.07.22일 기준 Google Developers에 따르면 1,024비트의 작은 키는 무차별 암호 
#		 대입 공격 (brute-force guessing attack)에 대응하는데 충분하지 않으며, 4,096비트의 
#		 큰 키는 대응이 과합니다. 시간이 지나면서 컴퓨터 처리 비용이 적어질수록(컴퓨터 성능이 좋아질수록)
#		 키 크기는 증가합니다 (현재는 2,048비트가 가장 이상적입니다.)
#
#		 출처 : https://developers.google.com/web/fundamentals/security/encrypt-in-transit/generating-keys-and-csr?hl=ko
#
#
# 'digest_algorithm' : Message Digest를 의미하며, 이는 메세지를 해시(Hash)하는 것을 의미한다.
#					  임의의 길이를 가진 메세지를 해당함수에 넣으면 "일정한 길이를 가진 데이터를 얻는다."
#					  이 데이터를 비교해 데이터의 위/변조를 검사할 수 있다.
#					  MD5(Message Digest algorithm 5)는 128비트 메세지 해시 알고리즘이며, 2006년
#					  충돌을 일으키는 알고리즘이 개발되어, 인증서 비교 용도에는 사용하지 않기를 권장한다.
#					  
#					  SHA-512/256은 2012년 3월에 업데이트 된,  SHA-512의 축소버젼이며, SHA-256은
#					  32비트 프로세서에서, SHA-512는 64비트 프로세서에더 더 빠르게 작동한다
#
#				출처 : http://www.solanara.net/solanara/digestsolaris 
#
# $password : passpharse이며, 설정하지 않아도 상관 없으나, Private Key가 유출되었을 때, 의도치 않은 사용자가
#			: 의도하지 못한 행동을 하지 못하도록 하는 보안장치이므로, 설정해주길 권고한다.
#
# 출처 : https://dobest.io/ssh-without-password/
#
# openssl_pkey_new : 'digest_alg'은 digest_algorithm을 의미한다
#					 'private_key_bits'는 RSA 키 쌍의 크기를 의미한다.
#					 'private_key_type'은 비공개키의 타입을 결정한다.
#
# openssl_pkey_export : $res는 키값을 의미한다.
#						$private_key는 해당 키값을 저장해둘 변수를 의미합니다.
#						$password는 passpharse입니다.
#
# openssl_pkey_get_details : 키의 상세값(bits, key, type)을 반환합니다.
#
#---------------------------------------------------------------------------------
#	Generate public/private Key
#---------------------------------------------------------------------------------

function rsa_generate_keys($password , $bits = 2048, $digest_algorithm = 'sha512'){

	$res = openssl_pkey_new(array('digest_alg'=>$digest_algorithm,
								  'private_key_bits'=>$bits,
								  'private_key_type'=>OPENSSL_KEYTYPE_RSA,));
	if(!$res){
		return false;
	}
	openssl_pkey_export($res, $private_key, $password);


	// key에 관한 상세값들을 $public_key에 담고, 그 중에 필요한 정보인 PUBLIC KEY값만 다시 넣어준다
	$public_key = openssl_pkey_get_details($res);
	$public_key = $public_key['key'];

	// PUBLIC KEY와 PRIVATE KEY만 반환해준
	return array('private_key' => $private_key,
				 'public_key' => $public_key,);
}


#---------------------------------------------------------------------------------
#	encript plaintext using RSA public key
#---------------------------------------------------------------------------------

function rsa_encrypt($plaintext, $public_key){

	$publicKey_decoded = @openssl_pkey_get_public($public_key);
	if($publicKey_decoded === false) return false;

	$ciphertext = false;
	$status = @openssl_public_encrypt($plaintext, $ciphertext, $publicKey_decoded);
	if(!$status || $ciphertext === false) return false;

	return base64_encode($ciphertext);
}

#---------------------------------------------------------------------------------
#	decoding key using RSA private Key
#		when decoding key it's need password
#---------------------------------------------------------------------------------

function rsa_decrypt($ciphertext, $private_key, $password){

	$ciphertext = @base64_decode($ciphertext, true);
	
	if($ciphertext === false) return false;

	$privateKey_decoded = @openssl_pkey_get_private($private_key, $password);
	
	if($privateKey_decoded === false) return false;

	$plaintext = false;
	$status = @openssl_private_decrypt($ciphertext, $plaintext, $privateKey_decoded);
	@openssl_pkey_free($privateKey_decoded);
	if(!$status || $plaintext === false) return false;

	if($plaintext === false) return false;

	return $plaintext;
}

#---------------------------------------------------------------------------------
#	Catch URL for index header
#---------------------------------------------------------------------------------

function CatchURL(){
	$param = NULL;
	if(isset($_GET))
		$param = isset($_GET['dir']) ? $_GET['dir'] : NULL;
	
	return isset($param) ? $param.".php" : false;
}

#---------------------------------------------------------------------------------
#	TOKEN
#---------------------------------------------------------------------------------

# Make a Token of specific size 
# argument is specific size

function MakeToken($size){
	
	static $feed = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	$randStr = null;

	for($i=0; $i< $size; $i++)
		$randStr .= substr($feed, rand(0, strlen($feed)-1), 1);
	
	return $randStr;
}

#---------------------------------------------------------------------------------
#	Make HTML Page
#---------------------------------------------------------------------------------

# Make a Html Page for specific purpose 
# argument is add message

function MakeHtml($category,$message=NULL,$param=NULL){
	$contents = NULL;
	$html = NULL;
	switch($category){ 
		case EMAIL :
		$html = fopen("./account/Email.php") or die("Couldn't create Email");
		$contetns = 
			'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1-strict.dtd">
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
			</head>
			<body>
			<table align="center" width="620" height="270" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0">
			<tbody>
				<tr id="mail_lubycon_logo">
					<td>
						<img src="../../CH/img/resist_mail/mail_header.png" class="mail_header" >
					</td>
				</tr>
		       	<tr id="mail_hello">
		           	<td align="left" style="font-family:Arial, Helvetica, sans-serif; font-size: 40px; color:#444444;">
		               	<br />
		    	       	&nbsp;Hello. <font size="40px" color="#48cfad">:)</font>
		                <br />
		                <br />
		                </td>
		        </tr>
		        <tr id="mail_description">
		          	<td align="left" style="font-family:Arial, Helvetica, sans-serif; font-size: 15px; color:#444444; line-height:25px;">
		           			&nbsp;&nbsp;&nbsp;
		                    You or someone with your e-mail ID has singed up at LUBYCON.<br />
		                    &nbsp;&nbsp;&nbsp;
							your new account is almost ready.<br />
		                    &nbsp;&nbsp;&nbsp;
							but before you can login, you need to confirm your e-mail ID <br /> 
							&nbsp;&nbsp;&nbsp;
							by check the certification Code. <br /><br />
							&nbsp;&nbsp;&nbsp;
							<font size="4px">
							Here your certification Code : '.$param.'
							</font>
							<br /><br />
							&nbsp;&nbsp;&nbsp;
		                    Please Input certification Code in LUBYCON </font>
		                    <br />
		                    <br />
		            	</td>
		            </tr>
		            <tr>
		                <td align="left" style="font-family:Arial, Helvetica, sans-serif; font-size: 15px; color:#444444; line-height:20px;">
		                	<br />
		                    &nbsp;&nbsp;&nbsp;
		                	If you have any problems or questions, please send e-mail to 
		                    <a id="mailadress" href="mailto:contact@lubycon.com" style="text-decoration:none;">
		                    	<font color="#48cfad" size="+1">contact@lubycon.com</font>
		                    </a>
		                </td>
		            </tr>
		        </tbody>
			</table>
			</body>
			';
			break;
		case PWD :
			$html = fopen("./account/Pwd.php") or die("Couldn't create Email");
			$contents = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1-strict.dtd">
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
		</head>
		<body>
		<table align="center" width="620" height="270" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0">
		<tbody>
			<tr id="mail_lubycon_logo">
				<td>
					<img src="../../CH/img/resist_mail/mail_header.png" class="mail_header" >
				</td>
			</tr>
        	<tr id="mail_hello">
            	<td align="left" style="font-family:Arial, Helvetica, sans-serif; font-size: 40px; color:#444444;">
                	<br />
                	 &nbsp;Hello. <font size="40px" color="#48cfad">:)</font>
                    <br />
                    <br />
                </td>
            </tr>
            <tr id="mail_description">
            	<td align="left" style="font-family:Arial, Helvetica, sans-serif; font-size: 15px; color:#444444; line-height:25px;">
           			&nbsp;&nbsp;&nbsp;
                    Your temporary password has been sent to the registered email.<br /><br />
					&nbsp;&nbsp;&nbsp;
					<font size="4px">
					Here your temporary password is : '.$param.'
					</font>
					<br /><br />
					&nbsp;&nbsp;&nbsp;

					If this is not you, Please Contact.<br />
                    &nbsp;&nbsp;&nbsp;
                    <br />
                    <br />
            	</td>
            </tr>
            <tr>
                <td align="left" style="font-family:Arial, Helvetica, sans-serif; font-size: 15px; color:#444444; line-height:20px;">
                	<br />
                    &nbsp;&nbsp;&nbsp;
                	If you have any problems or questions, please send e-mail to 
                    <a id="mailadress" href="mailto:contact@lubycon.com" style="text-decoration:none;">
                    	<font color="#48cfad" size="+1">contact@lubycon.com</font>
                    </a>
                </td>
            </tr>
        </tbody>
		</table>
		</body>
		';
			break;
		case ERROR:
		$html = fopen("./account/Email.php") or die("Couldn't create Error Contents");
		$contents = '<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		    <meta http-equiv="Pragma" content="no-cache" />
		    <meta name="subject" content="Lubycon" />
		    <meta name="description" content="free sources" />
		    <meta name="developed" content="Lubycon" />
		    <meta name="designed" content="Lubycon" />
		    <meta name="robots" content="index" />
		    <meta name="copyright" content="copyrights 2015 LUBYCON" />
		    <meta name="keywords" content="design, font ,vector, 3d design, community, designers, engineer, 3d printer, illustration, lubycon" />

		    <title>Lubycon</title>
			
			<link rel="shortcut icon" href="../../ch/img/logo/lubycon.ico" />  <!-- favicon -->
			<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" />
			<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Source Sans Pro:200,400" />
			<link rel="stylesheet" href="../../css/layout/animate.css" />
			<link rel="stylesheet" href="../../css/messagePage.css" />

			<script type="text/javascript" src="../../js/core/jquery-1.12.2.min.js"></script> <!-- jquery library -->
			<script type="text/javascript" src="../../js/core/core.js"></script>
			<script type="text/javascript" src="../../js/messagePage.js"></script>
		</head>
		<body ondragstart="return false" onselectstart="return false">
		<?php
			if(!$errorCode)
				$errorCode = "'.$message.'";
			else
				$errorCode = "Unknown";
		?>
			<section class="message message-wrapper bounceInDown animated">
				<i class="message-icon fa fa-chain-broken red-color"></i>
				<div class="message-box">
					<article class="main-message">Error</article>
					<article class="sub-message">Error code : <?=$errorCode?></article>
				</div>
				<div class="message-box">
					<div class="btn other-bt" data-value="gotoBack">BACK</div>
					<div class="btn other-bt" data-value="report">REPORT</div>
				</div>
			</section>
		</body>
		</html>';
		break;

					
	}

}

#--------------------------------------------------------------------------
# PHP ERROR HANDLING LOGIC
#--------------------------------------------------------------------------

function ErrorHandling($error, $message){
	$ErrorPage = $error.".php";

	if(file_exists($ErrorPage))
		echo '<script>document.location.href="./'.$ErrorPage.'"</script>';
	else{
		MakeHtml($error, $message);
		sleep(1);
		echo '<script>document.location.href="./'.$ErrorPage.'"</script>';
	}

}

?>
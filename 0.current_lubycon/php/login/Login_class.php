<?php

require_once '../cookie/cookie_class.php';
require_once '../session/session_class.php';

class Login{
	var $lState;
	var $lCookie;
	var $lSession;

	public function __construct(){
		$lCookie = new Cookie('lubycon', 0);
		$lSession = new Session;
		$lState = false;
	}

	public function CheckLogin($mode){
		if(!isset(($_SESSION['user_id']) && $_SESSION['user_nick']){
			// 해당 세션이 존재하지 않는다.
			// session doesn't exist

			$this->lState = false;

			if($mode === 100){
				//일반 페이지일 경우 그냥 둔다
				// normal case just pass
			}else if($mode === 200){
				// 로그인을 꼭 해야하는 경우, 로그인페이지로 리다이렉팅
				// if we have to login, we would redirect to login page
				echo ('<script>location.href="login_page.php"</script>');
			}
		}else{ // 해당 세션이 존재한다.
			   // session exist, just pass
			$this->lState = true;
		}
	}

	public function Logout(){
		$_SESSION['user_id'] = array();
		$_SESSION['user_nick'] = array();
		if(isset($_COOKIE[session_name()])){
			$lCookie->KillCookie()
		}
		session_destroy();
	}

	public function Login(){

	}
}

?>
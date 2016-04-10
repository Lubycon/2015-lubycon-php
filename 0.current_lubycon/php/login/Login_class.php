<?php

require_once '../session/session_class.php';
require_once './php/database/database_class.php';

class Login{
	protected var $lState;
	protected var $lSession;
	protected var $database;

	public function __construct(){
		$lSession = new Session;
		$database = new Database();
	}

	public function Logout(){

	}

	public function Login($seperator){
		$database->query = "SELECT user_email, user_pass, user_code, user_nick FROM luby_user WHERE (user_email='".$_POST['login_id']."')";
		$database->DBQuestion();
		$result = mysqli_fetch_array($database->result);
		if(password_verify($_POST['login_pass'], $database->result['user_pass'])){
			$info = array($login_id, $database->result['user_nick'], $database->result['user_code'], time());
		}
		$lSession->create_session('Lubycon',$login_id,$database->result['user_nick']);

	}

	public function LoginCheck(){
		
	}
}
/*
require_once '../cookie/cookie_class.php';
require_once '../session/session_class.php';

class Login{
	protected var $lState; // login case valur is true, but the other case value is false 
	protected var $lCookie;
	protected var $lSession;

	public function __construct(){
		$lCookie = new Cookie;
		$lSession = new Session;
		$lState = false;
	}

	public function get_data(){
		$val = array('lState'=>$this->lState, 'lCookie'=>$this->lCookie, 'lSession'=>$this->lSession);
		return $val;
	}

	public function LoginCheck($seperator, $lMode){
		$this->CookieCheck($seperator);
		return $this->lState;
	}

	public function Login(){

	}

	public function Logout(){
	}

	private function CookieCheck($seperator, $lMode){
		$findcookie = 0;
		if(isset($_COOKIE)){
			foreach($_COOKIE as $cname=>$cval){
				if(strpos($cname, $seperator) !== false){
					if(isset($_COOKIE[$cname])){$findcookie++;}
				}
			}
		}
		($findcookie > 0) ? $this->SessionCheck($seperator, $lMode): $this->Redirect();	
	}

	private function SessionCheck($seperator, $lMode){
		$findsession = 0;
		
		if(isset($_SESSION)){
			
			foreach($_SESSION as $sname=>$sval){
				if(strpos($sname, $seperator) !== false){
					if(isset($_SESSION[$sname])){$findsession++;}
				}
			}
		}
		($findsession > 0)? $this->DelayLogout() : $this->Redirect();
	}

	private function DelayLogout(){
		$this->lState = true;
		$this->lCookie->WriteCookie(session_id());
	}

	private function Redirect($lMode){
		$this->lState = false;

		if($lMode === 100){
			//일반 페이지일 경우 그냥 둔다
			// normal case just pass
		} else if($lMode === 200){
			// 로그인을 꼭 해야하는 경우, 로그인페이지로 리다이렉팅
			// if we have to login, we would redirect to login page
			echo ('<script>location.href="login_page.php"</script>');
		}
	}	

// 클래스의 끝
}
*/
?>
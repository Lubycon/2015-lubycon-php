<?php

require_once '../cookie/cookie_class.php';
require_once '../session/session_class.php';

class Login{
	var $lState;
	var $lCookie;
	var $lSession;

	public function __construct(){
		$lCookie = new Cookie;
		$lSession = new Session;
		$lState = false;
	}

	public function CheckLogin(){
		if(!isset(($_SESSION['user_id']) && $_SESSION['user_nick']){
			// 세션이 존재하지 않는다
		}
	}

	public function Logout(){

	}

	public function Login(){

	}
}

?>
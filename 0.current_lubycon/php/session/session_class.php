<?php

# this class is session handling class

class Session{
	protected var $session_id;
	protected var $user_id;
	protected var $user_nick;
	protected var $identifier;

	public function __construct(){
		if(!isset($_SESSION)){
			$this->init_session();
		}
	}

	public function init_session(){
		session_start();

		# set php.ini
		# set session expire time maximum 1440(if do not anything)
		# set session lifetime 0(if exit browser delete session)
		ini_set("session.gc_maxlifetime", 1440);
		ini_set("session.cookie_lifetime", 0);
	}

	public function set_session_id(){
		$this->session_id = session_id();
		return isset($this->session_id);
	}

	public function session_exist($session_name){
		if(isset($_SESSION)){
			return isset($_SESSION[$session_name]);	
		}
		else{
			return false;
		}
	}

	public function create_session($seperator,$id, $nick){
		$_SESSION[$seperator'_id'] = $this->user_id =$id;
		$_SESSION[$seperator'_nick'] = $this->user_nick =$nick;
	}

	public function destroy_session($seperator){
		$_SESSION[$seperator.'_id'] = NULL;
		$_SESSION[$seperator.'_nick'] = NULL;
		session_destroy();
	}

	public function get_var(){
		$var = array('session_id'=>$this->session_id, 'user_id'=>$this->user_id, 'user_nick'=>$this->user_nick);
		return $var;
	}
}
?>
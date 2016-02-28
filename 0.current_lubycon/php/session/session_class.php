<?php

# this class is session handling class

class Session{
	protected $session_id;

	public function __construct(){
		if(!isset($_SESSION)){
			$this->init_session();
		}
	}

	public function init_session(){
		session_start();
	}

	public function set_session_id(){
		$this->session_id = session_id();
		isset($this->session_id)?return true : return false;
	}

	public function set_session_id($id){
		$this->session_id = session_id($id);
		isset($this->session_id)?return true : return false;
	}

	public function get_session_id(){
		return $this->session_id;
	}

	public function session_exist($session_name){
		isset($_SESSION($session_name))?return true : return false;
	}

	public function create_session(){

	}

}

session_start();
# Create Session

if(isset($_COOKIE['login'])){
        $info = unserialize($_COOKIE['login']);
        setcookie('login', serialize($info), time()+5);
    }else{
        session_destroy();
    }
?>
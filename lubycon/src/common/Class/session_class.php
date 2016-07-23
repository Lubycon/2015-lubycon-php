<?php
# this class is session handling class
class Session{
	protected $session_id;
	protected $seperator;

	public function __construct($seperator = "lubycon", $session_name = "lubycon"){
		session_name($session_name);

		if(!isset($_SESSION)){
			$this->$session_name = $session_name;
			$this-> InitSession();
		}
		$this->session_id = session_id();
		$this->seperator = $seperator;
	}

	public function InitSession(){
		session_start();
		# set php.ini
		# set session expire time maximum 1440(if do not anything)
		# set session lifetime 0(if exit browser delete session)
		ini_set("session.gc_maxlifetime", 1440);
		ini_set("session.cookie_lifetime", 0);
	}

	public function SessionId(){
		$this->session_id = session_id();
		return isset($this->session_id);
	}

	public function SessionExist(){
		$count = 0;
		if(isset($_SESSION) === true){
			foreach($_SESSION as $name=>$val){
				if(strpos($name,$this->seperator) !== false){
					
					if(isset($val) === true){
					$count = $count + 1;	
					
					}
				}
			}
		}
		if($count > 0){
			return true;
		}else{
			return false;
		}
	}

	public function WriteSession($seperator="lubycon",$array){
		$this->seperator = $seperator;

		foreach($array as $key=>$value){
			if($key !== "pass")
				$_SESSION[$seperator.'_'.$key] = $value;
		}
	}

	public function DestroySession(){
		session_destroy();

		foreach($_SESSION as $key=>$value){
			$_SESSION[$key] = NULL;
		}
	}
}

?>
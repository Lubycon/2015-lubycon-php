<?php
# this class is session handling class
class Session{
	
	protected $id;
	protected $seperator;
	protected $error;

	public function __construct($seperator = "lubycon", $session_name = "lubycon",$max_lifeTime = 1440, $lifeTime = 0){
		
		session_name($session_name);

		$this->error = array();
		$this->error['error'] = 0000;
		$this->error['contents']='';

		if(!isset($_SESSION))
			$this-> InitSession($max_lifeTime, $lifeTime);
		
		$this->id = session_id();
		$this->seperator = $seperator;

		if(!$this->error)
			die("didn't start Session");
	}

	public function InitSession($max_lifeTime, $lifeTime){
		if(!session_start()){
			$this->error['error']++;
			$this->error['contetns'] .= "/ Didn't started Session ";
		}
		
		# set php.ini
		# set session expire time maximum 1440(if do not anything)
		# set session lifetime 0(if exit browser delete session)
		if(!ini_set("session.gc_maxlifetime", $max_lifeTime)){
			$this->error['error']++;
			$this->error['contents'] .= "/ Didn't set Session maxlifeTime ";
		}

		if(!ini_set("session.cookie_lifetime", $lifeTime)){
			$this->error['error']++;
			$this->error['contents'] .= "/ Didn't set Session lifeTime";
		}
	}

	public function isError(){
		return (count($this->error['error']) > 0) ? true : false;
	}

	public function SessionId(){
		$this->id = session_id();
		return isset($this->id);
	}

	public function SessionExist(){
		$count = 0;
		
		if(isset($_SESSION)){
			foreach($_SESSION as $name=>$val){
				if(strpos($name,$this->seperator) !== false){
					if(strpos($name,'session_id') == false){
						
						if(isset($val) === true)
							$count = $count + 1;
							
					}
				}
			}
		}
		return ($count > 0) ? true : false;
	}

	public function WriteSession($seperator="lubycon",$array){
		$this->seperator = $seperator;

		$_SESSION[$seperator.'_session_id'] = session_id();

		foreach($array as $key=>$value){
			if($key !== "pass")
				$_SESSION[$seperator.'_'.$key] = $value;
		}
	}

	public function DestroySession(){
		session_destroy();

		$temp_sessionId = $this->seperator.'_session_id';
		$temp_id = $this->seperator.'_id';
		$temp_nick = $this->seperator.'_nick';
		$temp_code = $this->seperator.'_code';

		$_SESSION[$temp_sessionId] = NULL;
		$_SESSION[$temp_id] = NULL;
		$_SESSION[$temp_nick] = NULL;
		$_SESSION[$temp_code] = NULL;
	}

	public function GetVar(){
		$var = array();
		foreach($_SESSION as $name=>$val){
			if(strpos($name, $this->seperator) !== false){ // 아이덴티티 분리 후 검사해야할듯 재검토 필요 160307
				$temp = array($name=>$val);
				$var = array_merge($var,$temp);
			}
		}
		return $var;
	}

	public function FreeResource(){
		$this->id = null;
		$this->user_id = null;
		$this->user_nick = null;
		$this->user_code = null;
		$this->seperator = null;
	}

	public function GetSessionId(){return session_id();}
	public function GetSessionName(){return session_name();}
}

?>
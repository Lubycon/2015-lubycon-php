<?php
# this class is session handling class
class Session{
	protected $session_id;
	protected $session_name;
	protected $user_id;
	protected $user_nick;
	protected $user_code;
	protected $user_country;
	protected $user_job;
	protected $user_city;
	protected $user_stat;


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
		if(isset($_SESSION)){
			foreach($_SESSION as $name=>$val){
				if(strpos($name,$this->seperator) !== false){
					if(strpos($name,'session_id') == false){
						if(isset($val)){
						$count = $count + 1;
						}	
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

	public function WriteSession($seperator="lubycon",$id, $nick ,$code,$country,$job,$city,$stat){
		$this->seperator = $seperator;
		
		$temp_sessionId = $seperator.'_session_id';
		$temp_id = $seperator.'_id';
		$temp_nick = $seperator.'_nick';
		$temp_code = $seperator.'_code';
		$temp_country = $seperator.'_country';
		$temp_job = $seperator.'_job';
		$temp_city = $seperator.'_city';
		$temp_stat = $seperator.'_stat';

		$_SESSION[$temp_sessionId] = $this->session_id = session_id();
		$_SESSION[$temp_id] = $this->user_id = $id;
		$_SESSION[$temp_nick] = $this->user_nick = $nick;
		$_SESSION[$temp_code] = $this->user_code = $code;
		$_SESSION[$temp_country] = $this->user_country = $country;
		$_SESSION[$temp_job] = $this->user_country = $job;
		$_SESSION[$temp_city] = $this->user_city = $city;
		$_SESSION[$temp_stat] = $this->user_city = $stat;
	}

	public function DestroySession(){
		session_destroy();

		$temp_sessionId = $this->seperator.'_session_id';
		$temp_id = $this->seperator.'_id';
		$temp_nick = $this->seperator.'_nick';
		$temp_code = $this->seperator.'_code';
		$temp_country = $this->seperator.'_country';
		$temp_job = $this->seperator.'_job';
		$temp_city = $this->seperator.'_city';
		$temp_stat = $this->seperator.'_stat';

		$_SESSION[$temp_sessionId] = NULL;
		$_SESSION[$temp_id] = NULL;
		$_SESSION[$temp_nick] = NULL;
		$_SESSION[$temp_code] = NULL;
		$_SESSION[$temp_country] = NULL;
		$_SESSION[$temp_job] = NULL;
		$_SESSION[$temp_city] = NULL;
		$_SESSION[$temp_stat] = NULL;
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
		$this->session_id = null;
		$this->user_id = null;
		$this->user_nick = null;
		$this->user_code = null;
		$this->user_country = null;
		$this->user_job = null;
		$this->user_city = null;
		$this->user_stat = null;
		$this->seperator = null;
	}

	public function GetSessionId(){return session_id();}
	public function GetSessionName(){return session_name();}
}

?>
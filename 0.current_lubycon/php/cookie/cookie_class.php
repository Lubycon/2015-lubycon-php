<?php

Class Cookie{

	protected var $cName; // 쿠키 이름
	protected var $cTime; // 쿠기 만료기간
	protected var $cPath; // 쿠기 저장 경로

	public function __construct($name, $timeout = 0, $path = "/"){ // 생성자
		
		$this->cName = $name;
		$this->cTime = $timeout;
		$this->cPath = $path;

		$tname = "lubycon_".$this->cName; 
		
		if(!isset($_COOKIE[$tname])){ // 해당 쿠키이름이 없을 때, 빈 배열로 쿠기 생성
			$CookieArray = array();
			$this->WriteCookie($CookieArray);
		}

	}
	public function set_data(){
		$this->cName;
	}

	public function WriteCookie($itemArr){
		$sItems = serialize($itemArr);
		$name = "lubycon_" . $this->cName;
		$_COOKIE[$name] = $sItems;
		$tStamp = time() + $this->cTime;
		setcookie($name, $sItems, $tStamp, $this->cPath);
	}

	public function DestroyCookies(){
		foreach($_COOKIE as $name=>$val){
			if(strpos($name, $this->cName) !== false){ // 아이덴티티 분리 후 검사해야할듯 재검토 필요 160307
				$_COOKIE[$name] = NULL;
				$this->KillCookie($name);
			}
		}
	}

	public function KillCookie(){
		$tStamp = time() - 432000;
		setcookie($this->cName, "", $tStamp, $this->cPath);
	}

	public function ReadCookie($item){ // 저장되어있는 쿠키 안에 저장되어있는 값 불러오기
		$name = "lubycon_" . $this->cName;
		if(isset($_COOKIE[$name])){
			$ucCookie = unserialize($_COOKIE[$name]);
			
			if(isset($ucCookie[$item])){ return $ucCookie[$item]; }
			else{ return NULL; }

		}else{ return NULL; }
	}

	public function get_var(){
		$var = array('cName'=>$this->cName, 'cTime'=>$this->cTime, 'cPath'=>$this->cPath);
		return $var;
	}
}

?>
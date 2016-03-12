<?php

Class Cookie{

	var $cNAME; // 쿠키 이름
	var $cTIME; // 쿠기 만료기간
	var $cPATH; // 쿠기 저장 경로

	public function __construct($name, $timeout, $path = "/"){ // 생성자
		
		$this->cNAME = $name;
		$this->cTIME = $timeout;
		$this->cPATH = $path;

		$tname = $this->cNAME . "_lubycon"; // 이름 끝에는 _lubycon이라는 아이덴티티

		if(!isset($_COOKIE[$tname])){ // 해당 쿠키이름이 없을 때, 빈 배열로 쿠기 생성
			$CookieArray = array();
			$this->WriteCookie($CookieArray);
		}

	}

	public function WriteCookie($itemArr){
		$sItems = serialize($itemArr);
		$name = $this->cNAME . "_lubycon";
		$_COOKIE[$name] = $sItems;
		$tStamp = time() + $this->cTIME;
		setcookie($name, $sItems, $tStamp, $this->cPATH);
	}

	public function DestroyAllCookies(){
		foreach($_COOKIE as $name=>$val){
			if(strpos($name, $this->cNAME) !== false){ // 아이덴티티 분리 후 검사해야할듯 재검토 필요 160307
				$_COOKIE[$name] = NULL;
				$this->KillCookie($name);
			}
		}
	}

	public function KillCookie($name){
		$tStamp = time() - 432000;
		setcookie($cNAME, "", $tStamp, $this->cPATH);
	}

	public function ReadCookie($item){ // 저장되어있는 쿠키 안에 저장되어있는 값 불러오기
		$name = $this->cNAME . "_lubycon";
		if(isset($_COOKIE[$name])){
			$ucCookie = unserialize($_COOKIE[$name]);
			if(isset($ucCookie[$item])){
				return $ucCookie[$item]
			}else{
				return NULL;
			}
		}else{
			return NULL;
		}
	}

	

	
}

?>
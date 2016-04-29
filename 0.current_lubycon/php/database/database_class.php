<?php

class Database{

	public $database;
	public $query;
	public $result;
    public $row;

	public function __construct($host='localhost', $user='lubycon', $pass='hmdwdgdhkr2015', $database='lubyconuser'){
		// default 인자 암호화 방법에 대해서 생각해보기(해당 데이터 베이스, 유저 계정, 유저 비밀번호)
		$this->database = new mysqli($host, $user, $pass, $database) or die("Database Connection error");
		$this->database->query('SET NAMES UTF-8');
		$result = null;
	}

	public function askQuery(){
		if(isset($this->query)){
			$this->result = $this->database->query($this->query);
			return true;
		}else{
			return false;
		}
	}
	public function disconnectDb(){

		if(mysqli_close($this->database)){
			$this->database = null;
			$this->result = null;
			$this->query = null;	
		}else{echo "연결 해제 실패";}
	}

	public function changeDb($db){
		if($this->database->select_db($db)){
			return true;
		}else{
			return false;
		}
	}

	public function askMultiQuery(){
		# for later
	}
}

?>
<?php

class Database{

	public $database;
	public $query;
	public $result;

	public function __construct($host='localhost', $user='lubycon', $pass='hmdwdgdhkr2015', $database='lubycon'){

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

	public function askMultiQuery(){
		# for later
	}
}

?>
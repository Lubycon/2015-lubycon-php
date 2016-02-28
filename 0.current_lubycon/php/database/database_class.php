<?php

class DBConnect{
	public $database;
	public $query;
	public $result;

	public function DBInsert(){
		$this->database = new mysqli('localhost', 'lubycon', 'hmdwdgdhkr2015', 'lubycon');
		$this->database->query('SET NAMES UTF-8');
		if(mysqli_connect_errno()){
			header("Content-Type: text/html; charset=UTF-8");
			echo "DB Connecting error";
			exit;
		}
	}

	public function DBQuestion(){
		$this->result = $this->database->query($this->query);
	}

	public function DBOut(){
		//$this->result->free;
		$this->database->close();
	}
}

?>
<?php

class Database{

	public $database;
	public $query;
	public $result;
    public $row;

	public function __construct($host='localhost', $user='lubycon', $pass='hmdwdgdhkr2015', $database='lubyconuser'){
		// default 인자 암호화 방법에 대해서 생각해보기(해당 데이터 베이스, 유저 계정, 유저 비밀번호)

        // connection database
		$this->database = new mysqli($host, $user, $pass, $database) or die("Database Connection error");
        // check connect databace
        if (!$this->database) {
        	$total_array = array(
		        'status' => array(
		            'code' => '1006',
		            'msg' => 'database connect fail'
		        ),
		        'result' => (object)array()
		    );
		    $data_json = json_encode($total_array);
            die($data_json);
        }
		$this->database->query('SET NAMES UTF-8');
		$result = null;
	}

	public function askQuery(){
		if(isset($this->query)){
			return $this->result = $this->database->query($this->query);
		}else{
			$total_array = array(
		        'status' => array(
		            'code' => '1005',
		            'msg' => 'database query ask fail'
		        ),
		        'result' => (object)array()
		    );
		    $data_json = json_encode($total_array);
			die($data_json);
		}
	}
	public function disconnectDb(){

		if(mysqli_close($this->database)){
			$this->database = null;
			$this->result = null;
			$this->query = null;	
		}else
		{
			$total_array = array(
		        'status' => array(
		            'code' => '1002',
		            'msg' => 'database disconnect fail'
		        ),
		        'result' => (object)array()
		    );
		    $data_json = json_encode($total_array);
			die($data_json);
		}
	}

	public function changeDb($db){
		if($this->database->select_db($db)){
			return true;
		}else{
			$total_array = array(
		        'status' => array(
		            'code' => '1003',
		            'msg' => 'database change fail'
		        ),
		        'result' => (object)array()
		    );
		    $data_json = json_encode($total_array);
			die($data_json);
		}
	}

	public function askMultiQuery(){
		if(isset($this->query)){
            return $this->result = $this->database->multi_query($this->query);
		}else{
			$total_array = array(
		        'status' => array(
		            'code' => '1004',
		            'msg' => 'database multi query ask fail'
		        ),
		        'result' => (object)array()
		    );
		    $data_json = json_encode($total_array);
			die($data_json);
		}
	}
}

?>
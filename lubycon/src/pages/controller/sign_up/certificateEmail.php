<?php
require_once '../../../common/Class/database_class.php';
include_once '../../../common/Class/session_class.php';

$session = new Session();
$db = new Database();

$db->query = "SELECT validation FROM userbasic WHERE (validationToken = '".$_POST['certificationCode']."')";

if($db->askQuery() != false){
	
	$result = mysqli_fetch_array($db->result);
	
	if($result['validation'] == 'inactive'){
	
		$db->query = "UPDATE userbasic SET validation = 'active' WHERE (validationToken = '".$_POST['certificationCode']."')";
		
		if($db->askQuery() != false){

			$db->query = "UPDATE userbasic SET validationToken = NULL";
			
			if($db->askQuery() != false)
			{
				$_SESSION['lubycon_validation'] = 'active';
				header('location:../../../index.php?dir=service/view/success_account');
			}
		
		}else
		{
		  $total_array = array(
		    'status' => array(
		      'code' => '1500',
		      'msg' => "create account fail"
		      ),
		    'result' => (object)array()
		  );
		  $data_json = json_encode($total_array);
		  die($data_json);
		}
	}else
	{
	  $total_array = array(
	    'status' => array(
	      'code' => '1501',
	      'msg' => "create account fail already create or something"
	      ),
	    'result' => (object)array()
	  );
	  $data_json = json_encode($total_array);
	  die($data_json);
	}
}

else
{
	$total_array = array(
		'status' => array(
			'code' => '1502',
			'msg' => "nothing matched in database",
			),
		'result' => (object)array()
		);
	$data_json = json_encode($total_array);
	die($data_json);
}
?>
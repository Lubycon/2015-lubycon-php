<?php
require_once '../../../common/Class/database_class.php';
include_once '../../../common/Class/session_class.php';
require_once "../../../common/Class/json_class.php";

$session = new Session();
$db = new Database();
$json_control = new json_control;

$total_array = NULL;

if ($_SERVER['REQUEST_METHOD'] == 'POST'){

	$postData = json_decode(file_get_contents("php://input"));
	$certificateCode = $postData->code;
}
else{

	$total_array = array(
		'status' => array(
			'code' => '1200',
			'msg' => "nothing receive post data"
			),
		'result' => (object)array()
		);
	$data_json = json_encode($total_array);
}

$db->query = "SELECT validation FROM userbasic WHERE (validationToken = '".$certificateCode."')";

if($db->askQuery() != false){
	
	$result = mysqli_fetch_array($db->result);
	
	if($result['validation'] == 'inactive'){

		$db->query = "UPDATE userbasic SET validation = 'active' WHERE (validationToken = '".$certificateCode."')";
		
		if($db->askQuery() != false){

			$db->query = "UPDATE userbasic SET validationToken = NULL";
			
			if($db->askQuery() != false)
			{
				$_SESSION['lubycon_validation'] = 'active';
				
				$total_array = array(
					'status' => array(
						'code' => "0000",
						'msg' => "success Certification Email"
						),
					'result' => (object)array()
					);

				$data_json = json_encode($total_array);
				die($data_json);

			}else{
				$total_array = array(
					'status' => array(
						'code' => '1000',
						'msg' => "send query fail"
						),
					'result' => (object)array("code" => $certificationCode)
					);
				$data_json = json_encode($total_array);
				die($data_json);		
			}

		}else
		{
			$total_array = array(
				'status' => array(
					'code' => '1000',
					'msg' => "send query fail"
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
				'code' => '301',
				'msg' => "already certificate"
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
			'code' => '1000',
			'msg' => "send query fail",
			),
		'result' => (object)array()
		);
	$data_json = json_encode($total_array);
	die($data_json);
}
?>
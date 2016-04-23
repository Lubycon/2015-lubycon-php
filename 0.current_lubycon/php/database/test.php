<?php

	require_once './database_class.php';

	$db = new Database('localhost', 'root', 'd7608258', 'lubyconuser');

	//$db->askQuery();
	// 쿼리가 null일 경우 에러메세지 테스트

	// 잘못된 쿼리일 경우 에러메세지 테스
	//$db->query = "SELECT user FROM luby_user";

	//$db->askQuery();

	$db->query = "SELECT email FROM userbasic";

	$db->askQuery();
	$result = mysqli_fetch_array($db->result);
	echo $result['email'] . "<br/>";
	// 쿼리가 null이 아닐 경우 작동 테스트

	$db->changeDb('performance_schema');
	// db를 성공적으로 변경 되는지 테스트
	$db->query = "SELECT USER FROM accounts";
	$db->askQuery();
	$result = mysqli_fetch_array($db->result);
	echo $result['USER']. "<br/>";

	
	$db->changeDb('helloworld');
	
	// 잘못된 db를 변경시 테스트

	$db->disconnectDb();

	echo (isset($db->database))?"연결정보 있음":"연결정보 없음";
	// 연결정보 죽었는지 확인
	
	
?>
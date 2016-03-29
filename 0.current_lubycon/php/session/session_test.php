<?php

require_once "./session_class.php";

$obj = new Session();

if($obj->set_session_id()){
	echo "session set <br />";
}

echo "내부 변수 확인";

echo '<br />' .$obj->get_session_id() . "<br />";
echo $obj->get_user_id(). "<br />";
echo $obj->get_user_nick(). "<br />";

echo '<br />';

echo "<br/ >세션 만들기 <br />";

$obj->create_session("bihong05","SsaRu");
echo '<br />' .$obj->get_session_id() . "<br />";
echo $obj->get_user_id(). "<br />";
echo $obj->get_user_nick(). "<br />";

echo "<br/ >세션 존재 확인 <br />";

if($obj->session_exist('user_id')){
	echo "<br /> session exist <br />";
}else{
	echo "<br />session doesn't exist<br />";
}

echo "<br/ >세션 파괴함수 작동 <br />";

$obj->destroy_session();

if($obj->session_exist('user_id')){
	echo "<br /> session exist <br />";
}else{
	echo "<br /> session doesn't exist <br />";
}
echo "<br />";
echo "<br /> 세션 내용 확인";
echo $_SESSION['user_id'];
echo $_SESSION['user_nick'];

?>
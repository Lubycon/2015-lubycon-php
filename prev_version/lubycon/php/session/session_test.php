<?php

require_once "./session_class.php";

$obj = new Session();

if($obj->SessionId()){
	echo "session set <br />";
}

echo "<br/ >세션 만들기 <br />";

$obj->WriteSession("lubycon","bihong05","SsaRu");
$check = $obj->GetVar();

foreach($check as $name=>$val){
	echo ('name : ' . $name . '<br />' . 'val : ' . $val . '<br />');
}
//echo '<br />' .$check['session_id'] . '<br />' . $check['user_id']. '<br />' . $check['user_nick']. '<br/>';


if(($obj->GetSessionId() == null) && $obj->GetSessionName() == null){
    $LoginState = false;
}else{
    if($obj->SessionExist()){
        $LoginState = true;
    }else{
     	$LoginState = false;	
    }
}


echo "로그인 상태<br/>";
if($LoginState == true){
	echo "로그인 성공<br/>";
}else{
	echo "로그인 실패<br/>";
}

echo "<br/ >세션 존재 확인 <br />";

if($obj->SessionExist('user_id')){
	echo "<br /> session exist <br />";
}else{
	echo "<br />session doesn't exist<br />";
}

echo "<br/ >세션 파괴함수 작동 <br />";

$obj->DestroySession();

if($obj->SessionExist()){
	echo "<br /> session exist <br />";
}else{
	echo "<br /> session doesn't exist <br />";
}
echo "<br />";
echo "<br /> 세션 내용 확인";
foreach($_SESSION as $name=>$val){
	echo '<br/>$name : '.$name.'<br/>'.'val : '.$val.'<br/><br/>';
}

?>
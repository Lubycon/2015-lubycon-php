<?php
	if(isset($_COOKIE['login'])){
		setcookie('login',time(),time()-3600);
		if(isset($_SESSION['id'])){
			$_SESSION['id'] = array();
			session_destroy();
		}
    	echo '<script type="text/javascript">location.href="./index.php";</script>';
	}
?>
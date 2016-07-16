<?php
	require_once './common/Class/session_class.php';
	$session = new Session();
	$session->DestroySession();
?>
<script>document.location.href="./index.php";</script>
<?php
	include_once '../class/session_class.php';

	$session = new Session();

	$session->DestroySession();

	echo '<script>document.location.href="../../index.php"</script>';

?>
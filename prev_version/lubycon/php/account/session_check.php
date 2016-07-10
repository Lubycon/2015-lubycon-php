<?php
	# Real time Session Check

	echo '<script>console.log("entry");</script>';
    if(isset($_COOKIE['login'])){
        echo '<script>console.log("if 1");</script>';
    }else{
        echo '<script>console.log("else 1");</script>';
        if(isset($_SESSION)){
            echo '<script>console.log("else 1 - if 1");</script>';
            $_SESSION = array();
            session_destroy();
        }
        header('location:../login_page.php');
    }
?>
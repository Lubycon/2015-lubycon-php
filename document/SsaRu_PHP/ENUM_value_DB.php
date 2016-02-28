<?php

Require_once './Database.php';

$database = new DBConnect;
$database -> DBInsert();

$check = $_REQUEST["check"];
$database->query = "select exists(select * from luby_user where email = '".$check."')";

?>
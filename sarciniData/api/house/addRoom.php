<?php
session_set_cookie_params(0);
ob_start();
session_start();
include '../config.php';

$name = $_POST['name'];
$id = $_POST['id'];

$con = mysqli_connect($dbHost, $dbUser, $dbPass, $dbName);

$q = "INSERT INTO rooms (name, idhouse) VALUES ('$name', $id)";

mysqli_query($con, $q);

echo json_encode(array('success' => true));

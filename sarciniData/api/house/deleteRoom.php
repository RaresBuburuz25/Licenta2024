<?php
session_set_cookie_params(0);
ob_start();
session_start();
include '../config.php';

$id = $_GET['id'];

$con = mysqli_connect($dbHost, $dbUser, $dbPass, $dbName);

$q = "DELETE FROM rooms WHERE id = $id";

mysqli_query($con, $q);

echo json_encode(array('success' => true));
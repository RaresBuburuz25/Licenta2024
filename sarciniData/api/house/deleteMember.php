<?php
session_set_cookie_params(0);
ob_start();
session_start();
include '../config.php';

$idhouse = $_POST['idhouse'];
$iduser = $_POST['iduser'];

$con = mysqli_connect($dbHost, $dbUser, $dbPass, $dbName);

$q = "DELETE FROM houses_users WHERE idhouse = $idhouse AND iduser = $iduser";

mysqli_query($con, $q);

echo json_encode(array('success' => true));
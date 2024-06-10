<?php
session_set_cookie_params(0);
ob_start();
session_start();
include '../config.php';

$id = $_GET['id'];

$con = mysqli_connect($dbHost, $dbUser, $dbPass, $dbName);

$res = array();

$q = "SELECT id, name FROM rooms WHERE idhouse = $id";

$result = mysqli_query($con, $q);

while ($row = mysqli_fetch_array($result)) {
    $res[] = $row;
}

echo json_encode($res);


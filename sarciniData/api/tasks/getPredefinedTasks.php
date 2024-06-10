<?php
session_set_cookie_params(0);
ob_start();
session_start();
include '../config.php';

$id = $_SESSION['id'];

$con = mysqli_connect($dbHost, $dbUser, $dbPass, $dbName);

$res = array();

$q = "SELECT id, name FROM tasks_types WHERE iduser = -1 OR iduser = $id ORDER BY iduser DESC";

$result = mysqli_query($con, $q);

while ($row = mysqli_fetch_array($result)) {
    $res[] = $row;
}

echo json_encode($res);


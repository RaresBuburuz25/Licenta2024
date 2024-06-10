<?php
session_set_cookie_params(0);
ob_start();
session_start();
include '../config.php';

$id = $_SESSION['id'];

$con = mysqli_connect($dbHost, $dbUser, $dbPass, $dbName);

$res = array();

$q = "SELECT id, name FROM houses WHERE master = $id";

$result = mysqli_query($con, $q);

while ($row = mysqli_fetch_array($result)) {
    $res[] = $row;
}

$q = "SELECT houses.id, houses.name FROM houses INNER JOIN houses_users ON houses.id = houses_users.idhouse WHERE houses_users.iduser = $id";

$result = mysqli_query($con, $q);

while ($row = mysqli_fetch_array($result)) {
    $res[] = $row;
}

echo json_encode($res);

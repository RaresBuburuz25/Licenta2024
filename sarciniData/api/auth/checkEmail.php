<?php
session_set_cookie_params(0);
ob_start();
session_start();
include '../config.php';

$email = $_GET['email'];

$con = mysqli_connect($dbHost, $dbUser, $dbPass, $dbName);

$q = "SELECT * FROM users WHERE email = '$email'";

$result = mysqli_query($con, $q);

$r = array();

if (mysqli_num_rows($result) > 0) {
    $r['exists'] = true;
    echo json_encode($r);
} else {
    $r['exists'] = false;
    echo json_encode($r);
}

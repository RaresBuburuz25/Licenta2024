<?php
session_set_cookie_params(0);
ob_start();
session_start();
include '../config.php';

$email = $_POST['email'];
$password = $_POST['password'];

$password = hash('sha256', $password);

$con = mysqli_connect($dbHost, $dbUser, $dbPass, $dbName);

$q = "SELECT * FROM users WHERE email = '$email' AND password = '$password'";

$result = mysqli_query($con, $q);

$r = array();

if (mysqli_num_rows($result) > 0) {
    $r['success'] = true;
    $row = mysqli_fetch_assoc($result);
    $r['id'] = $row['id'];
    $r['firstName'] = $row['firstName'];
    $r['lastName'] = $row['lastName'];
    $_SESSION['loggedIn'] = true;
    $_SESSION['id'] = $row['id'];
    echo json_encode($r);
} else {
    $r['success'] = false;
    echo json_encode($r);
}

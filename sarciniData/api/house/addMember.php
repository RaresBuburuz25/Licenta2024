<?php
session_set_cookie_params(0);
ob_start();
session_start();
include '../config.php';

$id = $_POST['id'];
$email = $_POST['email'];

$con = mysqli_connect($dbHost, $dbUser, $dbPass, $dbName);

$q = "SELECT id FROM users WHERE email = '$email'";

$result = mysqli_query($con, $q);

if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    $iduser = $row['id'];

    $q = "INSERT INTO houses_users (idhouse, iduser) VALUES ($id, $iduser)";

    mysqli_query($con, $q);

    echo json_encode(array('success' => true));
} else {
    echo json_encode(array('success' => false));
}


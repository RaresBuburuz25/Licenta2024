<?php
session_set_cookie_params(0);
ob_start();
session_start();

include '../config.php';

$email = $_POST['email'];
$password = $_POST['password'];
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];

$password = hash('sha256', $password);

$con = mysqli_connect($dbHost, $dbUser, $dbPass, $dbName);

$q = "INSERT INTO users (email, password, firstName, lastName) VALUES ('$email', '$password', '$firstName', '$lastName')";

mysqli_query($con, $q);

$r = array();

$r['success'] = true;

echo json_encode($r);

$to = $email;
$subject = "Inregistrare cu succes";
$message = "Salutari, $firstName $lastName!

Te-ai inregistrat cu succes pe aplicatia noastra.
Speram sa ai parte de o experienta placuta alaturi de noi.

O zi buna!";
$headers = "From: n0replysarcini@outlook.com";

mail($to, $subject, $message, $headers);

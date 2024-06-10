<?php
session_set_cookie_params(0);
ob_start();
session_start();
include '../config.php';

$house = $_POST['house'];
$room = $_POST['room'];
$task = $_POST['task'];
$customTask = $_POST['customTask'];
$date = $_POST['date'];
$interval = $_POST['interval'];

$con = mysqli_connect($dbHost, $dbUser, $dbPass, $dbName);

$q = "INSERT INTO tasks (name, ";

if ($room == '') {
    $q .= "idhouse";
} else {
    $q .= "idroom";
}
$q .= ', time_start, inter) VALUES (';

if ($task == '') {
    $q .= "'$customTask'";
} else {
    $q .= "'$task'";
}

if ($room == '') {
    $q .= ", $house";
} else {
    $q .= ", $room";
}

$q .= ", $date, $interval)";

mysqli_query($con, $q);

echo json_encode(array('success' => true));

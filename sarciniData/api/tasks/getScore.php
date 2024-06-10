<?php
session_set_cookie_params(0);
ob_start();
session_start();
include '../config.php';

$id = $_SESSION['id'];

$con = mysqli_connect($dbHost, $dbUser, $dbPass, $dbName);


$houses = array();
$rooms = array();

$id = $_SESSION['id'];

$con = mysqli_connect($dbHost, $dbUser, $dbPass, $dbName);

$q = "SELECT id FROM houses WHERE master = $id";

$result = mysqli_query($con, $q);

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $houses[] = $row['id'];
    }
}

$q = "SELECT idhouse FROM houses_users WHERE iduser = $id";

$result = mysqli_query($con, $q);

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $houses[] = $row['idhouse'];
    }
}

$res = array();

if (count($houses) != 0) {
    $houses = implode(',', $houses);

    $q = "SELECT id FROM rooms WHERE idhouse IN ($houses)";

    $result = mysqli_query($con, $q);

    while ($row = mysqli_fetch_assoc($result)) {
        $rooms[] = $row['id'];
    }

    $rooms = implode(',', $rooms);

    if ($rooms == '') {
        $rooms = 0;
    }

    $q = "SELECT COUNT(*) AS cnt FROM passed_tasks 
    WHERE idroom IN ($rooms) OR idhouse IN ($houses)";

    $result = mysqli_query($con, $q);

    $totalTasks = mysqli_fetch_assoc($result)['cnt'];

    $q = "SELECT COUNT(*) AS cnt FROM passed_tasks 
    WHERE (idroom IN ($rooms) OR idhouse IN ($houses)) AND time_complete - time_start >= 86400";

    $result = mysqli_query($con, $q);

    $overude = mysqli_fetch_assoc($result)['cnt'];

    $score = ($totalTasks - $overude) / $totalTasks * 10;

    $res['score'] = $score;
}

echo json_encode($res);

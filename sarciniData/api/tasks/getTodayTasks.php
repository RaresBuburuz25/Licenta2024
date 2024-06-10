<?php
session_set_cookie_params(0);
ob_start();
session_start();
include '../config.php';

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

    $now = strtotime('today midnight');
    $now -= 3600;//de la ora de vara

    $q = "SELECT t.*, h.name AS house, r.name AS room FROM tasks t
    LEFT JOIN houses h ON t.idhouse = h.id
    LEFT JOIN rooms r ON t.idroom = r.id
    WHERE (t.idroom IN ($rooms) OR t.idhouse IN ($houses)) AND t.time_start = $now";

    $result = mysqli_query($con, $q);

    while ($row = mysqli_fetch_assoc($result)) {
        if ($row['idhouse'] == '' || $row['idhouse'] == null) {
            $q = "SELECT houses.name FROM houses JOIN rooms on rooms.idhouse = houses.id WHERE rooms.id = " . $row['idroom'];
            $result2 = mysqli_query($con, $q);

            $row2 = mysqli_fetch_assoc($result2);

            $row['houseNameForRoom'] = $row2['name'];
        }
        $res[] = $row;
    }
}

echo json_encode($res);

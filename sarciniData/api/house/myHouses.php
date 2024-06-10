<?php
session_set_cookie_params(0);
ob_start();
session_start();
include '../config.php';

$id = $_SESSION['id'];

$con = mysqli_connect($dbHost, $dbUser, $dbPass, $dbName);

$q = "SELECT h.*, u.firstName, u.lastName FROM houses h
JOIN users u ON master = u.id
WHERE master = $id";

$result = mysqli_query($con, $q);

$r = array();

while ($row = mysqli_fetch_assoc($result)) {
    $q = "SELECT u.id, u.firstName, u.lastName FROM users u
    JOIN houses_users hu ON u.id = hu.iduser
    WHERE hu.idhouse = " . $row['id'];

    $result2 = mysqli_query($con, $q);

    $row['members'] = array();

    while ($row2 = mysqli_fetch_assoc($result2)) {
        $row['members'][] = $row2;
    }

    $ids = array();

    $q = "SELECT id FROM rooms WHERE idhouse = " . $row['id'];

    $result2 = mysqli_query($con, $q);

    while ($row2 = mysqli_fetch_assoc($result2)) {
        $ids[] = $row2['id'];
    }

    if (count($ids) != 0) {
        $ids = implode(',', $ids);

        $q = "SELECT COUNT(*) AS cnt FROM tasks 
        WHERE idroom IN ($ids) OR idhouse = " . $row['id'];

        $result2 = mysqli_query($con, $q);

        $row['tasks'] = mysqli_fetch_assoc($result2)['cnt'];
    } else {
        $q = "SELECT COUNT(*) AS cnt FROM tasks
        WHERE idhouse = " . $row['id'];

        $result2 = mysqli_query($con, $q);

        $row['tasks'] = mysqli_fetch_assoc($result2)['cnt'];
    }

    $q = "SELECT * FROM rooms WHERE idhouse = " . $row['id'];

    $result2 = mysqli_query($con, $q);

    $row['rooms'] = array();

    while ($row2 = mysqli_fetch_assoc($result2)) {
        $row['rooms'][] = $row2;
    }

    $r[] = $row;
}

$q = "SELECT idhouse FROM houses_users WHERE iduser = $id";

$result = mysqli_query($con, $q);

$ids = array();

while ($row = mysqli_fetch_assoc($result)) {
    $ids[] = $row['idhouse'];
}

if (count($ids) != 0) {
    $ids = implode(',', $ids);

    $q = "SELECT h.*, u.firstName, u.lastName FROM houses h
    JOIN users u ON master = u.id
    WHERE h.id IN ($ids)";

    $result = mysqli_query($con, $q);

    while ($row = mysqli_fetch_assoc($result)) {
        $q = "SELECT u.id, u.firstName, u.lastName FROM users u
        JOIN houses_users hu ON u.id = hu.iduser
        WHERE hu.idhouse = " . $row['id'];

        $result2 = mysqli_query($con, $q);

        $row['members'] = array();

        while ($row2 = mysqli_fetch_assoc($result2)) {
            $row['members'][] = $row2;
        }

        $ids = array();

        $q = "SELECT id FROM rooms WHERE idhouse = " . $row['id'];

        $result2 = mysqli_query($con, $q);

        while ($row2 = mysqli_fetch_assoc($result2)) {
            $ids[] = $row2['id'];
        }

        if (count($ids) != 0) {
            $ids = implode(',', $ids);

            $q = "SELECT COUNT(*) AS cnt FROM tasks 
            WHERE (idroom IN ($ids) OR idhouse = " . $row['id'] . ")";

            $result2 = mysqli_query($con, $q);

            $row['tasks'] = mysqli_fetch_assoc($result2)['cnt'];
        } else {
            $q = "SELECT COUNT(*) AS cnt FROM tasks
            WHERE idhouse = " . $row['id'];

            $result2 = mysqli_query($con, $q);

            $row['tasks'] = mysqli_fetch_assoc($result2)['cnt'];
        }

        $q = "SELECT * FROM rooms WHERE idhouse = " . $row['id'];

        $result2 = mysqli_query($con, $q);

        $row['rooms'] = array();

        while ($row2 = mysqli_fetch_assoc($result2)) {
            $row['rooms'][] = $row2;
        }

        $r[] = $row;
    }
}



echo json_encode($r);
<?php
session_set_cookie_params(0);
ob_start();
session_start();
include '../config.php';

$id = $_GET['id'];

$con = mysqli_connect($dbHost, $dbUser, $dbPass, $dbName);

mysqli_query($con, "START TRANSACTION");

try {
    $q = "SELECT * FROM tasks WHERE id = $id";

    $result = mysqli_query($con, $q);

    $row = mysqli_fetch_assoc($result);

    $time_start = $row['time_start'];

    if ($row['idhouse'] == '') {
        $q = "INSERT INTO passed_tasks (name, idroom, time_start) VALUES ('" . $row['name'] . "', " . $row['idroom'] . ", $time_start)";
    } else {
        $q = "INSERT INTO passed_tasks (name, idhouse, time_start) VALUES ('" . $row['name'] . "', " . $row['idhouse'] . ", $time_start)";
    }

    $time_start += $row['inter'];

    mysqli_query($con, $q);

    $q = "UPDATE tasks SET time_start = $time_start WHERE id = $id";

    mysqli_query($con, $q);

    mysqli_query($con, "COMMIT");

    echo json_encode(array('success' => true));

} catch (Exception $e) {
    mysqli_query($con, "ROLLBACK");

    echo json_encode(array('success' => false, 'error' => $e->getMessage()));
}
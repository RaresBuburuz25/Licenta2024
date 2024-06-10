<?php session_set_cookie_params(0);
ob_start();
session_start();
$_SESSION['loggedIn'] = false; ?>

<!DOCTYPE html>
<html lang="ro">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="icon" href="img/logo.png" type="image/jpeg">
	<link rel="stylesheet" type="text/css" href="style.css">
	<script src="../sarciniData/script.js"></script>

	<title>Sarcini</title>
</head>

<body>
	<header>
	</header>
	<main>

	</main>
	<div class="profile"></div>
	<div class="overlay"></div>
	<div class="buttons">
		<button class="button" onclick="House.addHousePage()">Adauga casa</button>
		<button class="button" onclick="House.myHouses()">Casele mele</button>
		<button class="button" onclick="Tasks.myTasks()">Sarcinile mele</button>
		<button class="button" onclick="Tasks.stats()">Istoric</button>
		<button class="button" onclick="Auth.logout()">Logout</button>
	</div>
</body>

</html>
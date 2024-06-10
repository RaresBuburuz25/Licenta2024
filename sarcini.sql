-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gazdă: 127.0.0.1
-- Timp de generare: apr. 21, 2024 la 03:17 PM
-- Versiune server: 10.4.28-MariaDB
-- Versiune PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Bază de date: `sarcini`
--

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `houses`
--

CREATE TABLE `houses` (
  `id` int(11) NOT NULL,
  `master` int(11) NOT NULL,
  `name` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Eliminarea datelor din tabel `houses`
--

INSERT INTO `houses` (`id`, `master`, `name`) VALUES
(1, 1, 'Garsoniera'),
(3, 1, 'test'),
(4, 3, 'Chirie');

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `houses_users`
--

CREATE TABLE `houses_users` (
  `id` int(11) NOT NULL,
  `idhouse` int(11) NOT NULL,
  `iduser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Eliminarea datelor din tabel `houses_users`
--

INSERT INTO `houses_users` (`id`, `idhouse`, `iduser`) VALUES
(5, 4, 1),
(6, 1, 3),
(8, 3, 2),
(9, 3, 3),
(10, 1, 2);

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `passed_tasks`
--

CREATE TABLE `passed_tasks` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `idhouse` int(11) DEFAULT NULL,
  `idroom` int(11) DEFAULT NULL,
  `time_start` double NOT NULL,
  `time_complete` double NOT NULL DEFAULT unix_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Eliminarea datelor din tabel `passed_tasks`
--

INSERT INTO `passed_tasks` (`id`, `name`, `idhouse`, `idroom`, `time_start`, `time_complete`) VALUES
(2, 'Spalat geamuri', 1, NULL, 1712955600, 1713012446),
(3, 'Spalat geamuri', 1, NULL, 1712869200, 1713012603),
(4, 'Spalat geamuri', 1, NULL, 1712955600, 1713090320),
(5, 'Aspirat', 1, NULL, 1712955600, 1713090328),
(6, 'Aspirat', 1, NULL, 1713042000, 1713090341),
(7, 'Sters lustre', 1, NULL, 1713042000, 1713090370),
(8, 'Spalat geamuri', 1, NULL, 1713042000, 1713090391),
(9, 'Mop', NULL, 3, 1713042000, 1713090392);

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `idhouse` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Eliminarea datelor din tabel `rooms`
--

INSERT INTO `rooms` (`id`, `name`, `idhouse`) VALUES
(1, 'Bucatarie', 1),
(3, 'Baie', 1),
(4, 'Balcon', 1),
(5, 'Hol', 1),
(6, 'Living', 1),
(7, 'Camera', 4),
(8, 'Baie', 4),
(9, 'Hol', 4);

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `idhouse` int(11) DEFAULT NULL,
  `idroom` int(11) DEFAULT NULL,
  `time_start` double NOT NULL,
  `inter` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Eliminarea datelor din tabel `tasks`
--

INSERT INTO `tasks` (`id`, `name`, `idhouse`, `idroom`, `time_start`, `inter`) VALUES
(9, 'Spalat geamuri', 1, NULL, 1713128400, 86400),
(11, 'Mop', NULL, 3, 1713128400, 86400),
(12, 'Aspirat', 1, NULL, 1713128400, 86400),
(13, 'Sters lustre', 1, NULL, 1715671743, 2629743),
(14, 'Uda florile', NULL, 4, 1713042000, 259200);

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `tasks_types`
--

CREATE TABLE `tasks_types` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `iduser` int(11) NOT NULL DEFAULT -1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Eliminarea datelor din tabel `tasks_types`
--

INSERT INTO `tasks_types` (`id`, `name`, `iduser`) VALUES
(1, 'Spalat geamuri', -1),
(2, 'Aspirat', -1),
(3, 'Mop', -1),
(4, 'Verifica cumparaturi', 1),
(6, 'Sters lustre', 1);

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(256) NOT NULL,
  `lastName` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Eliminarea datelor din tabel `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`) VALUES
(1, 'Rares', 'Buburuz', 'raresb@gmail.com', 'b66f69daacb1fea9039913902c5596a917fc91374dedfcb56e035c3dbf2b420e'),
(2, 'User1', 'User', 'u1@gmail.com', 'b66f69daacb1fea9039913902c5596a917fc91374dedfcb56e035c3dbf2b420e'),
(3, 'User2', 'User', 'u2@gmail.com', 'b66f69daacb1fea9039913902c5596a917fc91374dedfcb56e035c3dbf2b420e');

--
-- Indexuri pentru tabele eliminate
--

--
-- Indexuri pentru tabele `houses`
--
ALTER TABLE `houses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dfdddfsfd` (`master`);

--
-- Indexuri pentru tabele `houses_users`
--
ALTER TABLE `houses_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dagadga` (`idhouse`),
  ADD KEY `gajhuf` (`iduser`);

--
-- Indexuri pentru tabele `passed_tasks`
--
ALTER TABLE `passed_tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sgadg` (`idhouse`),
  ADD KEY `adgasgas` (`idroom`);

--
-- Indexuri pentru tabele `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dsgsd` (`idhouse`);

--
-- Indexuri pentru tabele `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fgfds` (`idhouse`),
  ADD KEY `hshgsd` (`idroom`);

--
-- Indexuri pentru tabele `tasks_types`
--
ALTER TABLE `tasks_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexuri pentru tabele `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pentru tabele eliminate
--

--
-- AUTO_INCREMENT pentru tabele `houses`
--
ALTER TABLE `houses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pentru tabele `houses_users`
--
ALTER TABLE `houses_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pentru tabele `passed_tasks`
--
ALTER TABLE `passed_tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pentru tabele `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pentru tabele `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pentru tabele `tasks_types`
--
ALTER TABLE `tasks_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pentru tabele `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constrângeri pentru tabele eliminate
--

--
-- Constrângeri pentru tabele `houses`
--
ALTER TABLE `houses`
  ADD CONSTRAINT `dfdddfsfd` FOREIGN KEY (`master`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constrângeri pentru tabele `houses_users`
--
ALTER TABLE `houses_users`
  ADD CONSTRAINT `dagadga` FOREIGN KEY (`idhouse`) REFERENCES `houses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `gajhuf` FOREIGN KEY (`iduser`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constrângeri pentru tabele `passed_tasks`
--
ALTER TABLE `passed_tasks`
  ADD CONSTRAINT `adgasgas` FOREIGN KEY (`idroom`) REFERENCES `rooms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sgadg` FOREIGN KEY (`idhouse`) REFERENCES `houses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constrângeri pentru tabele `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `dsgsd` FOREIGN KEY (`idhouse`) REFERENCES `houses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constrângeri pentru tabele `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `fgfds` FOREIGN KEY (`idhouse`) REFERENCES `houses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hshgsd` FOREIGN KEY (`idroom`) REFERENCES `rooms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

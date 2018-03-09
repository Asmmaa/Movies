-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Client :  127.0.0.1
-- Généré le :  Ven 09 Mars 2018 à 08:04
-- Version du serveur :  5.7.14
-- Version de PHP :  5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `movies`
--

-- --------------------------------------------------------

--
-- Structure de la table `friend`
--

CREATE TABLE `friend` (
  `id` int(11) NOT NULL,
  `friend_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `friend`
--

INSERT INTO `friend` (`id`, `friend_id`, `user_id`) VALUES
(1, 6, 4),
(2, 3, 6),
(3, 6, 1),
(4, 1, 8),
(5, 1, 10),
(6, 1, 12),
(7, 10, 4),
(8, 10, 2),
(9, 10, 12),
(10, 10, 9),
(11, 10, 7),
(12, 4, 2),
(13, 4, 3),
(14, 4, 5),
(15, 4, 6),
(16, 4, 7),
(17, 4, 9),
(18, 4, 8),
(19, 6, 1),
(20, 6, 12),
(21, 6, 11),
(22, 6, 10),
(23, 7, 5),
(24, 7, 4),
(25, 7, 3),
(26, 7, 2),
(27, 4, 1),
(28, 4, 1),
(29, 4, 10),
(30, 4, 10);

-- --------------------------------------------------------

--
-- Structure de la table `movie`
--

CREATE TABLE `movie` (
  `id` int(11) NOT NULL,
  `imdbid` varchar(255) NOT NULL,
  `title` varchar(128) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `movie`
--

INSERT INTO `movie` (`id`, `imdbid`, `title`, `user_id`) VALUES
(10, 'tt2170593', 'St. Vincent', 4),
(11, 'tt0076759', 'Star Wars: Episode IV - A New Hope', 2),
(12, 'tt0137523', 'Fight Club', 11),
(13, 'tt0110357', 'The Lion King', 4),
(14, 'tt0286151', 'Star', 1),
(16, 'tt0317248', 'City of God', 4),
(17, 'tt0796366', 'Star Trek', 4),
(18, 'tt0137523\r\n', 'Fight Club', 2),
(19, 'tt0076759', 'Star Wars: Episode IV - A New Hope', 3),
(20, 'tt0110357', 'The Lion King', 3),
(21, 'tt0137523', 'Fight Club', 1),
(27, 'tt1599981', 'Le grand restaurant', 4),
(28, 'tt0082494', 'Hadí jed', 4),
(29, 'tt2488496', 'Star Wars: The Force Awakens', 4),
(30, 'proust', 'la madeleine', 1),
(31, 'tt0382625', 'The Da Vinci Code', 4);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `pseudo` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`id`, `name`, `pseudo`) VALUES
(1, 'Alix', 'Litchix'),
(2, 'Kenza', 'GenghisKen'),
(3, 'Benoit', 'Sephiroth'),
(4, 'Asmaâ', 'Sakura'),
(5, 'Julien', 'Aioli'),
(6, 'Arnaud', 'Feyribran'),
(7, 'Ayoub', 'MagestPotatoe'),
(8, 'Marie', 'Clownie'),
(9, 'Woodson', 'Kameleon'),
(10, 'Julie', 'Julo'),
(11, 'Zoé', 'Slidie'),
(12, 'Christophe', 'Capoupacap');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `friend`
--
ALTER TABLE `friend`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `friend_id` (`friend_id`);

--
-- Index pour la table `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_2` (`id`),
  ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `friend`
--
ALTER TABLE `friend`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT pour la table `movie`
--
ALTER TABLE `movie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `friend`
--
ALTER TABLE `friend`
  ADD CONSTRAINT `friend_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `friend_ibfk_2` FOREIGN KEY (`friend_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `movie`
--
ALTER TABLE `movie`
  ADD CONSTRAINT `movie_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

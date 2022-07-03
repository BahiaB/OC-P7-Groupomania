SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";;

START TRANSACTION;;
SET time_zone = "+00:00";;


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

CREATE TABLE  IF NOT EXISTS `comments` (
 `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `comment` varchar(255) DEFAULT NULL,
  `user_id` varchar(36) NOT NULL,
  `post_id` int(11) NOT NULL,
  `datecreation_comm` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `like_post`
--

CREATE TABLE IF NOT EXISTS`likes` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `post_id` int(11) NOT NULL,
  `user_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `post`
--

CREATE TABLE IF NOT EXISTS `post` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `imageurl` varchar(100) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `datecreation` datetime NOT NULL DEFAULT current_timestamp(),
  `user_id` varchar(36) NOT NULL,
  `postUserName` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `UID` varchar(36) DEFAULT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `firstName` varchar(100) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `admin` tinyint(1) DEFAULT 0,
  `imageProfile` varchar(255) DEFAULT 'http://localhost:3500/images/profils/avatar.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
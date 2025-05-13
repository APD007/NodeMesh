-- MySQL dump 10.13  Distrib 8.0.28, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: NodeMesh_dev
-- ------------------------------------------------------
-- Server version	8.0.28-0ubuntu0.20.04.3
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
--
-- Table structure for table `comments`
--
DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `comment_id` varchar(255) NOT NULL COMMENT 'Primary Key',
  `post_id` varchar(255) NOT NULL COMMENT 'Post ID',
  `username` varchar(255) NOT NULL COMMENT 'Username',
  `content` varchar(255) DEFAULT NULL COMMENT 'Content',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Create Time',
  PRIMARY KEY (`comment_id`),
  KEY `comments_ibfk_1` (`post_id`),
  KEY `comments_ibfk_2` (`username`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`username`) REFERENCES `users` (`username`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `comments`
--
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO
  `comments`
VALUES
  (
    '221fm17t2fn072jkmf4xyci',
    '45rg7l2p5t806rtlh5u2qkr',
    'name7',
    'This is a comment by name7',
    '2022-03-10 14:34:53'
  ),(
    '3x37dts5f6y0pjw17t7g1e',
    '45rg7l2p5t806rtlh5u2qkr',
    'name7',
    'This is another comment',
    '2022-03-10 14:36:20'
  );
  /*!40000 ALTER TABLE `comments` ENABLE KEYS */;
--
  -- Table structure for table `friend_requests`
  --
  DROP TABLE IF EXISTS `friend_requests`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friend_requests` (
    `from_user` varchar(255) NOT NULL COMMENT 'From User',
    `to_user` varchar(255) NOT NULL COMMENT 'To User',
    `friendship_status` enum('0', '1', '2') DEFAULT NULL COMMENT 'Friendship Status',
    `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Create Time',
    `request_id` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`from_user`, `to_user`),
    KEY `to_user` (`to_user`),
    CONSTRAINT `friend_requests_ibfk_1` FOREIGN KEY (`from_user`) REFERENCES `users` (`username`),
    CONSTRAINT `friend_requests_ibfk_2` FOREIGN KEY (`to_user`) REFERENCES `users` (`username`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;
  /*!40101 SET character_set_client = @saved_cs_client */;
--
  -- Dumping data for table `friend_requests`
  --
  /*!40000 ALTER TABLE `friend_requests` DISABLE KEYS */;
INSERT INTO
  `friend_requests`
VALUES
  (
    'name1',
    'name2',
    '1',
    '2022-02-04 14:11:48',
    'hg0v9iq1eu506nx9qfeiuvm'
  ),(
    'name1',
    'name3',
    '1',
    '2022-02-04 14:11:55',
    'hkt5h8rkjte0i6j6ei920gi'
  ),(
    'name1',
    'name4',
    '1',
    '2022-02-04 14:12:01',
    'hplaf6mkfom0yt9fljy60r'
  ),(
    'name2',
    'name5',
    '1',
    '2022-02-04 14:12:30',
    'ic60wqjfd40qxr6h4h2da8'
  ),(
    'name3',
    'name6',
    '1',
    '2022-02-04 14:13:08',
    'j5axl1r5n209j33phltkq7'
  ),(
    'name6',
    'name7',
    '1',
    '2022-02-04 14:13:43',
    'jw6jo4c173a0qgneysldyx'
  ),(
    'name7',
    'name12',
    '1',
    '2022-03-08 17:16:45',
    '2tgqfyx2h3d0h4vjc5k18s'
  ),(
    'name7',
    'name3',
    '1',
    '2022-02-12 21:11:11',
    '1xlyj5oouwh024vtsufr01g'
  ),(
    'name7',
    'name8',
    '1',
    '2022-02-04 14:14:13',
    'kjldfi3r45t099pcbzkfhpp'
  ),(
    'name7',
    'name9',
    '1',
    '2022-02-04 14:14:23',
    'krnwsemh5td0b6tl5lja24c'
  ),(
    'name9',
    'name10',
    '1',
    '2022-02-04 14:14:51',
    'ld403d0s80t0th8sfbl0zhr'
  );
  /*!40000 ALTER TABLE `friend_requests` ENABLE KEYS */;
--
  -- Table structure for table `friends`
  --
  DROP TABLE IF EXISTS `friends`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friends` (
    `friend_one` varchar(255) NOT NULL COMMENT 'Friend One',
    `friend_two` varchar(255) NOT NULL COMMENT 'Friend Two',
    `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Create Time',
    PRIMARY KEY (`friend_one`, `friend_two`),
    KEY `friend_two` (`friend_two`),
    CONSTRAINT `friends_ibfk_1` FOREIGN KEY (`friend_one`) REFERENCES `users` (`username`),
    CONSTRAINT `friends_ibfk_2` FOREIGN KEY (`friend_two`) REFERENCES `users` (`username`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;
  /*!40101 SET character_set_client = @saved_cs_client */;
--
  -- Dumping data for table `friends`
  --
  /*!40000 ALTER TABLE `friends` DISABLE KEYS */;
INSERT INTO
  `friends`
VALUES
  ('name1', 'name2', '2022-02-04 15:57:46'),('name1', 'name3', '2022-02-04 15:58:10'),('name1', 'name4', '2022-02-04 15:58:22'),('name1', 'name7', '2022-02-04 15:59:03'),('name2', 'name5', '2022-02-04 15:58:37'),('name3', 'name4', '2022-02-04 14:16:23'),('name3', 'name6', '2022-02-04 15:58:47'),('name7', 'name12', '2022-03-08 17:17:29'),('name7', 'name3', '2022-02-12 21:13:17'),('name7', 'name8', '2022-02-04 14:15:51'),('name7', 'name9', '2022-02-04 14:16:09'),('name8', 'name9', '2022-02-04 14:16:23'),('name9', 'name10', '2022-02-04 14:16:23');
  /*!40000 ALTER TABLE `friends` ENABLE KEYS */;
--
  -- Table structure for table `likes`
  --
  DROP TABLE IF EXISTS `likes`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
    `username` varchar(255) NOT NULL COMMENT 'Username',
    `post_id` varchar(255) NOT NULL COMMENT 'Post ID',
    `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Create Time',
    PRIMARY KEY (`username`, `post_id`),
    KEY `likes_ibfk_2` (`post_id`),
    CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`),
    CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;
  /*!40101 SET character_set_client = @saved_cs_client */;
--
  -- Dumping data for table `likes`
  --
  /*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO
  `likes`
VALUES
  (
    'name7',
    '2eufvri9hwa0c8d9au5cjtv',
    '2022-03-08 20:09:14'
  ),(
    'name7',
    '38pr18c8m2g0n7bw6k27w4',
    '2022-03-08 20:17:31'
  );
  /*!40000 ALTER TABLE `likes` ENABLE KEYS */;
--
  -- Table structure for table `posts`
  --
  DROP TABLE IF EXISTS `posts`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
    `post_id` varchar(255) NOT NULL COMMENT 'Primary Key',
    `content` varchar(255) DEFAULT NULL COMMENT 'Post Content',
    `visibility` enum('0', '1', '2') NOT NULL DEFAULT '0' COMMENT 'Post Visibility',
    `username` varchar(255) NOT NULL COMMENT 'Username',
    `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Create Time',
    `img_src` varchar(255) DEFAULT NULL COMMENT 'Image Source',
    PRIMARY KEY (`post_id`),
    KEY `username` (`username`),
    CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;
  /*!40101 SET character_set_client = @saved_cs_client */;
--
  -- Dumping data for table `posts`
  --
  /*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO
  `posts`
VALUES
  (
    '1ahgdicyy9d0bxkdswbonv4',
    'This is name1 second post only visibile to friends',
    '1',
    'name4',
    '2022-02-12 17:30:02',
    NULL
  ),(
    '1r09inox2xp0vk6l97rp1oo',
    'This is name1 third post visibile to friends_of_friends',
    '2',
    'name5',
    '2022-02-12 17:30:24',
    NULL
  ),(
    '1ueti9ar8q20f6r7ymm7izv',
    'This is an image upload by name7',
    '0',
    'name7',
    '2022-02-12 21:14:39',
    'static/uploads/1udo61a7du80ab8f3l9pxysilicate-structures.jpg'
  ),(
    '2eufvri9hwa0c8d9au5cjtv',
    'This is an image upload',
    '0',
    'name1',
    '2022-02-12 20:42:07',
    'static/uploads/2dd7z8vrymk0x3blp4l55bgsilicate-structures.jpg'
  ),(
    '2k6xgkf2pa30pe63evdk8us',
    'This is an image upload by name7',
    '0',
    'name7',
    '2022-02-12 20:50:35',
    'static/uploads/2j74fi00qtw0xj9vj1fpx3gsilicate-structures.jpg'
  ),(
    '38pr18c8m2g0n7bw6k27w4',
    'This is a new post created by user 12',
    '1',
    'name12',
    '2022-03-08 20:11:31',
    'static/uploads/38pomg5dht905xyznccdp7hresume.cls'
  ),(
    '3jwu5u5beje0kxbdowuespj',
    'This is an image upload by name7',
    '0',
    'name1',
    '2022-02-12 20:45:17',
    'static/uploads/3jv7z1xnb070qq5438p066silicate-structures.jpg'
  ),(
    '45rg7l2p5t806rtlh5u2qkr',
    'This is an image upload by name7',
    '0',
    'name7',
    '2022-02-12 20:45:45',
    'static/uploads/45q74ijjrob0zb86r44myysilicate-structures.jpg'
  ),(
    '8k1pjf0fd5o0buzjq4rr5',
    'This is a new post',
    '2',
    'name7',
    '2022-03-08 17:21:13',
    'static/uploads/8k0c04is7jn0ntl8mmth25csilicate-structures.jpg'
  ),(
    'elevzp4uf1d0wkd7kcylxym',
    'This is name1 first post',
    '2',
    'name5',
    '2022-02-12 17:29:21',
    NULL
  );
  /*!40000 ALTER TABLE `posts` ENABLE KEYS */;
--
  -- Table structure for table `users`
  --
  DROP TABLE IF EXISTS `users`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
    `username` varchar(255) NOT NULL COMMENT 'Username',
    `email` varchar(255) NOT NULL COMMENT 'Email',
    `password` varchar(255) NOT NULL COMMENT 'Password',
    `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Create Time',
    PRIMARY KEY (`username`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;
  /*!40101 SET character_set_client = @saved_cs_client */;
--
  -- Dumping data for table `users`
  --
  /*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO
  `users`
VALUES
  (
    'name1',
    'name1@gmail.com',
    '$2a$10$pa5DnDMhaTpMdubZ/0hFRelNiGHWHlXKr9oBQd1mJtYiJpibSMrUi',
    '2022-02-03 17:30:52'
  ),(
    'name10',
    'name10@gmail.com',
    '$2a$10$Zet3URde4qbLIlkCMGSEbOmIT6iRgeSm57WI4NybKi8YNr3hIQKAm',
    '2022-02-04 14:09:19'
  ),(
    'name11',
    'name11@gmail.com',
    '$2a$10$bfdv2o9zM9JDqmPEt4OlWeXSQ/RG8WEeiUtDqHnB.bGX/ElhlCwIG',
    '2022-02-12 21:10:16'
  ),(
    'name12',
    'name12@gmail.com',
    '$2a$10$IIDC7YkmqVjOfLawzCfbHuK/caeXwGuFy1VAAmvti9ZVda2p7sTra',
    '2022-03-08 17:15:23'
  ),(
    'name2',
    'name2@gmail.com',
    '$2a$10$chX0JhWGW1uyTYdgfvW5iOETpDWF4pvkgDAXPHPahfdTGDe936nVW',
    '2022-02-03 17:31:16'
  ),(
    'name3',
    'name3@gmail.com',
    '$2a$10$XHYdrip/eLU7qqxU.1iV.exQ/0MLM2cCBrVrzTc2vKAHatsDRelp2',
    '2022-02-03 17:31:29'
  ),(
    'name4',
    'name4@gmail.com',
    '$2a$10$jmFvXIQtpEzTR28GfWxGauS/ZU7wx9JsI07/s.767AG2JMeN9RHVO',
    '2022-02-03 17:31:42'
  ),(
    'name5',
    'name5@gmail.com',
    '$2a$10$aNkjqYT2Lt9Tsdej9Fo1j.qCBNjbhKIN9lzto4OKu6VgvzZloKwJ6',
    '2022-02-03 17:31:54'
  ),(
    'name6',
    'name6@gmail.com',
    '$2a$10$laQ6D2NCFNOKVpqWGvVlde7B7saMdNhSHTzmDu9fQBDzTJ3H7iUIa',
    '2022-02-04 00:32:04'
  ),(
    'name7',
    'name7@gmail.com',
    '$2a$10$VIqVSFw8KPDejPqS3njCYu0xk4nbzcB6zCWK73EpZzjdKFk3NQBdK',
    '2022-02-04 14:08:52'
  ),(
    'name8',
    'name8@gmail.com',
    '$2a$10$dARTnORIPS9SnwT0jqt1he3M77MD63i49qL23oVbPRWRrTqbA0A/y',
    '2022-02-04 14:09:01'
  ),(
    'name9',
    'name9@gmail.com',
    '$2a$10$VfvZo0hVPIYBl2GPvUbf5OF058Vt./NpMyy28yR1F/hNAp/r9XXpK',
    '2022-02-04 14:09:09'
  );
  /*!40000 ALTER TABLE `users` ENABLE KEYS */;
  /*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
  /*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
  /*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
  /*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
  /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
  /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
  /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
  /*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
-- Dump completed on 2022-03-10 14:43:52
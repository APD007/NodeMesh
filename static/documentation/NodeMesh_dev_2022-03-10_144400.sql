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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
-- Dump completed on 2022-03-10 14:44:18
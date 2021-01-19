-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: elearning
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `subcategory`
--

DROP TABLE IF EXISTS `subcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subcategory` (
  `id` varchar(100) NOT NULL,
  `subCategoryName` varchar(255) DEFAULT NULL,
  `subCategoryDesc` text,
  `categoryId` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategory`
--

LOCK TABLES `subcategory` WRITE;
/*!40000 ALTER TABLE `subcategory` DISABLE KEYS */;
INSERT INTO `subcategory` VALUES ('08491e45-1db9-4ea3-a139-4cec1ee64f62','Data Science','Developement courses from Edumate Online learning platform. This is one of the best online platform.','00e8c071-7440-4605-bb4e-fdb40332bcf1'),('10f20a57-6aa1-4b88-83be-ee92678cea04','Communications','Bussiness courses from Edumate Online learning platform. This is one of the best online platform.','9d9ef8b7-bc50-452a-9aab-88c7809f40b7'),('27575383-925c-4de4-910b-6627a83e9792','Compliances','Economics courses from Edumate Online learning platform. This is one of the best online platform.','eefbbb9c-c98e-4caf-bc64-ca3b8dbdd9e4'),('2ebc75e8-7b4a-4449-a43a-e12c24d27ff5','Programming Languages','Developement courses from Edumate Online learning platform. This is one of the best online platform.','00e8c071-7440-4605-bb4e-fdb40332bcf1'),('340815d1-20ff-444d-a59a-59a451ec89f6','Sports','Economics courses from Edumate Online learning platform. This is one of the best online platform.','59f50a80-6df4-4adf-a1c4-6731bcb12b30'),('42a3ded4-bc8f-40b3-9fc0-843948bef004','Design Tools','Economics courses from Edumate Online learning platform. This is one of the best online platform.','87ab829e-9555-4206-9849-d6b040f9d8f5'),('54fdc1f7-ff28-4c2b-b0b8-012b518c9eda','Game Development','Developement courses from Edumate Online learning platform. This is one of the best online platform.','00e8c071-7440-4605-bb4e-fdb40332bcf1'),('5d3f05d6-46c8-4b98-95eb-f5bac63d70e5','IT Certification','Economics courses from Edumate Online learning platform. This is one of the best online platform.','94f8afb5-db6e-4776-a9b1-f67a864b88bb'),('6528fc35-67dc-43e5-bf14-f9f8a9cd8558','Web Developement','Developement courses from Edumate Online learning platform. This is one of the best online platform.','00e8c071-7440-4605-bb4e-fdb40332bcf1'),('6e62e622-5e93-4982-8b9e-87608440d425','Entrepreneurship','Bussiness courses from Edumate Online learning platform. This is one of the best online platform.','9d9ef8b7-bc50-452a-9aab-88c7809f40b7'),('6fd33366-8372-4d96-bc8f-e3055984e0db','Cryptocurrency & Blockchain','Economics courses from Edumate Online learning platform. This is one of the best online platform.','eefbbb9c-c98e-4caf-bc64-ca3b8dbdd9e4'),('73142cd5-c430-4ab6-b26c-31a1df326fb5','Web Designs','Economics courses from Edumate Online learning platform. This is one of the best online platform.','87ab829e-9555-4206-9849-d6b040f9d8f5'),('7c44cc85-f83c-435a-aa40-8215bc4c88b9','Leadership','Economics courses from Edumate Online learning platform. This is one of the best online platform.','f508d1f5-87a6-4f68-b251-c4423ba21533'),('8c185fbf-91fd-4aa3-a6ea-38de5589cbd9','Branding','Economics courses from Edumate Online learning platform. This is one of the best online platform.','1ca327e4-9be5-46db-a4ea-58b5dea25581'),('8c6ce9e8-ccc3-404f-9fdd-1c8223a1a9ab','Database & Developement','Developement courses from Edumate Online learning platform. This is one of the best online platform.','00e8c071-7440-4605-bb4e-fdb40332bcf1'),('97407f4c-bc10-45d6-8ad7-9e41ac391346','Mobile Development','Developement courses from Edumate Online learning platform. This is one of the best online platform.','00e8c071-7440-4605-bb4e-fdb40332bcf1'),('b4e84f63-4a04-4a8e-a561-ad9a00e294a7','Happiness','Economics courses from Edumate Online learning platform. This is one of the best online platform.','f508d1f5-87a6-4f68-b251-c4423ba21533'),('b672ee48-f410-47ab-96b3-19acf2b92153','Management','Bussiness courses from Edumate Online learning platform. This is one of the best online platform.','9d9ef8b7-bc50-452a-9aab-88c7809f40b7'),('c49587c3-162a-4702-a2a5-6932346239b8','Yoga','Economics courses from Edumate Online learning platform. This is one of the best online platform.','59f50a80-6df4-4adf-a1c4-6731bcb12b30'),('cb23e208-d708-4c9b-a239-5bc4cb2c9f40','Hardware','Economics courses from Edumate Online learning platform. This is one of the best online platform.','94f8afb5-db6e-4776-a9b1-f67a864b88bb'),('d0cd42cd-3a33-4c31-bf9f-8136746856d1','Sales','Bussiness courses from Edumate Online learning platform. This is one of the best online platform.','9d9ef8b7-bc50-452a-9aab-88c7809f40b7'),('db0a68d4-f841-4089-af6c-ab56a3258525','Digital Maketing','Economics courses from Edumate Online learning platform. This is one of the best online platform.','1ca327e4-9be5-46db-a4ea-58b5dea25581'),('e32b2adc-2ce9-4712-a161-b8cc922323fc','Economics','Economics courses from Edumate Online learning platform. This is one of the best online platform.','eefbbb9c-c98e-4caf-bc64-ca3b8dbdd9e4');
/*!40000 ALTER TABLE `subcategory` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-19 20:51:55

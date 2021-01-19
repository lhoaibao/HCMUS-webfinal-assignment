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
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` varchar(100) NOT NULL,
  `categoryName` varchar(255) NOT NULL,
  `categoryDesc` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('00e8c071-7440-4605-bb4e-fdb40332bcf1','Development','Get masterclasses from Caltech CTME, and experience Simpliearn’s high-touch learning. Gain the double advantage with a joint Caltech CTME-Simplilearn PG Program certification. Blended Learning. Learn From Home. 30+ In-Demand Tools. Worlds #1 Online Bootcamp.'),('1ca327e4-9be5-46db-a4ea-58b5dea25581','Design','Become a GraphicDesign Pro with these valuable skills. Start Your Course Today. Join Millions of Learners Already Learning On Udemy. Download To Your Phone. 30-Day Money Guarantee. Courses in 60+ Languages. Over 130,000 Courses. Lifetime Access.'),('59f50a80-6df4-4adf-a1c4-6731bcb12b30','Health & Fitness','In summary, here are 10 of our most popular health and fitness courses. Science of Exercise: University of Colorado Boulder. Stanford Introduction to Food and Health: Stanford University. Hacking Exercise For Health. Biohacking Your Brain\'s Health: Emory University.'),('87ab829e-9555-4206-9849-d6b040f9d8f5','Maketing','Learn marketable skills with courses from Udemy\'s world-class digital marketing instructors. From SEO to SEM to social media, Udemy has courses for all levels.'),('94f8afb5-db6e-4776-a9b1-f67a864b88bb','IT & Software','What Are the Best Software Development Courses? #1. Java Programming and Software Engineering Fundamentals Specialization by Duke University. #2. Software Development Lifecycle Specialization by the University of Minnesota. #3. Agile Development Specialization by the University of Virginia.'),('9d9ef8b7-bc50-452a-9aab-88c7809f40b7','Business','Want to Study Business With a World-Class University From Anywhere in the World? Join Over 100,000 Working Professionals From Across the Globe. Browse Portfolio 2019-2020.'),('eefbbb9c-c98e-4caf-bc64-ca3b8dbdd9e4','Finance & Accounting','Make and communicate smarter financial decisions. Apply for free online today! Gain an intuitive understanding of finance and be a more effective business leader. Transformative Education. Case-Based Learning. Social Learning Platform. Award-Winning Faculty 2019-2020.'),('f508d1f5-87a6-4f68-b251-c4423ba21533','Personal Training','Best online courses in Personal Development from University of California, San Diego , McMaster University, Arizona State University, The University of Sheffield');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-19 20:51:54

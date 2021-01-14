-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema elearning
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema elearning
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `elearning` DEFAULT CHARACTER SET utf8mb4 ;
USE `elearning` ;

-- -----------------------------------------------------
-- Table `elearning`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elearning`.`category` (
  `id` VARCHAR(100) NOT NULL,
  `categoryName` VARCHAR(255) NOT NULL,
  `categoryDesc` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `elearning`.`course`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elearning`.`course` (
  `id` VARCHAR(255) NOT NULL,
  `categoryId` VARCHAR(100) NOT NULL,
  `courseName` VARCHAR(1000) NOT NULL,
  `courseImage` LONGBLOB NOT NULL,
  `shortDesc` TEXT,
  `detailDesc` TEXT,
  `ratingScore` DECIMAL(2,1) NOT NULL DEFAULT '0.0',
  `ratingNumber` INT NOT NULL DEFAULT '0',
  `enrollNumber` INT NOT NULL DEFAULT '0',
  `tuition` DECIMAL(10,2) NOT NULL,
  `modifyAt` DATETIME NOT NULL,
  `userId` VARCHAR(100) NOT NULL,
  `discountId` VARCHAR(100) NULL DEFAULT NULL,
  `views` INT NOT NULL DEFAULT '0',
  `status` VARCHAR(20) NOT NULL DEFAULT 'active',
  `isCompleted` varchar(20) not null default 'Incompleted',
  `createAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `elearning`.`discount`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elearning`.`discount` (
  `id` VARCHAR(100) NOT NULL,
  `discountCode` VARCHAR(100) NOT NULL,
  `discountPercent` DECIMAL(5,2) NOT NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `elearning`.`feedback`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elearning`.`feedback` (
  `id` VARCHAR(100) NOT NULL,
  `userId` VARCHAR(100) NOT NULL,
  `courseId` VARCHAR(100) NOT NULL,
  `ratingScore` TINYINT NOT NULL,
  `feedbackDetail` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `elearning`.`lesson`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elearning`.`lesson` (
  `id` VARCHAR(100) NOT NULL,
  `courseId` VARCHAR(100) NOT NULL,
  `lessonName` VARCHAR(255) NOT NULL,
  `lessonVideo` LONGBLOB NULL DEFAULT NULL,
  `lessonContent` TEXT NULL DEFAULT NULL,
  `lessonOrder` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `lessonOrder` (`lessonOrder` ASC));


-- -----------------------------------------------------
-- Table `elearning`.`order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elearning`.`order` (
  `id` VARCHAR(100) NOT NULL,
  `userId` VARCHAR(100) NOT NULL,
  `orderDate` DATETIME NOT NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `elearning`.`orderitem`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elearning`.`orderitem` (
  `id` VARCHAR(100) NOT NULL,
  `courseId` VARCHAR(100) NOT NULL,
  `orderId` VARCHAR(100) NOT NULL,
  `status` VARCHAR(100) NOT NULL DEFAULT 'Incompleted',
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `elearning`.`sessions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elearning`.`sessions` (
  `session_id` VARCHAR(128) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NOT NULL,
  `expires` INT UNSIGNED NOT NULL,
  `data` MEDIUMTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NULL DEFAULT NULL,
  PRIMARY KEY (`session_id`));


-- -----------------------------------------------------
-- Table `elearning`.`subcategory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elearning`.`subcategory` (
  `id` VARCHAR(100) NOT NULL,
  `subCategoryName` VARCHAR(255) NULL DEFAULT NULL,
  `subCategoryDesc` TEXT NULL DEFAULT NULL,
  `categoryId` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `elearning`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elearning`.`user` (
  `id` VARCHAR(100) NOT NULL,
  `username` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `firstName` VARCHAR(100) NOT NULL,
  `lastName` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `dob` DATE NOT NULL,
  `permission` VARCHAR(100) NOT NULL,
  `userImage` LONGBLOB NULL DEFAULT NULL,
  `status` VARCHAR(100) NOT NULL DEFAULT 'active',
  `profile` TEXT NULL DEFAULT NULL,
  `phoneNumber` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email` (`email` ASC, `username` ASC));


-- -----------------------------------------------------
-- Table `elearning`.`wishlist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elearning`.`wishlist` (
  `id` VARCHAR(100) NOT NULL,
  `courseId` VARCHAR(100) NOT NULL,
  `userId` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`));


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

CREATE DATABASE `cantee_management`;

CREATE TABLE `cantee_management`.`students` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `location` VARCHAR(100) NOT NULL,
  `allergies` VARCHAR(255) NULL DEFAULT 'none',
  PRIMARY KEY (`id`));

CREATE TABLE `cantee_management`.`admin` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `position` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`));

ALTER TABLE `cantee_management`.`students` 
ADD COLUMN `email` VARCHAR(45) NULL AFTER `allergies`;

CREATE TABLE `cantee_management`.`main_dish` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `cantee_management`.`main_style` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `style` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `cantee_management`.`side_dish` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `cantee_management`.`side_style` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `style` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `cantee_management`.`beverage` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));

ALTER TABLE `cantee_management`.`beverage` 
ADD COLUMN `available` VARCHAR(1) NOT NULL DEFAULT 'a' AFTER `name`,
CHANGE COLUMN `name` `name` VARCHAR(45) NOT NULL ;

ALTER TABLE `cantee_management`.`main_dish` 
ADD COLUMN `available` VARCHAR(1) NOT NULL DEFAULT 'a' AFTER `name`;

ALTER TABLE `cantee_management`.`main_style` 
ADD COLUMN `available` VARCHAR(1) NULL DEFAULT 'a' AFTER `style`;

ALTER TABLE `cantee_management`.`side_dish` 
ADD COLUMN `available` VARCHAR(1) NOT NULL DEFAULT 'a' AFTER `name`,
CHANGE COLUMN `name` `name` VARCHAR(45) NOT NULL ;

ALTER TABLE `cantee_management`.`side_style` 
ADD COLUMN `available` VARCHAR(45) NOT NULL DEFAULT 'a' AFTER `style`;

CREATE TABLE `cantee_management`.`menu` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `main_dish` INT NOT NULL,
  `main_style` INT NOT NULL,
  `side_main` INT NULL,
  `side_style` INT NULL,
  `beverage` INT NULL,
  PRIMARY KEY (`id`));

INSERT INTO `cantee_management`.`admin` (`first_name`, `last_name`, `position`, `email`) VALUES ('Marco', 'Duhaney', 'developer', 'marco.duhaney@gmail.com');
INSERT INTO `cantee_management`.`admin` (`first_name`, `last_name`, `position`, `email`) VALUES ('Javoy', 'Spence', 'developer', 'javoyspence@gmail.com');

INSERT INTO `cantee_management`.`main_dish` (`name`, `available`) VALUES ('Chicken', 'a');
INSERT INTO `cantee_management`.`main_dish` (`name`, `available`) VALUES ('Beef', 'a');
INSERT INTO `cantee_management`.`main_dish` (`name`, `available`) VALUES ('Pork', 'a');
INSERT INTO `cantee_management`.`main_dish` (`name`, `available`) VALUES ('Seafood', 'a');
INSERT INTO `cantee_management`.`main_dish` (`name`, `available`) VALUES ('Mutton', 'a');
INSERT INTO `cantee_management`.`main_dish` (`name`, `available`) VALUES ('Vegetarian', 'a');

INSERT INTO `cantee_management`.`beverage` (`name`) VALUES ('Water');
INSERT INTO `cantee_management`.`beverage` (`name`) VALUES ('Coffee');
INSERT INTO `cantee_management`.`beverage` (`name`) VALUES ('Cold Coffee');
INSERT INTO `cantee_management`.`beverage` (`name`) VALUES ('Iced Tea');
INSERT INTO `cantee_management`.`beverage` (`name`) VALUES ('Sparkling water');
INSERT INTO `cantee_management`.`beverage` (`name`) VALUES ('Soft drink');
INSERT INTO `cantee_management`.`beverage` (`name`) VALUES ('Fruit Juice');
INSERT INTO `cantee_management`.`beverage` (`name`, `available`) VALUES ('Smoothie', 'a');
INSERT INTO `cantee_management`.`beverage` (`name`) VALUES ('MilkShake');

INSERT INTO `cantee_management`.`main_style` (`style`) VALUES ('Soup');
INSERT INTO `cantee_management`.`main_style` (`style`) VALUES ('Salad');
INSERT INTO `cantee_management`.`main_style` (`style`) VALUES ('Sandwich');
INSERT INTO `cantee_management`.`main_style` (`style`) VALUES ('Wrap');
INSERT INTO `cantee_management`.`main_style` (`style`) VALUES ('Steak');
INSERT INTO `cantee_management`.`main_style` (`style`) VALUES ('Baked');
INSERT INTO `cantee_management`.`main_style` (`style`) VALUES ('Jerked/Grilled');
INSERT INTO `cantee_management`.`main_style` (`style`) VALUES ('Fried');

INSERT INTO `cantee_management`.`side_dish` (`name`, `available`) VALUES ('Ceaser Salad', 'n');
INSERT INTO `cantee_management`.`side_dish` (`name`) VALUES ('Bread');
INSERT INTO `cantee_management`.`side_dish` (`name`) VALUES ('Rices');
INSERT INTO `cantee_management`.`side_dish` (`name`) VALUES ('Starch (food)');
INSERT INTO `cantee_management`.`side_dish` (`name`) VALUES ('Fruit Salad');

INSERT INTO `cantee_management`.`students` (`first_name`, `last_name`, `location`, `allergies`, `email`) VALUES ('Marco', 'Duhaney', 'Ridgemount United Church, Mandeville', 'Shell Fish', 'marco.duhaney@gamail.com');
INSERT INTO `cantee_management`.`students` (`first_name`, `last_name`, `location`, `email`) VALUES ('Javoy', 'Spence', 'Ridgemount United Church, Mandeville', 'javoyspence@gmail.com');

ALTER TABLE `cantee_management`.`beverage` 
ADD COLUMN `image` VARCHAR(255) NULL AFTER `available`;

ALTER TABLE `cantee_management`.`main_dish` 
ADD COLUMN `image` VARCHAR(255) NULL AFTER `available`;

ALTER TABLE `cantee_management`.`main_style` 
ADD COLUMN `image` VARCHAR(255) NULL AFTER `available`;

ALTER TABLE `cantee_management`.`side_dish` 
ADD COLUMN `image` VARCHAR(255) NULL AFTER `available`;

ALTER TABLE `cantee_management`.`side_style` 
ADD COLUMN `image` VARCHAR(255) NULL AFTER `available`;

CREATE TABLE `cantee_management`.`orders` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `student_id` INT NOT NULL,
  `main_dish_id` INT NOT NULL,
  `main_style_id` INT NOT NULL,
  `side_dish` INT NULL,
  `side_style` INT NULL,
  `beverage` INT NULL,
  `day` DATE NULL,
  PRIMARY KEY (`id`));

ALTER TABLE `cantee_management`.`admin` 
ADD COLUMN `password` VARCHAR(45) NOT NULL AFTER `email`;

ALTER TABLE `cantee_management`.`students` 
ADD COLUMN `password` VARCHAR(45) NOT NULL AFTER `email`,
CHANGE COLUMN `email` `email` VARCHAR(45) NOT NULL ;

ALTER TABLE `cantee_management`.`students` 
ADD COLUMN `image` VARCHAR(255) NULL AFTER `password`;

ALTER TABLE `cantee_management`.`admin` 
ADD COLUMN `image` VARCHAR(255) NULL AFTER `password`;

ALTER TABLE `cantee_management`.`menu` 
ADD COLUMN `counter` INT NULL DEFAULT 0 AFTER `beverage`;

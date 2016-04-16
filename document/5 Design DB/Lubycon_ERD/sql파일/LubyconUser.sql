-- DATABASE in Lubycon --

DROP DATABASE IF EXISTS lubycon;

DROP DATABASE IF EXISTS LubyconUser;
CREATE DATABASE IF NOT EXISTS LubyconUser;

USE LubyconUser;

-- TABLE for USER

-- Job --
DROP TABLE IF EXISTS `Job`;
CREATE TABLE IF NOT EXISTS `Job`
(
	`jobCode` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL,
	
	PRIMARY KEY(`jobCode`)
	
) ENGINE = InnoDB DEFAULT CHARSET=utf8;

-- Country --
DROP TABLE IF EXISTS `Country`;
CREATE TABLE IF NOT EXISTS `Country`
(
	`countryCode` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`continent` ENUM('asia', 'europe', 'africa', 'americas', 'oceania','undecided') NOT NULL,
	`region` ENUM('east_asia', 'central_asia', 'south_asia', 'northern_asia', 'south_east_asia', 'south_west_asia', 'eastern_europe', 'central_europe', 'western_europe', 'southern_europe', 'northern_europe', 'south_east_europe','south_west_europe', 'eastern_africa', 'central_africa', 'western_africa', 'southern_africa', 'northern_africa', 'indian_ocean', 'pacific', 'central_america', 'south_america', 'north_america', 'west_indies','undecided') NOT NULL,
	`name` VARCHAR(255) NOT NULL,
	
	PRIMARY KEY(`countryCode`)
	
) ENGINE = InnoDB DEFAULT CHARSET=utf8;

-- UserBasic --
DROP TABLE IF EXISTS `UserBasic`;
CREATE TABLE IF NOT EXISTS `UserBasic`
(
	`userCode` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`date` DATETIME NOT NULL,
	`email` VARCHAR(255) NOT NULL,
	`nick` VARCHAR(20) NOT NULL,
	`pass` VARCHAR(255) NOT NULL,
	`validation` ENUM('active','inactive','drop') NOT NULL,
	`subscription` ENUM('true', 'false') NOT NULL,
	`termCheck` ENUM('true', 'false') NOT NULL,
	`policyCheck` ENUM('true', 'false') NOT NULL DEFAULT 'false',
	
	PRIMARY KEY (`userCode`)
	
) ENGINE = InnoDB DEFAULT CHARSET=utf8;

-- UserInfo
DROP TABLE IF EXISTS `UserInfo`;
CREATE TABLE IF NOT EXISTS `UserInfo`
(
	`userCode` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`jobCode` INT UNSIGNED NOT NULL,
	`countryCode` INT UNSIGNED NOT NULL,
	`languageCode` INT UNSIGNED NOT NULL,
	`profileImg` TEXT,
	`desc` VARCHAR(160),
	`company` VARCHAR(255),
	`userCity` VARCHAR(255),
	`userCell` VARCHAR(20),
	`userFax` VARCHAR(20),
	`userWeb` TEXT,
	`subscription` ENUM('true', 'false') NOT NULL,
	`permission` INT UNSIGNED NOT NULL DEFAULT 11111111,
	
	PRIMARY KEY (`userCode`)
	
) ENGINE = InnoDB DEFAULT CHARSET=utf8;


-- Bookmark --
DROP TABLE IF EXISTS `Bookmark`;

CREATE TABLE IF NOT EXISTS `Bookmark`
(
	`userCode` INT UNSIGNED NOT NULL,
	`title` VARCHAR(255),
	`url` TEXT NOT NULL,
	
	PRIMARY KEY(`userCode`)
	
) ENGINE = InnoDB DEFAULT CHARSET=utf8;

-- Language --
DROP TABLE IF EXISTS `Language`;
CREATE TABLE IF NOT EXISTS `Language`
(
	`userCode` INT UNSIGNED NOT NULL,
	`languageCode` INT UNSIGNED NOT NULL,
	`language` VARCHAR(255),
	`languageLevel` ENUM('Beginer','Advanced','Fluent','Native') NOT NULL,
	
	PRIMARY KEY(`userCode`)

) ENGINE = InnoDB DEFAULT CHARSET=utf8;

-- Log --
DROP TABLE IF EXISTS `Log`;
CREATE TABLE IF NOT EXISTS `Log`
(
	`logCode` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`userCode` INT UNSIGNED NOT NULL,
	`ip` CHAR(71) NOT NULL,
	`ipCategory` ENUM('ipv4','ipv6') NOT NULL,
	
	PRIMARY KEY(`logCode`)
	
) ENGINE = InnoDB DEFAULT CHARSET=utf8;

SHOW WARNINGS;
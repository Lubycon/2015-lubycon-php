-- --
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
	`jobName` VARCHAR(255) NOT NULL,
	
	PRIMARY KEY(`jobCode`)
	
) ENGINE = InnoDB DEFAULT CHARSET=utf8;

-- Country --
DROP TABLE IF EXISTS `Country`;
CREATE TABLE IF NOT EXISTS `Country`
(
	`countryCode` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`countryUtc` TINYINT SIGNED NOT NULL,
	`countryContinent` ENUM('asia', 'europe', 'africa', 'americas', 'oceania','undecided') NOT NULL,
	`countryRegion` ENUM('east_asia', 'central_asia', 'south_asia', 'northern_asia', 'south_east_asia', 'south_west_asia', 'eastern_europe', 'central_europe', 'western_europe', 'southern_europe', 'northern_europe', 'south_east_europe','south_west_europe', 'eastern_africa', 'central_africa', 'western_africa', 'southern_africa', 'northern_africa', 'indian_ocean', 'pacific', 'central_america', 'south_america', 'north_america', 'west_indies','undecided') NOT NULL,
	`countryName` VARCHAR(255) NOT NULL,
	
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
	`validationToken` VARCHAR(255),
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
	`countryCode` INT UNSIGNED NOT NULL,
	`jobCode` INT UNSIGNED,
	`logCode` INT UNSIGNED,
	`profileImg` TEXT,
	`userDescription` VARCHAR(160),
	`company` VARCHAR(255),
	`city` VARCHAR(255),
	`telNumber` VARCHAR(20),
	`fax` VARCHAR(20),
	`web` TEXT,
	`emailPublic` ENUM('Public','Private'),
	`mobilePublic` ENUM('Public','Private'),
	`faxPublic` ENUM('Public','Private'),
	`webPublic` ENUM('Public','Private'),
	
	PRIMARY KEY (`userCode`)
	
) ENGINE = InnoDB DEFAULT CHARSET=utf8;


-- UserHistory
DROP TABLE IF EXISTS `UserHistory`;
CREATE TABLE IF NOT EXISTS `UserHistory`
(
	`historyId` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`userCode` INT UNSIGNED NOT NULL,
	`historyContents` VARCHAR(255),
	`historyDateYear` VARCHAR(255),
	`historyDateMonth` VARCHAR(255),
	`historyCategory` ENUM('work_experience', 'education', 'awards'),
	
	PRIMARY KEY (`historyId`)
	
) ENGINE = InnoDB DEFAULT CHARSET=utf8;

-- Language --
DROP TABLE IF EXISTS `UserLanguage`;
CREATE TABLE IF NOT EXISTS `UserLanguage`
(
	`languageId` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`userCode` INT UNSIGNED NOT NULL,
	`languageLevel` ENUM('Beginner','Advanced','Fluent'),
	`languageName` VARCHAR(255),
	
	PRIMARY KEY(`languageId`)
	
) ENGINE = InnoDB DEFAULT CHARSET=utf8;

-- Log --
DROP TABLE IF EXISTS `Log`;
CREATE TABLE IF NOT EXISTS `Log`
(
	`logCode` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`userCode` INT UNSIGNED NOT NULL,
	`ip` CHAR(71) NOT NULL,
	`ipCategory` ENUM('ipv4','ipv6') NOT NULL,
	`date` DATETIME NOT NULL,
	
	PRIMARY KEY(`logCode`)
	
) ENGINE = InnoDB DEFAULT CHARSET=utf8;

SHOW WARNINGS;


DROP DATABASE IF EXISTS LubyconBoard;
CREATE DATABASE IF NOT EXISTS LubyconBoard;

USE LubyconBoard;



-- ArtWork
DROP TABLE IF EXISTS `artWork`;
CREATE TABLE IF NOT EXISTS `artWork`
(
	`boardCode` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`userCode` INT UNSIGNED NOT NULL,
	`topCategoryCode` INT UNSIGNED NOT NULL,
	`contentTitle` VARCHAR(255) NOT NULL,
	`contentDate` DATETIME NOT NULL,
	`contentDescription` TEXT,
	`contents` TEXT NOT NULL,
	`userDirectory` TEXT NOT NULL,
	`ccCode` INT UNSIGNED NOT NULL,
	`downloadAble` BOOLEAN NOT NULL,
	`downloadCount` INT UNSIGNED DEFAULT '0',
	`viewCount` INT UNSIGNED DEFAULT '0',
	`likeCount` INT UNSIGNED DEFAULT '0',
	`bookmarkCount` INT UNSIGNED DEFAULT '0',
	`commentCount` INT UNSIGNED DEFAULT '0',

	PRIMARY KEY(`boardCode`)
	
) ENGINE = InnoDB DEFAULT CHARSET=utf8;

-- ArtWork CC license
DROP TABLE IF EXISTS `artworkCC`;
CREATE TABLE IF NOT EXISTS `artworkCC`
(
	`boardCode` INT UNSIGNED NOT NULL,
	`ccApply` BOOLEAN NOT NULL,
	`ccCommercial` BOOLEAN NOT NULL,
	`ccModified` BOOLEAN NOT NULL,
	`ccUnerLicense` BOOLEAN NOT NULL,
	
	PRIMARY KEY(`boardCode`)
)ENGINE = InnoDB DEFAULT CHARSET=utf8;

-- ArtWork middle category
DROP TABLE IF EXISTS `artworkMidCategory`;
CREATE TABLE IF NOT EXISTS `artworkMidCategory`
(
	`boardCode` INT UNSIGNED NOT NULL,
	`midCategoryCode0` TINYINT NOT NULL,
	`midCategoryCode1` TINYINT,
	`midCategoryCode2` TINYINT,
	`midCategoryCode3` TINYINT,
	`midCategoryCode4` TINYINT,
	
	PRIMARY KEY(`boardCode`)
)ENGINE = InnoDB DEFAULT CHARSET=utf8;

-- ArtWork tag
DROP TABLE IF EXISTS `artworkTag`;
CREATE TABLE IF NOT EXISTS `artworkTag`
(
	`boardCode` INT UNSIGNED NOT NULL,
	`tag0` VARCHAR(255),
	`tag1` VARCHAR(255),
	`tag2` VARCHAR(255),
	`tag3` VARCHAR(255),
	`tag4` VARCHAR(255),
	`tag5` VARCHAR(255),
	`tag6` VARCHAR(255),
	`tag7` VARCHAR(255),
	`tag8` VARCHAR(255),
	`tag9` VARCHAR(255),
	`tag10` VARCHAR(255),
	`tag11` VARCHAR(255),
	`tag12` VARCHAR(255),
	`tag13` VARCHAR(255),
	`tag14` VARCHAR(255),
	`tag15` VARCHAR(255),
	`tag16` VARCHAR(255),
	`tag17` VARCHAR(255),
	`tag18` VARCHAR(255),
	`tag19` VARCHAR(255),
	
	PRIMARY KEY(`boardCode`)
)ENGINE = InnoDB DEFAULT CHARSET=utf8;




-- core list
-- contents bookmark
DROP TABLE IF EXISTS `contentsBookmark`;
CREATE TABLE IF NOT EXISTS `contentsBookmark`
( 
	`bookmarkID` INT UNSIGNED NOT NULL AUTO_INCREMENT , 
	`bookmarkActionUserCode` INT UNSIGNED NOT NULL , 
	`boardCode` INT UNSIGNED NOT NULL , 
	`topCategoryCode` INT UNSIGNED NOT NULL , 
	`bookmarkBoardKind` ENUM('contents') NOT NULL , 
	`bookmarkDate` DATETIME NOT NULL , 

	PRIMARY KEY (`bookmarkID`)
) ENGINE = InnoDB DEFAULT CHARSET=utf8;

-- contents like
DROP TABLE IF EXISTS `contentsLike`;
CREATE TABLE IF NOT EXISTS `contentsLike`
( 
	`likeID` INT UNSIGNED NOT NULL AUTO_INCREMENT , 
	`likeActionUserCode` INT UNSIGNED NOT NULL , 
	`boardCode` INT UNSIGNED NOT NULL , 
	`topCategoryCode` INT UNSIGNED NOT NULL , 
	`likeBoardKind` ENUM('contents','comment') NOT NULL , 
	`likeDate` DATETIME NOT NULL , 

	PRIMARY KEY (`likeID`)
) ENGINE = InnoDB DEFAULT CHARSET=utf8;

-- contents like
DROP TABLE IF EXISTS `contentsComment`;
CREATE TABLE IF NOT EXISTS `contentsComment`
( 
	`commentID` INT UNSIGNED NOT NULL AUTO_INCREMENT , 
	`commentActionUserCode` INT UNSIGNED NOT NULL , 
	`boardCode` INT UNSIGNED NOT NULL , 
	`topCategoryCode` INT UNSIGNED NOT NULL , 
	`commentDate` DATETIME NOT NULL , 
	`commentContents` TEXT NOT NULL , 
	`commentLikeCount` INT UNSIGNED NOT NULL , 

	PRIMARY KEY (`commentID`)
) ENGINE = InnoDB DEFAULT CHARSET=utf8;




SHOW WARNINGS;
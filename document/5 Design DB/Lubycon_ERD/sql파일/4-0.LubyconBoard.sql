DROP DATABASE IF EXISTS LubyconBoard;
CREATE DATABASE IF NOT EXISTS LubyconBoard;

USE LubyconBoard;

-- forum
DROP TABLE IF EXISTS `forum`;
CREATE TABLE IF NOT EXISTS `forum`
(
	`boardCode` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`userCode` INT UNSIGNED NOT NULL,
	`topCategoryCode` INT UNSIGNED NOT NULL,
	`contentTitle` VARCHAR(255) NOT NULL,
	`contentDate` DATETIME NOT NULL,
	`contentDescription` TEXT,
	`contents` TEXT NOT NULL,
	`userDirectory` TEXT NOT NULL,
	`viewCount` INT UNSIGNED DEFAULT '0',
	`likeCount` INT UNSIGNED DEFAULT '0',
	`commentCount` INT UNSIGNED DEFAULT '0',
	`contentStatus` ENUM('normal','delete') DEFAULT 'normal',

	PRIMARY KEY(`boardCode`)
	
) ENGINE = InnoDB DEFAULT CHARSET=utf8;


-- community like
DROP TABLE IF EXISTS `communityLike`;
CREATE TABLE IF NOT EXISTS `communityLike`
( 
	`likeID` INT UNSIGNED NOT NULL AUTO_INCREMENT , 
	`likeActionUserCode` INT UNSIGNED NOT NULL , 
	`boardCode` INT UNSIGNED NOT NULL , 
	`topCategoryCode` INT UNSIGNED NOT NULL , 
	`likeBoardKind` ENUM('contents','comment') NOT NULL , 
	`likeDate` DATETIME NOT NULL , 

	PRIMARY KEY (`likeID`)
) ENGINE = InnoDB DEFAULT CHARSET=utf8;

-- community like
DROP TABLE IF EXISTS `communityComment`;
CREATE TABLE IF NOT EXISTS `communityComment`
( 
	`commentID` INT UNSIGNED NOT NULL AUTO_INCREMENT , 
	`commentActionUserCode` INT UNSIGNED NOT NULL , 
	`boardCode` INT UNSIGNED NOT NULL , 
	`topCategoryCode` INT UNSIGNED NOT NULL , 
	`commentDate` DATETIME NOT NULL , 
	`commentContents` TEXT NOT NULL , 
	`commentLikeCount` INT UNSIGNED NOT NULL , 
	`commentStatus` ENUM('normal','delete') DEFAULT 'normal',

	PRIMARY KEY (`commentID`)
) ENGINE = InnoDB DEFAULT CHARSET=utf8;




































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
	`ccLicense` INT UNSIGNED NOT NULL,
	`downloadAble` BOOLEAN NOT NULL,
	`downloadCount` INT UNSIGNED DEFAULT '0',
	`viewCount` INT UNSIGNED DEFAULT '0',
	`likeCount` INT UNSIGNED DEFAULT '0',
	`bookmarkCount` INT UNSIGNED DEFAULT '0',
	`commentCount` INT UNSIGNED DEFAULT '0',
	`contentStatus` ENUM('normal','delete') DEFAULT 'normal',

	PRIMARY KEY(`boardCode`)
	
) ENGINE = InnoDB DEFAULT CHARSET=utf8;

-- ArtWork middle category
DROP TABLE IF EXISTS `artworkMidCategory`;
CREATE TABLE IF NOT EXISTS `artworkMidCategory`
(
	`boardCode` INT UNSIGNED NOT NULL,
	`midCategoryCode0` TINYINT NOT NULL,
	`midCategoryCode1` TINYINT DEFAULT NULL,
	`midCategoryCode2` TINYINT DEFAULT NULL,
	`midCategoryCode3` TINYINT DEFAULT NULL,
	`midCategoryCode4` TINYINT DEFAULT NULL,
	
	PRIMARY KEY(`boardCode`)
)ENGINE = InnoDB DEFAULT CHARSET=utf8;

-- ArtWork tag
DROP TABLE IF EXISTS `artworkTag`;
CREATE TABLE IF NOT EXISTS `artworkTag`
(
	`boardCode` INT UNSIGNED NOT NULL,
	`tag0` VARCHAR(255),
	`tag1` VARCHAR(255) DEFAULT NULL,
	`tag2` VARCHAR(255) DEFAULT NULL,
	`tag3` VARCHAR(255) DEFAULT NULL,
	`tag4` VARCHAR(255) DEFAULT NULL,
	`tag5` VARCHAR(255) DEFAULT NULL,
	`tag6` VARCHAR(255) DEFAULT NULL,
	`tag7` VARCHAR(255) DEFAULT NULL,
	`tag8` VARCHAR(255) DEFAULT NULL,
	`tag9` VARCHAR(255) DEFAULT NULL,
	`tag10` VARCHAR(255) DEFAULT NULL,
	`tag11` VARCHAR(255) DEFAULT NULL,
	`tag12` VARCHAR(255) DEFAULT NULL,
	`tag13` VARCHAR(255) DEFAULT NULL,
	`tag14` VARCHAR(255) DEFAULT NULL,
	`tag15` VARCHAR(255) DEFAULT NULL,
	`tag16` VARCHAR(255) DEFAULT NULL,
	`tag17` VARCHAR(255) DEFAULT NULL,
	`tag18` VARCHAR(255) DEFAULT NULL,
	`tag19` VARCHAR(255) DEFAULT NULL,
	
	PRIMARY KEY(`boardCode`)
)ENGINE = InnoDB DEFAULT CHARSET=utf8;


-- vector
DROP TABLE IF EXISTS `vector`;
CREATE TABLE IF NOT EXISTS `vector`
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
	`ccLicense` INT UNSIGNED NOT NULL,
	`downloadAble` BOOLEAN NOT NULL,
	`downloadCount` INT UNSIGNED DEFAULT '0',
	`viewCount` INT UNSIGNED DEFAULT '0',
	`likeCount` INT UNSIGNED DEFAULT '0',
	`bookmarkCount` INT UNSIGNED DEFAULT '0',
	`commentCount` INT UNSIGNED DEFAULT '0',
	`contentStatus` ENUM('normal','delete') DEFAULT 'normal',

	PRIMARY KEY(`boardCode`)
	
) ENGINE = InnoDB DEFAULT CHARSET=utf8;

-- vector middle category
DROP TABLE IF EXISTS `vectorMidCategory`;
CREATE TABLE IF NOT EXISTS `vectorMidCategory`
(
	`boardCode` INT UNSIGNED NOT NULL,
	`midCategoryCode0` TINYINT NOT NULL,
	`midCategoryCode1` TINYINT DEFAULT NULL,
	`midCategoryCode2` TINYINT DEFAULT NULL,
	`midCategoryCode3` TINYINT DEFAULT NULL,
	`midCategoryCode4` TINYINT DEFAULT NULL,
	
	PRIMARY KEY(`boardCode`)
)ENGINE = InnoDB DEFAULT CHARSET=utf8;

-- vector tag
DROP TABLE IF EXISTS `vectorTag`;
CREATE TABLE IF NOT EXISTS `vectorTag`
(
	`boardCode` INT UNSIGNED NOT NULL,
	`tag0` VARCHAR(255),
	`tag1` VARCHAR(255) DEFAULT NULL,
	`tag2` VARCHAR(255) DEFAULT NULL,
	`tag3` VARCHAR(255) DEFAULT NULL,
	`tag4` VARCHAR(255) DEFAULT NULL,
	`tag5` VARCHAR(255) DEFAULT NULL,
	`tag6` VARCHAR(255) DEFAULT NULL,
	`tag7` VARCHAR(255) DEFAULT NULL,
	`tag8` VARCHAR(255) DEFAULT NULL,
	`tag9` VARCHAR(255) DEFAULT NULL,
	`tag10` VARCHAR(255) DEFAULT NULL,
	`tag11` VARCHAR(255) DEFAULT NULL,
	`tag12` VARCHAR(255) DEFAULT NULL,
	`tag13` VARCHAR(255) DEFAULT NULL,
	`tag14` VARCHAR(255) DEFAULT NULL,
	`tag15` VARCHAR(255) DEFAULT NULL,
	`tag16` VARCHAR(255) DEFAULT NULL,
	`tag17` VARCHAR(255) DEFAULT NULL,
	`tag18` VARCHAR(255) DEFAULT NULL,
	`tag19` VARCHAR(255) DEFAULT NULL,
	
	PRIMARY KEY(`boardCode`)
)ENGINE = InnoDB DEFAULT CHARSET=utf8;









-- threed
DROP TABLE IF EXISTS `threed`;
CREATE TABLE IF NOT EXISTS `threed`
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
	`ccLicense` INT UNSIGNED NOT NULL,
	`downloadAble` BOOLEAN NOT NULL,
	`downloadCount` INT UNSIGNED DEFAULT '0',
	`viewCount` INT UNSIGNED DEFAULT '0',
	`likeCount` INT UNSIGNED DEFAULT '0',
	`bookmarkCount` INT UNSIGNED DEFAULT '0',
	`commentCount` INT UNSIGNED DEFAULT '0',
	`contentStatus` ENUM('normal','delete') DEFAULT 'normal',

	PRIMARY KEY(`boardCode`)
	
) ENGINE = InnoDB DEFAULT CHARSET=utf8;

-- threed middle category
DROP TABLE IF EXISTS `threedMidCategory`;
CREATE TABLE IF NOT EXISTS `threedMidCategory`
(
	`boardCode` INT UNSIGNED NOT NULL,
	`midCategoryCode0` TINYINT NOT NULL,
	`midCategoryCode1` TINYINT DEFAULT NULL,
	`midCategoryCode2` TINYINT DEFAULT NULL,
	`midCategoryCode3` TINYINT DEFAULT NULL,
	`midCategoryCode4` TINYINT DEFAULT NULL,
	
	PRIMARY KEY(`boardCode`)
)ENGINE = InnoDB DEFAULT CHARSET=utf8;

-- threed tag
DROP TABLE IF EXISTS `threedTag`;
CREATE TABLE IF NOT EXISTS `threedTag`
(
	`boardCode` INT UNSIGNED NOT NULL,
	`tag0` VARCHAR(255),
	`tag1` VARCHAR(255) DEFAULT NULL,
	`tag2` VARCHAR(255) DEFAULT NULL,
	`tag3` VARCHAR(255) DEFAULT NULL,
	`tag4` VARCHAR(255) DEFAULT NULL,
	`tag5` VARCHAR(255) DEFAULT NULL,
	`tag6` VARCHAR(255) DEFAULT NULL,
	`tag7` VARCHAR(255) DEFAULT NULL,
	`tag8` VARCHAR(255) DEFAULT NULL,
	`tag9` VARCHAR(255) DEFAULT NULL,
	`tag10` VARCHAR(255) DEFAULT NULL,
	`tag11` VARCHAR(255) DEFAULT NULL,
	`tag12` VARCHAR(255) DEFAULT NULL,
	`tag13` VARCHAR(255) DEFAULT NULL,
	`tag14` VARCHAR(255) DEFAULT NULL,
	`tag15` VARCHAR(255) DEFAULT NULL,
	`tag16` VARCHAR(255) DEFAULT NULL,
	`tag17` VARCHAR(255) DEFAULT NULL,
	`tag18` VARCHAR(255) DEFAULT NULL,
	`tag19` VARCHAR(255) DEFAULT NULL,
	
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
	`commentStatus` ENUM('normal','delete') DEFAULT 'normal',

	PRIMARY KEY (`commentID`)
) ENGINE = InnoDB DEFAULT CHARSET=utf8;




SHOW WARNINGS;
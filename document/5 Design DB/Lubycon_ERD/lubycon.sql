-- ----------------------
-- DATABASE in Lubycon --
-- ----------------------
-- -----------------------------------------------
-- -----------------------------------------------

-- -----------------------------
-- Create Database as lubycon --
-- -----------------------------

DROP DATABASE IF EXISTS lubycon;

CREATE DATABASE IF NOT EXISTS lubycon;

-- ------------------------------------------------
-- ------------------------------------------------

USE lubycon;

-- ------------------------------------------------

-- ------------------------
-- TABLE for USER  START --
-- ------------------------

-- ------------------------------------------------

-- ---------------------
-- TABLE as luby_job --
-- ---------------------

DROP TABLE IF EXISTS `luby_job`;

CREATE TABLE IF NOT EXISTS `luby_job`
(
	`job_code` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`job_name` VARCHAR(255) NOT NULL,
	
	PRIMARY KEY(`job_code`)
	
) ENGINE = InnoDB DEFAULT CHARSET=utf8;

-- ------------------------
-- TABLE as luby_country --
-- ------------------------

DROP TABLE IF EXISTS `luby_country`;

CREATE TABLE IF NOT EXISTS `luby_country`
(
	`country_code` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`continent` ENUM('asia', 'europe', 'africa', 'americas', 'oceania','undecided') NOT NULL,
	`region` ENUM('east_asia', 'central_asia', 'south_asia', 'northern_asia', 'south_east_asia', 'south_west_asia', 'eastern_europe', 'central_europe', 'western_europe', 'southern_europe', 'northern_europe', 'south_east_europe','south_west_europe', 'eastern_africa', 'central_africa', 'western_africa', 'southern_africa', 'northern_africa', 'indian_ocean', 'pacific', 'central_america', 'south_america', 'north_america', 'west_indies','undecided') NOT NULL,
	`country_name` VARCHAR(255) NOT NULL,
	`country_tel_one` VARCHAR(10) NOT NULL,
	`country_tel_two` VARCHAR(10),
	`country_tel_three` VARCHAR(10),
	`country_select_tel` ENUM('one', 'two', 'three') NOT NULL,
	
	PRIMARY KEY(`country_code`)
	
) ENGINE = InnoDB DEFAULT CHARSET=utf8;




-- ---------------------
-- TABLE as luby_user --
-- ---------------------

DROP TABLE IF EXISTS `luby_user`;

CREATE TABLE IF NOT EXISTS `luby_user`
(
	`user_code` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`user_date` DATETIME NOT NULL,
	`user_email` VARCHAR(255) NOT NULL,
	`user_nick` VARCHAR(20) NOT NULL,
	`user_pass` VARCHAR(255) NOT NULL,
	`user_val` ENUM('active','inactive','drop') NOT NULL,
	`user_img` TEXT,
	`user_desc` VARCHAR(160),
	`job_code` INT UNSIGNED NOT NULL,
	`country_code` INT UNSIGNED NOT NULL,
	`user_city` VARCHAR(255),
	`user_cell` VARCHAR(20),
	`user_cell_public` ENUM('public', 'followers', 'private') NOT NULL,
	`user_fax` VARCHAR(20),
	`user_fax_public` ENUM('public', 'followers', 'private') NOT NULL,
	`user_web` TEXT,
	`user_web_public` ENUM('public', 'followers', 'private') NOT NULL,
	`newsletter` ENUM('true', 'false') NOT NULL,
	`term_check` ENUM('true', 'false') NOT NULL,
	`private_check` ENUM('true', 'false') NOT NULL,
	
	PRIMARY KEY (`user_code`)
	
) ENGINE = InnoDB DEFAULT CHARSET=utf8;

-- -------------------------
-- TABLE as luby_favorite --
-- -------------------------

DROP TABLE IF EXISTS `luby_favorite`;

CREATE TABLE IF NOT EXISTS `luby_favorite`
(
	`user_code` INT UNSIGNED NOT NULL,
	`favorite_title` VARCHAR(255),
	`favorite_url` TEXT NOT NULL,
	
	PRIMARY KEY(`user_code`)
	
) ENGINE = InnoDB DEFAULT CHARSET=utf8;

-- -------------------------
-- TABLE as luby_follower --
-- -------------------------

DROP TABLE IF EXISTS `luby_follower`;

CREATE TABLE IF NOT EXISTS `luby_follower`
(
	`user_code` INT UNSIGNED NOT NULL,
	`follower_user_code` INT UNSIGNED NOT NULL,
	`follower_date` DATETIME,
	
	PRIMARY KEY(`user_code`)
	
) ENGINE = InnoDB DEFAULT CHARSET=utf8;

-- --------------------------
-- TABLE as luby_following --
-- --------------------------

DROP TABLE IF EXISTS `luby_following`;

CREATE TABLE IF NOT EXISTS `luby_following`
(
	`user_code` INT UNSIGNED NOT NULL,
	`following_user_code` INT UNSIGNED NOT NULL,
	`following_date` DATETIME,
	
	PRIMARY KEY(`user_code`)
	
) ENGINE = InnoDB DEFAULT CHARSET=utf8;

-- -------------------------
-- TABLE as luby_language --
-- -------------------------

DROP TABLE IF EXISTS `luby_language`;

CREATE TABLE IF NOT EXISTS `luby_language`
(
	`user_code` INT UNSIGNED NOT NULL,
	`lang` VARCHAR(255),
	`lang_level` ENUM('Beginer','Advanced','Fluent','Native') NOT NULL,
	`lang_public` ENUM('Public', 'Follower', 'Private') NOT NULL,
	
	PRIMARY KEY(`user_code`)

) ENGINE = InnoDB DEFAULT CHARSET=utf8;

-- -------------------------
-- TABLE as luby_user_log --
-- -------------------------

DROP TABLE IF EXISTS `luby_user_log`;

CREATE TABLE IF NOT EXISTS `luby_user_log`
(
	`log_code` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`user_code` INT UNSIGNED NOT NULL,
	`log_ip` CHAR(71) NOT NULL,
	`log_ip_category` ENUM('ipv4','ipv6') NOT NULL,
	`log_login_success` ENUM('access', 'deny', 'exception') NOT NULL,
	`log_location` TEXT,
	`log_url` TEXT,
	
	PRIMARY KEY(`log_code`)
	
) ENGINE = InnoDB DEFAULT CHARSET=utf8;

-- --------------------
-- TABLE for USER END--
-- --------------------
-- -------------------------------------------


-- ---------------------------
-- TABLE for CONTENTS START --
-- ---------------------------
-- -------------------------------------------

-- -----------------------
-- TABLE for luby_board --
-- -----------------------

DROP TABLE IF EXISTS `luby_board`;

CREATE TABLE IF NOT EXISTS `luby_board`
(
	`board_code` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`user_code` INT UNSIGNED NOT NULL,
	`contents_code` INT UNSIGNED NOT NULL,
	`board_title` VARCHAR(255) NOT NULL,
	`board_desc` TEXT,
	`board_contents` TEXT,
	`board_down_public` ENUM('Free','Qualified','View') NOT NULL,
	`board_down_count` INT UNSIGNED NOT NULL,
	`board_view_count` INT UNSIGNED NOT NULL,
	`board_like_count` INT UNSIGNED NOT NULL,
	`board_preview` TEXT NOT NULL,
	
	PRIMARY KEY(`board_code`)
	
) ENGINE = InnoDB DEFAULT CHARSET=utf8;

-- -----------------------------------
-- TABLE for luby_contents_category --
-- -----------------------------------

DROP TABLE IF EXISTS `luby_contents_category`;

CREATE TABLE IF NOT EXISTS `luby_contents_category`
(
	`contents_code` INT UNSIGNED NOT NULL,
	`contents_category` VARCHAR(255) NOT NULL,
	
	PRIMARY KEY(`contents_code`)

) ENGINE = InnoDB DEFAULT CHARSET=utf8;

-- -------------------------------
-- TABLE for luby_board_commnet --
-- -------------------------------

DROP TABLE IF EXISTS `luby_board_comment`;

CREATE TABLE IF NOT EXISTS `luby_board_comment`
(
	`board_code` INT UNSIGNED NOT NULL,
	`comment_contents` TEXT NOT NULL,
	`comment_like` INT UNSIGNED NOT NULL,
	`comment_member_code` INT UNSIGNED NOT NULL,
	`comment_date` DATETIME NOT NULL,
	
	PRIMARY KEY(`board_code`)

) ENGINE = InnoDB DEFAULT CHARSET=utf8;


-- ---------------------------
-- TABLE for luby_board_img --
-- ---------------------------

DROP TABLE IF EXISTS `luby_board_img`;

CREATE TABLE IF NOT EXISTS `luby_board_img`
(
	`board_code` INT UNSIGNED NOT NULL,
	`img_directory` TEXT NOT NULL,
	
	PRIMARY KEY(`board_code`)
	
) ENGINE = InnoDB DEFAULT CHARSET=utf8;


-- --------------------------------
-- TABLE for luby_board_download --
-- --------------------------------

DROP TABLE IF EXISTS `luby_board_download`;

CREATE TABLE IF NOT EXISTS `luby_board_download`
(
	`board_code` INT UNSIGNED NOT NULL,
	`download_directory` TEXT NOT NULL,
	
	PRIMARY KEY(`board_code`)
	
) ENGINE = InnoDB DEFAULT CHARSET=utf8;

SHOW WARNINGS;
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


INSERT INTO `userbasic` (`userCode`, `date`, `email`, `nick`, `pass`, `validation`, `subscription`, `termCheck`, `policyCheck`) VALUES
(1, '2016-04-16 22:43:35', 'qwer@naver.com', 'danielzepp', '$2y$10$nc17yAiGfC3Pn4YYYwHnteOfQmo26uN3HYalgli5WwLB2Nt1RHr8y', 'active', 'false', 'true', 'true'),
(2, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Blanch Brightwell', '123123', 'active', 'false', 'true', 'true'),
(3, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Rae Bohl', '123123', 'active', 'false', 'true', 'true'),
(4, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Sunni Beaird', '123123', 'active', 'false', 'true', 'true'),
(5, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Cecil Stuber', '123123', 'active', 'false', 'true', 'true'),
(6, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Madalene Olmedo', '123123', 'active', 'false', 'true', 'true'),
(7, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Nicholas Cockrill', '123123', 'active', 'false', 'true', 'true'),
(8, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Kristi Bushell', '123123', 'active', 'false', 'true', 'true'),
(9, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Mandi Rand', '123123', 'active', 'false', 'true', 'true'),
(10, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Nancee Pua', '123123', 'active', 'false', 'true', 'true'),
(11, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Dawna Putz', '123123', 'active', 'false', 'true', 'true'),
(12, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Lana Constance', '123123', 'active', 'false', 'true', 'true'),
(13, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Cheree Carreno', '123123', 'active', 'false', 'true', 'true'),
(14, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Cletus Guss', '123123', 'active', 'false', 'true', 'true'),
(15, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Clementine Spearman', '123123', 'active', 'false', 'true', 'true'),
(16, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Lavonne Clemens', '123123', 'active', 'false', 'true', 'true'),
(17, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Mirta Montalvo', '123123', 'active', 'false', 'true', 'true'),
(18, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Nubia Burman', '123123', 'active', 'false', 'true', 'true'),
(19, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Hermina Schleich', '123123', 'active', 'false', 'true', 'true'),
(20, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Pearlie Vestal', '123123', 'active', 'false', 'true', 'true'),
(21, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Sol Pompa', '123123', 'active', 'false', 'true', 'true'),
(22, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Lesli Tarlton', '123123', 'active', 'false', 'true', 'true'),
(23, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Tatum Swaim', '123123', 'active', 'false', 'true', 'true'),
(24, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Beverlee Vanish', '123123', 'active', 'false', 'true', 'true'),
(25, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Ferne Mickles', '123123', 'active', 'false', 'true', 'true'),
(26, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Caroline Pettway', '123123', 'active', 'false', 'true', 'true'),
(27, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Hugo Vitela', '123123', 'active', 'false', 'true', 'true'),
(28, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Mack Coker', '123123', 'active', 'false', 'true', 'true'),
(29, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Arlene Cid', '123123', 'active', 'false', 'true', 'true'),
(30, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Misti Hansell', '123123', 'active', 'false', 'true', 'true'),
(31, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Nakisha Sherburne', '123123', 'active', 'false', 'true', 'true'),
(32, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Gwendolyn Bott', '123123', 'active', 'false', 'true', 'true'),
(33, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Sophie Kosakowski', '123123', 'active', 'false', 'true', 'true'),
(34, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Evelyn Heck', '123123', 'active', 'false', 'true', 'true'),
(35, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Jules Sarratt', '123123', 'active', 'false', 'true', 'true'),
(36, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Floria Aguillon', '123123', 'active', 'false', 'true', 'true'),
(37, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Lamar Mckane', '123123', 'active', 'false', 'true', 'true'),
(38, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Taylor Knarr', '123123', 'active', 'false', 'true', 'true'),
(39, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Iola Pentecost', '123123', 'active', 'false', 'true', 'true'),
(40, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Marcus Pecora', '123123', 'active', 'false', 'true', 'true'),
(41, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Lupita Panter', '123123', 'active', 'false', 'true', 'true'),
(42, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Ninfa Victory', '123123', 'active', 'false', 'true', 'true'),
(43, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Josefa Alexandra', '123123', 'active', 'false', 'true', 'true'),
(44, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Barb Waage', '123123', 'active', 'false', 'true', 'true'),
(45, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Barbra Pelton', '123123', 'active', 'false', 'true', 'true'),
(46, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Jimmy Pacheco', '123123', 'active', 'false', 'true', 'true'),
(47, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Lasandra Sherer', '123123', 'active', 'false', 'true', 'true'),
(48, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Diane Quinones', '123123', 'active', 'false', 'true', 'true'),
(49, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Argentina Buchner', '123123', 'active', 'false', 'true', 'true'),
(50, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Linh Posey', '123123', 'active', 'false', 'true', 'true'),
(51, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Roxanne Mcminn', '123123', 'active', 'false', 'true', 'true'),
(52, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Karine Markert', '123123', 'active', 'false', 'true', 'true'),
(53, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Sam Jennings', '123123', 'active', 'false', 'true', 'true'),
(54, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Stephanie Throo', '123123', 'active', 'false', 'true', 'true'),
(55, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Corey Even', '123123', 'active', 'false', 'true', 'true'),
(56, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Sunshine Ruvolo', '123123', 'active', 'false', 'true', 'true'),
(57, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Delmar Koffler', '123123', 'active', 'false', 'true', 'true'),
(58, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Hortencia Puccio', '123123', 'active', 'false', 'true', 'true'),
(59, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Beckie Neuendorf', '123123', 'active', 'false', 'true', 'true'),
(60, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Victor Micek', '123123', 'active', 'false', 'true', 'true'),
(61, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Crissy Barriga', '123123', 'active', 'false', 'true', 'true'),
(62, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Mariette Bainbridge', '123123', 'active', 'false', 'true', 'true'),
(63, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Yvone Carranza', '123123', 'active', 'false', 'true', 'true'),
(64, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Carry Barrier', '123123', 'active', 'false', 'true', 'true'),
(65, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Ashlee Castro', '123123', 'active', 'false', 'true', 'true'),
(66, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Stacy Wardlow', '123123', 'active', 'false', 'true', 'true'),
(67, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Lesia Goewey', '123123', 'active', 'false', 'true', 'true'),
(68, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Nell Providence', '123123', 'active', 'false', 'true', 'true'),
(69, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Cathern Blaser', '123123', 'active', 'false', 'true', 'true'),
(70, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Leigha Casanova', '123123', 'active', 'false', 'true', 'true'),
(71, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Zoe Meche', '123123', 'active', 'false', 'true', 'true'),
(72, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Amber Warf', '123123', 'active', 'false', 'true', 'true'),
(73, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Victoria Kelm', '123123', 'active', 'false', 'true', 'true'),
(74, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Loura Lasalle', '123123', 'active', 'false', 'true', 'true'),
(75, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Genevive Deerman', '123123', 'active', 'false', 'true', 'true'),
(76, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Lilli Searles', '123123', 'active', 'false', 'true', 'true'),
(77, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Basil Vorpahl', '123123', 'active', 'false', 'true', 'true'),
(78, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Ava Judon', '123123', 'active', 'false', 'true', 'true'),
(79, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Sarai Leong', '123123', 'active', 'false', 'true', 'true'),
(80, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Nelida Daniel', '123123', 'active', 'false', 'true', 'true'),
(81, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Towanda Pinto', '123123', 'active', 'false', 'true', 'true'),
(82, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Maryjo Purpura', '123123', 'active', 'false', 'true', 'true'),
(83, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Delmar Mcmillian', '123123', 'active', 'false', 'true', 'true'),
(84, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Verla Lohmann', '123123', 'active', 'false', 'true', 'true'),
(85, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Romaine Lentine', '123123', 'active', 'false', 'true', 'true'),
(86, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Kenyetta Caley', '123123', 'active', 'false', 'true', 'true'),
(87, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Scott Kowalewski', '123123', 'active', 'false', 'true', 'true'),
(88, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Dorsey Kirton', '123123', 'active', 'false', 'true', 'true'),
(89, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Sandra Tindel', '123123', 'active', 'false', 'true', 'true'),
(90, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Granville Marlett', '123123', 'active', 'false', 'true', 'true'),
(91, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Sung Sobotka', '123123', 'active', 'false', 'true', 'true'),
(92, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Soledad Blomberg', '123123', 'active', 'false', 'true', 'true'),
(93, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Cherrie Offutt', '123123', 'active', 'false', 'true', 'true'),
(94, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Leslee Speno', '123123', 'active', 'false', 'true', 'true'),
(95, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Nyla Roles', '123123', 'active', 'false', 'true', 'true'),
(96, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Merlin Corner', '123123', 'active', 'false', 'true', 'true'),
(97, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Crystle Koehl', '123123', 'active', 'false', 'true', 'true'),
(98, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Katrice Shumake', '123123', 'active', 'false', 'true', 'true'),
(99, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Maricruz Whitis', '123123', 'active', 'false', 'true', 'true'),
(100, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Sharla Bilbo', '123123', 'active', 'false', 'true', 'true'),
(101, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Willetta Abeita', '123123', 'active', 'false', 'true', 'true'),
(102, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Sherryl Calbert', '123123', 'active', 'false', 'true', 'true'),
(103, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Theron Roff', '123123', 'active', 'false', 'true', 'true'),
(104, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Madalyn Powel', '123123', 'active', 'false', 'true', 'true'),
(105, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Alvaro Esposito', '123123', 'active', 'false', 'true', 'true'),
(106, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Ella Robidoux', '123123', 'active', 'false', 'true', 'true'),
(107, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Josiah Cowell', '123123', 'active', 'false', 'true', 'true'),
(108, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Mendy Elrod', '123123', 'active', 'false', 'true', 'true'),
(109, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Minda Plowden', '123123', 'active', 'false', 'true', 'true'),
(110, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Aaron Kimbro', '123123', 'active', 'false', 'true', 'true'),
(111, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Toi Haskell', '123123', 'active', 'false', 'true', 'true'),
(112, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Aleisha Pellegrino', '123123', 'active', 'false', 'true', 'true'),
(113, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Donita Odwyer', '123123', 'active', 'false', 'true', 'true'),
(114, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Robert Nickell', '123123', 'active', 'false', 'true', 'true'),
(115, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Vanessa Lintz', '123123', 'active', 'false', 'true', 'true'),
(116, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Katelyn Vince', '123123', 'active', 'false', 'true', 'true'),
(117, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Pauletta Beckler', '123123', 'active', 'false', 'true', 'true'),
(118, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Rachael Bart', '123123', 'active', 'false', 'true', 'true'),
(119, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Tameika Passman', '123123', 'active', 'false', 'true', 'true'),
(120, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Stephenie Juhasz', '123123', 'active', 'false', 'true', 'true'),
(121, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Althea Brummond', '123123', 'active', 'false', 'true', 'true'),
(122, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Donna Anderson', '123123', 'active', 'false', 'true', 'true'),
(123, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Mohammad Anwar', '123123', 'active', 'false', 'true', 'true'),
(124, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Robert Beasley', '123123', 'active', 'false', 'true', 'true'),
(125, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Terence Bingham', '123123', 'active', 'false', 'true', 'true'),
(126, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Robert Bloomfield', '123123', 'active', 'false', 'true', 'true'),
(127, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Christine Brett', '123123', 'active', 'false', 'true', 'true'),
(128, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Chao Cheng', '123123', 'active', 'false', 'true', 'true'),
(129, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Stephen Chown', '123123', 'active', 'false', 'true', 'true'),
(130, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Gwyn Collins', '123123', 'active', 'false', 'true', 'true'),
(131, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Maureen Connell', '123123', 'active', 'false', 'true', 'true'),
(132, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Christina Connolly', '123123', 'active', 'false', 'true', 'true'),
(133, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Peter Cork', '123123', 'active', 'false', 'true', 'true'),
(134, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Neil Dalton', '123123', 'active', 'false', 'true', 'true'),
(135, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Caroline Davies', '123123', 'active', 'false', 'true', 'true'),
(136, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Francis Davies', '123123', 'active', 'false', 'true', 'true'),
(137, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Anushree Dhar', '123123', 'active', 'false', 'true', 'true'),
(138, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Marcus Elliott', '123123', 'active', 'false', 'true', 'true'),
(139, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Jon Fay', '123123', 'active', 'false', 'true', 'true'),
(140, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Paul Fitzpatrick', '123123', 'active', 'false', 'true', 'true'),
(141, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Geoffrey Ford', '123123', 'active', 'false', 'true', 'true'),
(142, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Anne Free', '123123', 'active', 'false', 'true', 'true'),
(143, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'June Hammond', '123123', 'active', 'false', 'true', 'true'),
(144, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'John Harding', '123123', 'active', 'false', 'true', 'true'),
(145, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Kathleen Harrington', '123123', 'active', 'false', 'true', 'true'),
(146, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Michael Hill', '123123', 'active', 'false', 'true', 'true'),
(147, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Adrian Joy', '123123', 'active', 'false', 'true', 'true'),
(148, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Suzanne Judge', '123123', 'active', 'false', 'true', 'true'),
(149, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Adrian Kruger', '123123', 'active', 'false', 'true', 'true'),
(150, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Monika Kumar', '123123', 'active', 'false', 'true', 'true'),
(151, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Keiko Lane', '123123', 'active', 'false', 'true', 'true'),
(152, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Peter Lewis', '123123', 'active', 'false', 'true', 'true'),
(153, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Steven Lovett', '123123', 'active', 'false', 'true', 'true'),
(154, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Stephen Manuel', '123123', 'active', 'false', 'true', 'true'),
(155, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Lukasz Marecki', '123123', 'active', 'false', 'true', 'true'),
(156, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Zahid Mohmed', '123123', 'active', 'false', 'true', 'true'),
(157, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Paul Morgan', '123123', 'active', 'false', 'true', 'true'),
(158, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Martyn Morse', '123123', 'active', 'false', 'true', 'true'),
(159, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Alasdair Munro', '123123', 'active', 'false', 'true', 'true'),
(160, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Grant Osinski', '123123', 'active', 'false', 'true', 'true'),
(161, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Emine Osman', '123123', 'active', 'false', 'true', 'true'),
(162, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Ifeoma Owen', '123123', 'active', 'false', 'true', 'true'),
(163, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Giles Payne', '123123', 'active', 'false', 'true', 'true'),
(164, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Michelle Pearson', '123123', 'active', 'false', 'true', 'true'),
(165, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Laura Richards', '123123', 'active', 'false', 'true', 'true'),
(166, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'June Shackleton', '123123', 'active', 'false', 'true', 'true'),
(167, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Andrew Shanks', '123123', 'active', 'false', 'true', 'true'),
(168, '2016-04-16 22:56:08', 'qwerqwer@naver.com', 'Stuart Simpson', '123123', 'active', 'false', 'true', 'true'),
(169, '2016-04-16 22:56:09', 'qwerqwer@naver.com', 'Michael Smith', '123123', 'active', 'false', 'true', 'true'),
(170, '2016-04-16 22:56:09', 'qwerqwer@naver.com', 'Stella Spence', '123123', 'active', 'false', 'true', 'true'),
(171, '2016-04-16 22:56:09', 'qwerqwer@naver.com', 'Meng Tan', '123123', 'active', 'false', 'true', 'true'),
(172, '2016-04-16 22:56:09', 'qwerqwer@naver.com', 'Stewart Tempest', '123123', 'active', 'false', 'true', 'true'),
(173, '2016-04-16 22:56:09', 'qwerqwer@naver.com', 'Valerie Thompson', '123123', 'active', 'false', 'true', 'true'),
(174, '2016-04-16 22:56:09', 'qwerqwer@naver.com', 'Syed Uddin', '123123', 'active', 'false', 'true', 'true'),
(175, '2016-04-16 22:56:09', 'qwerqwer@naver.com', 'Steven Watkins', '123123', 'active', 'false', 'true', 'true'),
(176, '2016-04-16 22:56:09', 'qwerqwer@naver.com', 'Paul Watkinson', '123123', 'active', 'false', 'true', 'true'),
(177, '2016-04-16 22:56:09', 'qwerqwer@naver.com', 'Audrey Wickham', '123123', 'active', 'false', 'true', 'true'),
(178, '2016-04-16 22:56:09', 'qwerqwer@naver.com', 'Kirsty Williams', '123123', 'active', 'false', 'true', 'true'),
(179, '2016-04-16 22:56:09', 'qwerqwer@naver.com', 'Elizabeth Wilson', '123123', 'active', 'false', 'true', 'true'),
(180, '2016-04-16 22:56:09', 'qwerqwer@naver.com', 'Emily Wilson', '123123', 'active', 'false', 'true', 'true'),
(181, '2016-04-16 22:56:09', 'qwerqwer@naver.com', 'Eric Wynne', '123123', 'active', 'false', 'true', 'true');

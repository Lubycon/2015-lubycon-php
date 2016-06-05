-- phpMyAdmin SQL Dump
-- version 4.4.13.1
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- 생성 시간: 16-06-03 21:47
-- 서버 버전: 5.6.26
-- PHP 버전: 5.5.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `lubyconuser`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `country`
--

DROP TABLE IF EXISTS `country`;
CREATE TABLE IF NOT EXISTS `country` (
  `countryCode` int(10) unsigned NOT NULL,
  `utc` tinyint(4) NOT NULL,
  `continent` enum('asia','europe','africa','americas','oceania','undecided') NOT NULL,
  `region` enum('east_asia','central_asia','south_asia','northern_asia','south_east_asia','south_west_asia','eastern_europe','central_europe','western_europe','southern_europe','northern_europe','south_east_europe','south_west_europe','eastern_africa','central_africa','western_africa','southern_africa','northern_africa','indian_ocean','pacific','central_america','south_america','north_america','west_indies','undecided') NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=242 DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `country`
--

INSERT INTO `country` (`countryCode`, `utc`, `continent`, `region`, `name`) VALUES
(0, 4, 'asia', 'south_asia', 'Afghanistan'),
(1, 1, 'europe', 'south_east_europe', 'Albania'),
(2, 1, 'africa', 'northern_africa', 'Algeria'),
(3, -11, 'oceania', 'pacific', 'American Samoa'),
(4, 1, 'europe', 'south_west_europe', 'Andorra'),
(5, 1, 'africa', 'southern_africa', 'Angola'),
(6, -4, 'americas', 'west_indies', 'Anguilla'),
(7, 0, 'undecided', 'undecided', 'Antarctica'),
(8, -4, 'americas', 'west_indies', 'Antigua and Barbuda'),
(9, -3, 'americas', 'south_america', 'Argentina'),
(10, 4, 'asia', 'south_west_asia', 'Armenia'),
(11, -4, 'americas', 'west_indies', 'Aruba'),
(12, 10, 'oceania', 'pacific', 'Australia'),
(13, 1, 'europe', 'central_europe', 'Austria'),
(14, 4, 'asia', 'south_asia', 'Azerbaijan'),
(15, -5, 'americas', 'west_indies', 'Bahamas'),
(16, 3, 'asia', 'south_west_asia', 'Bahrain'),
(17, 6, 'asia', 'south_asia', 'Bangladesh'),
(18, -4, 'americas', 'west_indies', 'Barbados'),
(19, 3, 'europe', 'eastern_europe', 'Belarus'),
(20, 1, 'europe', 'western_europe', 'Belgium'),
(21, -6, 'americas', 'central_america', 'Belize'),
(22, 1, 'africa', 'western_africa', 'Benin'),
(23, -4, 'americas', 'west_indies', 'Bermuda'),
(24, 6, 'asia', 'south_asia', 'Bhutan'),
(25, -4, 'americas', 'south_america', 'Bolivia'),
(26, 1, 'europe', 'south_east_europe', 'Bosnia and Herzegovina'),
(27, 2, 'africa', 'southern_africa', 'Botswana'),
(28, -3, 'americas', 'south_america', 'Brazil'),
(29, 6, 'asia', 'south_asia', 'British Indian Ocean Territory'),
(30, -4, 'americas', 'west_indies', 'British Virgin Islands'),
(31, 8, 'asia', 'south_east_asia', 'Brunei'),
(32, 2, 'europe', 'south_east_europe', 'Bulgaria'),
(33, 0, 'africa', 'western_africa', 'Burkina Faso'),
(34, 2, 'africa', 'central_africa', 'Burundi'),
(35, 7, 'asia', 'south_east_asia', 'Cambodia'),
(36, 1, 'africa', 'western_africa', 'Cameroon'),
(37, -5, 'americas', 'north_america', 'Canada'),
(38, -1, 'africa', 'western_africa', 'Cape Verde'),
(39, -5, 'americas', 'west_indies', 'Cayman Islands'),
(40, 1, 'africa', 'central_africa', 'Central African Republic'),
(41, 1, 'africa', 'central_africa', 'Chad'),
(42, -4, 'americas', 'south_america', 'Chile'),
(43, 8, 'asia', 'east_asia', 'China'),
(44, 7, 'asia', 'south_east_asia', 'Christmas Island'),
(45, 6, 'asia', 'south_east_asia', 'Cocos Islands'),
(46, -5, 'americas', 'south_america', 'Colombia'),
(47, 3, 'africa', 'indian_ocean', 'Comoros'),
(48, -10, 'oceania', 'pacific', 'Cook Islands'),
(49, -6, 'americas', 'central_america', 'Costa Rica'),
(50, 1, 'europe', 'south_east_europe', 'Croatia'),
(51, -5, 'americas', 'west_indies', 'Cuba'),
(52, -4, 'americas', 'south_america', 'Curacao'),
(53, 2, 'asia', 'south_west_asia', 'Cyprus'),
(54, 1, 'europe', 'central_europe', 'Czech Republic'),
(55, 1, 'americas', 'west_indies', 'Democratic Republic of the Congo'),
(56, 1, 'europe', 'northern_europe', 'Denmark'),
(57, 3, 'africa', 'eastern_africa', 'Djibouti'),
(58, -4, 'americas', 'west_indies', 'Dominica'),
(59, -4, 'americas', 'west_indies', 'Dominican Republic'),
(60, 9, 'oceania', 'pacific', 'East Timor'),
(61, -5, 'americas', 'south_america', 'Ecuador'),
(62, 2, 'africa', 'northern_africa', 'Egypt'),
(63, -6, 'americas', 'central_america', 'El Salvador'),
(64, 1, 'africa', 'western_africa', 'Equatorial Guinea'),
(65, 3, 'africa', 'eastern_africa', 'Eritrea'),
(66, 2, 'europe', 'eastern_europe', 'Estonia'),
(67, 3, 'africa', 'eastern_africa', 'Ethiopia'),
(68, -3, 'americas', 'south_america', 'Falkland Islands'),
(69, 0, 'europe', 'northern_europe', 'Faroe Islands'),
(70, 12, 'oceania', 'pacific', 'Fiji'),
(71, 2, 'europe', 'northern_europe', 'Finland'),
(72, 1, 'europe', 'western_europe', 'France'),
(73, -3, 'americas', 'south_america', 'French Guiana'),
(74, -10, 'oceania', 'pacific', 'French polynesia'),
(75, 1, 'africa', 'western_africa', 'Gabon'),
(76, 0, 'africa', 'western_africa', 'Gambia'),
(77, 4, 'asia', 'south_west_asia', 'Georgia'),
(78, 1, 'europe', 'western_europe', 'Germany'),
(79, 0, 'africa', 'western_africa', 'Ghana'),
(80, 1, 'europe', 'south_west_europe', 'Gibraltar'),
(81, 2, 'europe', 'south_east_europe', 'Greece'),
(82, -4, 'americas', 'north_america', 'Greenland'),
(83, -4, 'americas', 'west_indies', 'Grenada'),
(84, 10, 'oceania', 'pacific', 'Guam'),
(85, -6, 'americas', 'central_america', 'Guatemala'),
(86, 0, 'europe', 'western_europe', 'Guernsey'),
(87, 0, 'africa', 'western_africa', 'Guinea'),
(88, 0, 'africa', 'western_africa', 'Guinea-Bissau'),
(89, -4, 'americas', 'south_america', 'Guyana'),
(90, -5, 'americas', 'west_indies', 'Haiti'),
(91, -6, 'americas', 'central_america', 'Honduras'),
(92, 8, 'asia', 'east_asia', 'Hong Kong'),
(93, 1, 'europe', 'central_europe', 'Hungary'),
(94, 0, 'europe', 'northern_europe', 'Iceland'),
(95, 5, 'asia', 'south_asia', 'India'),
(96, 7, 'asia', 'south_east_asia', 'Indonesia'),
(97, 3, 'asia', 'south_west_asia', 'Iran'),
(98, 3, 'asia', 'south_west_asia', 'Iraq'),
(99, 0, 'europe', 'western_europe', 'Ireland'),
(100, 0, 'europe', 'western_europe', 'Isle of Man'),
(101, 2, 'asia', 'south_west_asia', 'Israel'),
(102, 1, 'europe', 'southern_europe', 'Italy'),
(103, 0, 'africa', 'western_africa', 'Ivory Coast'),
(104, -5, 'americas', 'west_indies', 'Jamaica'),
(105, 9, 'asia', 'east_asia', 'Japan'),
(106, 0, 'europe', 'western_europe', 'Jersey'),
(107, 2, 'asia', 'south_west_asia', 'Jordan'),
(108, 5, 'asia', 'central_asia', 'Kazakhstan'),
(109, 3, 'africa', 'eastern_africa', 'Kenya'),
(110, 12, 'oceania', 'pacific', 'Kiribati'),
(111, 1, 'europe', 'southern_europe', 'Kosovo'),
(112, 3, 'asia', 'south_west_asia', 'Kuwait'),
(113, 6, 'asia', 'central_asia', 'Kyrgyzstan'),
(114, 7, 'asia', 'south_east_asia', 'Laos'),
(115, 2, 'europe', 'eastern_europe', 'Latvia'),
(116, 2, 'asia', 'south_west_asia', 'Lebanon'),
(117, 2, 'africa', 'southern_africa', 'Lesotho'),
(118, 0, 'africa', 'western_africa', 'Liberia'),
(119, 2, 'africa', 'northern_africa', 'Libya'),
(120, 1, 'europe', 'central_europe', 'Liechtenstein'),
(121, 2, 'europe', 'eastern_europe', 'Lithuania'),
(122, 1, 'europe', 'western_europe', 'Luxembourg'),
(123, 8, 'asia', 'east_asia', 'Macao'),
(124, 1, 'europe', 'south_east_europe', 'Macedonia'),
(125, 3, 'africa', 'indian_ocean', 'Madagascar'),
(126, 2, 'africa', 'southern_africa', 'Malawi'),
(127, 8, 'asia', 'south_east_asia', 'Malaysia'),
(128, 5, 'asia', 'south_asia', 'Maldives'),
(129, 0, 'africa', 'western_africa', 'Mali'),
(130, 1, 'europe', 'southern_europe', 'Malta'),
(131, 12, 'oceania', 'pacific', 'Marshall Islands'),
(132, 0, 'africa', 'western_africa', 'Mauritania'),
(133, 4, 'africa', 'indian_ocean', 'Mauritius'),
(134, 3, 'africa', 'indian_ocean', 'Mayotte'),
(135, -6, 'americas', 'central_america', 'Mexico'),
(136, 11, 'oceania', 'pacific', 'Micronesia'),
(137, 2, 'europe', 'eastern_europe', 'Moldova'),
(138, 1, 'europe', 'western_europe', 'Monaco'),
(139, 7, 'asia', 'northern_asia', 'Mongolia'),
(140, 1, 'europe', 'southern_europe', 'Montenegro'),
(141, -4, 'americas', 'west_indies', 'Montserrat'),
(142, 0, 'africa', 'northern_africa', 'Morocco'),
(143, 2, 'africa', 'southern_africa', 'Mozambique'),
(144, 6, 'asia', 'south_east_asia', 'Myanmar'),
(145, 1, 'africa', 'southern_africa', 'Namibia'),
(146, 12, 'oceania', 'pacific', 'Nauru'),
(147, 6, 'asia', 'south_asia', 'Nepal'),
(148, 1, 'europe', 'western_europe', 'Netherlands'),
(149, -4, 'americas', 'west_indies', 'Netherlands Antilles'),
(150, 11, 'oceania', 'pacific', 'New Caledonia'),
(151, -11, 'oceania', 'pacific', 'New Zealand'),
(152, -6, 'americas', 'central_america', 'Nicaragua'),
(153, 1, 'africa', 'western_africa', 'Niger'),
(154, 1, 'africa', 'western_africa', 'Nigeria'),
(155, -11, 'oceania', 'pacific', 'Niue'),
(156, 8, 'asia', 'east_asia', 'North Korea'),
(157, 10, 'oceania', 'pacific', 'Northern Mariana Islands'),
(158, 1, 'europe', 'northern_europe', 'Norway'),
(159, 4, 'asia', 'south_west_asia', 'Oman'),
(160, 5, 'asia', 'central_asia', 'Pakistan'),
(161, 9, 'oceania', 'pacific', 'Palau'),
(162, 2, 'asia', 'south_west_asia', 'Palestine'),
(163, -5, 'americas', 'central_america', 'Panama'),
(164, 10, 'oceania', 'pacific', 'Papua New Guinea'),
(165, -4, 'americas', 'south_america', 'Paraguay'),
(166, -5, 'americas', 'south_america', 'Peru'),
(167, 8, 'asia', 'south_east_asia', 'Philippines'),
(168, -8, 'oceania', 'pacific', 'Pitcairn'),
(169, 1, 'europe', 'eastern_europe', 'Poland'),
(170, -1, 'europe', 'south_west_europe', 'Portugal'),
(171, -4, 'americas', 'west_indies', 'Puerto Rico'),
(172, 3, 'asia', 'south_west_asia', 'Qatar'),
(173, 1, 'africa', 'central_africa', 'Republic of the Congo'),
(174, 4, 'africa', 'indian_ocean', 'Reunion'),
(175, 2, 'europe', 'south_east_europe', 'Romania'),
(176, 3, 'asia', 'northern_asia', 'Russia'),
(177, 2, 'africa', 'central_asia', 'Rwanda'),
(178, -4, 'americas', 'central_america', 'Saint Barthelemy'),
(179, 0, 'africa', 'western_africa', 'Saint Helena'),
(180, -4, 'americas', 'west_indies', 'Saint Kitts and Nevis'),
(181, -4, 'americas', 'west_indies', 'Saint Lucia'),
(182, -4, 'americas', 'central_america', 'Saint Martin'),
(183, -3, 'americas', '', 'Saint Pierre and Miquelon'),
(184, -4, 'americas', 'west_indies', 'Saint Vincent and the Grenadines'),
(185, 13, 'oceania', 'pacific', 'Samoa'),
(186, 1, 'europe', 'southern_europe', 'San Marino'),
(187, 0, 'africa', 'western_africa', 'Sao Tome and Principe'),
(188, 3, 'asia', 'south_west_asia', 'Saudi Arabia'),
(189, 0, 'africa', 'western_africa', 'Senegal'),
(190, 1, 'europe', 'south_east_europe', 'Serbia'),
(191, 4, 'africa', 'indian_ocean', 'Seychelles'),
(192, 0, 'africa', 'western_africa', 'Sierra Leone'),
(193, 8, 'asia', 'south_east_asia', 'Singapore'),
(194, -4, 'americas', 'central_america', 'Sint Maarten'),
(195, 1, 'europe', 'central_europe', 'Slovakia'),
(196, 1, 'europe', 'south_east_europe', 'Slovenia'),
(197, 11, 'oceania', 'pacific', 'Solomon Islands'),
(198, 3, 'africa', 'eastern_africa', 'Somalia'),
(199, 2, 'africa', 'southern_africa', 'South Africa'),
(200, 9, 'asia', 'east_asia', 'South Korea'),
(201, 3, 'africa', 'northern_africa', 'South Sudan'),
(202, 1, 'europe', 'south_west_europe', 'Spain'),
(203, 5, 'asia', 'south_asia', 'Sri Lanka'),
(204, 3, 'africa', 'northern_africa', 'Sudan'),
(205, -3, 'americas', 'south_america', 'Suriname'),
(206, 1, 'europe', 'northern_europe', 'Svalbard and Jan Mayen'),
(207, 2, 'africa', 'northern_africa', 'Swaziland'),
(208, 1, 'europe', 'northern_europe', 'Sweden'),
(209, 1, 'europe', 'central_europe', 'Switzerland'),
(210, 2, 'asia', 'south_west_asia', 'Syria'),
(211, 8, 'asia', 'east_asia', 'Taiwan'),
(212, 5, 'asia', 'central_asia', 'Tajikistan'),
(213, 3, 'africa', 'eastern_africa', 'Tanzania'),
(214, 7, 'asia', 'south_east_asia', 'Thailand'),
(215, 0, 'africa', 'western_africa', 'Togo'),
(216, 13, 'oceania', 'pacific', 'Tokelau'),
(217, 13, 'oceania', 'pacific', 'Tonga'),
(218, -4, 'americas', 'west_indies', 'Trinidad and Tobago'),
(219, 1, 'africa', 'northern_africa', 'Tunisia'),
(220, 2, 'asia', 'south_west_asia', 'Turkey'),
(221, 5, 'asia', 'central_asia', 'Turkmenistan'),
(222, -4, 'americas', 'west_indies', 'Turks and Caicos Islands'),
(223, 12, 'oceania', 'pacific', 'Tuvalu'),
(224, -4, 'americas', 'central_america', 'U.S. Virgin Islands'),
(225, 3, 'africa', 'eastern_africa', 'Uganda'),
(226, 3, 'europe', 'eastern_europe', 'Ukraine'),
(227, 4, 'asia', 'south_west_asia', 'United Arab Emirates'),
(228, 0, 'europe', 'western_europe', 'United Kingdom'),
(229, -5, 'americas', 'north_america', 'United States'),
(230, -3, 'americas', 'south_america', 'Uruguay'),
(231, 5, 'asia', 'central_asia', 'Uzbekistan'),
(232, 11, 'oceania', 'pacific', 'Vanuatu'),
(233, 1, 'europe', 'southern_europe', 'Vatican'),
(234, -4, 'americas', 'south_america', 'Venezuela'),
(235, 7, 'asia', 'south_east_asia', 'Vietnam'),
(236, 12, 'oceania', 'pacific', 'Wallis and Futuna'),
(237, 0, 'africa', 'northern_africa', 'Western Sahara'),
(238, 3, 'asia', 'south_west_asia', 'Yemen'),
(239, 2, 'africa', 'southern_africa', 'Zambia'),
(240, 2, 'africa', 'southern_africa', 'Zimbabwe');

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`countryCode`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `country`
--
ALTER TABLE `country`
  MODIFY `countryCode` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=242;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

<?php

/**
 * Jcrop image cropping plugin for jQuery
 * Example cropping script
 * @copyright 2008-2009 Kelly Hallman
 * More info: http://deepliquid.com/content/Jcrop_Implementation_Theory.html
 */

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	$jpeg_quality = 90;
	
	if(!isset($_POST['x']) || !is_numeric($_POST['x'])) {
	  die('Please select a crop area.');
	}

	$src = 'images/cropimg.jpg';
	$img_r = imagecreatefromjpeg($src);

	imagecopyresampled($dst_r,$img_r,0,0,$_POST['x'],$_POST['y'],

	header('Content-type: image/jpeg');
	imagejpeg($dst_r,null,$jpeg_quality); // NULL will output the image directly

	exit;
}

?>
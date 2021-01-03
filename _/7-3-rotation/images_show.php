<?php
require 'images_libs.php';

if(!isset($_REQUEST['f']))exit;
$fname=$_REQUEST['f'];
if(preg_match('#(^[^/]|^|/)\.\./#',$fname))exit;

$ext=strtolower(preg_replace('/.*\./','',$fname));
switch($ext){
	case 'gif':
		$mime='image/gif';
		break;
	case 'jpg': case 'jpeg': case 'jpe':
		$mime='image/jpeg';
		break;
	case 'png':
		$mime='image/png';
		break;
	case 'tif': case 'tiff':
		$mime='image/tiff';
		break;
	default:
		exit; // not recognised
}

header('Content-type: '.$ext);

$manipulated=0;
$effects=array('rotate');
foreach($effects as $eff)if(isset($_REQUEST[$eff]))$manipulated=1;

if(!$manipulated)readfile($froot.$fname);
else{
	$image=new Imagick($froot.$fname);
	if(isset($_REQUEST['rotate'])){
		$image->rotateImage(new ImagickPixel(),(int)$_REQUEST['rotate']);
	}
	echo $image;
}

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
readfile($froot.$fname);

<?php
$froot='/home/kae/images';
$md5root='/home/kae/manipulated_images';

function set_image_mime($fname){
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
	return $ext;
}

function get_manipulated_image($fname){
	$image=new Imagick($fname);
	if(isset($_REQUEST['rotate'])){
		$image->rotateImage(new ImagickPixel(),(int)$_REQUEST['rotate']);
	}
	return $image;
}

<?php
require 'images_libs.php';

$params=str_replace($_SERVER['SCRIPT_NAME'].'/','',$_SERVER['REQUEST_URI']);
$pbits=explode('&',$params);
foreach($pbits as $pbit){
	list($name,$val)=explode('=',$pbit);
	$_REQUEST[$name]=$val;
}

if(!isset($_REQUEST['f']))exit;
$fname=$_REQUEST['f'];
if(preg_match('#(^[^/]|^|/)\.\./#',$fname))exit;

$ext=set_image_mime($fname);

header('Cache-Control: max-age = 2592000');
header('Expires-Active: On');
header('Expires: Fri, 1 Jan 2500 01:01:01 GMT');
header('Pragma:');

$md5name=$md5root.'/'.md5($_SERVER['REQUEST_URI']).'.png';
if(file_exists($md5name))readfile($md5name);
else{
	$image=get_manipulated_image($froot.$fname);
	$image->writeImage($md5name);
	echo $image;
}

<?php
require 'images_libs.php';

if(!isset($_REQUEST['f']))exit;
$fname=$_REQUEST['f'];
if(preg_match('#(^[^/]|^|/)\.\./#',$fname))exit;

set_image_mime($fname);

$manipulated=0;
$effects=array('rotate','resize');
foreach($effects as $eff)if(isset($_REQUEST[$eff]))$manipulated=1;

if(!$manipulated)readfile($froot.$fname);
else{
	$image=get_manipulated_image($froot.$fname);
	echo $image;
}

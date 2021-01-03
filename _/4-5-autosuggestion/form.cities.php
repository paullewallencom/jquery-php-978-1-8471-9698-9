<?php
$cities=array(
	'Ireland'=>array(
		'Carlow', 'Cavan', 'Clare', 'Cork', 'Donegal', 'Dublin', 'Galway', 'Kerry', 'Kildare', 'Kilkenny', 'Laois', 'Leitrim', 'Limerick', 'Longford', 'Louth', 'Mayo', 'Meath', 'Monaghan', 'Offaly', 'Roscommon', 'Sligo', 'Tipperary', 'Waterford', 'Westmeath', 'Wexford', 'Wicklow'
	)
);
$found=array();
if(isset($cities[@$_GET['country']])){
	$txt=strtolower(@$_GET['city']);
	$len=strlen($txt);
	foreach($cities[$_GET['country']] as $city){
		if(substr(strtolower($city),0,$len)===$txt)$found[]=addslashes($city);
	}
}
echo "{'cities':[";
if(count($found))echo "'".join("','",$found)."'";
echo "]}";

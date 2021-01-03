<?php
$selected=$_GET['country'];
$countries=array('Ireland', 'Scotland', 'Northern Ireland', 'Wales', 'Britain');
$html='';
$i=$index=0;
foreach($countries as $country){
	if($country==$selected)$index=$i;
	$html.='<option>'.htmlspecialchars($country).'</option>';
	$i++;
}
echo "{'html':'".addslashes($html)."','index':$index}";

<?php
// { initialise variables
// { amount of records to show
$amt=10;
if(isset($_REQUEST['iDisplayLength'])){
	$amt=(int)$_REQUEST['iDisplayLength'];
	if($amt>100 || $amt<10)$amt=10;
}
// }
// { where to start showing the records from
$start=0;
if(isset($_REQUEST['iDisplayStart'])){
	$start=(int)$_REQUEST['iDisplayStart'];
	if($start<0)$start=0;
}
// }
// }
// { connect to database
function dbRow($sql){
	$q=mysql_query($sql);
	$r=mysql_fetch_array($q);
	return $r;
}
function dbAll($sql){
	$q=mysql_query($sql);
	while($r=mysql_fetch_array($q))$rs[]=$r;
	return $rs;
}
mysql_connect('localhost','root','password');
mysql_select_db('phpandjquery');
// }
// { count existing records
$r=dbRow('select count(ccode) as c from cities');
$total_records=$r['c'];
// }
// { start displaying records
echo '{"iTotalRecords":'.$total_records.',"iTotalDisplayRecords":'.$total_records.',"aaData":[';
$rs=dbAll("select ccode,city,longitude,latitude from cities order by ccode,city limit $start,$amt");
$f=0;
foreach($rs as $r){
	if($f++)echo ',';
	echo '["',$r['ccode'],'","',addslashes($r['city']),'","',$r['longitude'],'","',$r['latitude'],'"]';
}
echo ']}';
// }

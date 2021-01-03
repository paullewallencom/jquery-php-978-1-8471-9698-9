<?php
// { initialise variables
$cols=array('ccode','city','longitude','latitude');
// { sort by
$scol=0;
if(isset($_REQUEST['iSortCol_0'])){
	$scol=(int)$_REQUEST['iSortCol_0'];
	if($scol>3 || $scol<0)$scol=0;
}
$sdir='asc';
if(isset($_REQUEST['iSortDir_0'])){
	if($_REQUEST['iSortDir_0']!='asc')$sdir='desc';
}
$scol_name=$cols[$scol];
// }
// { search
$search_sql='';
if(isset($_REQUEST['sSearch']) && ''!=$_REQUEST['sSearch']){
	$stext=addslashes($_REQUEST['sSearch']);
	$search_sql='where ';
	if(strlen($stext)==2)$search_sql.="ccode='$stext' or ";
	$search_sql.="city like '$stext%'";
}
// }
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
// { count records after filtering
$total_after_filter=$total_records;
if($search_sql){
	$r=dbRow("select count(ccode) as c from cities $search_sql");
	$total_after_filter=$r['c'];
}
// }
// { start displaying records
echo '{"iTotalRecords":'.$total_records.',"iTotalDisplayRecords":'.$total_after_filter.',"aaData":[';
$rs=dbAll("select ccode,city,longitude,latitude from cities $search_sql order by $scol_name $sdir limit $start,$amt");
$f=0;
foreach($rs as $r){
	if($f++)echo ',';
	echo '["',$r['ccode'],'","',addslashes($r['city']),'","',$r['longitude'],'","',$r['latitude'],'"]';
}
echo ']}';
// }

<?php
session_start();
if(!isset($_SESSION['calendar']))$_SESSION['calendar']=array(
	'ids'=>0,
);

if(isset($_REQUEST['action'])){
	switch($_REQUEST['action']){
		case 'delete_event': // {
			$id=(int)$_REQUEST['id'];
			if(!isset($_SESSION['calendar'][$id]))exit;
			$d=$_SESSION['calendar'][$id];
			if(@(int)$_REQUEST['recurrences']){
				$start=$d['start'];
				$r=$d['recurring'];
				for($i=1;$i<$_SESSION['calendar']['ids']+1;++$i){
					if(isset($_SESSION['calendar'][$i]))echo $_SESSION['calendar'][$i]['recurring']==$r?'1':'0';
					if(isset($_SESSION['calendar'][$i])
							&& isset($_SESSION['calendar'][$i]['recurring'])
							&& $_SESSION['calendar'][$i]['recurring']==$r
							&& strcmp($_SESSION['calendar'][$i]['start'],$start)>0
					){
						unset($_SESSION['calendar'][$i]);
					}
				}
			}
			unset($_SESSION['calendar'][$id]);
			echo 1;
			exit;
		// }
		case 'get_events': // {
			$arr=array();
			$start=date('c',$_REQUEST['start']);
			$end=date('c',$_REQUEST['end']);
			for($i=1;$i<$_SESSION['calendar']['ids']+1;$i++){
				if(!isset($_SESSION['calendar'][$i]))continue;
				if(strcmp($_SESSION['calendar'][$i]['start'],$end)<1 && strcmp($_SESSION['calendar'][$i]['end'],$start)>-1){
					$d=$_SESSION['calendar'][$i];
					$arr[]=array(
						'id'   =>$i,
						'title'=>$d['title'],
						'start'=>$d['start'],
						'end'  =>$d['end']
					);
				}
			}
			echo '{"events":'.json_encode($arr).'}';
			exit;
		// }
		case 'get_event': // {
			$id=(int)$_REQUEST['id'];
			if(!isset($_SESSION['calendar'][$id]))exit;
			$t=$_SESSION['calendar'][$id];
			$t['id']=$id;
			echo json_encode($t);
			exit;
		// }
		case 'move': // {
			$id=(int)$_REQUEST['id'];
			if(!isset($_SESSION['calendar'][$id]))exit;
			$_SESSION['calendar'][$id]['start']=date('c',(int)$_REQUEST['start']);
			$_SESSION['calendar'][$id]['end']=date('c',(int)$_REQUEST['end']);
			exit;
		// }
		case 'save': // {
			$start_date=(int)$_REQUEST['start'];
			$data=array(
				'title'=>@$_REQUEST['title'],
				'body' =>@$_REQUEST['body'],
				'start'=>date('c',$start_date),
				'end'  =>date('c',(int)$_REQUEST['end'])
			);
			$id=(int)$_REQUEST['id'];
			if($id && isset($_SESSION['calendar'][$id])){
				$_SESSION['calendar'][$id]=$data;
			}
			else{
				$id=++$_SESSION['calendar']['ids'];
				$rec=(int)$_REQUEST['recurring'];
				if($rec)$data['recurring']=$id;
				$_SESSION['calendar'][$id]=$data;
				if($rec && $rec==1 || $rec==7){
					list($y,$m,$d)=explode('-',@$_REQUEST['recurring_end']);
					$length=(int)$_REQUEST['end']-$start_date;
					$end_date=mktime(23,59,59,$m,$d,$y);
					$step=3600*24*$rec;
					for($j=1,$i=$start_date+$step;$i<$end_date;$j++,$i+=$step){
						$data['start']=date('c',$i);
						$data['end']=date('c',$i+$length);
						$_SESSION['calendar'][++$_SESSION['calendar']['ids']]=$data;
					}
				}
			}
			echo 1;
			exit;
		// }
	}
}

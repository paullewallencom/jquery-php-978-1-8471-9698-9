<?php
session_start();
if(!isset($_SESSION['calendar']))$_SESSION['calendar']=array(
	'ids'=>0,
);

if(isset($_REQUEST['action'])){
	switch($_REQUEST['action']){
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
				$_SESSION['calendar'][$id]=$data;
			}
			echo 1;
			exit;
		// }
	}
}

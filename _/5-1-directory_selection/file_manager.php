<?php
$base='/home/kae/uploaded_files/';

if(!isset($_REQUEST['f']))exit;

// { sanitise input
$f=preg_replace('#^/*|/(/)|/$#','\1',$_REQUEST['f']);
if(preg_match('#(^|/)\.\./#',$f))exit;
// }
// { check that selected directory actually exists
if(!file_exists($base.$f))exit;
if(!is_dir($base.$f))exit;
// }

$parent_dirs=array();
$child_dirs=array();
$selectedIndex=0;
$options='<optgroup label="Directories">';
// { generate parents array
if($f!=''){
	$ps=explode('/',preg_replace('#/[^/]*$#','','/'.$f));
	foreach($ps as $p)$parent_dirs[]=$p;
	if(count($ps)){
		$tmp='/';
		foreach($ps as $p){
			$tmp.=$p==''?'':$p.'/';
			$selectedIndex++;
			$options.='<option>'
				.htmlspecialchars($tmp)
				.'</option>';
		}
	}
}
// }
// { selected directory
$options.='<option selected="selected">'
	.htmlspecialchars($f?'/'.$f:'')
	.'/</option>';
// }
// { generate child directories
$d=new DirectoryIterator($base.$f);
foreach($d as $sd){
	if($sd->isDot())continue;
	if(is_dir($base.$f.'/'.$sd))$child_dirs[]=$sd->getFilename();
}
if(count($child_dirs)){
	$tf=$f?$f.'/':'';
	natsort($child_dirs);
	foreach($child_dirs as $cd){
		$options.='<option>/'
			.htmlspecialchars($tf.$cd)
			.'/</option>';
	}
}
// }
$options.='</optgroup>';

echo json_encode(array(
	'options'=>$options,
	'selectedIndex'=>$selectedIndex,
));

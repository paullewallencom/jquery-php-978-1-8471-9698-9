<?php
$html=@$_REQUEST['body'];
function convert_accordions($html){
	if(strpos($html,'<h3')===false)$converted=$html;
	else{ // accordion found
	 $panels=explode('<h3',$html);
	 $converted=array_shift($panels).'<div class="accordion">';
	 foreach($panels as $panel){
	  $panel_bits=explode('</h3>',$panel);
	  $converted.='<h3'.$panel_bits[0].'</h3>';    // header
	  $converted.='<div>'.$panel_bits[1].'</div>'; // panel content
	 }
	 $converted.='</div>';
	}
	return $converted;
}
function convert_tabs($html){
	// add {{TABSTART}}, {{TABEND}} if missing
	if(strpos($html,'{{TABSTART}}')===false)$html='{{TABSTART}}'.$html;
	if(strpos($html,'{{TABEND}}')===false)$html=$html.'{{TABEND}}';
	$tabwidgets=explode('{{TABSTART}}',$html);
	// start by applying accordions to the non-tabs space above the tabs
	$converted=convert_accordions(array_shift($tabwidgets));
	// convert the rest of the space into tabs
	$tabwidgets_num=0;
	foreach($tabwidgets as $widget){
		$widget_bits=explode('{{TABEND}}',$widget);
		// extract individual tab pages
		$panels=explode('{{TABPAGE}}',$widget_bits[0]);
		$tabs=1;
		$tab_c='';
		$menu=array();
		foreach($panels as $panel){
			$menu[]='Page '.$tabs;
			$tab_c.='<div id="tab-'.$tabwidgets_num.'-'.($tabs++).'">'
				.convert_accordions($panel)
				.'</div>';
		}
		$converted.='<div class="tabs"><ul>';
 		foreach($menu as $k=>$v)
		  $converted.='<li><a href="#tab-'.$tabwidgets_num.'-'.($k+1).'">'.$v.'</a></li>';
		$converted.='</ul>'.$tab_c.'</div>'.convert_accordions($widget_bits[1]);
		$tabwidgets_num++;
	}
	return $converted;
}
if(preg_match('/{{TAB(START|END|PAGE)}}/',$html))$converted=convert_tabs($html);
else $converted=convert_accordions($html);
?>
<html>
	<head>
		<script type="text/javascript" src="../jquery.min.js"></script>
		<script type="text/javascript" src="../jquery-ui.min.js"></script>
		<script type="text/javascript">
			$(document).ready(function() {
				$(".accordion").accordion({
					autoHeight:false
				});
				$(".tabs").tabs();
			});
		</script>
		<link rel="stylesheet" type="text/css" href="../jquery-ui.css" />
	</head>
	<body>
<?php
echo $converted;
?>
	</body>
</html>

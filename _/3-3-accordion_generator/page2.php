<?php
$html=@$_REQUEST['body'];
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

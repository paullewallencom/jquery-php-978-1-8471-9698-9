<html>
	<head>
		<script src="../jquery.min.js"></script>
		<script src="../jquery-ui.min.js"></script>
		<script>
			$(document).ready(function(){
				$('#chapters').accordion({
					'active':false,
					'collapsible':true,
					'changestart':function(ev,ui){
						var id=ui.newHeader[0].id;
						var chp=id.replace(/chp/,'');
						$.get('get_chapter.php?chp='+chp,function(res){
							$('#chp'+chp+'-content').html(res);
						});
					}
				});
			});
		</script>
		<style type="text/css">
			@import "../jquery-ui.css";
			h2{text-indent:30px}
		</style>
	</head>
	<body>
		<h1>Great Expectations</h1>
		<div id="chapters">
<?php
$book=file_get_contents('1400-8.txt');
$chapters=preg_match_all('/Chapter /',$book,$arr);
for($i=1;$i<$chapters+1;++$i){
	echo '<h2 id="chp',$i,'">Chapter ',$i,'</h2>';
	echo '<div id="chp',$i,'-content"';
	if($i==1)echo ' style="height:200px"';
	echo '>&nbsp;</div>';
}
?>
		</div>
	</body>
</html>

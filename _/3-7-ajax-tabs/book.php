<html>
	<head>
		<script src="../jquery.min.js"></script>
		<script src="../jquery-ui.min.js"></script>
		<script>
			$(document).ready(function(){
				$('#chapters').tabs();
			});
		</script>
		<style type="text/css">
			@import "../jquery-ui.css";
			#chapters li{padding-bottom:0 !important}
		</style>
	</head>
	<body>
		<h1>Great Expectations</h1>
		<div id="chapters">
			<ul>
<?php
$book=file_get_contents('1400-8.txt');
$chapters=preg_match_all('/Chapter /',$book,$arr);

// tabs list
for($i=1;$i<$chapters+1;++$i){
	echo '<li><a href="get_chapter.php?chp=',$i,'">',$i,'</a></li>';
}
?>
			</ul>
		</div>
	</body>
</html>

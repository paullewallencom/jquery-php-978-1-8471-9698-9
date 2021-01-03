<html>
	<head>
		<script src="../jquery.min.js"></script>
		<script src="../jquery-ui.min.js"></script>
		<script src="../jquery-treeview/jquery.treeview.js"></script>
		<style type="text/css">
			@import '../jquery-treeview/jquery.treeview.css';
			td{vertical-align:top;border:1px solid #000}
		</style>
		<script src="images.js"></script>
	</head>
	<body>
		<table>
			<tr>
				<td><ul id="directory_list"><?php
require 'images_libs.php';
function show_directory($base,$subdir='/'){
	$files=array();
	foreach(new DirectoryIterator($base.$subdir) as $filename){
		if(!$filename->isDot())$files[]=$filename.'';
	}
	natsort($files);
	foreach($files as $filename){
		echo '<li><span title="'
			.htmlspecialchars($subdir.$filename)
			.'" class="';
		if(is_dir($base.$subdir.$filename)){
			echo 'folder">'.htmlspecialchars($filename).'</span><ul>';
			show_directory($base,$subdir.$filename.'/');
			echo '</ul>';
		}
		else echo 'file">'.htmlspecialchars($filename).'</span>';
		echo '</li>';
	}
}
show_directory($froot);
				?></ul></td>
				<td id="image_holder"></td>
			</tr>
			<tr>
				<td id="image_options"></td>
				<td id="image_url"></td>
			</tr>
		</table>
	</body>
</html>

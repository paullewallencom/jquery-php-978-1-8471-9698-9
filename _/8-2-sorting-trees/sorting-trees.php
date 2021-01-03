<?php
session_start();
?>
<html>
	<head>
		<script src="../jquery.min.js"></script>
		<script src="../jquery-ui.min.js"></script>
		<script src="sorting-trees.js"></script>
		<style type="text/css">
			@import '../jquery-ui.css';
			ul{ list-style:none; max-width:160px; margin:0; padding:0; border:1px solid #000; min-height:5px; height:auto !important; height:5px; }
			.placeholder{ height:2px; background:#f00; }
			li{ padding: 2px 0 0 10px; margin:2px; }
			li span{ float:left; }
		</style>
	</head>
	<body>
		<p>Drag the items to sort them. If you reload the page, they will retain that order.</p>
		<ul id="menu_items">
<?php
$menu_items_JSON='[["Home",[]], ["Products",[ ["Time Machine",[]], ["Transmogrifier",[]], ["Duplicator",[]] ]], ["Contact Us",[]], ["About Us",[]] ]';
if(isset($_SESSION['tree_ord']))$menu_items_JSON=$_SESSION['tree_ord'];
function show_items($items){
	foreach($items as $item){
		echo '<li id="menu_item_'.htmlspecialchars($item[0]).'">'
			,htmlspecialchars($item[0]);
		if(count($item[1])){
			echo '<ul>',show_items($item[1]),'</ul>';
		}
		echo '</li>';
	}
}
show_items(json_decode($menu_items_JSON));
?>
		</ul>
	</body>
</html>

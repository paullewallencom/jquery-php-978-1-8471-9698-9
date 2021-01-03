<?php
session_start();
?>
<html>
	<head>
		<script src="../jquery.min.js"></script>
		<script src="../jquery-ui.min.js"></script>
		<script src="sorting-lists.js"></script>
		<style type="text/css">
			@import '../jquery-ui.css';
			ul{ list-style:none; width:160px; margin:0; padding:0; }
			li{ height:18px; padding: 2px 4px; margin:2px; border:1px solid #666; }
			li span{ float:left; }
		</style>
	</head>
	<body>
		<p>Drag the items to sort them. If you reload the page, they will retain that order.</p>
		<ul id="menu_items">
<?php
	// { set up the menu_items array
	$menu_items=array('Home','About Us','Contact Us','Products');
	if(isset($_SESSION['menu_items'])){
		// validate the session array and replace $menu_items with it
		$tmp=$menu_items;
		$menu_items=array();
		foreach($_SESSION['menu_items'] as $item){
			if(!in_array($item,$tmp))continue;
			$menu_items[]=$item;
			unset($tmp[array_search($item,$tmp)]);
		}
		if(count($tmp)){ // session was missing an item
			foreach($tmp as $item)$menu_items[]=$item;
			$_SESSION['menu_items']=$menu_items;
		}
	}
	// }
	foreach($menu_items as $item){
		echo '<li id="menu_item_',htmlspecialchars($item),'">',htmlspecialchars($item),'</li>';
	}
?>
		</ul>
	</body>
</html>

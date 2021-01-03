$(document).ready(function(){
	$('#menu_items li').each(function(){
		if($('ul',this).length)return;
		$('<ul></ul>').appendTo(this);
	});
	$('#menu_items,#menu_items ul').sortable({
			'stop':sl_recordChange,
			'connectWith':['#menu_items,#menu_items ul'],
			'tolerance':'pointer',
			'placeholder':'placeholder',
			'dropOnEmpty':'false'
		})
		.disableSelection();
	$('<span class="ui-icon ui-icon-arrowthick-2-n-s"></span>')
});
function sl_recordChange(){
	var menu=$('#menu_items > li');
	var json='['+sl_getMenuTree(menu)+']';
	$.get('sorting-trees-save.php?ord='+json);
}
function sl_getMenuTree(menu){
	var items=[];
	menu.each(function(){
		var submenu=$('> ul > li',this);
		items.push('["'+this.id.replace(/menu_item_/,'')+'",['+sl_getMenuTree(submenu)+']]');
	});
	return items.join(',');
}

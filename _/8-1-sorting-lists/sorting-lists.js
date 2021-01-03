$(document).ready(function(){
	$('#menu_items').sortable({
			'stop':sl_recordChange
		})
		.disableSelection();
	$('<span class="ui-icon ui-icon-arrowthick-2-n-s"></span>')
		.prependTo($('#menu_items > li'));
});
function sl_recordChange(ev,d){
	var item=d.item[0];
	var p=item.parentNode;
	var ord=[];
	$('#'+p.id+' > li').each(function(){
		ord.push(this.id.replace(/menu_item_/,''));
	});
	$.get('sorting-lists-save.php?ord='+ord);
}

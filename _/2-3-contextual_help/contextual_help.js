$(document).ready(contextual_help_setup);
function contextual_help_setup(){
	$('<a id="ch_opener" href="javascript:;">?</a>')
		.click(contextual_help_toggle)
		.appendTo(document.body);
}
function contextual_help_toggle(){
	if(document.contextual_help_active){
		$('.contextual_help_links').remove();
		document.contextual_help_active=false;
		return;
	}
	$('<a href="javascript:;" class="contextual_help_links">?</a>')
		.click(contextual_help_call)
		.appendTo($('.contextual_help'));
	document.contextual_help_active=true;
}
function contextual_help_call(){
	var parent_class=this.parentNode.className;
	var help_to_get=parent_class
		.replace(/contextual_help ([^ ]*)( |$)/,'$1');
	$.getJSON(
		'contextual_help.php?name='+help_to_get,
		contextual_help_show
	);
}
function contextual_help_show(data){
	var parent_el=$('.'+data.name);
	if(!parent_el.length)return;
	var pos=parent_el.position();
	var style='left:'+pos.left+'px;top:'+(pos.top+parent_el.height())+'px;';
	$('<div class="contextual_help_result" style="'+style+'">'+data.help+'</div>').appendTo(parent_el);
	$(document.body).click(contextual_help_hide);
}
function contextual_help_hide(){
	$(document.body).unbind('click',contextual_help_hide);
	$('.contextual_help_result').remove();
}

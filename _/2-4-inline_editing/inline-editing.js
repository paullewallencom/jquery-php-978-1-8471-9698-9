$(document).ready(inline_editing_init);
function inline_editing_init(){
	$('#subscribers .edit').remove();
	$('#subscribers .name,#subscribers .email')
		.click(inline_editing_edit);
}
function inline_editing_edit(){
	if(this.in_edit)return;
	this.in_edit=true;
	var str=$(this).html();
	var w=$(this).innerWidth();
	this.originalHTML=str;
	$(this).empty();
	$('<input>')
		.attr('value',str)
		.blur(inline_editing_save)
		.keypress(inline_editing_key_pressed)
		.css('width',w)
		.appendTo(this)
		.focus();
}
function inline_editing_save(){
	var id,field_name,p;
	p=this.parentNode;
	if(p.originalHTML==this.value)
		return inline_editing_restore(p);
	field_name=p.className;
	id=$(this).closest('tr')[0].id.replace(/.*_/,'');
	$.getJSON(
		'ajax_inline-editing.php',
		{'id':id,'field_name':field_name,'value':this.value},
		inline_editing_callback
	);
}
function inline_editing_key_pressed(e){
	if(!e.which)inline_editing_restore(this.parentNode);
}
function inline_editing_restore(el){
	$(el).html(el.originalHTML);
	el.in_edit=false;
}
function inline_editing_callback(data){
	var el=$('#subscriber_'+data.id+' .'+data.field_name)[0];
	if(!data.success){
		inline_editing_restore(el);
		return alert(data.error);
	}
	$(el)
		.empty()
		.text(data.value);
	el.in_edit=false;
}

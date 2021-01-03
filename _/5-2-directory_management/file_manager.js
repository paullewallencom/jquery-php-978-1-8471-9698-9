function fm_getFiles(){
	var fname=$('select[name="selected_file"]').attr('value');
	$.getJSON('file_manager.php?f='+fname,fm_updateValues);
}
function fm_updateValues(vals){
	$('select[name="selected_file"]')
		.html(vals.options)
		.attr('selectedIndex',vals.selectedIndex);
	fm_changeOptions();
}
function fm_changeOptions(){
	var html='<option> -- </option>';
	var val=$('select[name="selected_file"]').attr('value');
	html+='<option>new sub-directory</option>';
	if(val!='/'){
		html+='<option>rename directory</option>'
		     +'<option>delete directory</option>';
	}
	$('#selected_file_options').html(html);
}
function fm_runAction(){
	switch($('#selected_file_options').attr('value')){
		case 'new sub-directory':
			fm_addSubdirectory();
			break;
		case 'rename directory':
			fm_renameDirectory();
			break;
		case 'delete directory':
			fm_deleteDirectory();
			break;
	}
}
function fm_addSubdirectory(){
	var n=prompt('new sub-directory\'s name:');
	if(!n)return;
	if(/[^a-zA-Z-_0-9 ]/.test(n))return alert('invalid character(s). please only use a-z, A-Z, -, _, 0-9, or space');
	var fname=$('select[name="selected_file"]').attr('value');
	$.getJSON('file_manager.php?f='+fname+'&a=newDir&n='+n,fm_updateValues);
}
function fm_renameDirectory(){
	var fname=$('select[name="selected_file"]').attr('value');
	var n=prompt('rename directory to what?',fname.replace(/.*\/(.*)\/$/,'$1'));
	if(!n)return;
	if(/[^a-zA-Z-_0-9 ]/.test(n))return alert('invalid character(s). please only use a-z, A-Z, -, _, 0-9, or space');
	$.getJSON('file_manager.php?f='+fname+'&a=renameDir&n='+n,fm_updateValues);
}
function fm_deleteDirectory(){
	if(!confirm('are you sure you want to delete this directory?'))return;
	var fname=$('select[name="selected_file"]').attr('value');
	$.getJSON('file_manager.php?f='+fname+'&a=delDir',fm_updateValues);
}
$(document).ready(function(){
	fm_getFiles();
	$('select[name="selected_file"]').change(fm_getFiles);
	$('<select id="selected_file_options"></select>')
		.insertAfter($('select[name="selected_file"]'))
		.change(fm_runAction);
});

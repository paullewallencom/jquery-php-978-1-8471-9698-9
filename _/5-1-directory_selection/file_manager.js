function fm_getFiles(){
	var fname=$('select[name="selected_file"]').attr('value');
	$.getJSON('file_manager.php?f='+fname,fm_updateValues);
}
function fm_updateValues(vals){
	$('select[name="selected_file"]')
		.html(vals.options)
		.attr('selectedIndex',vals.selectedIndex);
}
$(document).ready(function(){
	fm_getFiles();
	$('select[name="selected_file"]').change(fm_getFiles);
});

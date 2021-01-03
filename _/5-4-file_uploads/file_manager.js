function fm_getFiles(selector){
	if(typeof selector!=='string')selector='select[name="selected_file"]';
	var fname=$(selector).attr('value');
	if(fname=='' || /\/$/.test(fname)){
		$.getJSON('file_manager.php?f='+fname,function(vals){
			vals.selector=selector;
			fm_updateValues(vals);
		});
	}
	else fm_changeOptions();
}
function fm_updateValues(vals){
	var selector=(typeof vals.selector=='string')
		?vals.selector
		:'select[name="selected_file"]';
	$(selector)
		.html(vals.options)
		.attr('selectedIndex',vals.selectedIndex);
	if(!$(selector).hasClass('noactions'))fm_changeOptions();
}
function fm_changeOptions(){
	var html='<option> -- </option>';
	var val=$('select[name="selected_file"]').attr('value');
	var is_dir=/\/$/.test(val);
	if(is_dir){
		html+='<option>new sub-directory</option>'
	       +'<option>upload file</option>';
		if(val!='/'){
			html+='<option>rename directory</option>'
			     +'<option>delete directory</option>'
					 +'<option>move directory to</option>';
		}
	}
	$('#selected_file_options').html(html);
	$('#selected_file_extras').empty();
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
		case 'move directory to':
			fm_moveDirectorySetup();
			break;
		case 'upload file':
			fm_uploadFileSetup();
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
function fm_moveDirectorySetup(){
	var orig=$('select[name="selected_file"]');
	var extras=$('#selected_file_extras');
	$('<select id="selected_file_todir" class="noactions"><option>'
			+orig.attr('value').replace(/[^\/]*\/$/,'')
			+'</option></select>')
		.appendTo(extras)
		.change(function(){
			fm_getFiles('#selected_file_todir');
		});
	$('<input type="button" value="move" />')
		.appendTo(extras)
		.click(fm_moveDirectory);
	fm_getFiles('#selected_file_todir');
}
function fm_moveDirectory(){
	var from=$('select[name="selected_file"]').attr('value');
	var to=$('#selected_file_todir').attr('value');
	if(from==to || to.indexOf(from)==0)return alert('cannot move directory into itself');
	if(from.replace(/[^\/]*\/$/,'')==to)return alert('already in that directory');
	$.getJSON('file_manager.php?f='+from+'&a=moveDir&t='+to,fm_updateValues);
}
function fm_uploadFileSetup(){
	var extras=$('#selected_file_extras');
	$('<input id="fm_file" type="hidden" />')
		.appendTo(extras)
	$('#fm_file').fileUpload ({
		'uploader':'../jquery.uploadify-v1.6.2/uploader.swf',
		'script':'file_manager.php',
		'cancelImg':'../jquery.uploadify-v1.6.2/cancel.png',
		'auto':true,
		'multi':true,
		'buttonImg':'browse.png',
		'scriptData': {
			'f':$('select[name="selected_file"]').attr('value'),
			'a':'uploadFile'
		},
		'fileDataName':'file',
		'width':79,
		'height':23,
		'onComplete':function(a,b,c,d,e){
			fm_updateValues(eval('('+d+')'));
		}
	});
}
$(document).ready(function(){
	fm_getFiles();
	$('select[name="selected_file"]').change(function(){
		fm_getFiles();
	});
	$('<select id="selected_file_options"></select>')
		.insertAfter($('select[name="selected_file"]'))
		.change(fm_runAction);
	$('<span id="selected_file_extras"></span>')
		.insertAfter($('#selected_file_options'));
});

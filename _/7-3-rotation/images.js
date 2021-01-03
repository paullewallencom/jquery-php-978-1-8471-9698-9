function images_selectImage(imgurl){
	window.image={
		'url':imgurl,
		'effects':[]
	};
	images_showImage();
	images_setupOptions();
}
function images_setupOptions(){
	var opts=['reset','rotate'],i;
	var html='<select id="image_options_select">';
	for(i=0;i<opts.length;++i){
		html+='<option>'+opts[i]+'</option>';
	}
	html+='</select>';
	$(html)
		.change(images_changeOption)
		.appendTo($('#image_options').empty());
	$('<span id="effect_options"></span>').appendTo($('#image_options'));
}
function images_showImage(){
	var url='images_show.php?f='+image.url;
	for(var eff in image.effects)url+='&'+eff+'='+image.effects[eff];
	$('#image_holder').html('<img src="'+url+'" />');
}
function images_changeOption(){
	var opt=$('#image_options_select').attr('value');
	switch(opt){
		case 'reset':
			return images_selectImage(image.url);
		case 'rotate':
			return images_showRotateOptions();
	}
}
function images_showRotateOptions(){
	var deg=0,i;
	if(image.effects.rotate)deg=image.effects.rotate;
	var html='<select id="rotate_value">';
	for(i=0;i<360;i+=90){
		html+='<option';
		if(i==deg)html+=' selected="selected"';
		html+='>'+i+'</option>';
	}
	html+='</select>';
	$(html)
		.change(images_changeRotation)
		.appendTo($('#effect_options').empty());
}
function images_changeRotation(){
	image.effects.rotate=$('#rotate_value').attr('value');
	images_showImage();
}
$(document).ready(function(){
	$("#directory_list").treeview({
		'collapsed':true
	});
	$('.file').click(function(){
		images_selectImage($(this).attr('title'));
	});
});

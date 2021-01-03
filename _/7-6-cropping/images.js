function images_selectImage(imgurl){
	window.image={
		'url':imgurl,
		'effects':[]
	};
	images_showImage();
	images_setupOptions();
}
function images_setupOptions(){
	var opts=['reset','resize','rotate'],i;
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
	var params='f='+image.url;
	for(var eff in image.effects)if(image.effects[eff]!=undefined){
		params+='&'+eff+'='+image.effects[eff];
	}
	var url='images_show.php?'+params;
	$('#image_holder').empty();
	$('#image_url').html('<a href="'
		+document.location.toString().replace(/[^\/]*$/,'get.php/'+params)
		+'">permanent URL</a>');
	var img=new Image();
	img.onload=function(){
		$('#image_holder').append(this);
		var deg=0;
		if(image.effects.rotate)deg=image.effects.rotate;
		var opts={'onSelect':images_updateCropCoords};
		if(image.crop)opts.setSelect=image.crop[(360-deg)%360];
		$('#image_holder img').Jcrop(opts);
	}
	img.src=url;
}
function images_updateCropCoords(c){
	var x,y,x2,y2;
	var deg=0,img=$('#image_holder img');
	if(image.effects.rotate)deg=image.effects.rotate;
	var curw=img.attr('width'),curh=img.attr('height');
	var cs=[
		[c.x,c.y,c.x2,c.y2],
		[c.y,curw-c.x2,c.y2,curw-c.x],
		[curw-c.x2,curh-c.y2,curw-c.x,curh-c.y],
		[curh-c.y2,c.x,curh-c.y,c.x2]
	];
	if(!deg)image.crop={0:cs[0],90:cs[1],180:cs[2],270:cs[3]};
	if(deg==90)image.crop={0:cs[1],90:cs[2],180:cs[3],270:cs[0]};
	if(deg==180)image.crop={0:cs[2],90:cs[3],180:cs[0],270:cs[1]};
	if(deg==270)image.crop={0:cs[3],90:cs[0],180:cs[1],270:cs[2]};
	image.effects.crop=image.crop[0];
	images_showImage();
}
function images_changeOption(){
	var opt=$('#image_options_select').attr('value');
	switch(opt){
		case 'reset':
			return images_selectImage(image.url);
		case 'resize':
			return images_showResizeOptions();
		case 'rotate':
			return images_showRotateOptions();
	}
}
function images_showResizeOptions(){
	var inps,sideways=image.sideways;
	var img=$('#image_holder img');
	var curw=img.attr('width');
	var curh=img.attr('height');
	if(!image.width || !image.height){
		image.width=curw;
		image.height=curh;
		image.aspect=curw/curh;
	}
	var inp1='<input id="image_width" size="4" value="'+(sideways?curh:curw)+'" />';
	var inp2='<input id="image_height" size="4" value="'+(sideways?curw:curh)+'" />';
	if(sideways)inps=inp2+'x'+inp1;
	else inps=inp1+'x'+inp2;
	$('<span>'+inps+'</span>')
		.appendTo($('#effect_options').empty());
	$('#effect_options input').keyup(function(){
		if(this.id=='image_width'){
			var w= +this.value;
			var h= w/image.aspect;
			document.getElementById('image_height').value=parseInt(h);
		}
		else{
			var h= +this.value;
			var w= h*image.aspect;
			document.getElementById('image_width').value=parseInt(w);
		}
	});
	$('#effect_options input').change(images_resizeImage);
}
function images_resizeImage(){
	var w=parseInt(document.getElementById('image_width').value);
	var h=parseInt(document.getElementById('image_height').value);
	if(w<1 || h<1)image.effects.resize=undefined;
	else image.effects.resize=w+'x'+h;
	images_showImage();
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
	var deg=$('#rotate_value').attr('value');
	image.effects.rotate=deg;
	if(deg==90 || deg==270)image.sideways=true;
	else image.sideways=false;
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

function images_selectImage(imgurl){
	window.image={
		'url':imgurl,
		'effects':[]
	};
	images_showImage();
}
function images_showImage(){
	$('#image_holder').html('<img src="images_show.php?f='+image.url+'" />');
}
$(document).ready(function(){
	$("#directory_list").treeview({
		'collapsed':true
	});
	$('.file').click(function(){
		images_selectImage($(this).attr('title'));
	});
});

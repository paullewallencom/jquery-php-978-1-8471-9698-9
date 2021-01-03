$(document).ready(function() {
	$('#calendar_wrapper').weekCalendar({
		'height':function($calendar){
			return $('#calendar_wrapper')[0].offsetHeight;
		}
	});
});

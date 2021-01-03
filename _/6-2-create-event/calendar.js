$(document).ready(function() {
	$('#calendar_wrapper').weekCalendar({
		'height':function($calendar){
			return $('#calendar_wrapper')[0].offsetHeight;
		},
		'eventNew':function(calEvent, $event) {
			calendar_new_entry(calEvent,$event);
		}
	});
});
function calendar_new_entry(calEvent,$event){
	var ds=calEvent.start, df=calEvent.end;
	$('<div id="calendar_new_entry_form" title="New Calendar Entry">event name<br /><input value="new event" id="calendar_new_entry_form_title" /><br />body text<br /><textarea style="width:400px;height:200px" id="calendar_new_entry_form_body">event description</textarea></div>').appendTo($('body'));
	$("#calendar_new_entry_form").dialog({
		bgiframe: true,
		autoOpen: false,
		height: 440,
		width: 450,
		modal: true,
		buttons: {
			'Save': function() {
				var $this=$(this);
				$.getJSON('./calendar.php?action=save&id=0&start='+ds.getTime()/1000+'&end='+df.getTime()/1000,{
						'body':$('#calendar_new_entry_form_body').val(),
						'title':$('#calendar_new_entry_form_title').val()
					},
					function(ret){
						$this.dialog('close');
						$('#calendar_wrapper').weekCalendar('refresh');  
						$("#calendar_new_entry_form").remove();
					}
				);
			},
			Cancel: function() {
				$event.remove();
				$(this).dialog('close');
				$("#calendar_new_entry_form").remove();
			}
		},
		close: function() {
			$('#calendar').weekCalendar('removeUnsavedEvents');
			$("#calendar_new_entry_form").remove();
		}
	});
	$("#calendar_new_entry_form").dialog('open');
}


$(document).ready(function() {
	$('#calendar_wrapper').weekCalendar({
		'eventClick':function(calEvent, $event) {
			calendar_edit_entry(calEvent,$event);
		},
		'data':'./calendar.php?action=get_events',
		'eventDrop':function(calEvent, $event) {
			$.getJSON('./calendar.php?action=move',{'id':calEvent.id,'start':calEvent.start.getTime()/1000,'end':calEvent.end.getTime()/1000},null);
		},
		'eventResize':function(calEvent, $event) {
			$.getJSON('./calendar.php?action=move',{'id':calEvent.id,'start':calEvent.start.getTime()/1000,'end':calEvent.end.getTime()/1000},null);
		},
		'height':function($calendar){
			return $('#calendar_wrapper')[0].offsetHeight;
		},
		'eventNew':function(calEvent, $event) {
			calendar_new_entry(calEvent,$event);
		}
	});
});
function calendar_delete_entry(id){
	if(confirm('are you sure you want to delete this entry?')){
		$('#calendar_edit_entry_form').remove();
		$.getJSON('./calendar.php?action=delete_event&id='+id,function(ret){
			$('#calendar_wrapper').weekCalendar('refresh');
		});
	}
}
function calendar_delete_recurrences(id){
	if(confirm('This will delete this entry and all following recurrences of this entry\nAre you sure you want to do this?')){
		$('#calendar_edit_entry_form').remove();
		$.getJSON('./calendar.php?action=delete_event&id='+id+'&recurrences=1',function(ret){
			$('#calendar_wrapper').weekCalendar('refresh');
		});
	}
}
function calendar_edit_entry(calEvent,$event){
	if(!calEvent.id)return;
	var ds=calEvent.start, df=calEvent.end;
	$.getJSON('./calendar.php?action=get_event&id='+calEvent.id,function(eventdata){
		var controls='<a href="javascript:calendar_delete_entry('+eventdata.id+');">[delete]</a>';
		if(+eventdata.recurring)controls+='<br /><a href="javascript:calendar_delete_recurrences('+eventdata.id+')">[stop recurring]</a>';
		$('<div id="calendar_edit_entry_form" title="Edit Calendar Entry"><div style="float:right;text-align:right">'+controls+'</div>event name<br /><input id="calendar_edit_entry_form_title" value="'+eventdata.title+'" /><br />body text<br /><textarea style="width:400px;height:200px" id="calendar_edit_entry_form_body">'+eventdata.body+'</textarea></div>').appendTo($('body'));
		$("#calendar_edit_entry_form").dialog({
			bgiframe: true,
			autoOpen: false,
			height: 440,
			width: 450,
			modal: true,
			buttons: {
				'Save': function() {
					var $this=$(this);
					$.getJSON('./calendar.php?action=save&id='+eventdata.id+'&start='+ds.getTime()/1000+'&end='+df.getTime()/1000,{'body':$('#calendar_edit_entry_form_body').val(),'title':$('#calendar_edit_entry_form_title').val()},function(ret){
						$this.dialog('close');
						$('#calendar_wrapper').weekCalendar('refresh');  
						$('#calendar_edit_entry_form').remove();
					});
				},
				Cancel: function() {
					$(this).dialog('close');
					$("#calendar_edit_entry_form").remove();
				}
			},
			close: function() {
				$("#calendar_edit_entry_form").remove();
			}
		});
		$("#calendar_edit_entry_form").dialog('open');
	});
}
function calendar_new_entry(calEvent,$event){
	var ds=calEvent.start, df=calEvent.end;
	var recurbox='<select id="calendar_new_entry_form_recurring"><option value="0">non-recurring</option><option value="1">Daily</option><option value="7">Weekly</option></select>';
	$('<div id="calendar_new_entry_form" title="New Calendar Entry">event name<br /><input value="new event" id="calendar_new_entry_form_title" /><br />body text<br /><textarea style="width:400px;height:200px" id="calendar_new_entry_form_body">event description</textarea>'+recurbox+'</div>')
		.appendTo($('body'));
	$('#calendar_new_entry_form_recurring')
		.change(calendar_new_get_recurring_end);
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
						'title':$('#calendar_new_entry_form_title').val(),
						'recurring':$('#calendar_new_entry_form_recurring').val(),
						'recurring_end':$('#calendar_new_recurring_end').val()
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
function calendar_new_get_recurring_end(){
	var year = new Date().getFullYear();
	var month = new Date().getMonth();
	var day = new Date().getDate();
	if(document.getElementById('calendar_new_recurring_end'))return;
	$('<span> until <input id="calendar_new_recurring_end" value="'+year+'-'+(month+1)+'-'+day+'" style="font-size:14px" class="date" /></span>').insertAfter('#calendar_new_entry_form_recurring');
	$('.date').datepicker({'dateFormat':"yy-mm-dd",'yearRange': '-10:+50','changeYear':true});
}

<?php require 'form.libs.php'; ?>
<html>
	<head>
		<script src="../jquery.min.js"></script>
		<script src="../jquery-validate/jquery.validate.min.js"></script>
		<script>
			$(document).ready(function(){
				$('#registration_form').validate({
					'rules': <?php echo json_encode($form_rules); ?>,
					'messages': {
						'email': { 'remote': 'That email address has already been registered.' }
					}
				});
				$('select[name="country"]').focus(function(){
					if($('option',this).length<2)
						$.getJSON('form.countries.php?country=' +
							$(this).attr('value'),form_setCountries);
				});
				$('input[name="city"]').keyup(form_citySearch_delayed);
			});
			function form_citySearch(){
				var country=$('select[name="country"]').attr('value');
				var txt=$('input[name="city"]').attr('value');
				$.getJSON('form.cities.php?country='+country+'&city='+txt,form_citySearch_show);
			}
			function form_citySearch_delayed(){
				if(window.citySearchTimeout)clearTimeout(window.citySearchTimeout);
				window.citySearchTimeout=setTimeout(form_citySearch,500);
			}
			function form_citySearch_show(res){
				if($('#citysearch_list'))$('#citysearch_list').remove();
				if(!res.cities || !res.cities.length)return;
				var el=$('input[name="city"]');
				var pos=$('input[name="city"]').position();
				var style='position:absolute;left:'+pos.left+'px;top:'+(pos.top+el.height())+'px;border:1px solid #000;background:#fff';
				var html='';
				for(idx in res.cities){
					var city=res.cities[idx];
					html+='<a href="javascript:;" onclick="$(\'input[name=city]\').attr(\'value\',\''+city+'\')">'+city+'</a><br />';
				}
				$('<div id="citysearch_list" style="'+style+'">'+html+'</div>').appendTo(el[0].parentNode);
				$(document.body).click(function(){
					$('#citysearch_list').remove();
				});
			}
			function form_setCountries(res){
				$('select[name="country"]')
					.html(res.html)
					.attr('selectedIndex',res.index);
			}
		</script>
	</head>
	<body>
		<form id="registration_form" method="post" action="form.submit.php">
			<table>
				<tr><th>Email</th><td><input name="email" /></td></tr>
				<tr><th>Password</th><td><input type="password" name="password" /></td></tr>
				<tr><th>Password (repeat)</th><td><input type="password" id="password2" name="password2" /></td></tr>
				<tr><th>Country</th><td><select name="country"><option selected="selected">Ireland</option></select></td></tr>
				<tr><th>City</th><td><input name="city" /></td></tr>
				<tr><th colspan="2"><input type="submit" /></th></tr>
			</table>
		</form>
	</body>
</html>

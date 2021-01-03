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
			});
		</script>
	</head>
	<body>
		<form id="registration_form" method="post" action="form.submit.php">
			<table>
				<tr><th>Email</th><td><input name="email" /></td></tr>
				<tr><th>Password</th><td><input type="password" name="password" /></td></tr>
				<tr><th>Password (repeat)</th><td><input type="password" id="password2" name="password2" /></td></tr>
				<tr><th colspan="2"><input type="submit" /></th></tr>
			</table>
		</form>
	</body>
</html>
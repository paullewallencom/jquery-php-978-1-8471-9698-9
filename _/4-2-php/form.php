<?php require 'form.libs.php'; ?>
<html>
	<head>
		<script src="../jquery.min.js"></script>
		<script src="../jquery-validate/jquery.validate.min.js"></script>
		<script>
			$(document).ready(function(){
				$('#contact_form').validate({
					'rules': <?php echo json_encode($form_rules); ?>
				});
			});
		</script>
	</head>
	<body>
		<form id="contact_form" method="post" action="form.submit.php">
			<table>
				<tr><th>Name</th><td><input name="name" /></td></tr>
				<tr><th>Email</th><td><input name="email" /></td></tr>
				<tr><th>Job Status</th><td><select name="job_status">
					<option value=""> -- please choose -- </option>
					<option>Unemployed</option>
					<option>Employed</option>
					<option>Retired</option>
				</select></td></tr>
				<tr><th>Comments</th><td><textarea name="comments"></textarea></td></tr>
				<tr><th colspan="2"><input type="submit" /></td></tr>
			</table>
		</form>
	</body>
</html>

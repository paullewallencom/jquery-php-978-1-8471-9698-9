<?php
require 'form.libs.php';

function get_errors($form_data,$rules){
	// returns an array of errors
	$errors=array();
	foreach($form_data as $name=>$value){
		if(!isset($rules[$name]))continue;
		$hname=htmlspecialchars($name);
		$rule=$rules[$name];
		if(isset($rule['required']) && $rule['required'] && !$value)
			$errors[]='Field '.$hname.' is required.';
		if(isset($rule['minlength']) && strlen($value)<$rule['minlength'])
			$errors[]=$hname.' should be at least '.$rule['minlength'].' characters in length.';
		if(isset($rule['email']) && $rule['email'] && !filter_var($value,FILTER_VALIDATE_EMAIL))
			$errors[]=$hname.' must be an email address.';
		$rules[$name]['found']=true;
	}
	foreach($rules as $name=>$values){
		if(!isset($values['found']) && isset($values['required']) && $values['required'])
			$errors[]='Field '.htmlspecialchars($name).' is required.';
	}
	return $errors;
}
$errors=get_errors($_POST,$form_rules);
if(!count($errors)){
	// save the data, or post it, or whatever
	echo 'success';
}
else{
	// errors found
	echo '<strong>Errors found in form:</strong><ul><li>';
	echo join('</li><li>',$errors);
	echo '</ul><p>Please go back and correct your errors.</p>';
}

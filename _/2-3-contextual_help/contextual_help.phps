<?php

$name=@$_REQUEST['name'];
switch($name){
	case 'email': // {
		$help='Enter your email address here.<br />Please note that it will be verified, so make sure it is correct.';
		break;
	// }
	case 'name': // {
		$help='Enter your full name here. No more than 255 letters, please!';
		break;
	// }
	default: // {
		$help='Unknown help requested: '.$name;
	// }
}

echo '{"name":"'.addslashes($name).'","help":"'.addslashes($help).'"}';

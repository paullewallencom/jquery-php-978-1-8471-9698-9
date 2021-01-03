<?php
switch(@$_REQUEST['country']){
	case 'ie': // { ireland
		$cities=array('Cork', 'Dublin', 'Galway', 'Limerick',
		      'Waterford');
		break;
	// }
	case 'uk': // { United Kingdom
		$cities=array('Bath', 'Birmingham', 'Bradford',
		      'Brighton &amp; Hove', 'Bristol',
					      'Cambridge', 'Canterbury', 'Carlisle',
								      'Chester', 'Chichester', 'Coventry',
											      'Derby', 'Durham', 'Ely', 'Exeter',
														      'Gloucester', 'Hereford', 'Kingston upon Hull',
																	      /* and on and on! */
																				      'Newport', 'St David\'s', 'Swansea');

		break;
	// }
	default: // { else
		$cities=false;
	// }
}
if(!$cities)echo 'please choose a country first';
else echo '<select name="city"><option>'.join('</option><option>',$cities).'</select>';

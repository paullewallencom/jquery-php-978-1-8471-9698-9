<?php
$id=(int)@$_REQUEST['id'];
echo ( !($id%2) )?
	"{'id':$id,'success':1}":
	"{'id':$id,'success':0,'error':'Could not delete subscriber'}";

<?php
$id=(int)@$_REQUEST['id'];
$field_name=addslashes(@$_REQUEST['field_name']);
$value=addslashes(@$_REQUEST['value']);
echo ( !($id%2) )?
	"{'id':$id,'field_name':'$field_name','success':1,'value':'$value'}":
	"{'id':$id,'field_name':'$field_name','success':0,'error':'Could not save data'}";

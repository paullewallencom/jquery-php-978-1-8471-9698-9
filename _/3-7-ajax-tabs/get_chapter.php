<?php
$book_url='1400-8.txt';
$book=file_get_contents($book_url);
$chapters=explode('Chapter ',$book);
$to_get=isset($_REQUEST['chp'])?(int)$_REQUEST['chp']:1;
if(!isset($chapters[$to_get]))die("no such chapter");

$chapter=$chapters[$to_get];
$chapter=str_replace("\r\n\r\n","</p><p>",$chapter);
$chapter=preg_replace('/^[^<]*<\/p>/','',$chapter);

echo $chapter.'</p>';

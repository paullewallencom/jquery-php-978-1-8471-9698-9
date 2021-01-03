<?php
session_start();

if(!isset($_GET['ord']))exit;
$_SESSION['menu_items']=explode(',',$_GET['ord']);

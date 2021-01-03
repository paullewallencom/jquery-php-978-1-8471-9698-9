<?php
session_start();

if(!isset($_GET['ord']))exit;
$_SESSION['tree_ord']=$_GET['ord'];

<?php

$dbh = new PDO('mysql:host=localhost:3308;dbname=sub100', "root", "");
$dbh->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

define('ROOT_SITE', $_SERVER['DOCUMENT_ROOT'].'/desafio-fullstack/');

?>
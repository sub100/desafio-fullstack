<?php

$dbh = new PDO('mysql:host=localhost:3308;dbname=sub100', "root", "");
$dbh->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

?>
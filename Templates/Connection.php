<?php
$slot = 'JEBANYPIDARASIIDITENAHUI';
	try {
		$db = new PDO('mysql:host=localhost;dbname=csgo', 'root', 'mysql', array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

	} catch (PDOException $e) {
		exit($e->getMessage());
	}
?>
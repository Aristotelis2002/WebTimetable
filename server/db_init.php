<?php
require_once "helpers.php";

//creating the database
$dbHost = config('db_host');
$dbName = config('db_init_database');
$userName = config('db_username');
$userPassword = config('db_password');

try {
    $conn = new PDO("mysql:host=$dbHost;", $userName, $userPassword);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "DROP DATABASE IF EXISTS `$dbName`; CREATE DATABASE `$dbName` COLLATE utf8_general_ci";
    // use exec() because no results are returned
    $conn->exec($sql);
    echo "Database created successfully.\n";
} catch(PDOException $e) {
    echo $e->getMessage();
}

$conn = null;

//creating the schema
require_once "db.php";
$db = new Db('');
$cnn = $db->getInitConnection();

$stmt = $cnn->prepare(file_get_contents(config("db_schema")));

echo ($stmt->execute() ? "Success" : "Failure"). " on schema creation.\n";
$stmt->closeCursor();
?>
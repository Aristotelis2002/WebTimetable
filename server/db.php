<?php
/*$conn = new PDO('mysql:host=localhost;dbname=webproject', 'root', '');
$sql = "SELECT * FROM users";
$query = $conn->query($sql) or die("failed!");
while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
 echo $row['username'] . "\n";
}*/
?>
<?php

class Db
{
    private $connection;
    private $tableName;
    private $dbName;

    public function __construct($tableName)
    {
        $dbhost = "localhost";
        $userName = "root";
        $userPassword = "";
        $this->dbName = "webproject";

        $this->connection = new PDO("mysql:host=$dbhost;dbname=$this->dbName", $userName, $userPassword);
          /*  [
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]);
			*/
        $this->tableName = $tableName;
    }

    public function getConnection()
    {
        return $this->connection;
    }
	public function escapeString($input) {
		return addslashes($input);
	}
	public function query($sql) {
		$stmt = $this->connection->prepare($sql);
		$stmt->execute();
		return $stmt;
	}
}

function getUser($id) // Don't use!
{
    $db = new Db('users'); 

    $id = $db->escapeString($id);

    $sql = "SELECT * FROM users WHERE userId = $id";
    $result = $db->query($sql);
	//echo implode(" ", $result);
    if ($result->rowCount() > 0) {
        $user = $result->fetch(PDO::FETCH_ASSOC);
        return $user;
    } else {
        return null;
    }
}

function doesUserExist($username) {
	$db = new Db('users'); 
	$username = $db->escapeString($username);
	$sql = "SELECT * FROM users WHERE username = '$username'";
    $result = $db->query($sql);
	if ($result->rowCount() > 0) {
        return true;
    } else {
        return false;
    }
}

function correctUsernameAndPassword($username, $password) {
	$db = new Db('users'); 
	$username = $db->escapeString($username);
	$password = $db->escapeString($password);
	$sql = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
    $result = $db->query($sql);
	if ($result->rowCount() > 0) {
        return true;
    } else {
        return false;
    }
}

function getAdminStatus($username) {
	$db = new Db('users'); 
	$username = $db->escapeString($username);
	$sql = "SELECT admin FROM users WHERE username = '$username'";
    $result = $db->query($sql);
	if ($result->rowCount() > 0) {
        $adminStatus = $result->fetch(PDO::FETCH_ASSOC);
        return $adminStatus;
    } else {
        return null;
    }
}

function addUserToDB($username, $fn, $password){
	$db = new Db('users'); 
	$username = $db->escapeString($username);
	$password = $db->escapeString($password);
	$sql = "INSERT INTO `users` (`userId`, `fn`, `username`, `password`, `admin`) VALUES (NULL, '', '', '', '')";
}

// Example usage:
/*
$userData = getUser("1");

if ($userData !== null) {
    print_r($userData);
} else {
    echo "User not found.";
}*/
?>

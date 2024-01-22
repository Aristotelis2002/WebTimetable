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

function convertDateFormatToSQL($inputDate) {
	 $date = DateTime::createFromFormat('d.m.Y', $inputDate);
    
    if ($date) {
        // Convert the date to the desired format
        $outputDate = $date->format('Y-m-d');
        return $outputDate;
    } else {
        // Invalid input date format
        return "Invalid date format. Please use DD.MM.YYYY.";
    }
}

function convertSQLDateFormatToJS($inputDate) {
	 $date = DateTime::createFromFormat('Y-m-d', $inputDate);
     
    if ($date) {
        // Convert the date to the desired format
        $outputDate = $date->format('d.m.Y');
        return $outputDate;
    } else {
        // Invalid input date format
        return "Invalid date format";
    }
}


function getUserIdByUsername($username) {
	$db = new Db('users'); 
	$username = $db->escapeString($username);
	$sql = "SELECT userId FROM users WHERE username = '$username'";
    $result = $db->query($sql);
	if ($result->rowCount() > 0) {
        $id = $result->fetch(PDO::FETCH_ASSOC);
        return $id;
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
	$fn = $db->escapeString($fn);
	$password = $db->escapeString($password);
	$sql = "INSERT INTO `users` (`userId`, `fn`, `username`, `password`, `admin`) VALUES (NULL, '$fn', '$username', '$password', '0')";
	$result = $db->query($sql);
	return  $result->fetch(PDO::FETCH_ASSOC); // maybe error causing
}

function addPresentationToDB($orderId, $date, $hour, $fn , $groupStudent, $name, $topicId, $topic){
	$db = new Db('presentations'); 
	$date = convertDateFormatToSQL($date);
	$fn = $db->escapeString($fn);
	$name = $db->escapeString($name);
	$topic = $db->escapeString($topic);
	$sql = "INSERT INTO `presentations` (`id`, `orderId`, `date`, `hour`, `fn`, `groupStudent`, `name`, `topicId`, `topic`) VALUES (NULL, '$orderId', '$date', '$hour', '$fn' , '$groupStudent' , '$name' , '$topicId', '$topic')";
	$result = $db->query($sql);
	return  $result->fetch(PDO::FETCH_ASSOC); // maybe error causing
}

function getAllPresentations(){
	$db = new Db('presentations'); 
	$sql = "SELECT `orderId`, `date`, `hour`, `fn`, `groupStudent`, `name`, `topicId`, `topic`  FROM `presentations`";
    $result = $db->query($sql);
	if ($result->rowCount() > 0) {
        $presentationsRows = $result->fetchAll(PDO::FETCH_ASSOC);
        return $presentationsRows;
    } else {
        return null;
    }
}

function fixAllDates($presentations) {
	foreach ($presentations as &$value) {
		if (isset($value["date"])){
			$value["date"] = convertSQLDateFormatToJS($value["date"]);	
		}
	}
	return $presentations;
}

function fixEmptyInts($presentations) {
	foreach ($presentations as &$value) {
		if ($value["fn"] == '') {
			$value["groupStudent"] = '';
		}
		if ($value["topicId"] == 0) {
			$value["topicId"] = '';
		}
	}
	return $presentations;
}

function extractEverythingButDate($arrayPresnetation) {
	$res = [];
	foreach($arrayPresnetation as $key => $value){
		if($key != "date") {
			array_push($res, $value);
		}
	}
	return $res;
}

function turnPresentationsIntoDict($presentations) {
	$dictionary = [];

	foreach ($presentations as $subArray) {
		if (isset($subArray["date"])) {
			$keyDict = $subArray["date"];
			if(!array_key_exists($keyDict, $dictionary)){
				$dictionary[$keyDict] = [];
			}
			array_push($dictionary[$keyDict], extractEverythingButDate($subArray));
		}
	}
	return $dictionary;
}

function dropAllPresentations() {
	$db = new Db('presentations'); 
	$sql = "TRUNCATE TABLE presentations";
    $result = $db->query($sql);
	return  $result->fetch(PDO::FETCH_ASSOC);
}

function dropAllInterests() {
	$db = new Db('interests'); 
	$sql = "TRUNCATE TABLE interests";
    $result = $db->query($sql);
	return  $result->fetch(PDO::FETCH_ASSOC);
}

function getPresentationId($fn) {
	$db = new Db('presentations'); 
	$fn = $db->escapeString($fn);
	$sql = "SELECT id FROM presentations WHERE fn = '$fn'";
    $result = $db->query($sql);
	if ($result->rowCount() > 0) {
        $id = $result->fetch(PDO::FETCH_ASSOC);
        return $id;
    } else {
        return null;
    }
}

function addInterestToDb($userId, $presentationId, $interestString) {
	$db = new Db('interests'); 
	$interestString = $db->escapeString($interestString);
	//$sql = "INSERT INTO `interests` (`id`, `userId`, `presentationId`, `interestType`) VALUES (NULL, '$userId', '$presentationId', '$interestString')";
	$sql = "UPDATE `interests` SET `interestType` = '$interestString' WHERE `userId` = '$userId' AND `presentationId` = '$presentationId'";
	$sql2 = "INSERT INTO `interests` (`id`, `userId`, `presentationId`, `interestType`) SELECT NULL, '$userId', '$presentationId', '$interestString' WHERE ROW_COUNT() = 0";
	$result = $db->query($sql);
	$result->fetch(PDO::FETCH_ASSOC);
	$result2 = $db->query($sql2);
	$result2->fetch(PDO::FETCH_ASSOC);
	return  $result2;
}

function getAllInterests(){
	$db = new Db('interests'); 
	$sql = "SELECT userId, presentationId, interestType FROM interests";
    $result = $db->query($sql);
	if ($result->rowCount() > 0) {	
        $interestsRow = $result->fetchAll(PDO::FETCH_ASSOC);
        return $interestsRow;
    } else {
        return null;
    }
}

function getUserInterests($userId) {
	$db = new Db('interests'); 
	$sql = "SELECT orderId, date, hour, fn, groupStudent, name, topicId, topic FROM interests JOIN presentations ON presentations.id = presentationId WHERE interests.userId = '$userId'" ;
    $result = $db->query($sql);
	if ($result->rowCount() > 0) {	
        $interestsRow = $result->fetchAll(PDO::FETCH_ASSOC);
        return $interestsRow;
    } else {
        return null;
    }
}

function getPresentationById($presentationId) {
	$db = new Db('presentations'); 
	$presentationId = $db->escapeString($presentationId);
	$sql = "SELECT * FROM presentations WHERE id = '$presentationId'";
    $result = $db->query($sql);
	if ($result->rowCount() > 0) {
        $presentation = $result->fetch(PDO::FETCH_ASSOC);
        return $presentation;
    } else {
        return null;
    }
}

?>

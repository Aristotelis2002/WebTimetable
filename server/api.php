<?php
require "db.php";
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Content-Type: application/json');

$response = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

	$action = isset($_POST['action']) ? $_POST['action'] : null;
	switch ($action) {
		case 'login':
            $username = isset($_POST['username']) ? $_POST['username'] : null;
			$password = isset($_POST['password']) ? $_POST['password'] : null;

			if ($username !== null && $password !== null) {
				$response = login($username, $password);
			} else {
				// If either username or password is missing
				$response = array('error' => 'Both username and password are required.');
			}
            break;

        case 'register':
            $username = isset($_POST['username']) ? $_POST['username'] : null;
            $fn = isset($_POST['fn']) ? $_POST['fn'] : null;
			$password = isset($_POST['password']) ? $_POST['password'] : null;
            $response = register($username, $fn, $password);
            break;

		case 'get_admin_status':
			$username = isset($_POST['username']) ? $_POST['username'] : null;
			$adminStatus = getAdminStatus($username);
			if($adminStatus === null) {
				$response = array('error' => 'Admin status is null');
			}
			$response = array('adminStatus' => $adminStatus);
			break;
			
		case 'presentations':
			$postData = isset($_POST['data']) ? $_POST['data'] : null;
			$decoded_json = json_decode($postData, true);

			foreach ($decoded_json as $key => $value) {
				foreach($value as $row) {
					$msg = addPresentationToDB($row[0], $key, $row[1], $row[2] , $row[3], $row[4], $row[5], $row[6]);
				}
			}
			$response = array('message' => 'success');
			
		case 'load_presentations':
			$result = getAllPresentations();
			if ($result == null) {
				$response = array('error' => 'Data base is empty');
				break;
			}
			$result = fixAllDates($result);
			$result = fixEmptyInts($result);
			$dict = turnPresentationsIntoDict($result);
			$response = json_encode($dict);
			break;
			
		case 'drop_presentations':
			dropAllPresentations();
			$response = array('message' => 'success');
			break;
		
		case 'drop_interests':
			dropAllInterests();
			$response = array('message' => 'success');
			break;
			
		case 'get_presentation_id':
			$fn = isset($_POST['fn']) ? $_POST['fn'] : null;
			$result = getPresentationId($fn);
			if ($result == null) {
				$response = array('error' => 'Fn not found, no Id to return');
			}
			$response = $result;
			break;
		
		case 'get_user_id':
			$username = isset($_POST['username']) ? $_POST['username'] : null;
			$result = getUserIdByUsername($username);
			if ($result == null) {
				$response = array('error' => 'Username not found, no Id to return');
			}
			$response = $result;
			break;
			
		case 'add_interest':
			$userId = isset($_POST['userId']) ? $_POST['userId'] : null;
            $presentationId = isset($_POST['presentationId']) ? $_POST['presentationId'] : null;
			$interestString = isset($_POST['interestString']) ? $_POST['interestString'] : null;
            $response = addInterestToDb($userId, $presentationId, $interestString);
			break;
			
		case 'get_interests':
			$userId = isset($_POST['userId']) ? $_POST['userId'] : null;
			$result = getUserInterests($userId);
			if ($result == null) {
				$response = array('error' => 'Data base is empty, no interests found');
				break;
			}
			$response = json_encode($result);
			break;

        default:
            $response = array('error' => 'Invalid action. Fail at js fetch to api.php');
            break;
	}
    
} 
// Output the response as JSON
echo json_encode($response);

function login($username, $password) {
    if(!doesUserExist($username)) {
		return array('error' => 'Username or password is incorrect.');
	}
	if (!correctUsernameAndPassword($username, $password)) {
		return array('error' => 'Username or password is incorrect.');
	}
	$adminStatus = getAdminStatus($username);
	if($adminStatus === null) {
		return array('error' => 'Admin status is null');
	}
    return array('message' => 'Login successful for ' . $username, 'adminStatus' => $adminStatus);
}

function register($username, $fn, $password) {
	if(doesUserExist($username)) {
		return array('error' => 'Username is already used.');
	}
	$output = addUserToDB($username, $fn, $password);
	return array('message' => 'Registration successful for ' . $username, 'DBresponse' => $output);
}

?>
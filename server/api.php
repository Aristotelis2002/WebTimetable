<?php
require "db.php";
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Content-Type: application/json');

$response = null;
// Check if it's a POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve the POST data
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

        default:
            // If the provided action is not recognized
            $response = array('error' => 'Invalid action. Fail at js fetch to api.php');
            break;
	}
    
} /* else {
    $response = array('error' => 'Invalid request method.');  //not needed probably
} */

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

// header('Content-Type: application/json');

// Check if a "action" parameter is provided in the request
/*
if (isset($_GET['action'])) {
    $action = $_GET['action'];

    // Perform different actions based on the provided "action" parameter
    switch ($action) {
        case 'get_user':
            if (isset($_GET['username']) && isset($_GET['password'])) {
			$username = $_GET['username'];
			$password = $_GET['password'];

			// Process the GET request based on the provided username and password
			$response = array('message' => "Hello, $username! Your hashed password is $password.");
		} else {
			// If either username or password parameter is missing
			$response = array('error' => 'Both username and password parameters are required.');
		}
            break;

        case 'create_user':
            // Handle the "create_user" action
            $username = isset($_POST['username']) ? $_POST['username'] : null;
            $password = isset($_POST['password']) ? $_POST['password'] : null;
            $response = createUser($username, $password);
            break;

        default:
            // If the provided action is not recognized
            $response = array('error' => 'Invalid action');
            break;
    }
} else {
    // If no "action" parameter is provided
    $response = array('error' => 'Action parameter is missing');
}

// Output the response as JSON
echo json_encode($response);

// Example function to get user information


// Example function to create a new user
function createUser($username, $password) {
    // Implement logic to create a new user based on $username and $password
    // Return success message or an error message
    return array('message' => 'User created successfully');
}*/
?>
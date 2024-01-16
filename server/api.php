<?php
require "db.php";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Check if it's a POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve the POST data
    $username = isset($_POST['username']) ? $_POST['username'] : null;
    $password = isset($_POST['password']) ? $_POST['password'] : null;

    if ($username !== null && $password !== null) {
        $response = login($username, $password);
    } else {
        // If either username or password is missing
        $response = array('error' => 'Both username and password are required.');
    }
} else {
    // If it's not a POST request
    $response = array('error' => 'Invalid request method.');
}

// Output the response as JSON
echo json_encode($response);

// Example function to process login logic
function login($username, $password) {
    // Implement your login logic here
    // For demonstration purposes, just returning a success message
    return array('message' => 'Login successful for ' . $username);
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
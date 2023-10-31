<?php
session_start(); // Start a new session or resume the existing session

include "./203-db.php";

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Set response headers
// Allow requests from any origin during development (not recommended for production)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header('Access-Control-Allow-Credentials: true');
header("Content-Type: application/json");

function handleLogin($conn)
{
    // Check if JSON data is present in the request
    $data = json_decode(file_get_contents('php://input'), true);

    // Check if JSON data is successfully decoded
    if (is_array($data) && isset($data['email']) && isset($data['password'])) {
        $email = $data['email'];
        $password = $data['password'];

        // SQL query to check if the provided 'email' and 'password' match a candidate record
        $sql = "SELECT * FROM candidate WHERE email = '$email' AND password = '$password'";

        // Execute the query
        $result = mysqli_query($conn, $sql);

        // Check if the query was successful
        if (!$result) {
            $response = array('error' => 'Query failed: ' . mysqli_error($conn));
            echo json_encode($response);
        } else {
            // Check if any matching record was found
            if (mysqli_num_rows($result) > 0) {
                // Candidate is authenticated
                $candidate_data = mysqli_fetch_assoc($result);

                // Return the candidate data in the response
                echo json_encode($candidate_data);
            } else {
                // Authentication failed
                $response = array('error' => 'Authentication failed');
                echo json_encode($response);
            }
        }
    } else {
        $response = array('error' => 'Incomplete login request');
        echo json_encode($response);
    }
}


function handleLogout()
{
    // Destroy the session to log out the user or candidate
    session_destroy();

    // Return a logout success message
    $response = array('message' => 'Logout successful');
    echo json_encode($response);
}

// Check for the 'request' parameter in the URL
if (isset($_GET['request'])) {
    $request = $_GET['request'];

    if ($request === "user_management") {
        // SQL query to retrieve all data from User_Management
        $sql = "SELECT * FROM candidate";

        // Execute the query
        $result = mysqli_query($conn, $sql);

        // Check if the query was successful
        if (!$result) {
            $response = array('error' => 'Query failed: ' . mysqli_error($conn));
            echo json_encode($response);
        } else {
            $data = array();
            while ($row = mysqli_fetch_assoc($result)) {
                $data[] = $row;
            }
            echo json_encode($data);
        }
    } elseif ($request === "login") {
        // Handle login request for both users and candidates
        handleLogin($conn);
    } elseif ($request === "logout") {
        // Handle logout request
        handleLogout();
    } else {
        $response = array('error' => 'Invalid request');
        echo json_encode($response);
    }
} else {
    $response = array('error' => 'No request specified');
    echo json_encode($response);
}

// Close the database connection
mysqli_close($conn);
?>
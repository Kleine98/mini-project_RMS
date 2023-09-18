<?php
include "./aws-db.php";



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

// Check for the 'request' parameter in the URL
if (isset($_GET['request'])) {
    $request = $_GET['request'];

    if ($request === "user_management") {
        // SQL query to retrieve all data from User_Management
        $sql = "SELECT * FROM User_Management";

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
        // Handle login request 
        handleLogin($conn);




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




function handleLogin($conn)
{
    // Check if 'id' and 'password' are present in the request
    if (isset($_POST['id']) && isset($_POST['password'])) {
        $id = $_POST['id'];
        $password = $_POST['password'];

        // SQL query to check if the provided 'id' and 'password' match a record
        $sql = "SELECT * FROM User_Management WHERE id = '$id' AND password = '$password'";

        // Execute the query
        $result = mysqli_query($conn, $sql);

        // Check if the query was successful
        if (!$result) {
            $response = array('error' => 'Query failed: ' . mysqli_error($conn));
            echo json_encode($response);
        } else {
            // Check if any matching record was found
            if (mysqli_num_rows($result) > 0) {
                // User is authenticated
                $response = array('message' => 'Authentication successful');
                echo json_encode($response);
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

?>
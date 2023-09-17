<?php
include "./db.php";



// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Set response headers
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
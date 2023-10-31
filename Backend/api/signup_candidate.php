<?php

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

function handleSignup($conn)
{
    // Check if JSON data is present in the request
    $data = json_decode(file_get_contents('php://input'), true);

    // Check if JSON data is successfully decoded
    if (is_array($data)) {
        $id = $data['id'];
        $name = $data['name'];
        $lname = $data['lname'];
        $email = $data['email'];
        $password = $data['password'];
        $tel = $data['tel'];
        $address = $data['address'];
        $register_date = $data['register_date'];

        // SQL query to insert a new candidate record
        $sql = "INSERT INTO candidate (id, name, lname, email, password, tel, address, register_date)
                VALUES ($id,'$name', '$lname', '$email', '$password', '$tel', '$address', '$register_date')";

        // Execute the query
        if (mysqli_query($conn, $sql)) {
            $sql = "INSERT INTO candidate_queue (no, candidate_id)
            VALUES ($id, $id)";

            mysqli_query($conn, $sql);

            $response = array('message' => 'Signup successful');
            echo json_encode($response);
        } else {
            $response = array('error' => 'Signup failed: ' . mysqli_error($conn));
            echo json_encode($response);
        }
    } else {
        $response = array('error' => 'Incomplete signup request');
        echo json_encode($response);
    }
}


// Check for the 'request' parameter in the URL
if (isset($_GET['request'])) {
    $request = $_GET['request'];

    if ($request === "signup") {
        handleSignup($conn);
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
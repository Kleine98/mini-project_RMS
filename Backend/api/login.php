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
    // Check if 'id' and 'password' are present in the request
    if (isset($_POST['id']) && isset($_POST['password'])) {
        $id = $_POST['id'];
        $password = $_POST['password'];

        // SQL query to check if the provided 'id' and 'password' match a record
        $sql = "SELECT UM.*, P.permission_name, P.permission,
                    E.id AS employee_id, E.name, E.lname, E.email, E.tel, E.address, E.join_date, E.experience, E.employee_position_id,
                    M.employee_id AS manager_employee_id
                FROM user_management UM
                LEFT JOIN employee E ON UM.employee_id = E.id
                LEFT JOIN employee_position PO ON E.employee_position_id = PO.no
                LEFT JOIN permission P ON PO.permission_id = P.id
                LEFT JOIN manager M ON UM.employee_id = M.employee_id
                WHERE UM.id = '$id' AND UM.password = '$password'";

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
                $user_data = mysqli_fetch_assoc($result);

                // Store user data in the session
                $_SESSION['user'] = $user_data;

                // Return the user data in the response
                echo json_encode($user_data);
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
    // Destroy the session to log out the user
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
        $sql = "SELECT * FROM user_management";

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
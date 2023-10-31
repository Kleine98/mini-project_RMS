<?php
include "../203-db.php";

// Set response headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header('Access-Control-Allow-Credentials: true');
header("Content-Type: application/json");

// Function to update the status and add comments for a job request
function ApplyJob($conn)
{
    $data = json_decode(file_get_contents('php://input'), true);
    $requestId = $data['request_id'];
    $id = $data['id'];

    $query = "UPDATE candidate SET request_id = $requestId WHERE id = $id";

    return mysqli_query($conn, $query);
}

// Handle HTTP requests
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'PUT':
        if (ApplyJob($conn)) {
            $response = array('message' => 'Job apply successfully');
            echo json_encode($response);
        } else {
            $response = array('error' => 'Failed to apply job');
            echo json_encode($response);
        }
        break;
    default:
        $response = array('error' => 'Invalid request method');
        echo json_encode($response);
        break;
}

// Close the database connection
mysqli_close($conn);
?>
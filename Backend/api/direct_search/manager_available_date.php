<?php
include "../203-db.php";

// Set response headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header('Access-Control-Allow-Credentials: true');
header("Content-Type: application/json");

function getManagersAvailableDate($conn)
{
    // Receive JSON data from the request body
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['manager_ids'])) {
        $response = array('error' => 'Manager IDs are missing in the request data.');
        echo json_encode($response);
        return;
    }

    // Check if manager_ids is a string
    if (is_string($data['manager_ids'])) {
        $managerIds = explode(',', $data['manager_ids']);

        // Prepare an array to store placeholders
        $placeholders = array_fill(0, count($managerIds), '?');

        // Prepare the SQL query with placeholders
        $sql = "SELECT available_date
                FROM available_date
                WHERE manager_id IN (" . implode(',', $placeholders) . ")
                GROUP BY available_date
                HAVING COUNT(DISTINCT manager_id) = " . count($managerIds);

        // Use a prepared statement to execute the query
        $stmt = $conn->prepare($sql);

        // Bind the parameters using the manager IDs
        $stmt->bind_param(str_repeat('i', count($managerIds)), ...$managerIds);

        // Execute the query
        $stmt->execute();

        // Get the results
        $result = $stmt->get_result();

        if ($result === false) {
            $response = array('error' => 'Query failed: ' . $stmt->error);
            echo json_encode($response);
        } else {
            $data = array();
            while ($row = $result->fetch_assoc()) {
                $data[] = $row['available_date'];
            }
            echo json_encode($data);
        }

        // Close the prepared statement
        $stmt->close();
    } else {
        $response = array('error' => 'Manager IDs must be provided as a string.');
        echo json_encode($response);
    }
}

// Handle HTTP requests
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'POST': // This should be a POST request
        getManagersAvailableDate($conn);
        break;
    default:
        $response = array('error' => 'Invalid request method');
        echo json_encode($response);
        break;
}

// Close the database connection
mysqli_close($conn);
?>
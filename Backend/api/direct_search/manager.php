<?php
include "../203-db.php";

// Set response headers
// Allow requests from any origin during development (not recommended for production)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header('Access-Control-Allow-Credentials: true');
header("Content-Type: application/json");


function getManager($conn)
{
    $sql = "SELECT * FROM employee EMP
    JOIN manager M ON M.employee_id = EMP.id
    JOIN employee_position P ON P.no = EMP.employee_position_id
    JOIN department DEPT ON DEPT.id = P.department_id";


    $result = mysqli_query($conn, $sql);

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
}


// Handle HTTP requests
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        getManager($conn);
        break;
    default:
        // Invalid request method
        $response = array('error' => 'Invalid request method');
        echo json_encode($response);
        break;
}

// Close the database connection
mysqli_close($conn);

?>
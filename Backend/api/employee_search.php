<?php
include "./aws-db.php";

// Set response headers
// Allow requests from any origin during development (not recommended for production)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header('Access-Control-Allow-Credentials: true');
header("Content-Type: application/json");

// Function to get employee by ID
function getEmployeeById($conn, $id)
{
    // Ensure the provided ID is safe to use in a SQL query
    $id = mysqli_real_escape_string($conn, $id);

    // Construct the SQL query with a parameterized query
    $sql = "SELECT 
            Employee.id AS employee_id, 
            Employee.*, 
            Department.name AS department_name,
            Employee_Position.name AS position_name,
            User_Management.id as user_id, 
            User_Management.*, 
            Permission.*
        FROM Employee
        JOIN User_Management ON Employee.id = User_Management.employee_id
        JOIN Permission ON User_Management.id = Permission.user_id
        JOIN Employee_Position ON Employee.position_id = Employee_Position.id
        JOIN Department ON Employee.department_id = Department.id
        WHERE Employee.id = '$id'"; // Use single quotes around the ID

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
        // Get the 'id' parameter from the query string
        $id = $_GET['id'];
        getEmployeeById($conn, $id);
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
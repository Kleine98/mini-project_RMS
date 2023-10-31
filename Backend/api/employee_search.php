<?php
include "./selected-db.php";

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
            employee.id AS employee_id, 
            employee.*, 
            department.department_name AS department_name,
            employee_position.position_name,  -- Select position_name directly
            user_management.id as user_id, 
            user_management.*, 
            P.*,
            GROUP_CONCAT(skills.skill_name) AS skills
        FROM employee
        JOIN user_management ON employee.id = user_management.employee_id
        JOIN employee_position ON employee.employee_position_id = employee_position.no
        JOIN department ON employee_position.department_id = department.id
        LEFT JOIN employee_skill_list ON employee.id = employee_skill_list.employee_id
        LEFT JOIN employee_skill_list_to_skills ON employee_skill_list.no = employee_skill_list_to_skills.employee_skill_list_id
        LEFT JOIN skills ON employee_skill_list_to_skills.skill_id = skills.id
        LEFT JOIN permission P ON employee_position.permission_id = P.id
        WHERE employee.id = '$id' 
        GROUP BY employee.id"; // Use single quotes around the ID

    $result = mysqli_query($conn, $sql);

    if (!$result) {
        $response = array('error' => 'Query failed: ' . mysqli_error($conn));
        echo json_encode($response);
    } else {
        $data = array();
        while ($row = mysqli_fetch_assoc($result)) {
            // Split the skills string into an array
            $row['skills'] = explode(',', $row['skills']);
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
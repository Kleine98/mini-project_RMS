<?php
// Include your database connection script (e.g., "../203-db.php").
include "../203-db.php";

// Set response headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header('Access-Control-Allow-Credentials: true');
header("Content-Type: application/json");

// Function to calculate insights
// ...

// Function to calculate insights
function calculateInsights($conn)
{
    // Initialize data array to store insights
    $insights = array();

    // Modify the SQL query to join the tables as per your reference query
    $query = "SELECT
        d.department_name,
        s.skill_name,
        COUNT(e.id) AS employee_count,
        tc.total_employees,
        (COUNT(e.id) * 100.0 / tc.total_employees) AS percentage_of_employees
        FROM department d
        LEFT JOIN employee_position ep ON d.id = ep.department_id
        LEFT JOIN employee e ON ep.no = e.employee_position_id
        LEFT JOIN employee_skill_list esl ON e.id = esl.employee_id
        LEFT JOIN employee_skill_list_to_skills esls ON esl.no = esls.employee_skill_list_id
        LEFT JOIN skills s ON esls.skill_id = s.id
        LEFT JOIN (
            SELECT
            d.department_name,
            COUNT(e.id) AS total_employees
            FROM department d
            LEFT JOIN employee_position ep ON d.id = ep.department_id
            LEFT JOIN employee e ON ep.no = e.employee_position_id
            GROUP BY d.department_name
            ) 
        tc ON d.department_name = tc.department_name
        GROUP BY d.department_name, s.skill_name
        ORDER BY d.department_name, employee_count DESC";

    $result = mysqli_query($conn, $query);

    if ($result) {
        while ($row = mysqli_fetch_assoc($result)) {
            // Format percentage_of_employees with two decimal places
            $row['percentage_of_employees'] = number_format($row['percentage_of_employees'], 2);
            $insights[] = $row;
        }
    }

    return $insights;
}




// Handle HTTP requests
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $insights = calculateInsights($conn);
        echo json_encode($insights);
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
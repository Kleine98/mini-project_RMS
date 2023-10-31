<?php
// Include your database connection script (e.g., "../selected-db.php").
include "../selected-db.php";

// Set response headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header('Access-Control-Allow-Credentials: true');
header("Content-Type: application/json");

// Function to fetch a job application by request ID
function fetchJobApplicationById($conn, $requestId)
{
    // Modify the SQL query to join the necessary tables and filter by request ID
    $query = "SELECT
        r.id AS request_id,
        r.date AS request_date,
        r.status AS request_status,
        r.exp AS request_experience,
        r.amount AS request_amount,
        r.employee_position_id AS request_employee_position_id,
        r.requester_id AS request_requester_id,
        r.approver_id AS request_approver_id,
        r.comment AS comment,
        d.department_name AS request_department_name,
        ep.position_name AS request_position_name,
        e.name AS requester_name,
        e.lname AS requester_lname,
        e.email AS requester_email,
        e.tel AS requester_tel,
        e.address AS requester_address,
        e.join_date AS requester_join_date,
        e.experience AS requester_experience,
        ep.permission_id AS request_permission_id,
        p.permission_name AS request_permission_name,
        p.permission AS request_permission,
        GROUP_CONCAT(DISTINCT s.skill_name) AS required_skills
    FROM request r
    LEFT JOIN department d ON r.employee_position_id = d.id
    LEFT JOIN employee_position ep ON r.employee_position_id = ep.no
    LEFT JOIN employee e ON r.requester_id = e.id
    LEFT JOIN permission p ON ep.permission_id = p.id
    LEFT JOIN request_skill_list rsl ON r.id = rsl.request_id
    LEFT JOIN request_skill_list_to_skills rsls ON rsl.no = rsls.request_skill_list_id
    LEFT JOIN skills s ON rsls.skill_id = s.id
    WHERE r.status = 'Approved' -- Only fetch Approved job requests
    AND r.id = '$requestId'"; // Filter by request ID

    $result = mysqli_query($conn, $query);

    if ($result) {
        $row = mysqli_fetch_assoc($result);
        return $row;
    }

    return null; // Job not found
}

// Function to fetch all job application announcements
function fetchJobApplications($conn)
{
    $jobApplications = array();

    // Modify the SQL query to join the necessary tables
    $query = "SELECT
        r.id AS request_id,
        r.date AS request_date,
        r.status AS request_status,
        r.exp AS request_experience,
        r.amount AS request_amount,
        r.employee_position_id AS request_employee_position_id,
        r.requester_id AS request_requester_id,
        r.approver_id AS request_approver_id,
        r.comment AS comment,
        d.department_name AS request_department_name,
        ep.position_name AS request_position_name,
        e.name AS requester_name,
        e.lname AS requester_lname,
        e.email AS requester_email,
        e.tel AS requester_tel,
        e.address AS requester_address,
        e.join_date AS requester_join_date,
        e.experience AS requester_experience,
        ep.permission_id AS request_permission_id,
        p.permission_name AS request_permission_name,
        p.permission AS request_permission,
        GROUP_CONCAT(DISTINCT s.skill_name) AS required_skills
    FROM request r
    LEFT JOIN department d ON r.employee_position_id = d.id
    LEFT JOIN employee_position ep ON r.employee_position_id = ep.no
    LEFT JOIN employee e ON r.requester_id = e.id
    LEFT JOIN permission p ON ep.permission_id = p.id
    LEFT JOIN request_skill_list rsl ON r.id = rsl.request_id
    LEFT JOIN request_skill_list_to_skills rsls ON rsl.no = rsls.request_skill_list_id
    LEFT JOIN skills s ON rsls.skill_id = s.id
    WHERE r.status = 'Approved' -- Only fetch Approved job requests
    GROUP BY r.id";

    $result = mysqli_query($conn, $query);

    if ($result) {
        while ($row = mysqli_fetch_assoc($result)) {
            $jobApplications[] = $row;
        }
    }

    return $jobApplications;
}

// Function to update the job status from Approved to Closed
function updateJobStatus($conn, $requestId)
{
    // Update the status in the database
    $query = "UPDATE request SET status = 'Closed' WHERE id = '$requestId'";
    return mysqli_query($conn, $query);
}

// Handle HTTP requests
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['request_id'])) {
            $requestId = $_GET['request_id'];
            $jobApplication = fetchJobApplicationById($conn, $requestId);

            if ($jobApplication) {
                echo json_encode($jobApplication);
            } else {
                // Job not found
                $response = array('error' => 'Job not found');
                echo json_encode($response);
            }
        } else {
            $jobApplications = fetchJobApplications($conn);
            echo json_encode($jobApplications);
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        $requestId = $data['request_id'];

        if (updateJobStatus($conn, $requestId)) {
            $response = array('message' => 'Job status updated to Closed');
            echo json_encode($response);
        } else {
            $response = array('error' => 'Failed to update job status');
            echo json_encode($response);
        }
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
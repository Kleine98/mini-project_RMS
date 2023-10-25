<?php
include "../203-db.php";

// Set response headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header('Access-Control-Allow-Credentials: true');
header("Content-Type: application/json");

// Function to fetch job application announcements
function fetchJobApplications($conn, $approverId)
{
    $jobApplications = array();

    // Modify the SQL query to join the necessary tables and filter by approver ID and status
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
    WHERE r.status = 'Pending' AND r.approver_id = $approverId
    GROUP BY r.id";

    $result = mysqli_query($conn, $query);

    if ($result) {
        while ($row = mysqli_fetch_assoc($result)) {
            $jobApplications[] = $row;
        }
    }

    return $jobApplications;
}

// Function to add a new job request to the 'request' table
function addJobRequest($conn, $requestData)
{
    // Extract data from the request and ensure proper validation and sanitization
    $request_id = $requestData['request_id'];
    $date = $requestData['date'];
    $status = $requestData['status'];
    $exp = $requestData['exp'];
    $amount = $requestData['amount'];
    $employeePositionId = $requestData['employee_position_id'];
    $requesterId = $requestData['requester_id'];
    $approverId = $requestData['approver_id'];
    $comment = $requestData['comment'];
    $skills = $requestData['required_skills'];

    // Validate the data before inserting into the database
    if (empty($request_id) || empty($date) || empty($status) || empty($exp) || empty($amount) || empty($employeePositionId) || empty($requesterId) || empty($approverId) || empty($comment)) {
        $response = array('error' => 'Missing required data');
        echo json_encode($response);
        return; // Exit the function
    }

    // Insert the new job request into the 'request' table
    $query = "INSERT INTO request (id, date, status, exp, amount, employee_position_id, requester_id, approver_id, comment)
              VALUES ('$request_id', '$date', '$status', '$exp', $amount, $employeePositionId, $requesterId, $approverId, '$comment')";

    if (mysqli_query($conn, $query)) {
        $response = array('message' => 'New job request added successfully');
        echo json_encode($response);
    } else {
        $response = array('error' => 'Failed to add a new job request: ' . mysqli_error($conn));
        echo json_encode($response);
    }

    $query = "INSERT INTO request_skill_list (no,request_id)
              VALUES ('$request_id','$request_id')";

    mysqli_query($conn, $query);

    if (is_array($skills)) {
        // Loop through the skill IDs and insert them into the database
        foreach ($skills as $skillId) {
            $query = "INSERT INTO request_skill_list_to_skills (skill_id, request_skill_list_id)
                      VALUES ('$skillId', '$request_id')";

            mysqli_query($conn, $query);
        }
    } else {
        $query = "INSERT INTO request_skill_list_to_skills (skill_id, request_skill_list_id)
        VALUES ('$skills', '$request_id')";

        mysqli_query($conn, $query);
    }



}


// Function to update the status and add comments for a job request
function updateJobRequestStatus($conn, $requestId, $requestStatus, $comment)
{
    // Perform validation and update the job request status and comments
    $requestStatus = mysqli_real_escape_string($conn, $requestStatus);

    $query = "UPDATE request
              SET status = '$requestStatus', comment = '$comment'
              WHERE id = $requestId";

    return mysqli_query($conn, $query);
}

// Handle HTTP requests
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['approver_id'])) {
            // Replace 'YOUR_APPROVER_ID' with the actual approver's ID
            $approverId = $_GET['approver_id'];
            $jobApplications = fetchJobApplications($conn, $approverId);
            echo json_encode($jobApplications);
        } else {
            $response = array('error' => 'Approver ID is missing');
            echo json_encode($response);
        }
        break;
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        addJobRequest($conn, $data);
        break;
    case 'PUT':
        // Handle approval or rejection of a job request
        $data = json_decode(file_get_contents('php://input'), true);
        $requestId = $data['request_id'];
        $requestStatus = $data['request_status'];
        $comment = $data['comment'];

        if (updateJobRequestStatus($conn, $requestId, $requestStatus, $comment)) {
            $response = array('message' => 'Job request status updated successfully');
            echo json_encode($response);
        } else {
            $response = array('error' => 'Failed to update job request status');
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
<?php
include "./203-db.php";

// Set response headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header('Access-Control-Allow-Credentials: true');
header("Content-Type: application/json");

// Function to get candidate by ID
function getCandidateById($conn, $id)
{
    $id = mysqli_real_escape_string($conn, $id);
    $sql = "SELECT *, GROUP_CONCAT(DISTINCT s.skill_name) AS required_skills, c.id AS candidate_id FROM candidate c
            LEFT JOIN request r on r.id = c.request_id
            LEFT JOIN department d ON r.employee_position_id = d.id
            LEFT JOIN employee_position ep ON r.employee_position_id = ep.no
            LEFT JOIN request_skill_list rsl ON r.id = rsl.request_id
            LEFT JOIN request_skill_list_to_skills rsls ON rsl.no = rsls.request_skill_list_id
            LEFT JOIN skills s ON rsls.skill_id = s.id
            WHERE c.id = '$id'";

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

// Function to get candidates without a schedule in the interview_schedule table
function getCandidatesWithoutSchedule($conn)
{
    $sql = "SELECT c.*, r.id AS request_id, r.date, r.status, r.exp, r.amount, r.employee_position_id, r.requester_id, r.approver_id, r.comment, 
            GROUP_CONCAT(DISTINCT s.skill_name) AS skills
            FROM candidate c
            LEFT JOIN interview_schedule i ON c.id = i.candidate_id
            LEFT JOIN request r ON c.request_id = r.id
            LEFT JOIN department d ON r.employee_position_id = d.id
            LEFT JOIN employee_position ep ON r.employee_position_id = ep.no
            LEFT JOIN request_skill_list rsl ON r.id = rsl.request_id
            LEFT JOIN request_skill_list_to_skills rsls ON rsl.no = rsls.request_skill_list_id
            LEFT JOIN skills s ON rsls.skill_id = s.id
            WHERE i.candidate_id IS NULL
            GROUP BY c.id";

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

// Function to get candidates without a schedule and specific skills
function getCandidatesWithoutScheduleAndSkills($conn)
{
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['skills']) && is_array($data['skills'])) {
        // Ensure skills are properly escaped and formatted for SQL
        $skills = implode("','", array_map(function ($skill) use ($conn) {
            return mysqli_real_escape_string($conn, $skill);
        }, $data['skills']));

        $sql = "SELECT c.*, r.id AS request_id, r.date, r.status, r.exp, r.amount, r.employee_position_id, r.requester_id, r.approver_id, r.comment, 
                GROUP_CONCAT(DISTINCT s.skill_name) AS skills
                FROM candidate c
                LEFT JOIN interview_schedule i ON c.id = i.candidate_id
                LEFT JOIN request r ON c.request_id = r.id
                LEFT JOIN department d ON r.employee_position_id = d.id
                LEFT JOIN employee_position ep ON r.employee_position_id = ep.no
                LEFT JOIN request_skill_list rsl ON r.id = rsl.request_id
                LEFT JOIN request_skill_list_to_skills rsls ON rsl.no = rsls.request_skill_list_id
                LEFT JOIN skills s ON rsls.skill_id = s.id
                WHERE i.candidate_id IS NULL
                AND s.skill_name IN ('$skills')
                GROUP BY c.id";

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
    } else {
        $response = array('error' => 'Invalid skills data in the request');
        echo json_encode($response);
    }
}




// Handle HTTP requests
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            getCandidateById($conn, $id);
        } else {
            getCandidatesWithoutSchedule($conn);
        }
        break;
    case 'POST': {
            getCandidatesWithoutScheduleAndSkills($conn);
            break;
        }
    default:
        $response = array('error' => 'Invalid request method');
        echo json_encode($response);
        break;
}

// Close the database connection
mysqli_close($conn);
?>
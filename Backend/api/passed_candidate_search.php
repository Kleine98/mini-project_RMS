<?php
include "./selected-db.php";

// Set response headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header('Access-Control-Allow-Credentials: true');
header("Content-Type: application/json");

// Function to get candidates from the 'passed_candidate' table
function getCandidatesInPassedCandidate($conn)
{
    $sql = "SELECT *, GROUP_CONCAT(DISTINCT s.skill_name) AS required_skills, c.id AS candidate_id, pc.status AS candidate_status
            FROM candidate c
            JOIN passed_candidate pc ON c.id = pc.candidate_id
            LEFT JOIN request r on r.id = c.request_id
            LEFT JOIN department d ON r.employee_position_id = d.id
            LEFT JOIN employee_position ep ON r.employee_position_id = ep.no
            LEFT JOIN request_skill_list rsl ON r.id = rsl.request_id
            LEFT JOIN request_skill_list_to_skills rsls ON rsl.no = rsls.request_skill_list_id
            LEFT JOIN skills s ON rsls.skill_id = s.id 
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

// Handle HTTP requests
$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
    getCandidatesInPassedCandidate($conn);
} else {
    $response = array('error' => 'Invalid request method');
    echo json_encode($response);
}

// Close the database connection
mysqli_close($conn);
?>
<?php
include "../selected-db.php";

// Set response headers
// Allow requests from any origin during development (not recommended for production)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header('Access-Control-Allow-Credentials: true');
header("Content-Type: application/json");

// Function to get interview lists by Candidate ID
function getInterviewListsByCandidateID($conn, $candidate_id)
{
    // Implement logic to retrieve interview lists for the candidate
    $query = "SELECT c.*, cq.*, s.*, i.*, sl.*, GROUP_CONCAT(sk.skill_name) AS skills
        FROM candidate c
        LEFT JOIN candidate_queue cq ON c.id = cq.candidate_id
        LEFT JOIN interview_schedule s ON cq.no = s.candidate_id
        LEFT JOIN interview_result i ON s.id = i.interview_schedule_id
        LEFT JOIN score_list sl ON i.no = sl.interview_result_id
        LEFT JOIN request req ON c.request_id = req.id
        LEFT JOIN request_skill_list req_skill_list ON req.id = req_skill_list.request_id
        LEFT JOIN request_skill_list_to_skills req_skill_skills ON req_skill_list.no = req_skill_skills.request_skill_list_id
        LEFT JOIN skills sk ON req_skill_skills.skill_id = sk.id
        WHERE c.id = $candidate_id
        GROUP BY c.id";

    $result = mysqli_query($conn, $query);

    if (!$result) {
        $response = array('error' => 'Query failed: ' . mysqli_error($conn));
        echo json_encode($response);
    } else {
        $data = array();
        while ($row = mysqli_fetch_assoc($result)) {
            // Split the concatenated skills into an array
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
        // Get the 'candidate_id' parameter from the query string
        $candidate_id = $_GET['candidate_id'];
        getInterviewListsByCandidateID($conn, $candidate_id);
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
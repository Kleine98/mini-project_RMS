<?php
include "../localhost-db.php";

// Set response headers
// Allow requests from any origin during development (not recommended for production)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header('Access-Control-Allow-Credentials: true');
header("Content-Type: application/json");

// Function to retrieve candidates for scoring
// Function to retrieve candidates for scoring
// Function to retrieve candidates for scoring
function getCandidatesForScoring($conn, $manager_id)
{
    if (isset($manager_id)) {
        // Implement logic to retrieve candidates who need scoring
        $query = "SELECT c.*, cq.*, s.*, i.*, sl.*, GROUP_CONCAT(sk.skill_name) AS skills
        FROM candidate c
        JOIN candidate_queue cq ON c.id = cq.candidate_id
        JOIN interview_schedule s ON cq.no = s.candidate_id
        JOIN interview_result i ON s.id = i.interview_schedule_id
        LEFT JOIN score_list sl ON i.no = sl.interview_result_id
        LEFT JOIN request req ON c.request_id = req.id
        LEFT JOIN request_skill_list req_skill_list ON req.id = req_skill_list.request_id
        LEFT JOIN request_skill_list_to_skills req_skill_skills ON req_skill_list.no = req_skill_skills.request_skill_list_id
        LEFT JOIN skills sk ON req_skill_skills.skill_id = sk.id
        WHERE i.manager_id = $manager_id
        GROUP BY c.id";
    } else {
        // Handle the case where manager_id is not specified
        $query = "SELECT c.*, cq.*, s.*, i.*, sl.*, GROUP_CONCAT(sk.skill_name) AS skills
            FROM candidate c
            JOIN candidate_queue cq ON c.id = cq.candidate_id
            JOIN interview_schedule s ON cq.no = s.candidate_id
            JOIN interview_result i ON s.id = i.interview_schedule_id
            LEFT JOIN score_list sl ON i.no = sl.interview_result_id
            LEFT JOIN request req ON c.request_id = req.id
            LEFT JOIN request_skill_list req_skill_list ON req.id = req_skill_list.request_id
            LEFT JOIN request_skill_list_to_skills req_skill_skills ON req_skill_list.no = req_skill_skills.request_skill_list_id
            LEFT JOIN skills sk ON req_skill_skills.skill_id = sk.id
            GROUP BY c.id";
    }

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


// Function to retrieve interview data by interview_id
function getInterviewData($conn, $interviewId)
{
    $query = "SELECT c.*, cq.*, s.*, i.*, sl.*, GROUP_CONCAT(sk.skill_name) AS skills
            FROM candidate c
            JOIN candidate_queue cq ON c.id = cq.candidate_id
            JOIN interview_schedule s ON cq.no = s.candidate_id
            JOIN interview_result i ON s.id = i.interview_schedule_id
            LEFT JOIN score_list sl ON i.no = sl.interview_result_id
            LEFT JOIN request req ON c.request_id = req.id
            LEFT JOIN request_skill_list req_skill_list ON req.id = req_skill_list.request_id
            LEFT JOIN request_skill_list_to_skills req_skill_skills ON req_skill_list.no = req_skill_skills.request_skill_list_id
            LEFT JOIN skills sk ON req_skill_skills.skill_id = sk.id
            WHERE i.no = $interviewId
            GROUP BY c.id";

    $result = mysqli_query($conn, $query);

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


// Function to submit scores for a candidate
function submitScores($conn)
{
    // Get the JSON data from the request body
    $json_data = file_get_contents("php://input");

    // Parse the JSON data into an associative array
    $data = json_decode($json_data, true);

    // Validate and extract data from the associative array
    if (
        isset($data['candidate_id']) &&
        isset($data['technical_score']) &&
        isset($data['creative_score']) &&
        isset($data['human_relation_score']) &&
        isset($data['learning_score']) &&
        isset($data['decision']) &&
        isset($data['comment'])
    ) {
        $interview_result_id = $data['candidate_id'];
        $technical_score = $data['technical_score'];
        $creative_score = $data['creative_score'];
        $human_relation_score = $data['human_relation_score'];
        $learning_score = $data['learning_score'];
        $decision = $data['decision']; // Extract decision
        $comment = $data['comment']; // Extract comment

        // Construct and execute the SQL query to submit scores
        $sql = "INSERT INTO score_list (interview_result_id, technical_score, creative_score, human_relation_score, learning_score, decision, comment) 
                VALUES ('$interview_result_id', '$technical_score', '$creative_score', '$human_relation_score', '$learning_score', '$decision', '$comment')";

        $result = mysqli_query($conn, $sql);

        if (!$result) {
            $response = array('error' => 'Insert scores failed: ' . mysqli_error($conn));
            echo json_encode($response);
        } else {
            $response = array('message' => 'Scores submitted successfully');
            echo json_encode($response);
        }
    } else {
        $response = array('error' => 'Invalid request data');
        echo json_encode($response);
    }
}


// Handle HTTP requests
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'POST':
        submitScores($conn);
        break;
    case 'GET':
        if (isset($_GET['manager_id'])) {
            $manager_id = $_GET['manager_id'];
            getCandidatesForScoring($conn, $manager_id);
        } elseif (isset($_GET['interview_id'])) {
            $interviewId = $_GET['interview_id'];
            getInterviewData($conn, $interviewId);
        } else {
            $manager_id = null;
            getCandidatesForScoring($conn, $manager_id);
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
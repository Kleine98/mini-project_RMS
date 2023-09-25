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
function getCandidatesForScoring($conn, $manager_id)
{
    // Implement logic to retrieve candidates who need scoring
    $query = "SELECT c.*, cq.*, s.*, i.*
          FROM candidate c
          JOIN candidate_queue cq ON c.id = cq.candidate_id
          JOIN interview_schedule s ON cq.no = s.candidate_id
          JOIN interview_result i ON s.id = i.interview_schedule_id
          WHERE i.manager_id = $manager_id";


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
        isset($data['learning_score'])
    ) {
        $candidate_id = $data['candidate_id'];
        $technical_score = $data['technical_score'];
        $creative_score = $data['creative_score'];
        $human_relation_score = $data['human_relation_score'];
        $learning_score = $data['learning_score'];

        // Construct and execute the SQL query to submit scores
        $sql = "INSERT INTO score_list (interview_result_id, technical_score, creative_score, human_relation_score, learning_score) 
                VALUES ('$candidate_id', '$technical_score', '$creative_score', '$human_relation_score', '$learning_score')";

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
        // You need to specify the manager_id in the GET request
        if (isset($_GET['manager_id'])) {
            $manager_id = $_GET['manager_id'];
            getCandidatesForScoring($conn, $manager_id);
        } else {
            $response = array('error' => 'Manager ID not specified');
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
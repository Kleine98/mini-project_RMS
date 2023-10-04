<?php
include "../203-db.php";

// Set response headers (same as in your existing API)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header('Content-Type: application/json');

// Function to calculate and retrieve the report data
function generateReport($conn)
{
    // Implement logic to calculate the report data
    $query = "SELECT
        candidate.id AS candidate_id,
        candidate.name AS candidate_name,
        AVG(score_list.technical_score) AS avg_technical_score,
        AVG(score_list.creative_score) AS avg_creative_score,
        AVG(score_list.human_relation_score) AS avg_human_relation_score,
        AVG(score_list.learning_score) AS avg_learning_score,
        SUM(CASE WHEN score_list.decision = 'accept' THEN 1 ELSE 0 END) AS accepted_count,
        SUM(CASE WHEN score_list.decision = 'reject' THEN 1 ELSE 0 END) AS rejected_count
    FROM candidate
    JOIN candidate_queue ON candidate.id = candidate_queue.candidate_id
    JOIN interview_schedule ON candidate_queue.no = interview_schedule.candidate_id
    JOIN interview_result ON interview_schedule.id = interview_result.interview_schedule_id
    JOIN score_list ON interview_result.no = score_list.interview_result_id
    GROUP BY candidate.id, candidate.name";

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

// Handle the GET request to generate the report
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    generateReport($conn);
} else {
    $response = array('error' => 'Invalid request method');
    echo json_encode($response);
}

// Close the database connection
mysqli_close($conn);
?>
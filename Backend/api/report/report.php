<?php
include "../203-db.php";

// Set response headers
// Allow requests from any origin during development (not recommended for production)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header('Access-Control-Allow-Credentials: true');
header("Content-Type: application/json");

// Function to calculate insights
// Function to calculate insights
function calculateInsights($conn)
{
    // Initialize data array to store insights
    $insights = array();

    // Calculate Average Scores by Skill
    $query = "SELECT
                skill_name,
                AVG(technical_score) AS avg_technical_score,
                AVG(creative_score) AS avg_creative_score,
                AVG(human_relation_score) AS avg_human_relation_score,
                AVG(learning_score) AS avg_learning_score
            FROM
                (
                    SELECT
                        ir.technical_score,
                        ir.creative_score,
                        ir.human_relation_score,
                        ir.learning_score,
                        s.skill_name
                    FROM
                        interview_result ir
                    LEFT JOIN
                        score_list sl ON ir.interview_result_id = sl.interview_result_id
                    LEFT JOIN
                        (
                            SELECT DISTINCT
                                skill_name
                            FROM
                                interview_result
                        ) s ON 1 = 1
                ) subquery
            GROUP BY
                skill_name";

    $result = mysqli_query($conn, $query);

    if ($result) {
        while ($row = mysqli_fetch_assoc($result)) {
            $insights['average_scores_by_skill'][] = $row;
        }
    }

    // Calculate Acceptance Rate by Manager
    $query = "SELECT
                manager_id,
                COUNT(DISTINCT candidate_id) AS total_candidates,
                SUM(CASE WHEN decision = 'accept' THEN 1 ELSE 0 END) AS accepted_candidates,
                (SUM(CASE WHEN decision = 'accept' THEN 1 ELSE 0 END) / COUNT(DISTINCT candidate_id)) * 100 AS acceptance_rate
            FROM
                interview_result
            GROUP BY
                manager_id";

    $result = mysqli_query($conn, $query);

    if ($result) {
        while ($row = mysqli_fetch_assoc($result)) {
            $insights['acceptance_rate_by_manager'][] = $row;
        }
    }

    // Calculate Skill Popularity
    $query = "SELECT
                skill_name,
                COUNT(DISTINCT candidate_id) AS popularity
            FROM
                (
                    SELECT
                        ir.candidate_id,
                        s.skill_name
                    FROM
                        interview_result ir
                    LEFT JOIN
                        (
                            SELECT DISTINCT
                                skill_name
                            FROM
                                interview_result
                        ) s ON 1 = 1
                ) subquery
            GROUP BY
                skill_name";

    $result = mysqli_query($conn, $query);

    if ($result) {
        while ($row = mysqli_fetch_assoc($result)) {
            $insights['skill_popularity'][] = $row;
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
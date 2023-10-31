<?php
include "../selected-db.php";

// Set response headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header('Access-Control-Allow-Credentials: true');
header("Content-Type: application/json");

// Function to update the interview schedule
function AddInterviewSchedule($conn)
{
    $data = json_decode(file_get_contents('php://input'), true);
    $candidate_id = $data['candidate_id'];
    $date = $data['date'];
    $manager_ids = $data['manager_id'];

    // Update the interview schedule for the candidate
    $query = "INSERT INTO interview_schedule(date, candidate_id) VALUES ('$date',$candidate_id)";

    if (mysqli_query($conn, $query)) {
        // Get the interview_schedule_id for the updated schedule
        $interview_schedule_id = mysqli_insert_id($conn);

        // Insert records into interview_result for each manager
        foreach ($manager_ids as $manager_id) {
            $query = "INSERT INTO interview_result(interview_schedule_id, manager_id) 
                      VALUES ($interview_schedule_id, $manager_id)";

            mysqli_query($conn, $query);
        }

        $response = array('message' => 'Interview schedule updated successfully');
        echo json_encode($response);
    } else {
        $response = array('error' => 'Failed to update interview schedule');
        echo json_encode($response);
    }
}

// Function to delete the interview schedule
function deleteInterviewSchedule($conn)
{
    $data = json_decode(file_get_contents('php://input'), true);
    $interview_schedule_id = $data['interview_schedule_id'];

    // Begin a transaction
    mysqli_autocommit($conn, false);

    // Delete related records from interview_result
    $deleteResultQuery = "DELETE FROM interview_result WHERE interview_schedule_id = $interview_schedule_id";
    if (mysqli_query($conn, $deleteResultQuery)) {
        // Delete the interview schedule based on the interview_schedule_id
        $deleteScheduleQuery = "DELETE FROM interview_schedule WHERE id = $interview_schedule_id";
        if (mysqli_query($conn, $deleteScheduleQuery)) {
            // Commit the transaction if both deletions are successful
            mysqli_commit($conn);
            $response = array('message' => 'Interview schedule deleted successfully');
            echo json_encode($response);
        } else {
            // Rollback the transaction if the schedule deletion fails
            mysqli_rollback($conn);
            $response = array('error' => 'Failed to delete interview schedule');
            echo json_encode($response);
        }
    } else {
        // Rollback the transaction if the result deletion fails
        mysqli_rollback($conn);
        $response = array('error' => 'Failed to delete interview result records');
        echo json_encode($response);
    }

    // End the transaction
    mysqli_autocommit($conn, true);
}

// Handle HTTP requests
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'POST':
        AddInterviewSchedule($conn);
        break;
    case 'DELETE':
        deleteInterviewSchedule($conn);
        break;
    default:
        $response = array('error' => 'Invalid request method');
        echo json_encode($response);
        break;
}

// Close the database connection
mysqli_close($conn);
?>
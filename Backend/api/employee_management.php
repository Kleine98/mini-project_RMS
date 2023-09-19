<?php
include "./aws-db.php";

// Set response headers
header("Content-Type: application/json");

// Function to handle GET request to retrieve all employees
function getAllEmployees($conn)
{
    $sql = "SELECT * FROM Employee";
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

// Function to handle POST request to add a new employee
function addEmployee($conn)
{
    // You'll need to handle request data sent from the frontend.
    // For example, retrieve data from the request's POST parameters.
    $name = $_POST['name'];
    $lname = $_POST['lname'];
    $email = $_POST['email'];
    $tel = $_POST['tel']; // Add these lines to capture additional employee data
    $address = $_POST['address'];
    $join_date = $_POST['join_date'];
    $skill = $_POST['skill'];
    $experience = $_POST['experience'];
    $department_id = $_POST['department_id'];
    $position_id = $_POST['position_id'];


    // ... and so on for other employee attributes.

    // Construct and execute the SQL query to insert a new employee
    $sql = "INSERT INTO Employee (name, lname, email, tel, address, join_date, skill, experience, department_id, position_id) 
        VALUES ('$name', '$lname', '$email', '$tel', '$address', STR_TO_DATE('$join_date', '%Y-%m-%d'), '$skill', $experience, $department_id, $position_id)";


    $result = mysqli_query($conn, $sql);

    if (!$result) {
        $response = array('error' => 'Insert failed: ' . mysqli_error($conn));
        echo json_encode($response);
    } else {
        $response = array('message' => 'Employee added successfully');
        echo json_encode($response);
    }
}

// Function to handle PUT request to edit an employee
// Function to handle PUT request to edit an employee
// Function to handle PUT request to edit an employee
function editEmployee($conn, $id)
{
    // Get the JSON data from the request body
    $json_data = file_get_contents("php://input");

    // Parse the JSON data into an associative array
    $data = json_decode($json_data, true);

    // Retrieve employee attributes from the parsed data
    $name = $data['name'];
    $lname = $data['lname'];
    $email = $data['email'];
    $tel = $data['tel'];
    $address = $data['address'];
    $join_date = $data['join_date'];
    $skill = $data['skill'];
    $experience = $data['experience'];
    $department_id = $data['department_id'];
    $position_id = $data['position_id'];

    // Construct and execute the SQL query to update the employee
    $sql = "UPDATE Employee SET 
                name = '$name', 
                lname = '$lname', 
                email = '$email', 
                tel = '$tel', 
                address = '$address', 
                join_date = STR_TO_DATE('$join_date', '%Y-%m-%d'), 
                skill = '$skill', 
                experience = $experience, 
                department_id = $department_id, 
                position_id = $position_id
            WHERE id = $id";

    $result = mysqli_query($conn, $sql);

    if (!$result) {
        $response = array('error' => 'Update failed: ' . mysqli_error($conn));
        echo json_encode($response);
    } else {
        $response = array('message' => 'Employee updated successfully');
        echo json_encode($response);
    }
}

// Function to handle DELETE request to delete an employee
function deleteEmployee($conn, $id)
{
    // Construct and execute the SQL query to delete the employee
    $sql = "DELETE FROM Employee WHERE id = $id";

    $result = mysqli_query($conn, $sql);

    if (!$result) {
        $response = array('error' => 'Delete failed: ' . mysqli_error($conn));
        echo json_encode($response);
    } else {
        $response = array('message' => 'Employee deleted successfully');
        echo json_encode($response);
    }
}



// Handle HTTP requests
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        getAllEmployees($conn);
        break;
    case 'POST':
        addEmployee($conn);
        break;
    case 'PUT':
        // Extract the employee ID from the URL
        $url = $_SERVER['REQUEST_URI'];
        $url_parts = explode('/', $url);
        $id = end($url_parts);
        editEmployee($conn, $id);
        break;
    case 'DELETE':
        // Extract the employee ID from the URL
        $url = $_SERVER['REQUEST_URI'];
        $url_parts = explode('/', $url);
        $id = end($url_parts);
        deleteEmployee($conn, $id);
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
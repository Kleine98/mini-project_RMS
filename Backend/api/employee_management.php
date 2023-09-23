<?php
include "./aws-db.php";

// Set response headers
// Allow requests from any origin during development (not recommended for production)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header('Access-Control-Allow-Credentials: true');
header("Content-Type: application/json");

// Function to handle GET request to retrieve all employees
function getAllEmployees($conn)
{
    $sql = "SELECT Employee.id AS employee_id, Employee.*, User_Management.id as user_id, User_Management.*, Permission.*
        FROM Employee
        JOIN User_Management ON Employee.id = User_Management.employee_id
        JOIN Permission ON User_Management.id = Permission.user_id
        JOIN Employee_Position ON Employee.position_id = Employee_Position.id";

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
// Function to handle POST request to add a new employee
function addEmployee($conn)
{
    // Get the JSON data from the request body
    $json_data = file_get_contents("php://input");

    // Parse the JSON data into an associative array
    $data = json_decode($json_data, true);

    // Extract the employee information
    $id = $data['id'];
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

    // Construct and execute the SQL query to insert a new employee
    $sql_employee = "INSERT INTO Employee (id, name, lname, email, tel, address, join_date, skill, experience, department_id, position_id) 
       VALUES ('$id','$name', '$lname', '$email', '$tel', '$address', STR_TO_DATE('$join_date', '%Y-%m-%d'), '$skill', $experience, $department_id, $position_id)";

    $result_employee = mysqli_query($conn, $sql_employee);

    if (!$result_employee) {
        $response = array('error' => 'Insert into Employee failed: ' . mysqli_error($conn));
        echo json_encode($response);
        return;
    }

    // Extract the user management information
    $user_id = $data['user_id'];
    $password = $data['password'];


    // Construct and execute the SQL query to insert a new User_Management entry
    $sql_user = "INSERT INTO User_Management (id, password, employee_id)
        VALUES('$user_id', '$password', '$id')";

    $result_user = mysqli_query($conn, $sql_user);

    if (!$result_user) {
        // Rollback the employee insertion if User_Management insertion fails
        mysqli_query($conn, "DELETE FROM Employee WHERE id = '$id'");

        $response = array('error' => 'Insert into User_Management failed: ' . mysqli_error($conn));
        echo json_encode($response);
        return;
    }

    // Extract the permission information
    $permission_name = $data['permission_name'];
    $permission_value = $data['permission'];

    // Construct and execute the SQL query to insert a new Permission entry
    $sql_permission = "INSERT INTO Permission (permission_name, permission, user_id)
        VALUES('$permission_name', '$permission_value', '$user_id')";

    $result_permission = mysqli_query($conn, $sql_permission);

    if (!$result_permission) {
        // Rollback both employee and User_Management insertions if Permission insertion fails
        mysqli_query($conn, "DELETE FROM Employee WHERE id = '$id'");
        mysqli_query($conn, "DELETE FROM User_Management WHERE id = '$user_id'");

        $response = array('error' => 'Insert into Permission failed: ' . mysqli_error($conn));
        echo json_encode($response);
        return;
    }

    $response = array('message' => 'Employee added successfully');
    echo json_encode($response);
}


// Function to handle PUT request to edit an employee
function editEmployee($conn, $id)
{
    // Get the JSON data from the request body
    $json_data = file_get_contents("php://input");

    // Parse the JSON data into an associative array
    $data = json_decode($json_data, true);

    // Extract the permission information
    $permission_name = $data['permission_name'];
    $permission = $data['permission'];
    $user_id = $data['user_id'];

    // Construct and execute the SQL query to update the permission
    $sql_permission = "UPDATE Permission SET 
                permission_name = '$permission_name', 
                permission = '$permission'
            WHERE user_id = $user_id";

    $result_permission = mysqli_query($conn, $sql_permission);

    if (!$result_permission) {
        $response = array('error' => 'Permission Update failed: ' . mysqli_error($conn));
        echo json_encode($response);
        return;
    }

    // Extract the employee information
    $name = $data['name'];
    $lname = $data['lname'];
    $email = $data['email'];
    $tel = $data['tel'];
    $address = $data['address'];
    $join_date = $data['join_date'];
    $skill = $data['skill'];
    $experience = $data['experience'];
    $department_id = $data['department_id'];
    $password = $data['password'];

    // Construct and execute the SQL query to update the employee
    $sql_employee = "UPDATE Employee SET 
                name = '$name', 
                lname = '$lname', 
                email = '$email', 
                tel = '$tel', 
                address = '$address', 
                join_date = STR_TO_DATE('$join_date', '%Y-%m-%d'), 
                skill = '$skill', 
                experience = $experience, 
                department_id = $department_id
            WHERE id = $id";

    $result_employee = mysqli_query($conn, $sql_employee);

    if (!$result_employee) {
        $response = array('error' => 'Employee Update failed: ' . mysqli_error($conn));
        echo json_encode($response);
    } else {
        // Update User_Management data
        $sql_user = "UPDATE User_Management SET 
                password = '$password'
            WHERE employee_id = $id";

        $result_user = mysqli_query($conn, $sql_user);

        if (!$result_user) {
            $response = array('error' => 'User Update failed: ' . mysqli_error($conn));
            echo json_encode($response);
        } else {
            $response = array('message' => 'Employee updated successfully');
            echo json_encode($response);
        }
    }
}

// Function to handle DELETE request to delete an employee
// Function to handle DELETE request to delete an employee
function deleteEmployee($conn, $id)
{
    // Construct and execute the SQL query to delete related records from Permission and User_Management tables
    mysqli_query($conn, "DELETE FROM Permission WHERE user_id = (select id from User_Management where employee_id = $id)");
    mysqli_query($conn, "DELETE FROM User_Management WHERE employee_id = $id");

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
<?php
include "./localhost-db.php";

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
    $sql = "SELECT 
            employee.id AS employee_id, 
            employee.*, 
            department.department_name AS department_name,
            employee_position.position_name AS position_name,
            user_management.id as user_id, 
            user_management.*, 
            permission.*,
            GROUP_CONCAT(skills.skill_name) AS skills
        FROM employee
        JOIN user_management ON employee.id = user_management.employee_id
        JOIN permission ON user_management.id = permission.user_id
        JOIN employee_position ON employee.employee_position_id = employee_position.no
        JOIN department ON employee_position.department_id = department.id
        LEFT JOIN employee_skill_list ON employee.id = employee_skill_list.employee_id
        LEFT JOIN employee_skill_list_to_skills ON employee_skill_list.no = employee_skill_list_to_skills.employee_skill_list_id
        LEFT JOIN skills ON employee_skill_list_to_skills.skill_id = skills.id
        GROUP BY employee.id"; // Using GROUP_CONCAT to concatenate employee skills

    $result = mysqli_query($conn, $sql);

    if (!$result) {
        $response = array('error' => 'Query failed: ' . mysqli_error($conn));
        echo json_encode($response);
    } else {
        $data = array();
        while ($row = mysqli_fetch_assoc($result)) {
            // Convert the comma-separated skills to an array
            $row['skills'] = explode(',', $row['skills']);
            $data[] = $row;
        }
        echo json_encode($data);
    }
}

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
    $experience = $data['experience'];
    $department_id = $data['department_id'];
    $position_id = $data['position_id'];

    // Construct and execute the SQL query to insert a new employee
    $sql_employee = "INSERT INTO employee (id, name, lname, email, tel, address, join_date, experience, department_id, employee_position_id) 
       VALUES ('$id','$name', '$lname', '$email', '$tel', '$address', STR_TO_DATE('$join_date', '%Y-%m-%d'), $experience, $department_id, $position_id)";

    $result_employee = mysqli_query($conn, $sql_employee);

    if (!$result_employee) {
        $response = array('error' => 'Insert into employee failed: ' . mysqli_error($conn));
        echo json_encode($response);
        return;
    }

    // Extract the user management information
    $user_id = $data['user_id'];
    $password = $data['password'];

    // Construct and execute the SQL query to insert a new User_Management entry
    $sql_user = "INSERT INTO user_management (id, password, employee_id)
        VALUES('$user_id', '$password', '$id')";

    $result_user = mysqli_query($conn, $sql_user);

    if (!$result_user) {
        // Rollback the employee insertion if User_Management insertion fails
        mysqli_query($conn, "DELETE FROM employee WHERE id = '$id'");

        $response = array('error' => 'Insert into user_management failed: ' . mysqli_error($conn));
        echo json_encode($response);
        return;
    }

    // Extract the permission information
    $permission_name = $data['permission_name'];
    $permission_value = $data['permission'];

    // Construct and execute the SQL query to insert a new Permission entry
    $sql_permission = "INSERT INTO permission (permission_name, permission, user_id)
        VALUES('$permission_name', '$permission_value', '$user_id')";

    $result_permission = mysqli_query($conn, $sql_permission);

    if (!$result_permission) {
        // Rollback both employee and User_Management insertions if Permission insertion fails
        mysqli_query($conn, "DELETE FROM employee WHERE id = '$id'");
        mysqli_query($conn, "DELETE FROM user_management WHERE id = '$user_id'");

        $response = array('error' => 'Insert into permission failed: ' . mysqli_error($conn));
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
    $sql_permission = "UPDATE permission SET 
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
    $experience = $data['experience'];
    $department_id = $data['department_id'];
    $password = $data['password'];

    // Construct and execute the SQL query to update the employee
    $sql_employee = "UPDATE employee SET 
                name = '$name', 
                lname = '$lname', 
                email = '$email', 
                tel = '$tel', 
                address = '$address', 
                join_date = STR_TO_DATE('$join_date', '%Y-%m-%d'), 
                experience = $experience, 
                department_id = $department_id
            WHERE id = $id";

    $result_employee = mysqli_query($conn, $sql_employee);

    if (!$result_employee) {
        $response = array('error' => 'Employee Update failed: ' . mysqli_error($conn));
        echo json_encode($response);
    } else {
        // Update User_Management data
        $sql_user = "UPDATE user_management SET 
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
function deleteEmployee($conn, $id)
{
    // Construct and execute the SQL query to delete related records from Permission and User_Management tables
    mysqli_query($conn, "DELETE FROM permission WHERE user_id = (SELECT id FROM user_management WHERE employee_id = $id)");
    mysqli_query($conn, "DELETE FROM user_management WHERE employee_id = $id");

    // Construct and execute the SQL query to delete the employee
    $sql = "DELETE FROM employee WHERE id = $id";

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
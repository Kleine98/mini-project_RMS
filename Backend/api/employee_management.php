<?php
include "./selected-db.php";

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
            employee_position.position_name,  -- Select position_name directly
            user_management.id as user_id, 
            user_management.*, 
            P.*,
            GROUP_CONCAT(skills.skill_name) AS skills
        FROM employee
        JOIN user_management ON employee.id = user_management.employee_id
        JOIN employee_position ON employee.employee_position_id = employee_position.no
        JOIN department ON employee_position.department_id = department.id
        LEFT JOIN employee_skill_list ON employee.id = employee_skill_list.employee_id
        LEFT JOIN employee_skill_list_to_skills ON employee_skill_list.no = employee_skill_list_to_skills.employee_skill_list_id
        LEFT JOIN skills ON employee_skill_list_to_skills.skill_id = skills.id
        LEFT JOIN permission P ON employee_position.permission_id = P.id
        GROUP BY employee.id";


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
    $employee_position_id = $data['employee_position_id'];
    $skills = $data['skills'];

    // Construct and execute the SQL query to insert a new employee
    $sql_employee = "INSERT INTO employee (id, name, lname, email, tel, address, join_date, experience, employee_position_id) 
       VALUES ('$id','$name', '$lname', '$email', '$tel', '$address', STR_TO_DATE('$join_date', '%Y-%m-%d'), $experience, $employee_position_id)";

    $result_employee = mysqli_query($conn, $sql_employee);

    if (!$result_employee) {
        $response = array('error' => 'Insert into employee failed: ' . mysqli_error($conn));
        echo json_encode($response);
        return;
    }

    // Insert the employee_id into the employee_skill_list
    $sql_insert_employee_skill_list = "INSERT INTO employee_skill_list (no, employee_id) VALUES ('$id','$id')";
    $result_insert_employee_skill_list = mysqli_query($conn, $sql_insert_employee_skill_list);

    if (!$result_insert_employee_skill_list) {
        // Rollback the employee insertion if inserting into employee_skill_list fails
        mysqli_query($conn, "DELETE FROM employee WHERE id = '$id'");

        $response = array('error' => 'Insert into employee_skill_list failed: ' . mysqli_error($conn));
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
        mysqli_query($conn, "DELETE FROM employee_skill_list WHERE employee_id = '$id'");

        $response = array('error' => 'Insert into user_management failed: ' . mysqli_error($conn));
        echo json_encode($response);
        return;
    }

    // Process skills
    if (!empty($skills)) {
        foreach ($skills as $skill_name) {
            // Check if the skill already exists in the skills table
            $sql_check_skill = "SELECT id FROM skills WHERE skill_name = '$skill_name'";
            $result_check_skill = mysqli_query($conn, $sql_check_skill);

            if (!$result_check_skill) {
                $response = array('error' => 'Skill Check failed: ' . mysqli_error($conn));
                echo json_encode($response);
                return;
            }

            if (mysqli_num_rows($result_check_skill) > 0) {
                // Skill exists, link the employee_skill_list to the existing skill
                $row = mysqli_fetch_assoc($result_check_skill);
                $skill_id = $row['id'];

                // Check if the employee_skill_list is already linked to this skill
                $sql_check_employee_skill = "SELECT * FROM employee_skill_list_to_skills WHERE employee_skill_list_id = $id AND skill_id = $skill_id";
                $result_check_employee_skill = mysqli_query($conn, $sql_check_employee_skill);

                if (!$result_check_employee_skill) {
                    $response = array('error' => 'Employee Skill Check failed: ' . mysqli_error($conn));
                    echo json_encode($response);
                    return;
                }

                if (mysqli_num_rows($result_check_employee_skill) === 0) {
                    // Link the employee_skill_list to the existing skill
                    $sql_link_employee_skill = "INSERT INTO employee_skill_list_to_skills (employee_skill_list_id, skill_id) VALUES ($id, $skill_id)";
                    $result_link_employee_skill = mysqli_query($conn, $sql_link_employee_skill);

                    if (!$result_link_employee_skill) {
                        $response = array('error' => 'Employee Skill Linking failed: ' . mysqli_error($conn));
                        echo json_encode($response);
                        return;
                    }
                }
            } else {
                // Skill does not exist, insert the new skill and then link the employee_skill_list
                $sql_insert_skill = "INSERT INTO skills (skill_name) VALUES ('$skill_name')";
                $result_insert_skill = mysqli_query($conn, $sql_insert_skill);

                if (!$result_insert_skill) {
                    $response = array('error' => 'Skill Insertion failed: ' . mysqli_error($conn));
                    echo json_encode($response);
                    return;
                }

                // Get the ID of the newly inserted skill
                $skill_id = mysqli_insert_id($conn);

                // Link the employee_skill_list to the new skill
                $sql_link_employee_skill = "INSERT INTO employee_skill_list_to_skills (employee_skill_list_id, skill_id) VALUES ($id, $skill_id)";
                $result_link_employee_skill = mysqli_query($conn, $sql_link_employee_skill);

                if (!$result_link_employee_skill) {
                    $response = array('error' => 'Employee Skill Linking failed: ' . mysqli_error($conn));
                    echo json_encode($response);
                    return;
                }
            }
        }
    }

    $response = array('message' => 'Employee added successfully');
    echo json_encode($response);
}


// Function to handle PUT request to edit an employee
function editEmployee($conn)
{
    // Get the JSON data from the request body
    $json_data = file_get_contents("php://input");

    // Parse the JSON data into an associative array
    $data = json_decode($json_data, true);

    // Start a database transaction
    mysqli_autocommit($conn, false);

    // Extract the employee information
    $employee_id = $data['employee_id'];
    $name = $data['name'];
    $lname = $data['lname'];
    $email = $data['email'];
    $tel = $data['tel'];
    $address = $data['address'];
    $join_date = $data['join_date'];
    $experience = $data['experience'];
    $employee_position_id = $data['employee_position_id'];
    $user_id = $data['user_id'];
    $password = $data['password'];
    $skills = $data['skills'];

    // Construct and execute the SQL query to update the employee
    $sql_employee = "UPDATE employee SET 
                name = '$name', 
                lname = '$lname', 
                email = '$email', 
                tel = '$tel', 
                address = '$address', 
                join_date = '$join_date', 
                experience = $experience, 
                employee_position_id = $employee_position_id
            WHERE id = '$employee_id'";

    $result_employee = mysqli_query($conn, $sql_employee);

    if (!$result_employee) {
        mysqli_rollback($conn);
        $response = array('error' => 'Employee Update failed: ' . mysqli_error($conn));
        echo json_encode($response);
        return;
    }

    // Update User_Management data
    $sql_user = "UPDATE user_management SET
                id = '$user_id',
                password = '$password'
            WHERE employee_id = '$employee_id'";

    $result_user = mysqli_query($conn, $sql_user);

    if (!$result_user) {
        mysqli_rollback($conn);
        $response = array('error' => 'User Update failed: ' . mysqli_error($conn));
        echo json_encode($response);
        return;
    }

    // Clear existing employee skills
    $sql_clear_employee_skills = "DELETE FROM employee_skill_list_to_skills WHERE employee_skill_list_id = '$employee_id'";
    $result_clear_employee_skills = mysqli_query($conn, $sql_clear_employee_skills);

    if (!$result_clear_employee_skills) {
        mysqli_rollback($conn);
        $response = array('error' => 'Failed to clear existing employee skills: ' . mysqli_error($conn));
        echo json_encode($response);
        return;
    }

    // Process skills
    if (!empty($skills)) {
        foreach ($skills as $skill_name) {
            // Check if the skill already exists in the skills table
            $sql_check_skill = "SELECT id FROM skills WHERE skill_name = '$skill_name'";
            $result_check_skill = mysqli_query($conn, $sql_check_skill);

            if (!$result_check_skill) {
                mysqli_rollback($conn);
                $response = array('error' => 'Skill Check failed: ' . mysqli_error($conn));
                echo json_encode($response);
                return;
            }

            if (mysqli_num_rows($result_check_skill) > 0) {
                // Skill exists, link the employee to the existing skill
                $row = mysqli_fetch_assoc($result_check_skill);
                $skill_id = $row['id'];

                // Link the employee to the existing skill
                $sql_link_employee_skill = "INSERT INTO employee_skill_list_to_skills (employee_skill_list_id, skill_id) VALUES ('$employee_id', '$skill_id')";
                $result_link_employee_skill = mysqli_query($conn, $sql_link_employee_skill);

                if (!$result_link_employee_skill) {
                    mysqli_rollback($conn);
                    $response = array('error' => 'Employee Skill Linking failed: ' . mysqli_error($conn));
                    echo json_encode($response);
                    return;
                }
            } else {
                // Skill does not exist, insert the new skill and link the employee
                $sql_insert_skill = "INSERT INTO skills (skill_name) VALUES ('$skill_name')";
                $result_insert_skill = mysqli_query($conn, $sql_insert_skill);

                if (!$result_insert_skill) {
                    mysqli_rollback($conn);
                    $response = array('error' => 'Skill Insertion failed: ' . mysqli_error($conn));
                    echo json_encode($response);
                    return;
                }

                // Get the ID of the newly inserted skill
                $skill_id = mysqli_insert_id($conn);

                // Link the employee to the new skill
                $sql_link_employee_skill = "INSERT INTO employee_skill_list_to_skills (employee_skill_list_id, skill_id) VALUES ('$employee_id', '$skill_id')";
                $result_link_employee_skill = mysqli_query($conn, $sql_link_employee_skill);

                if (!$result_link_employee_skill) {
                    mysqli_rollback($conn);
                    $response = array('error' => 'Employee Skill Linking failed: ' . mysqli_error($conn));
                    echo json_encode($response);
                    return;
                }
            }
        }
    }

    // Commit the transaction if all updates were successful
    mysqli_commit($conn);

    $response = array('message' => 'Employee updated successfully');
    echo json_encode($response);
}






// Function to delete employee data by ID
function deleteEmployee($conn, $employee_id)
{
    // Ensure the provided employee ID is safe to use in SQL queries
    $employee_id = mysqli_real_escape_string($conn, $employee_id);

    // Start a database transaction
    mysqli_autocommit($conn, false);

    // Delete records from 'employee_skill_list_to_skills'
    $sql_delete_employee_skill_links = "DELETE FROM employee_skill_list_to_skills WHERE employee_skill_list_id = $employee_id";
    $result_delete_employee_skill_links = mysqli_query($conn, $sql_delete_employee_skill_links);

    if (!$result_delete_employee_skill_links) {
        mysqli_rollback($conn);
        $response = array('error' => 'Failed to delete employee skill links: ' . mysqli_error($conn));
        echo json_encode($response);
        return;
    }

    // Delete records from 'employee_skill_list'
    $sql_delete_employee_skill_list = "DELETE FROM employee_skill_list WHERE no = $employee_id";
    $result_delete_employee_skill_list = mysqli_query($conn, $sql_delete_employee_skill_list);

    if (!$result_delete_employee_skill_list) {
        mysqli_rollback($conn);
        $response = array('error' => 'Failed to delete employee skill list: ' . mysqli_error($conn));
        echo json_encode($response);
        return;
    }

    // Delete records from 'user_management'
    $sql_delete_user_management = "DELETE FROM user_management WHERE employee_id = '$employee_id'";
    $result_delete_user_management = mysqli_query($conn, $sql_delete_user_management);

    if (!$result_delete_user_management) {
        mysqli_rollback($conn);
        $response = array('error' => 'Failed to delete user management: ' . mysqli_error($conn));
        echo json_encode($response);
        return;
    }

    // Delete records from 'employee'
    $sql_delete_employee = "DELETE FROM employee WHERE id = '$employee_id'";
    $result_delete_employee = mysqli_query($conn, $sql_delete_employee);

    if (!$result_delete_employee) {
        mysqli_rollback($conn);
        $response = array('error' => 'Failed to delete employee: ' . mysqli_error($conn));
        echo json_encode($response);
        return;
    }

    // Commit the transaction if all deletions were successful
    mysqli_commit($conn);

    $response = array('message' => 'Employee deleted successfully');
    echo json_encode($response);
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
        editEmployee($conn);
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
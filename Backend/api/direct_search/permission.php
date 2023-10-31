<?php
include "../selected-db.php";

// Set response headers
// Allow requests from any origin during development (not recommended for production)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header('Access-Control-Allow-Credentials: true');
header("Content-Type: application/json");


// Function to get all permissions
function getAllPermissions($conn)
{
    $sql = "SELECT * FROM permission";

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

// Function to get permission by ID
function getPermissionById($conn, $id)
{
    $sql = "SELECT * FROM permission WHERE id = $id";

    $result = mysqli_query($conn, $sql);

    if (!$result) {
        $response = array('error' => 'Query failed: ' . mysqli_error($conn));
        echo json_encode($response);
    } else {
        $row = mysqli_fetch_assoc($result);
        echo json_encode($row);
    }
}

// Function to edit permission
function editPermission($conn)
{
    // Get the JSON data from the request body
    $json_data = file_get_contents("php://input");

    // Parse the JSON data into an associative array
    $data = json_decode($json_data, true);

    $id = $data['id'];
    $permission_name = $data['permission_name'];
    $permission = $data['permission'];

    $sql = "UPDATE permission SET permission_name = '$permission_name', permission = '$permission' WHERE id = $id";

    if (mysqli_query($conn, $sql)) {
        $response = array('message' => 'Permission updated successfully');
        echo json_encode($response);
    } else {
        $response = array('error' => 'Query failed: ' . mysqli_error($conn));
        echo json_encode($response);
    }
}

// Function to add permission
function addPermission($conn)
{
    // Get the JSON data from the request body
    $json_data = file_get_contents("php://input");

    // Parse the JSON data into an associative array
    $data = json_decode($json_data, true);

    $id = $data['id'];
    $permission_name = $data['permission_name'];
    $permission = $data['permission'];

    $sql = "INSERT INTO permission (id, permission_name, permission) VALUES ($id, '$permission_name', '$permission')";

    if (mysqli_query($conn, $sql)) {
        $response = array('message' => 'Permission added successfully');
        echo json_encode($response);
    } else {
        $response = array('error' => 'Query failed: ' . mysqli_error($conn));
        echo json_encode($response);
    }
}



// Handle HTTP requests
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Check if an 'id' parameter is provided in the URL
        if (isset($_GET['id'])) {
            $permissionId = $_GET['id'];
            getPermissionById($conn, $permissionId);
        } else {
            // If 'id' is not provided, get all permissions
            getAllPermissions($conn);
        }
        break;
    case 'PUT':
        editPermission($conn);
        break;
    case 'POST':
        addPermission($conn);
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
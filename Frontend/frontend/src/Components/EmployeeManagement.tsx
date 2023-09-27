import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    // Fetch the list of employees when the component mounts
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        "http://203.188.54.9/~u6411130038/mini-project/Backend/api/employee_management.php"
      );
      setEmployees(response.data);
      setLoading(false); // Data has been loaded, set loading to false
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Employee Management</h2>

      <Link to="/addEmployee">Add Employee</Link>

      {/* Show loading message while waiting for data */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        // Table to display employees
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Last Name</th>
              <th>Department</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.employee_id}>
                <td>{employee.employee_id}</td>
                <td>{employee.name}</td>
                <td>{employee.lname}</td>
                <td>{employee.department_name}</td>
                <td>{employee.position_name}</td>
                <td>
                  {/* Pass the employee ID as a route parameter */}
                  <Link to={`/EmployeeDetailPage/${employee.employee_id}`}>
                    View detail
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EmployeeManagement;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    lname: "",
    email: "",
    tel: "",
    address: "",
    join_date: "",
    skill: "",
    experience: "",
    department_id: "",
    position_id: "",
  });
  const [editEmployeeId, setEditEmployeeId] = useState(null);

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
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddEmployee = async () => {
    try {
      await axios.post(
        "http://203.188.54.9/~u6411130038/mini-project/Backend/api/employee_management.php",
        formData
      );
      setFormData({
        name: "",
        lname: "",
        email: "",
        tel: "",
        address: "",
        join_date: "",
        skill: "",
        experience: "",
        department_id: "",
        position_id: "",
      });
      fetchEmployees(); // Refresh the employee list after adding
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const handleEditEmployee = async () => {
    try {
      await axios.put(
        `http://203.188.54.9/~u6411130038/mini-project/Backend/api/employee_management.php/${editEmployeeId}`,
        formData
      );
      setEditEmployeeId(null);
      setFormData({
        name: "",
        lname: "",
        email: "",
        tel: "",
        address: "",
        join_date: "",
        skill: "",
        experience: "",
        department_id: "",
        position_id: "",
      });
      fetchEmployees(); // Refresh the employee list after editing
    } catch (error) {
      console.error("Error editing employee:", error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(
        `http://203.188.54.9/~u6411130038/mini-project/Backend/api/employee_management.php/${id}`
      );
      fetchEmployees(); // Refresh the employee list after deleting
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Employee Management</h2>

      {/* Form for adding/editing employees */}
      <form>
        {/* Input fields for employee data */}
        <input
          type="text"
          name="name"
          placeholder="First Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="lname"
          placeholder="Last Name"
          value={formData.lname}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        {/* Add more input fields for other employee attributes */}
        {/* Example:
        <input
          type="text"
          name="tel"
          placeholder="Telephone"
          value={formData.tel}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleInputChange}
        />
        */}
        <button
          type="button"
          onClick={editEmployeeId ? handleEditEmployee : handleAddEmployee}
        >
          {editEmployeeId ? "Edit Employee" : "Add Employee"}
        </button>
      </form>

      {/* Table to display employees */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Skill</th>
            <th>Experience</th>
            <th>User Management</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.lname}</td>
              <td>{employee.email}</td>
              <td>{employee.skill}</td>
              <td>{employee.experience} years</td>
              <td>{`${employee.permission_name} (${employee.permission})`}</td>
              <td>
                <button onClick={() => setEditEmployeeId(employee.id)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteEmployee(employee.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeManagement;

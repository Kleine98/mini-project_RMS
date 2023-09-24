import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function AddEmployeePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
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
    user_id: "",
    permission_name: "",
    password: "",
    permission: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddEmployee = async () => {
    // Perform your employee addition logic here
    try {
      // Assuming you have an API endpoint for adding employees
      await fetch(
        "http://203.188.54.9/~u6411130038/mini-project/Backend/api/employee_management.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      // After adding the employee, you can navigate to another page:
      navigate("/EmployeeManagement"); // Replace with your desired route
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Add Employee</h2>
      <form>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="id">ID:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="id"
                  name="id"
                  value={formData.id}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="name">Name:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="lname">Last Name:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="lname"
                  name="lname"
                  value={formData.lname}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="email">Email:</label>
              </td>
              <td>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="tel">Telephone:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="tel"
                  name="tel"
                  value={formData.tel}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="address">Address:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="join_date">Join Date:</label>
              </td>
              <td>
                <input
                  type="date"
                  id="join_date"
                  name="join_date"
                  value={formData.join_date}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="skill">Skill:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="skill"
                  name="skill"
                  value={formData.skill}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="experience">Experience:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="department_id">Department ID:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="department_id"
                  name="department_id"
                  value={formData.department_id}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="position_id">Position ID:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="position_id"
                  name="position_id"
                  value={formData.position_id}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="user_id">User ID:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="user_id"
                  name="user_id"
                  value={formData.user_id}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="permission_name">Permission Name:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="permission_name"
                  name="permission_name"
                  value={formData.permission_name}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="password">Password:</label>
              </td>
              <td>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="permission">Permission:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="permission"
                  name="permission"
                  value={formData.permission}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="button" onClick={handleAddEmployee}>
          Add Employee
        </button>
      </form>
    </div>
  );
}

export default AddEmployeePage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
    employee_position_id: "",
    user_id: "",
    password: "",
  });
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    // Fetch employee positions
    const fetchPositions = async () => {
      try {
        const response = await axios.get(
          "http://localhost/mini-project/mini-project/Backend/api/direct_search/position.php"
        );
        setPositions(response.data);
      } catch (error) {
        console.error("Error fetching employee positions:", error);
      }
    };

    fetchPositions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddEmployee = async () => {
    try {
      // Split the skills input by comma and trim spaces
      const skillsArray = formData.skill
        .split(",")
        .map((skill) => skill.trim());

      // Update the formData with the skills array
      const updatedFormData = {
        ...formData,
        skills: skillsArray,
      };

      // Send a POST request to add the employee data
      await axios.post(
        "http://localhost/mini-project/mini-project/Backend/api/employee_management.php",
        updatedFormData
      );

      // After adding the employee, you can navigate to another page:
      navigate("/EmployeeManagement"); // Replace with your desired route
      console.log(updatedFormData);
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Add Employee</h2>
      <div>
        <table>
          <tbody>
            <tr>
              <td>ID:</td>
              <td>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>Name:</td>
              <td>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>Last Name:</td>
              <td>
                <input
                  type="text"
                  name="lname"
                  value={formData.lname}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>Telephone:</td>
              <td>
                <input
                  type="text"
                  name="tel"
                  value={formData.tel}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>Address:</td>
              <td>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>Join Date:</td>
              <td>
                <input
                  type="date"
                  name="join_date"
                  value={formData.join_date}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>Skills:</td>
              <td>
                <input
                  type="text"
                  name="skill"
                  value={formData.skill}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>Experience:</td>
              <td>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>Position:</td>
              <td>
                <select
                  name="employee_position_id"
                  value={formData.no || ""}
                  onChange={handleInputChange}
                >
                  <option value="">Select Position</option>
                  {positions.map(
                    (
                      position,
                      index // Add 'index' as the second argument
                    ) => (
                      <option
                        key={index} // Use 'index' as the key
                        value={position.no}
                      >
                        {position.position_name}
                      </option>
                    )
                  )}
                </select>
              </td>
            </tr>
            <tr>
              <td>User ID:</td>
              <td>
                <input
                  type="text"
                  name="user_id"
                  value={formData.user_id}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>Password:</td>
              <td>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <button type="button" onClick={handleAddEmployee}>
                  Add Employee
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AddEmployeePage;

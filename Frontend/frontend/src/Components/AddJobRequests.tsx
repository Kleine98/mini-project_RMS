import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Navbar from "./Navbar";

function AddJobRequests() {
  const currentDate = new Date().toISOString().split("T")[0];
  const [formData, setFormData] = useState({
    date: currentDate,
    status: "Pending",
    exp: "",
    amount: "",
    employee_position_id: "", // Selected employee position
    required_skills: [],
    requester_id: Cookies.get("manager_employee_id"), // Selected requester
    approver_id: "", // Selected approver
    comment: "",
  });

  const [positions, setPositions] = useState([]);
  const [approvers, setApprovers] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    // Fetch employee positions
    axios
      .get(
        "http://localhost/mini-project/mini-project/Backend/api/direct_search/position.php"
      )
      .then((response) => {
        setPositions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employee positions:", error);
      });

    // Fetch approvers
    axios
      .get(
        "http://localhost/mini-project/mini-project/Backend/api/direct_search/manager.php"
      )
      .then((response) => {
        setApprovers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching approvers:", error);
      });
    // Fetch skills
    axios
      .get(
        "http://localhost/mini-project/mini-project/Backend/api/direct_search/skill.php"
      )
      .then((response) => {
        setSkills(response.data);
      })
      .catch((error) => {
        console.error("Error fetching skills:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "required_skills") {
      // Check if the selected skill is already in the array
      if (formData.required_skills.includes(value)) {
        // If it's in the array, remove it
        const updatedSkills = formData.required_skills.filter(
          (skill) => skill !== value
        );
        setFormData({ ...formData, required_skills: updatedSkills });
      } else {
        // If it's not in the array, add it
        const updatedSkills = [...formData.required_skills, value];
        setFormData({ ...formData, required_skills: updatedSkills });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddJobRequest = async () => {
    if (
      formData.exp.trim() === "" ||
      formData.amount.trim() === "" ||
      formData.employee_position_id === "" ||
      formData.required_skills.length === 0 ||
      formData.approver_id === "" ||
      formData.comment.trim() === ""
    ) {
      // Display an error message or prevent the submission
      alert("Please fill in all required fields.");
      return;
    }
    try {
      // Send a POST request to add the job request data
      await axios.post(
        "http://localhost/mini-project/mini-project/Backend/api/job/job-request.php",
        formData
      );

      // After adding the job request, you can navigate to another page:
      window.location.href = "/JobRequests"; // Replace with your desired route
    } catch (error) {
      console.error("Error adding job request:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Add Job Request</h2>
      <div>
        <table>
          <tbody>
            <tr>
              <td>Experience(years):</td>
              <td>
                <input
                  type="text"
                  name="exp"
                  value={formData.exp}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>Amount(units):</td>
              <td>
                <input
                  type="text"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>Employee Position:</td>
              <td>
                <select
                  name="employee_position_id"
                  value={formData.employee_position_id}
                  onChange={handleInputChange}
                >
                  <option value="">Select Employee Position</option>
                  {positions.map((position) => (
                    <option key={position.no} value={position.no}>
                      {position.department_name} | {position.position_name}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>Skills:</td>
              <td>
                <select
                  name="required_skills"
                  value=""
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
                    Select Skill
                  </option>
                  {skills.map((skill) => (
                    <option key={skill.id} value={skill.id}>
                      {skill.id} | {skill.skill_name}
                    </option>
                  ))}
                </select>
              </td>
              <td>Selected Skills: {formData.required_skills.join(", ")}</td>
            </tr>
            <tr>
              <td>Approver:</td>
              <td>
                <select
                  name="approver_id"
                  value={formData.approver_id}
                  onChange={handleInputChange}
                >
                  <option value="">Select Approver</option>
                  {approvers.map((approver) => (
                    <option key={approver.id} value={approver.id}>
                      {approver.id} | {approver.name} {approver.lname} |{" "}
                      {approver.department_name} | {approver.position_name}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>Comment:</td>
              <td>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <button type="button" onClick={handleAddJobRequest}>
                  Add Job Request
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AddJobRequests;

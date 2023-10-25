import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

function AddJobRequests() {
  const [formData, setFormData] = useState({
    request_id: "",
    date: "",
    status: "Pending",
    exp: "",
    amount: "",
    employee_position_id: "", // Selected employee position
    required_skills: [],
    requester_id: "", // Selected requester
    approver_id: "", // Selected approver
    comment: "",
  });

  const [positions, setPositions] = useState([]);
  const [requesters, setRequesters] = useState([]);
  const [approvers, setApprovers] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    // Fetch employee positions
    axios
      .get(
        "http://203.188.54.9/~u6411130038/mini-project/Backend/api/direct_search/position.php"
      )
      .then((response) => {
        setPositions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employee positions:", error);
      });

    // Fetch requesters
    axios
      .get(
        "http://203.188.54.9/~u6411130038/mini-project/Backend/api/direct_search/manager.php"
      )
      .then((response) => {
        setRequesters(response.data);
      })
      .catch((error) => {
        console.error("Error fetching requesters:", error);
      });

    // Fetch approvers
    axios
      .get(
        "http://203.188.54.9/~u6411130038/mini-project/Backend/api/direct_search/manager.php"
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
        "http://203.188.54.9/~u6411130038/mini-project/Backend/api/direct_search/skill.php"
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
      // If the selected skill is not already in the array, add it
      if (!formData.required_skills.includes(value)) {
        const updatedSkills = [...formData.required_skills, value];
        setFormData({ ...formData, required_skills: updatedSkills });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddJobRequest = async () => {
    try {
      // Send a POST request to add the job request data
      await axios.post(
        "http://203.188.54.9/~u6411130038/mini-project/Backend/api/job/job-request.php",
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
              <td>Request ID:</td>
              <td>
                <input
                  type="text"
                  name="request_id"
                  value={formData.request_id}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>Date:</td>
              <td>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>Status:</td>
              <td>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
            </tr>
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
              <td>Requester:</td>
              <td>
                <select
                  name="requester_id"
                  value={formData.requester_id}
                  onChange={handleInputChange}
                >
                  <option value="">Select Requester</option>
                  {requesters.map((requester) => (
                    <option key={requester.id} value={requester.id}>
                      {requester.id} | {requester.name} {requester.lname} |{" "}
                      {requester.department_name} | {requester.position_name}
                    </option>
                  ))}
                </select>
              </td>
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

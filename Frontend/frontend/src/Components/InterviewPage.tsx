import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Navbar from "./Navbar";

function InterviewPage() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const managerId = Cookies.get("manager_employee_id");
    if (managerId) {
      fetchInterviews(managerId);
    } else {
      console.error("Manager ID not found in cookies.");
    }
  }, []);

  const fetchInterviews = async (managerId) => {
    try {
      const response = await axios.get(
        `http://localhost/mini-project/mini-project/Backend/api/interview/interview.php?manager_id=${managerId}`
      );
      setInterviews(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching interviews:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Interview Management</h2>

      {/* Display loading message while waiting for data */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        // List of interviews
        <ul>
          {interviews.map((interview) => (
            <li key={interview.id}>
              <strong>Interview ID:</strong> {interview.id}
              <br />
              <strong>Date:</strong> {interview.date}
              <br />
              {/* Display other interview details here */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default InterviewPage;

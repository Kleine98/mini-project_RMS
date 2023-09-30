import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Navbar from "./Navbar";
import InterviewDetail from "./InterviewDetail";

function CandidateInterviewPage() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInterview, setSelectedInterview] = useState(null);

  useEffect(() => {
    const candidateId = Cookies.get("candidateID");
    if (candidateId) {
      fetchInterviews(candidateId);
    } else {
      console.error("Candidate ID not found in cookies.");
    }
  }, []);

  const fetchInterviews = async (candidateId) => {
    try {
      const response = await axios.get(
        `http://203.188.54.9/~u6411130038/mini-project/Backend/api/interview/candidate_interview.php?candidate_id=${candidateId}`
      );
      setInterviews(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching interviews:", error);
    }
  };

  const handleInterviewClick = (interviewId) => {
    // Set the selected interview when clicked
    setSelectedInterview(interviewId);
  };

  return (
    <div>
      <Navbar />
      <h2>Candidate Interview Management</h2>

      {/* Display loading message while waiting for data */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        // Table to display interviews
        <table>
          <thead>
            <tr>
              <th>Interview ID</th>
              <th>Date</th>
              <th>Candidate ID</th>
              <th>Manager ID</th>
              <th>Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Tel</th>
              <th>Address</th>
              <th>Register Date</th>
              <th>Request ID</th>
              <th>No</th>
              {/* Add more table headers for additional fields */}
            </tr>
          </thead>
          <tbody>
            {interviews.map((interview) => (
              <tr
                key={interview.id}
                onClick={() => handleInterviewClick(interview.id)}
                style={{ cursor: "pointer" }}
              >
                <td>{interview.id}</td>
                <td>{interview.date}</td>
                <td>{interview.candidate_id}</td>
                <td>{interview.manager_id}</td>
                <td>{interview.name}</td>
                <td>{interview.lname}</td>
                <td>{interview.email}</td>
                <td>{interview.tel}</td>
                <td>{interview.address}</td>
                <td>{interview.register_date}</td>
                <td>{interview.request_id}</td>
                <td>{interview.no}</td>
                {/* Add more table cells for additional fields */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* Display the scoring form if an interview is selected */}
      {selectedInterview && <InterviewDetail interviewId={selectedInterview} />}
    </div>
  );
}

export default CandidateInterviewPage;

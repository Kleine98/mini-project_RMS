import React, { useState, useEffect } from "react";
import axios from "axios";

function InterviewDetail({ interviewId }) {
  const [interview, setInterview] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInterview(interviewId);
  }, [interviewId]);

  const fetchInterview = async (interviewId) => {
    try {
      const response = await axios.get(
        `http://localhost/mini-project/mini-project/Backend/api/interview/interview.php?interview_id=${interviewId}`
      );
      setInterview(response.data[0]); // Access the first object in the array
      setLoading(false);
    } catch (error) {
      console.error("Error fetching interview:", error);
    }
  };

  // Function to split skills into an array
  const getSkillsArray = () => {
    if (interview.skills) {
      return interview.skills.split(","); // Split the comma-separated string into an array
    }
    return [];
  };

  return (
    <div>
      <h2>Interview Detail</h2>

      {/* Display loading message while waiting for data */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        // Render interview data
        <div>
          <table className="interview-table">
            <tbody>
              <tr>
                <td>Interview ID</td>
                <td>{interview.id}</td>
              </tr>
              <tr>
                <td>Date</td>
                <td>{interview.date}</td>
              </tr>
              <tr>
                <td>Candidate ID</td>
                <td>{interview.candidate_id}</td>
              </tr>
              <tr>
                <td>Name</td>
                <td>{interview.name}</td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td>{interview.lname}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{interview.email}</td>
              </tr>
              <tr>
                <td>Tel</td>
                <td>{interview.tel}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>{interview.address}</td>
              </tr>
              <tr>
                <td>Register Date</td>
                <td>{interview.register_date}</td>
              </tr>
              <tr>
                <td>Request ID</td>
                <td>{interview.request_id}</td>
              </tr>
              <tr>
                <td>No</td>
                <td>{interview.no}</td>
              </tr>
              <tr>
                <td>Candidate ID</td>
                <td>{interview.candidate_id}</td>
              </tr>
              <tr>
                <td>Skills</td>
                <td>
                  <ul>
                    {getSkillsArray().map((skill, index) => (
                      <li key={index}>{skill.trim()}</li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr>
                <td>Interview Date</td>
                <td>{interview.date}</td>
              </tr>
              <tr>
                <td>Interview Schedule ID</td>
                <td>{interview.interview_schedule_id}</td>
              </tr>
              <tr>
                <td>Manager ID</td>
                <td>{interview.manager_id}</td>
              </tr>
              <tr>
                <td>Interview Result ID</td>
                <td>{interview.interview_result_id}</td>
              </tr>
              <tr>
                <td>Technical Score</td>
                <td>{interview.technical_score}</td>
              </tr>
              <tr>
                <td>Creative Score</td>
                <td>{interview.creative_score}</td>
              </tr>
              <tr>
                <td>Human Relation Score</td>
                <td>{interview.human_relation_score}</td>
              </tr>
              <tr>
                <td>Learning Score</td>
                <td>{interview.learning_score}</td>
              </tr>
              <tr>
                <td>Decision</td>
                <td>{interview.decision}</td>
              </tr>
              <tr>
                <td>Comment</td>
                <td>{interview.comment}</td>
              </tr>
              {/* ... other rows ... */}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default InterviewDetail;

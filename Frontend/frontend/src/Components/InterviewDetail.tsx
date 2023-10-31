import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import Cookies from "js-cookie";

function InterviewDetail({ interviewId, managerId }) {
  const [interview, setInterview] = useState({});
  const [loading, setLoading] = useState(true);
  const candidateId = Cookies.get("candidateID");
  const navigate = useNavigate(); // Use useNavigate inside the component function
  const [showAcceptRejectForm, setShowAcceptRejectForm] = useState(true);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    fetchInterview(interviewId, managerId);
  }, [interviewId, managerId]);

  const fetchInterview = async (interviewId, managerId) => {
    try {
      const response = await axios.get(
        `http://203.188.54.9/~u6411130038/mini-project/Backend/api/interview/interview.php?interview_id=${interviewId}&manager_id=${managerId}`
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

  const handleEnterInterviewClick = () => {
    navigate("/EnterInterviewPage");
  };

  const handleAcceptInterview = () => {
    setAccepted(true);
  };

  const handleRejectInterview = () => {
    // Make an API request to delete the interview schedule
    axios
      .delete(
        `http://203.188.54.9/~u6411130038/mini-project/Backend/api/interview/interview_schedule.php`,
        {
          data: {
            interview_schedule_id: interview.interview_schedule_id,
          },
        }
      )
      .then((response) => {
        // Handle successful deletion
        console.log(response.data);
        alert("Interview rejected");
        setShowAcceptRejectForm(false);
      })
      .catch((error) => {
        // Handle deletion error
        console.error("Error deleting interview schedule:", error);
      });
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
                {candidateId && showAcceptRejectForm && !accepted && (
                  <td>
                    <p>Your interview has been scheduled.</p>
                    <button onClick={handleAcceptInterview}>Accept</button>
                    <button onClick={handleRejectInterview}>Reject</button>
                  </td>
                )}

                {accepted && (
                  <td>
                    <button type="button" onClick={handleEnterInterviewClick}>
                      Enter interview
                    </button>
                  </td>
                )}
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
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default InterviewDetail;

import React, { useState, useEffect } from "react";
import axios from "axios";

function InterviewReportAVG() {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      const response = await axios.get(
        // Replace with the URL to your report.php API endpoint
        "http://localhost/mini-project/mini-project/Backend/api/report/interview_report.php"
      );
      setReportData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching interview report data:", error);
    }
  };

  const handleCandidateClick = (candidate) => {
    setSelectedCandidate(candidate);
    setSelectedStatus(""); // Reset the selected status
  };

  const handleAcceptCandidate = () => {
    // Make a request to your API to accept the selected candidate
    // Replace with the actual candidate ID and status
    const candidateId = selectedCandidate.candidate_id;
    const status = "Accepted"; // Set the desired status

    axios
      .post(
        // Replace with the URL to your API for adding selected candidates
        "http://localhost/mini-project/mini-project/Backend/api/candidate_search.php",
        {
          candidate_id: candidateId,
          status: status,
        }
      )
      .then((response) => {
        // Handle the success message from the API
        alert(response.data.message);
        setSelectedStatus(status); // Update the selected status
      })
      .catch((error) => {
        console.error("Error accepting the candidate:", error);
        alert("Failed to accept the candidate.");
      });
  };

  const handleRejectCandidate = () => {
    // Make a request to your API to reject the selected candidate
    // Replace with the actual candidate ID and status
    const candidateId = selectedCandidate.candidate_id;
    const status = "Rejected"; // Set the desired status

    axios
      .post(
        // Replace with the URL to your API for adding rejected candidates
        "http://localhost/mini-project/mini-project/Backend/api/candidate_search.php",
        {
          candidate_id: candidateId,
          status: status,
        }
      )
      .then((response) => {
        // Handle the success message from the API
        alert(response.data.message);
        setSelectedStatus(status); // Update the selected status
      })
      .catch((error) => {
        console.error("Error rejecting the candidate:", error);
        alert("Failed to reject the candidate.");
      });
  };

  return (
    <div>
      <h2>Interview Report</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Candidate ID</th>
              <th>Candidate Name</th>
              <th>Avg Technical Score</th>
              <th>Avg Creative Score</th>
              <th>Avg Human Relation Score</th>
              <th>Avg Learning Score</th>
              <th>Accepted Count</th>
              <th>Rejected Count</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((data) => (
              <tr
                key={data.candidate_id}
                onClick={() => handleCandidateClick(data)}
                style={{ cursor: "pointer" }}
              >
                <td>{data.candidate_id}</td>
                <td>{data.candidate_name}</td>
                <td>{data.avg_technical_score}</td>
                <td>{data.avg_creative_score}</td>
                <td>{data.avg_human_relation_score}</td>
                <td>{data.avg_learning_score}</td>
                <td>{data.accepted_count}</td>
                <td>{data.rejected_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedCandidate && (
        <div>
          <h3>Selected Candidate</h3>
          <p>Candidate ID: {selectedCandidate.candidate_id}</p>
          <p>Candidate Name: {selectedCandidate.candidate_name}</p>
          {selectedStatus === "" ? (
            <div>
              <button
                onClick={handleAcceptCandidate}
                style={{ marginRight: "10px" }}
              >
                Accept
              </button>
              <button onClick={handleRejectCandidate}>Reject</button>
            </div>
          ) : (
            <p>Status: {selectedStatus}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default InterviewReportAVG;

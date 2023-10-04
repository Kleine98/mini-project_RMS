import React, { useState, useEffect } from "react";
import axios from "axios";

function InterviewReportAVG() {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      const response = await axios.get(
        // Replace with the URL to your report.php API endpoint
        "http://203.188.54.9/~u6411130038/mini-project/Backend/api/report/interview_report.php"
      );
      setReportData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching interview report data:", error);
    }
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
              <tr key={data.candidate_id}>
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
    </div>
  );
}

export default InterviewReportAVG;

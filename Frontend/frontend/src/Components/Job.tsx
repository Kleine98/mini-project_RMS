import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

function Job() {
  const [jobApplications, setJobApplications] = useState([]);
  const [passedCandidates, setPassedCandidates] = useState([]);
  const [loadingJobApplications, setLoadingJobApplications] = useState(true);
  const [loadingPassedCandidates, setLoadingPassedCandidates] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobApplications();
    fetchPassedCandidates();
  }, []);

  const fetchJobApplications = async () => {
    try {
      const response = await axios.get(
        // Replace with the URL to your job applications API endpoint
        `http://localhost/mini-project/mini-project/Backend/api/job/job-post.php`
      );
      setJobApplications(response.data);
      setLoadingJobApplications(false);
    } catch (error) {
      console.error("Error fetching job applications:", error);
    }
  };

  const fetchPassedCandidates = async () => {
    try {
      const response = await axios.get(
        // Replace with the URL to your passed candidates API endpoint
        `http://localhost/mini-project/mini-project/Backend/api/passed_candidate_search.php`
      );
      setPassedCandidates(response.data);
      setLoadingPassedCandidates(false);
    } catch (error) {
      console.error("Error fetching passed candidates:", error);
    }
  };

  const handleRowClick = (requestId) => {
    navigate("/JobDetails", { state: { requestId: requestId } });
  };

  return (
    <div>
      <Navbar />
      <h2>Job Applications</h2>

      {loadingJobApplications ? (
        <p>Loading job applications...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Job ID</th>
              <th>Date</th>
              <th>Status</th>
              <th>Experience</th>
              <th>Amount</th>
              <th>Department</th>
              <th>Position</th>
              <th>Skills</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {jobApplications.map((job) => (
              <tr
                key={job.request_id}
                onClick={() => handleRowClick(job.request_id)}
                style={{ cursor: "pointer" }}
              >
                <td>{job.request_id}</td>
                <td>{job.request_date}</td>
                <td>{job.request_status}</td>
                <td>{job.request_experience} years</td>
                <td>{job.request_amount} units</td>
                <td>{job.request_department_name}</td>
                <td>{job.request_position_name}</td>
                <td>{job.required_skills}</td>
                <td>{job.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2>Candidate Report</h2>

      {loadingPassedCandidates ? (
        <p>Loading candidate report...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Candidate ID</th>
              <th>Name</th>
              <th>Last Name</th>
              <th>Department</th>
              <th>Position</th>
              <th>Job ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {passedCandidates.map((candidate) => (
              <tr key={candidate.candidate_id}>
                <td>{candidate.candidate_id}</td>
                <td>{candidate.name}</td>
                <td>{candidate.lname}</td>
                <td>{candidate.department_name}</td>
                <td>{candidate.position_name}</td>
                <td>{candidate.request_id}</td>
                <td>{candidate.candidate_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Job;

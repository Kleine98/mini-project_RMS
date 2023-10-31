import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

function Job() {
  const [jobApplications, setJobApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobApplications();
  }, []);

  const fetchJobApplications = async () => {
    try {
      const response = await axios.get(
        // Replace with the URL to your job applications API endpoint
        `http://203.188.54.9/~u6411130038/mini-project/Backend/api/job/job-post.php`
      );
      setJobApplications(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching job applications:", error);
    }
  };

  const handleRowClick = (requestId) => {
    navigate("/JobDetails", { state: { requestId: requestId } });
  };

  return (
    <div>
      <Navbar />
      <h2>Job Applications</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Request ID</th>
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
        </>
      )}
    </div>
  );
}

export default Job;

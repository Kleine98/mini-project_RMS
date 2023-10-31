import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";

function JobDetails() {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const requestId = location.state.requestId;

  useEffect(() => {
    if (requestId) {
      fetchJobDetails(requestId);
    }
  }, [requestId]);

  const fetchJobDetails = async (requestId) => {
    try {
      const response = await axios.get(
        `http://203.188.54.9/~u6411130038/mini-project/Backend/api/job/job-post.php?request_id=${requestId}`
      );

      setJob(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  };

  const applyForJob = () => {
    const candidateID = Cookies.get("candidateID");
    if (!candidateID) {
      alert("Please log in before applying for a job.");
      return;
    }

    const data = {
      request_id: requestId,
      id: candidateID,
    };

    axios
      .put(
        "http://203.188.54.9/~u6411130038/mini-project/Backend/api/job/job-apply.php",
        data
      )
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        console.error("Error applying for the job:", error);
        alert("Failed to apply for the job.");
      });
  };

  return (
    <div>
      <Navbar />
      <h2>Job Request Details</h2>
      {loading ? (
        <p>Loading...</p>
      ) : job ? (
        <table>
          <tbody>
            {/* Display job details */}
            <tr>
              <th>Request ID:</th>
              <td>{job.request_id}</td>
            </tr>
            <tr>
              <th>Approved Date:</th>
              <td>{job.request_date}</td>
            </tr>
            <tr>
              <th>Status:</th>
              <td>{job.request_status}</td>
            </tr>
            <tr>
              <th>Experience:</th>
              <td>{job.request_experience} years</td>
            </tr>
            <tr>
              <th>Amount:</th>
              <td>{job.request_amount} units</td>
            </tr>
            <tr>
              <th>Department:</th>
              <td>{job.request_department_name}</td>
            </tr>
            <tr>
              <th>Position:</th>
              <td>{job.request_position_name}</td>
            </tr>
            <tr>
              <th>Skills:</th>
              <td>{job.required_skills}</td>
            </tr>
            <tr>
              <th>Comment:</th>
              <td>{job.comment}</td>
            </tr>
            <tr>
              <td colSpan="2">
                {Cookies.get("candidateID") && (
                  <button onClick={applyForJob}>Apply for this Job</button>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Job not found</p>
      )}
    </div>
  );
}

export default JobDetails;

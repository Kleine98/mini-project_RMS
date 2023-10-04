import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Navbar from "./Navbar";

function JobApplications() {
  const [jobApplications, setJobApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [approvalStatus, setApprovalStatus] = useState("Approved");
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const managerId = Cookies.get("manager_employee_id");
    if (managerId) {
      fetchJobApplications(managerId);
    } else {
      console.error("Manager ID not found in cookies.");
    }
  }, []);

  const fetchJobApplications = async (managerId) => {
    try {
      const response = await axios.get(
        // Replace with the URL to your job applications API endpoint
        `http://203.188.54.9/~u6411130038/mini-project/Backend/api/job/job-request.php?approver_id=${managerId}`
      );
      setJobApplications(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching job applications:", error);
    }
  };

  const handleRowClick = (requestId) => {
    // Show the form for the selected job request
    setSelectedRequest(requestId);
    // Reset comment and error when a new request is selected
    setComment("");
    setCommentError("");
  };

  const handleApprovalStatusChange = (event) => {
    setApprovalStatus(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
    // Reset comment error when the user starts typing
    setCommentError("");
  };

  const handleSubmit = async () => {
    // Validate comment field
    if (!comment) {
      setCommentError("Please enter a comment.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.put(
        // Replace with the URL to your job applications API endpoint
        `http://203.188.54.9/~u6411130038/mini-project/Backend/api/job/job-request.php`,
        {
          request_id: selectedRequest,
          request_status: approvalStatus,
          comment: comment,
        }
      );

      // Handle the response as needed (e.g., show a success message)
      console.log(response.data);

      // Clear the selected request and form fields
      setSelectedRequest(null);
      setApprovalStatus("Approved");
      setComment("");
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error updating job request status:", error);
      setIsSubmitting(false);
    }
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
                <th>Request Date</th>
                <th>Request Status</th>
                <th>Request Experience</th>
                <th>Request Amount</th>
                <th>Department</th>
                <th>Position</th>
                <th>Skills</th>
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
                  <td>{job.request_experience}</td>
                  <td>{job.request_amount}</td>
                  <td>{job.request_department_name}</td>
                  <td>{job.request_position_name}</td>
                  <td>{job.required_skills}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedRequest && (
            <div>
              <h3>Review and Approve/Reject Request ID: {selectedRequest}</h3>
              <div>
                <label>Approval Status:</label>
                <select
                  value={approvalStatus}
                  onChange={handleApprovalStatusChange}
                >
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <div>
                <label>Comment:</label>
                <textarea
                  value={comment}
                  onChange={handleCommentChange}
                ></textarea>
                {commentError && <p className="error">{commentError}</p>}
              </div>
              <button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default JobApplications;

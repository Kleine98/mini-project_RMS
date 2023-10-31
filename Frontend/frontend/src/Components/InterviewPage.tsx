import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Navbar from "./Navbar";
import InterviewScoringForm from "./InterviewScoringForm";
import CandidateSchedule from "./CandidateSchedule";

function InterviewPage() {
  const [interviews, setInterviews] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [filterSkills, setFilterSkills] = useState("");
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const managerId = Cookies.get("manager_employee_id");
    if (managerId) {
      fetchInterviews(managerId);
      fetchCandidatesWithoutSchedule();
      fetchSkillsData();
    } else {
      console.error("Manager ID not found in cookies.");
    }
  }, []);

  const fetchSkillsData = async () => {
    try {
      const response = await axios.get(
        "http://203.188.54.9/~u6411130038/mini-project/Backend/api/direct_search/skill.php"
      );
      setSkills(response.data);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  const handleFilterChange = (event) => {
    setFilterSkills(event.target.value);
  };

  const fetchInterviews = async (managerId) => {
    try {
      const response = await axios.get(
        `http://203.188.54.9/~u6411130038/mini-project/Backend/api/interview/interview.php?manager_id=${managerId}`
      );
      setInterviews(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching interviews:", error);
    }
  };

  const fetchCandidatesWithoutSchedule = async () => {
    try {
      const response = await axios.get(
        `http://203.188.54.9/~u6411130038/mini-project/Backend/api/candidate_search.php`
      );
      setCandidates(response.data);
    } catch (error) {
      console.error("Error fetching candidates without a schedule:", error);
    }
  };

  const handleInterviewClick = (no) => {
    setSelectedInterview(no);
  };

  const handleCandidateClick = (candidate_id) => {
    setSelectedCandidate(candidate_id);
  };

  return (
    <div>
      <Navbar />
      <h2>Interview Management</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h3>Interviews</h3>
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
                  onClick={() => handleInterviewClick(interview.no)}
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
          <table>
            <tbody>
              <tr>
                <td>
                  <h3>Candidates without Interview Schedule</h3>
                </td>
                <td>
                  <select
                    style={{ marginLeft: "20px" }}
                    value={filterSkills}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Skills</option>
                    {skills.map((skill) => (
                      <option key={skill.id} value={skill.skill_name}>
                        {skill.skill_name}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Telephone</th>
                <th>Address</th>
                <th>Register Date</th>
                <th>Request ID</th>
              </tr>
            </thead>
            <tbody>
              {candidates
                .filter((candidate) => {
                  if (!filterSkills) {
                    return true; // No filter, show all candidates
                  }
                  const candidateSkills = candidate.skills.split(",");
                  return candidateSkills.includes(filterSkills);
                })
                .map((candidate) => (
                  <tr
                    key={candidate.id}
                    onClick={() => handleCandidateClick(candidate.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{candidate.id}</td>
                    <td>{candidate.name}</td>
                    <td>{candidate.lname}</td>
                    <td>{candidate.email}</td>
                    <td>{candidate.tel}</td>
                    <td>{candidate.address}</td>
                    <td>{candidate.register_date}</td>
                    <td>{candidate.request_id}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
      <div>
        {selectedInterview && <InterviewScoringForm no={selectedInterview} />}
      </div>
      <div>
        {selectedCandidate && (
          <CandidateSchedule candidate_id={selectedCandidate} />
        )}
      </div>
    </div>
  );
}

export default InterviewPage;

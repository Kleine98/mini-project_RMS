import React, { useState, useEffect } from "react";
import axios from "axios";

function CandidateSchedule({ candidate_id }) {
  const [managers, setManagers] = useState([]);
  const [schedule, setSchedule] = useState({
    manager_id: [],
    date: "",
  });
  const [availableDates, setAvailableDates] = useState([]);
  const [canSchedule, setCanSchedule] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "manager_id") {
      // Check if the selected manager is already in the array
      if (schedule.manager_id.includes(value)) {
        // If it's in the array, remove it
        const updatedManagers = schedule.manager_id.filter(
          (manager_id) => manager_id !== value
        );
        setSchedule({ ...schedule, manager_id: updatedManagers });
      } else {
        // If it's not in the array, add it
        const updatedManagerId = [...schedule.manager_id, value];
        setSchedule({ ...schedule, manager_id: updatedManagerId });
      }
    } else if (name === "date") {
      // Set the schedule.date immediately when a date is selected
      setSchedule({ ...schedule, date: value });
    }
  };

  useEffect(() => {
    // Fetch available dates for selected managers
    const fetchAvailableDates = async () => {
      try {
        const response = await axios.post(
          "http://localhost/mini-project/mini-project/Backend/api/direct_search/manager_available_date.php",
          {
            manager_ids: schedule.manager_id.join(","), // Convert the array to a comma-separated string
          }
        );

        setAvailableDates(response.data);

        // Set the schedule.date to the first available date, if availableDates is not empty
        if (Array.isArray(response.data) && response.data.length > 0) {
          setSchedule({ ...schedule, date: response.data[0] });
          setCanSchedule(true); // Enable scheduling
        } else {
          setCanSchedule(false); // Disable scheduling
        }
      } catch (error) {
        console.error("Error fetching available dates:", error);
      }
    };

    fetchAvailableDates();

    // Fetch managers
    axios
      .get(
        "http://localhost/mini-project/mini-project/Backend/api/direct_search/manager.php"
      )
      .then((response) => {
        setManagers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching managers:", error);
      });

    // Fetch jobs
    axios
      .get(
        "http://localhost/mini-project/mini-project/Backend/api/job/job-post.php"
      )
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching job data:", error);
      });
  }, [schedule.manager_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!canSchedule) {
      alert("No available dates. Please select a date first.");
      return;
    }

    try {
      // Perform the scheduling using the selected date, candidate ID, and manager IDs
      const response = await axios.post(
        // Use PUT method to update the interview schedule
        "http://localhost/mini-project/mini-project/Backend/api/interview/interview_schedule.php",
        {
          date: schedule.date,
          candidate_id: candidate_id,
          manager_id: schedule.manager_id,
        }
      );
      console.log(response.data.message);
      console.log(response.data);
      console.log(candidate_id);
      console.log(schedule.date);
      console.log(schedule.manager_id);
      if (response.data) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error scheduling the candidate:", error); // Handle error
    }
  };

  const handleJobChange = (e) => {
    setSelectedJob(e.target.value);
  };

  const handleApplyJob = async () => {
    if (!selectedJob) {
      alert("Please select a job first.");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost/mini-project/mini-project/Backend/api/job/job-apply.php",
        {
          id: candidate_id,
          request_id: selectedJob,
        }
      );
      console.log(response.data.message);
      if (response.data) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error applying for the job:", error);
    }
  };

  return (
    <div>
      <h2>Schedule Candidate Interview</h2>
      <p>Candidate ID: {candidate_id}</p>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>Select interviewer</td>
              <td>
                <select name="manager_id" value="" onChange={handleChange}>
                  <option value="" disabled>
                    Select Interviewer
                  </option>
                  {managers.map((manager) => (
                    <option key={manager.id} value={manager.id}>
                      {manager.id} | {manager.name} {manager.lname} |{" "}
                      {manager.department_name} | {manager.position_name}
                    </option>
                  ))}
                </select>
              </td>
              <td>Selected Interviewer ID: {schedule.manager_id.join(", ")}</td>
            </tr>
            <tr>
              <td>Schedule Date:</td>
              <td>
                {Array.isArray(availableDates) && availableDates.length > 0 ? (
                  <select
                    name="date"
                    value={schedule.date}
                    onChange={handleChange}
                    required
                  >
                    {availableDates.map((date, index) => (
                      <option key={index} value={date}>
                        {date}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p>No available dates found.</p>
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit" disabled={!canSchedule}>
          Schedule Interview
        </button>
      </form>
      <table>
        <tbody>
          <tr>
            <td colSpan={2}>Want to apply this candidate for another job?</td>
          </tr>
          <tr>
            <td>Job Application:</td>
            <td>
              <select name="job" value={selectedJob} onChange={handleJobChange}>
                <option value="" disabled>
                  Select a Job
                </option>
                {jobs.map((job) => (
                  <option key={job.request_id} value={job.request_id}>
                    {job.request_id} | {job.request_department_name} |{" "}
                    {job.request_position_name} | {job.required_skills}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleApplyJob} disabled={!selectedJob}>
        Apply for Job
      </button>
    </div>
  );
}

export default CandidateSchedule;

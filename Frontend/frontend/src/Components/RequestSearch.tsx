import { useState } from "react";
import NavHr from "./NavHr";

function RequestSearch() {
  const applicantData = [
    {
      name: "John Doe",
      position: "Software Engineer",
      department: "Engineering",
    },
    {
      name: "Jane Smith",
      position: "Data Scientist",
      department: "Engineering",
    },
    { name: "Bob Johnson", position: "HR Manager", department: "HR" },
    { name: "Alice Brown", position: "QA Tester", department: "QA" },
  ];

  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const filteredApplicants = applicantData.filter(
    (applicant) =>
      (selectedPosition === "" || applicant.position === selectedPosition) &&
      (selectedDepartment === "" || applicant.department === selectedDepartment)
  );
  return (
    <>
      <NavHr />

      <h1>Applicants Table</h1>
      <div>
        <label>Select Position:</label>
        <select
          value={selectedPosition}
          onChange={(e) => setSelectedPosition(e.target.value)}
        >
          <option value="">All Positions</option>
          <option value="Software Engineer">Software Engineer</option>
          <option value="Data Scientist">Data Scientist</option>
          <option value="HR Manager">HR Manager</option>
          <option value="QA Tester">QA Tester</option>
        </select>
      </div>
      <div>
        <label>Select Department:</label>
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          <option value="">All Departments</option>
          <option value="Engineering">Engineering</option>
          <option value="HR">HR</option>
          <option value="QA">QA</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {filteredApplicants.map((applicant, index) => (
            <tr key={index}>
              <td>{applicant.name}</td>
              <td>{applicant.position}</td>
              <td>{applicant.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default RequestSearch;

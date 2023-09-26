import React, { useState } from "react";
import NavHr from "./NavHr";
import "./RequestHr.css";

function RequestHr() {
  const [requestType, setRequestType] = useState("general");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [amount, setAmount] = useState("");
  const [requestContent, setRequestContent] = useState("");

  const handleRequestTypeChange = (event) => {
    setRequestType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission, e.g., send data to a server or perform some action.
  };

  return (
    <>
      <NavHr />
      <div className="request-form">
        <h2 className="section-title">Request Information</h2>
        <div onSubmit={handleSubmit}>
          <div className="radio-section">
            <label className="General">
              <input
                type="radio"
                value="general"
                checked={requestType === "general"}
                onChange={handleRequestTypeChange}
              />
              General Request
            </label>
            <label className="Add-Emp">
              <input
                type="radio"
                value="addEmployee"
                checked={requestType === "addEmployee"}
                onChange={handleRequestTypeChange}
              />
              Request to Add Employees
            </label>
          </div>

          <div className="input-section">
            <label className="Position">
              Position:
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              >
                <option value="">Select Position</option>
                <option value="position1">Position 1</option>
                <option value="position2">Position 2</option>
                {/* Add more position options */}
              </select>
            </label>
            <label className="Department">
              Department:
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="">Select Department</option>
                <option value="dept1">Department 1</option>
                <option value="dept2">Department 2</option>
                {/* Add more department options */}
              </select>
            </label>
            <label className="Amonut">
              Amount:
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </label>
          </div>

          <div className="textarea-section">
            <label>
              Request Content:
              <textarea
                className="request-content"
                value={requestContent}
                onChange={(e) => setRequestContent(e.target.value)}
              />
            </label>
          </div>

          <a href="">
            <button type="submit" className="submit-button">
              Submit
            </button>
          </a>
        </div>
      </div>
    </>
  );
}

export default RequestHr;

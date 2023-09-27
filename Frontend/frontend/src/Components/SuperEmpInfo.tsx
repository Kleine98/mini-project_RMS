import React from "react";
import NavSuper from "./NavSuper";
// import { Link } from "react-router-dom";
import "./SuperEmpInfo.css"; // Import your CSS file for styling

function SuperEmpInfo() {
  return (
    <div className="super-emp-info-container">
      <NavSuper />
      <div className="form-container">
        <div className="img-container">
          <img src="your-image-url-here.jpg" alt="Your Image" />
        </div>
        <div className="section-container personal-details">
          <h2>Personal Details</h2>
          <label htmlFor="fullname">
            Fullname:
            <input type="text" className="input-field" />
          </label>
          <label htmlFor="age">
            Age:
            <input type="text" className="input-field" />
          </label>
          <label htmlFor="sex">
            Sex:
            <input type="text" className="input-field" />
          </label>
          <label htmlFor="tel">
            Tel:
            <input type="text" className="input-field" />
          </label>
        </div>

        <div className="section-container employee-details">
          <h2>Employee Details</h2>
          <label htmlFor="rank">
            Rank:
            <input type="text" className="input-field" />
          </label>
          <label htmlFor="employeeId">
            ID Employee:
            <input type="text" className="input-field" />
          </label>
          <label htmlFor="email">
            Email:
            <input type="email" className="input-field" />
          </label>
          <label htmlFor="startDate">
            Start date:
            <input type="date" className="input-field" />
          </label>
          <label htmlFor="department">
            Department:
            <input type="text" className="input-field" />
          </label>
          <label htmlFor="departmentHead">
            Department Head:
            <input type="text" className="input-field" />
          </label>
          <label htmlFor="workEmail">
            Work Email:
            <input type="email" className="input-field" />
          </label>
          <label htmlFor="salary">
            Salary:
            <input type="text" className="input-field" />
          </label>
          <label htmlFor="address">
            Address:
            <textarea className="input-field" cols="30" rows="4"></textarea>
          </label>
        </div>
      </div>
      <div className="add-employee-button">
        {/* You can add a button for adding employees here */}
      </div>
    </div>
  );
}

export default SuperEmpInfo;

import React from "react";
import NavSuper from "./NavSuper";
import { Link } from "react-router-dom";
import "./SuperEmployee.css"; // Import your CSS file for styling

function SuperEmployee() {
  return (
    <div className="super-employee-container">
      <NavSuper />
      <h1 className="super-employee-heading">Super Employee</h1>
      <div className="filter-section">
        <select className="filter-select">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
        <select className="filter-select">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
        <select className="filter-select">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>
      <ul className="list-section">
        <li className="list-item">
          <span className="list-item-title">List Item 1</span>
          <Link to="/SuperEmpInfo">
            <button className="view-more-button">View More</button>
          </Link>
        </li>
        <li className="list-item">
          <span className="list-item-title">List Item 2</span>
          <Link to="/SuperEmpInfo">
            <button className="view-more-button">View More</button>
          </Link>
        </li>
        <li className="list-item">
          <span className="list-item-title">List Item 3</span>
          <Link to="/SuperEmpInfo">
            <button className="view-more-button">View More</button>
          </Link>
        </li>
        <li className="list-item">
          <span className="list-item-title">List Item 4</span>
          <Link to="/SuperEmpInfo">
            <button className="view-more-button">View More</button>
          </Link>
        </li>
        <li className="list-item">
          <span className="list-item-title">List Item 5</span>
          <Link to="/SuperEmpInfo">
            <button className="view-more-button">View More</button>
          </Link>
        </li>
        {/* Add more list items as needed */}
      </ul>
    </div>
  );
}

export default SuperEmployee;

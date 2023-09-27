import React from "react";
import NavSuper from "./NavSuper";
import "./SuperRequest.css";
import { Link } from "react-router-dom";

function SuperRequest() {
  // Define a click handler function for the "view more" button
  const handleButtonClick = (item) => {
    console.log(`Button clicked for: ${item}`);
  };

  return (
    <div className="super-request-container">
      <NavSuper />
      <h1 className="super-request-heading">Super Employee Requests</h1>
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
      </div>
      <ul className="request-list">
        <li className="list-item">
          <div>
            <span className="list-item-title">List Item 1</span>
          </div>
          {/* Define a unique route for this list item */}
          <Link to="/SuperRequestDetail">View Details</Link>
        </li>
        <li className="list-item">
          <div>
            <span className="list-item-title">List Item 2</span>
          </div>
          {/* Define a unique route for this list item */}
          <Link to="/SuperRequestDetail">View Details</Link>
        </li>
        <li className="list-item">
          <div>
            <span className="list-item-title">List Item 3</span>
          </div>
          {/* Define a unique route for this list item */}
          <Link to="/SuperRequestDetail/3">View Details</Link>
        </li>
        <li className="list-item">
          <div>
            <span className="list-item-title">List Item 4</span>
          </div>
          {/* Define a unique route for this list item */}
          <Link to="/SuperRequestDetail/4">View Details</Link>
        </li>
        <li className="list-item">
          <div>
            <span className="list-item-title">List Item 5</span>
          </div>
          {/* Define a unique route for this list item */}
          <Link to="/SuperRequestDetail/5">View Details</Link>
        </li>
        {/* Add more list items as needed */}
      </ul>
    </div>
  );
}

export default SuperRequest;

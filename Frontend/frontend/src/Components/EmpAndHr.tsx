import React from "react";
import NavHr from "./NavHr";
import "./EmpAndHr.css";

function EmpAndHr() {
  return (
    <>
      <NavHr />
      <div className="From-Container">
        <div className="img-container">
          <img src="your-image-url-here.jpg" alt="Your Image" />
        </div>
        <div className="section-container">
          <h2>Personal Details</h2>
          <label htmlFor="fullname">
            Fullname:
            <input type="text" />
          </label>
          <label htmlFor="age">
            Age:
            <input type="text" />
          </label>
          <label htmlFor="sex">
            Sex:
            <input type="text" />
          </label>
          <label htmlFor="tel">
            Tel:
            <input type="text" />
          </label>
        </div>

        <div className="section-container">
          <h2>Details</h2>
          <label htmlFor="email">
            Rank:
            <input type="text" />
          </label>
          <label htmlFor="email">
            ID Employee:
            <input type="text" />
          </label>
          <label htmlFor="email">
            Email:
            <input type="email" />
          </label>
          <label htmlFor="email">
            Start date:
            <input type="date" />
          </label>
          <label htmlFor="email">
            Department:
            <input type="text" />
          </label>
          <label htmlFor="email">
            Department Head:
            <input type="text" />
          </label>
          <label htmlFor="email">
            Work Email:
            <input type="email" />
          </label>
          <label htmlFor="email">
            Salary:
            <input type="text" />
          </label>
          <label htmlFor="email">
            Address:
            <textarea name="" id="" cols="30" rows="10"></textarea>
          </label>
        </div>
      </div>
    </>
  );
}

export default EmpAndHr;

import React from "react";
import Navbar from "./Navbar";
import "./UserAndEmp.css";
import { Link } from "react-router-dom";

function UserAndEmp() {
  return (
    <>
      <Navbar />
      <div className="content">
        <div className="content-left">
          <h1>User</h1>
          <button className="content-button">
            <Link to="/Userlogin">Select</Link>
          </button>
        </div>
        <div className="content-right">
          <h1>Employee</h1>
          <button className="content-button">
            <Link to="/Emplogin">Select</Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default UserAndEmp;

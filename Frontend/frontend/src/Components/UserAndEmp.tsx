import React from "react";
import Navbar from "./Navbar";
import "./UserAndEmp.css";
import { Link } from "react-router-dom";

function UserAndEmp() {
  return (
    <>
      <Navbar />
      <div className="mainpage-html">
        <div className="content">
          <div className="content-left">
            <h1>User</h1>
            <Link to="/Userlogin">
              <button className="content-button">
                <div>Select</div>
              </button>
            </Link>
          </div>
          <div className="content-right">
            <h1>Employee</h1>
            <Link to="/Emplogin">
              <button className="content-button">
                <div>Select</div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserAndEmp;

import React, { useState, useEffect } from "react";
import { FiAirplay, FiX, FiMenu } from "react-icons/fi";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function Navbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  // Retrieve the user ID and permission from the cookie
  const candidateID = Cookies.get("candidateID");
  const userID = Cookies.get("userID");
  const userPermission = Cookies.get("userPermission");
  const managerId = Cookies.get("manager_employee_id");

  return (
    <div className="header">
      <div className="container">
        <div className="header-con">
          <div className="logo-container">
            <a href="#">
              MUT <FiAirplay />
            </a>
          </div>
          <ul className={click ? "menu active" : "menu"}>
            <li className="menu-link" onClick={closeMobileMenu}>
              <Link to="/">Home</Link>
            </li>
            <li className="menu-link" onClick={closeMobileMenu}>
              <Link to="/Contact">Contact</Link>
            </li>
            <li className="menu-link" onClick={closeMobileMenu}>
              <Link to="/Job">Job Applications</Link>
            </li>
            {managerId && userPermission?.charAt(4) === "1" && (
              <li className="menu-link" onClick={closeMobileMenu}>
                <Link to="/JobRequests">Job Requests</Link>
              </li>
            )}
            {/* Conditional rendering of EmployeeManagement link */}
            {userID && userPermission?.charAt(0) === "1" && (
              <li className="menu-link" onClick={closeMobileMenu}>
                <Link to="/EmployeeManagement">Employee Management</Link>
              </li>
            )}
            {userID && userPermission?.charAt(2) === "1" && (
              <li className="menu-link" onClick={closeMobileMenu}>
                <Link to="/PermissionManagement">Permission Management</Link>
              </li>
            )}
            {managerId && userPermission?.charAt(1) === "1" && (
              <li className="menu-link" onClick={closeMobileMenu}>
                <Link to="/InterviewPage/${managerId}">Interview</Link>
              </li>
            )}
            {userPermission?.charAt(1) === "1" && (
              <li className="menu-link" onClick={closeMobileMenu}>
                <Link to="/InterviewReportPage">Interview Report</Link>
              </li>
            )}
            {userPermission?.charAt(3) === "1" && (
              <li className="menu-link" onClick={closeMobileMenu}>
                <Link to="/ReportPage">Report</Link>
              </li>
            )}

            {candidateID && (
              <li className="menu-link" onClick={closeMobileMenu}>
                <Link to="/CandidateInterviewPage/${candidateID}">
                  Interview
                </Link>
              </li>
            )}
            {/* Conditional rendering of user's name or Login/Signup */}
            {userID && (
              <li className="menu-link" onClick={closeMobileMenu}>
                <Link to={`/ProfilePage/${userID}`}>{userID}</Link>
              </li>
            )}
            {candidateID && (
              <li className="menu-link" onClick={closeMobileMenu}>
                <Link to={`/CandidateProfilePage/${candidateID}`}>
                  {candidateID}
                </Link>
              </li>
            )}
            {!userID && !candidateID && (
              <li className="menu-link" onClick={closeMobileMenu}>
                <Link to="/UserAndEmp">Login/Signup</Link>
              </li>
            )}
          </ul>
          <div className="mobile-menu" onClick={handleClick}>
            {click ? <FiX /> : <FiMenu />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

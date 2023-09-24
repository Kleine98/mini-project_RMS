import React, { useState, useEffect } from "react";
import { FiAirplay, FiX, FiMenu } from "react-icons/fi";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie library

function Navbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  // Retrieve the user ID and permission from the cookie
  const userID = Cookies.get("userID");
  const userPermission = Cookies.get("userPermission");

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
              <Link to="/About">About</Link>
            </li>
            <li className="menu-link" onClick={closeMobileMenu}>
              <Link to="/Job">Job</Link>
            </li>
            <li className="menu-link" onClick={closeMobileMenu}>
              <Link to="/Contact">Contact</Link>
            </li>
            {/* Conditional rendering of EmployeeManagement link */}
            {userID && userPermission?.charAt(0) === "1" && (
              <li className="menu-link" onClick={closeMobileMenu}>
                <Link to="/EmployeeManagement">Employee Management</Link>
              </li>
            )}
            {/* Conditional rendering of user's name or Login/Signup */}
            {userID ? (
              <li className="menu-link" onClick={closeMobileMenu}>
                <Link to={`/ProfilePage/${userID}`}>{userID}</Link>
              </li>
            ) : (
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

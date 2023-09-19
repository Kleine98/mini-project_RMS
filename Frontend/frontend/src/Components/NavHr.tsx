import React, { useState } from "react";
import { FiAirplay, FiX, FiMenu } from "react-icons/fi";
import "./Navbar.css";
import { Link } from "react-router-dom";

function NavHr() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMoblieMenu = () => setClick(false);

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
            <li className="menu-link" onClick={closeMoblieMenu}>
              <Link to="/HrHome">Home</Link>
            </li>
            <li className="menu-link" onClick={closeMoblieMenu}>
              <Link to="/HrEmployee">Employee</Link>
            </li>
            <li className="menu-link" onClick={closeMoblieMenu}>
              <Link to="/HrRequest">Request</Link>
            </li>
            <li className="menu-link" onClick={closeMoblieMenu}>
              <Link to="/HrUser">User</Link>
            </li>
            <li className="menu-link" onClick={closeMoblieMenu}>
              <Link to="/">Logout</Link>
            </li>
          </ul>
          <div className="mobile-menu" onClick={handleClick}>
            {click ? <FiX /> : <FiMenu />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavHr;

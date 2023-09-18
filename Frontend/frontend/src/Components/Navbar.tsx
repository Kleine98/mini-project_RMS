import React, { useState } from "react";
import { FiAirplay, FiX, FiMenu } from "react-icons/fi";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
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
              <Link to="/">Home</Link>
            </li>
            <li className="menu-link" onClick={closeMoblieMenu}>
              <Link to="/About">About</Link>
            </li>
            <li className="menu-link" onClick={closeMoblieMenu}>
              <Link to="/Job">Job</Link>
            </li>
            <li className="menu-link" onClick={closeMoblieMenu}>
              <Link to="/Contact">Contact</Link>
            </li>
            <li className="menu-link" onClick={closeMoblieMenu}>
              <Link to="/UserAndEmp">Login/Signup</Link>
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

export default Navbar;

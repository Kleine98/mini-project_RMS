import React, { useState } from "react";
import { FiAirplay, FiX, FiMenu } from "react-icons/fi";
import "./Navbar.css";
import myImage from "./mutic_name 1.jpg";
import { Link } from "react-router-dom";

function NavEmp() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMoblieMenu = () => setClick(false);

  return (
    <div className="header">
      <div className="container">
        <div className="header-con">
          <div className="logo-container">
            <img src={myImage} alt="My Image" className="mut" />
          </div>
          <ul className={click ? "menu active" : "menu"}>
            <li className="menu-link" onClick={closeMoblieMenu}>
              <Link to="/HomeEmp">Home</Link>
            </li>
            <li className="menu-link" onClick={closeMoblieMenu}>
              <Link to="/Request">Request</Link>
            </li>
            <li className="menu-link" onClick={closeMoblieMenu}>
              <Link to="/User">User</Link>
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

export default NavEmp;

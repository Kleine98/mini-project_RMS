import React from "react";
import "./Userlogin.css";

function Userlogin() {
  return (
    <>
      <div className="logincontainer">
        <div className="login-form">
          <h2>Login</h2>
          <div className="icon">
            <i className="fas fa-user"></i>
          </div>
          <form className="login-form" action="#" method="post">
            <div className="form-group">
              <label className="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                required
              ></input>
            </div>
            <div className="form-group">
              <label className="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
              ></input>
            </div>
            <div className="form-group">
              <input type="submit" value="Login"></input>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Userlogin;

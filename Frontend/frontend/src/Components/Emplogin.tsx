import { useState } from "react";
import "./Emplogin.css";
import myImage from "./pngwing 1.png";
import Navbar from "./Navbar";

function Emplogin() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(inputs);
  };
  return (
    <>
      <Navbar />
      <div className="logincontainer">
        <div className="login-form">
          <img src={myImage} alt="My Image" className="logo" />
          <div className="icon">
            <i className="fas fa-user"></i>
          </div>
          <br />
          <form action="#" method="post" onSubmit={handleSubmit}>
            <label htmlFor="employee"></label>
            <input
              type="employee"
              name="employee"
              value={inputs.username || ""}
              onChange={handleChange}
              placeholder="Employee ID"
              required
            ></input>
            <br />
            <br />
            <label htmlFor="password"></label>
            <input
              type="password"
              name="password"
              value={inputs.password || ""}
              onChange={handleChange}
              placeholder="Password"
              required
            ></input>
            <br />
            <div>
              <a href="#" className="forgot">
                Forgot You Password?
              </a>
            </div>
            <br />
            <div className="form-group">
              <input type="submit" value="Login"></input>
            </div>
          </form>
        </div>
      </div>
      <div className="contain">
        <div className="center">
          <p className="right">EMPLOYEE</p>
        </div>
      </div>
      <div className="conta">
        <div className="center">
          <p className="hin">
            Work Hard Work Smart <br />
            Work Faster Work Together
          </p>
        </div>
      </div>
    </>
  );
}

export default Emplogin;

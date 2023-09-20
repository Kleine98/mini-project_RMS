import { useState } from "react";
import "./Signup.css";
import myImage from "./pngwing 1.png";

function Signup() {
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
            <div>
              <input type="submit" value="Sign up"></input>
            </div>
            <br />
            <div>
              <input type="submit" value="Sign in"></input>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;

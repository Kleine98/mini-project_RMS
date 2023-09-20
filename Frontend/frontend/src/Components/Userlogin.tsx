import { useState } from "react";
import "./Userlogin.css";
import myImage from "./pngwing 1.png";
import Navbar from "./Navbar";

function Userlogin() {
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
            <label htmlFor="text"></label>
            <input
              type="email"
              name="email"
              value={inputs.email || ""}
              onChange={handleChange}
              placeholder="Email"
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
            <br />
            <div className="sign_up">
              <input type="submit" value="Sign Up"></input>
            </div>
          </form>
        </div>
      </div>
      <div className="contai">
        <div className="cente">
          <p className="left">USER</p>
        </div>
      </div>
      <div className="cont">
        <div className="cente">
          <p className="hi">
            Welcome you to see us <br />
            We have many jobs and <br />
            services for you.
          </p>
        </div>
      </div>
    </>
  );
}

export default Userlogin;

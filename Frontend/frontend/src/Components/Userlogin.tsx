import { useState } from "react";
import "./Userlogin.css";

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
      <div className="logincontainer">
        <div className="login-form">
          <h2>Login</h2>
          <div className="icon">
            <i className="fas fa-user"></i>
          </div>
          <form
            className="login-form"
            action="#"
            method="post"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label className="username">Username:</label>
              <input
                type="text"
                name="username"
                value={inputs.username || ""}
                onChange={handleChange}
                placeholder="Enter your username"
                required
              ></input>
            </div>
            <div className="form-group">
              <label className="password">Password:</label>
              <input
                type="password"
                name="password"
                value={inputs.password || ""}
                onChange={handleChange}
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

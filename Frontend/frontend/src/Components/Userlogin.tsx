import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import Cookies from "js-cookie"; // Import js-cookie library
import "./Userlogin.css";

function UserLogin() {
  const [inputs, setInputs] = useState({
    register_date: new Date().toISOString().split("T")[0], // Set the current date
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const url = isSignUp
      ? "http://localhost/mini-project/mini-project/Backend/api/signup_candidate.php?request=signup"
      : "http://localhost/mini-project/mini-project/Backend/api/login_candidate.php?request=login";

    const data = isSignUp
      ? {
          id: inputs.id,
          name: inputs.name,
          lname: inputs.lname,
          email: inputs.email,
          password: inputs.password,
          tel: inputs.tel,
          address: inputs.address,
          register_date: inputs.register_date,
        }
      : {
          email: inputs.email,
          password: inputs.password,
        };

    // Use Axios to send the POST request
    axios
      .post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("API Response:", response.data);
        setLoading(false);

        console.log(response.data);
        console.log(data);
        console.log(response);

        if (response.data) {
          if (isSignUp) {
            setMessage("Signup successful.");
            Cookies.set("candidateID", data.id, { expires: 7 }); // Expires in 7 days
            navigate("/");
          } else {
            if (response.data.id) {
              setMessage("Login successful.");
              Cookies.set("candidateID", response.data.id, { expires: 7 }); // Expires in 7 days
              navigate("/");
            } else {
              // Show an alert when login fails
              alert("Login failed. Please check your email and password.");
              setMessage("Login failed. Please check your email and password.");
              // Return or prevent further actions if needed
              return;
            }
          }
        } else {
          setMessage("Login/Signup failed. Please check your credentials.");
        }
      })
      .catch((error) => {
        console.error("Error during login/signup:", error);
        setLoading(false);
        // Show an alert when an error occurs
        alert("Login/Signup failed. An error occurred.");
        setMessage("Login/Signup failed. An error occurred.");
      });
  };

  return (
    <>
      <div className="logincontainer">
        <div className="login-form">
          <h2>{isSignUp ? "Signup" : "Login"}</h2>
          <div className="icon">
            <i className="fas fa-user"></i>
          </div>
          <form
            className="login-form"
            action="#"
            method="post"
            onSubmit={handleSubmit}
          >
            {isSignUp && (
              <>
                <div className="form-group">
                  <label className="name">ID:</label>
                  <input
                    type="text"
                    name="id"
                    value={inputs.id || ""}
                    onChange={(e) =>
                      setInputs({ ...inputs, id: e.target.value })
                    }
                    placeholder="Enter your ID"
                    required
                  ></input>
                </div>
                <div className="form-group">
                  <label className="name">First Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={inputs.name || ""}
                    onChange={(e) =>
                      setInputs({ ...inputs, name: e.target.value })
                    }
                    placeholder="Enter your first name"
                    required
                  ></input>
                </div>
                <div className="form-group">
                  <label className="lname">Last Name:</label>
                  <input
                    type="text"
                    name="lname"
                    value={inputs.lname || ""}
                    onChange={(e) =>
                      setInputs({ ...inputs, lname: e.target.value })
                    }
                    placeholder="Enter your last name"
                    required
                  ></input>
                </div>
                <div className="form-group">
                  <label className="tel">Phone Number:</label>
                  <input
                    type="text"
                    name="tel"
                    value={inputs.tel || ""}
                    onChange={(e) =>
                      setInputs({ ...inputs, tel: e.target.value })
                    }
                    placeholder="Enter your phone number"
                    required
                  ></input>
                </div>
                <div className="form-group">
                  <label className="address">Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={inputs.address || ""}
                    onChange={(e) =>
                      setInputs({ ...inputs, address: e.target.value })
                    }
                    placeholder="Enter your address"
                    required
                  ></input>
                </div>
              </>
            )}
            <div className="form-group">
              <label className="email">Email:</label>
              <input
                type="text"
                name="email"
                value={inputs.email || ""}
                onChange={(e) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
                placeholder="Enter your email"
                required
              ></input>
            </div>
            <div className="form-group">
              <label className="password">Password:</label>
              <input
                type="password"
                name="password"
                value={inputs.password || ""}
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
                placeholder="Enter your password"
                required
              ></input>
            </div>
            <div className="form-group">
              <input
                type="submit"
                value={isSignUp ? "Signup" : "Login"}
              ></input>
            </div>
            <div className="form-group">
              <p>
                {isSignUp
                  ? "Already have an account? "
                  : "Don't have an account? "}
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="toggle-button"
                >
                  {isSignUp ? "Login" : "Signup"}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UserLogin;

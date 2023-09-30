import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import Cookies from "js-cookie";

function CandidateProfilePage() {
  const [candidate, setCandidate] = useState(null);
  const navigate = useNavigate();
  const candidateID = Cookies.get("candidateID");

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const response = await axios.get(
          `http://203.188.54.9/~u6411130038/mini-project/Backend/api/candidate_search.php?id=${candidateID}`
        );
        setCandidate(response.data[0]); // Assuming the API returns an array with a single candidate object
      } catch (error) {
        console.error("Error fetching candidate details:", error);
      }
    };

    fetchCandidate();
  }, [candidateID]);

  const handleLogoutClick = () => {
    Cookies.remove("candidateID");
    navigate("/UserAndEmp");
  };

  return (
    <div>
      <Navbar />
      <h2>Candidate Profile Detail</h2>
      {candidate ? (
        <div>
          <div>
            <table>
              <tbody>
                <tr>
                  <td>ID:</td>
                  <td>{candidate.id}</td>
                </tr>
                <tr>
                  <td>Name:</td>
                  <td>{candidate.name}</td>
                </tr>
                <tr>
                  <td>Last Name:</td>
                  <td>{candidate.lname}</td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>{candidate.email}</td>
                </tr>
                <tr>
                  <td>Password:</td>
                  <td>{candidate.password}</td>
                </tr>
                <tr>
                  <td>Telephone:</td>
                  <td>{candidate.tel}</td>
                </tr>
                <tr>
                  <td>Address:</td>
                  <td>{candidate.address}</td>
                </tr>
                <tr>
                  <td>Register Date:</td>
                  <td>{candidate.register_date}</td>
                </tr>
                {/* Add more rows for other candidate attributes */}
              </tbody>
            </table>
            <button type="button" onClick={handleLogoutClick}>
              Logout
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CandidateProfilePage;

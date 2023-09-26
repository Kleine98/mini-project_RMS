import { useState } from "react";

function EmpAddHr() {
  const [applicantInfo, setApplicantInfo] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    mobileNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicantInfo({
      ...applicantInfo,
      [name]: value,
    });
  };

  const [judges, setJudges] = useState([
    { id: 1, director: "" },
    { id: 2, director: "" },
    { id: 3, director: "" },
  ]);

  const directors = ["Director 1", "Director 2", "Director 3"];

  const handleDirectorSelect = (judgeId, selectedDirector) => {
    const updatedJudges = judges.map((judge) =>
      judge.id === judgeId ? { ...judge, director: selectedDirector } : judge
    );
    setJudges(updatedJudges);
  };
  return (
    <>
      <div className="applicant-info">
        <h2>Applicant Information</h2>
        <form>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={applicantInfo.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={applicantInfo.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={applicantInfo.age}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Gender:</label>
            <select
              name="gender"
              value={applicantInfo.gender}
              onChange={handleInputChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label>Mobile Number:</label>
            <input
              type="tel"
              name="mobileNumber"
              value={applicantInfo.mobileNumber}
              onChange={handleInputChange}
            />
          </div>
        </form>
      </div>
      <h2>Judges and Directors</h2>
      <div className="judge-form">
        {judges.map((judge) => (
          <div key={judge.id}>
            <label>
              Judge {judge.id}:
              <select
                value={judge.director}
                onChange={(e) => handleDirectorSelect(judge.id, e.target.value)}
              >
                <option value="">Select Director</option>
                {directors.map((director) => (
                  <option key={director} value={director}>
                    {director}
                  </option>
                ))}
              </select>
            </label>
          </div>
        ))}
      </div>
    </>
  );
}
export default EmpAddHr;

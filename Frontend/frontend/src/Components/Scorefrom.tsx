import React, { useState } from "react";
import "./Scorefrom.css";
import NavEmp from "./NavEmp";

const Scorefrom = () => {
  const [judgesDecisions, setJudgesDecisions] = useState([
    {
      name: "นาย อนันต์ สักอย่าง",
      score: "22/09/2566",
      time: "14:00 PM",
      decisions: [{ selected: false }],
    },
    {
      name: "นาง อภิวา เจริญสุข",
      score: "29/10/2566",
      time: "9:00 AM",
      decisions: [{ selected: false }],
    },
    {
      name: "นาย สุรักษ์ พันเรื่องดี",
      score: "5/10/2566",
      time: "13:00 PM",
      decisions: [{ selected: false }],
    },
  ]);
  const [inputValue, setInputValue] = useState<string>("");
  const [judge2Decisions, setJudge2Decisions] = useState(Array(10).fill(false));
  const [judge3Decisions, setJudge3Decisions] = useState(Array(10).fill(false));
  const [judge4Decisions, setJudge4Decisions] = useState(Array(10).fill(false));
  const [judge5Decisions, setJudge5Decisions] = useState(Array(10).fill(false));

  const handleDecisionChange = (judgeIndex, decisionIndex) => {
    const updatedDecisions = [...judgesDecisions];
    updatedDecisions[judgeIndex].decisions[decisionIndex].selected =
      !updatedDecisions[judgeIndex].decisions[decisionIndex].selected;
    setJudgesDecisions(updatedDecisions);
  };

  const handleJudge2DecisionChange = (decisionIndex) => {
    const updatedDecisions = [...judge2Decisions];
    updatedDecisions[decisionIndex] = !updatedDecisions[decisionIndex];
    setJudge2Decisions(updatedDecisions);
  };

  const handleJudge3DecisionChange = (decisionIndex) => {
    const updatedDecisions = [...judge3Decisions];
    updatedDecisions[decisionIndex] = !updatedDecisions[decisionIndex];
    setJudge3Decisions(updatedDecisions);
  };

  const handleJudge4DecisionChange = (decisionIndex) => {
    const updatedDecisions = [...judge4Decisions];
    updatedDecisions[decisionIndex] = !updatedDecisions[decisionIndex];
    setJudge4Decisions(updatedDecisions);
  };

  const handleJudge5DecisionChange = (decisionIndex) => {
    const updatedDecisions = [...judge5Decisions];
    updatedDecisions[decisionIndex] = !updatedDecisions[decisionIndex];
    setJudge5Decisions(updatedDecisions);
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    console.log("Input submitted:", inputValue);
    setInputValue("");
  };

  return (
    <>
      <NavEmp />
      <div className="bgscore">
        <div className="table-container-f1">
          <table className="custom-table-f1">
            <thead>
              <tr>
                <th>ชื่อ - นามสกุล</th>
                <th>วัน/เดือน/ปี</th>
                <th>เวลานัด</th>
                <th>เลือกผู้สมัครที่จะลงคะเเนน</th>
              </tr>
            </thead>
            <tbody>
              {judgesDecisions.map((judge, judgeIndex) => (
                <tr key={judgeIndex}>
                  <td>{judge.name}</td>
                  <td>{judge.score}</td>
                  <td>{judge.time}</td>
                  <td>
                    <label className="checkbox-container-f1">
                      {judge.decisions.map((decision, decisionIndex) => (
                        <div key={decisionIndex}>
                          <div
                            className={`custom-checkbox-f1 ${
                              decision.selected ? "checked" : ""
                            }`}
                            onClick={() =>
                              handleDecisionChange(judgeIndex, decisionIndex)
                            }
                          ></div>
                          {decision.text}
                        </div>
                      ))}
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-container-f2">
          <table className="custom-table-f2">
            <thead>
              <th></th>
              <th colSpan={10}>Score point</th>
            </thead>
            <thead>
              <tr>
                <th></th>
                {Array.from({ length: 10 }).map((_, index) => (
                  <th key={index}>{index + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="col1">Human relationship</td>
                {judge2Decisions.map((decision, decisionIndex) => (
                  <td key={decisionIndex}>
                    <div
                      className={`custom-checkbox-f2 ${
                        decision ? "checked" : ""
                      }`}
                      onClick={() => handleJudge2DecisionChange(decisionIndex)}
                    ></div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="col1">creativity</td>
                {judge3Decisions.map((decision, decisionIndex) => (
                  <td key={decisionIndex}>
                    <div
                      className={`custom-checkbox-f2 ${
                        decision ? "checked" : ""
                      }`}
                      onClick={() => handleJudge3DecisionChange(decisionIndex)}
                    ></div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="col1">Technique</td>
                {judge4Decisions.map((decision, decisionIndex) => (
                  <td key={decisionIndex}>
                    <div
                      className={`custom-checkbox-f2 ${
                        decision ? "checked" : ""
                      }`}
                      onClick={() => handleJudge4DecisionChange(decisionIndex)}
                    ></div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="col1">Learn new things</td>
                {judge5Decisions.map((decision, decisionIndex) => (
                  <td key={decisionIndex}>
                    <div
                      className={`custom-checkbox-f2 ${
                        decision ? "checked" : ""
                      }`}
                      onClick={() => handleJudge5DecisionChange(decisionIndex)}
                    ></div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <textarea
          placeholder=""
          value={inputValue}
          onChange={handleInputChange}
          className="custom-input-f"
        />
        <button onClick={handleSubmit} className="butsubx2-f">
          Accept
        </button>
        <button onClick={handleSubmit} className="butsubx-f">
          Reject
        </button>
        <button onClick={handleSubmit} className="butsubx3">
          Submit
        </button>
      </div>
    </>
  );
};

export default Scorefrom;

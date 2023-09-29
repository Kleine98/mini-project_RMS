import React, { useState } from "react";
import "./Examsummary.css";
import NavEmp from "./NavEmp";

const Examsummary = () => {
  const [judgesDecisions, setJudgesDecisions] = useState([
    {
      name: "นาย อนันต์ สักอย่าง",
      score: "2.4 /10",
      decisions: [
        { id: 1, text: "กรรมการที่ 1", selected: false },
        { id: 2, text: "กรรมการที่ 2", selected: false },
        { id: 3, text: "กรรมการที่ 3", selected: false },
      ],
    },
    {
      name: "นาง อภิวา เจริญสุข",
      score: "9/10",
      decisions: [
        { id: 1, text: "กรรมการที่ 1", selected: false },
        { id: 2, text: "กรรมการที่ 2", selected: false },
        { id: 3, text: "กรรมการที่ 3", selected: false },
      ],
    },
    {
      name: "นาย สุรักษ์ พันเรื่องด",
      score: "4.10/10",
      decisions: [
        { id: 1, text: "กรรมการที่ 1", selected: false },
        { id: 2, text: "กรรมการที่ 2", selected: false },
        { id: 3, text: "กรรมการที่ 3", selected: false },
      ],
    },
    {
      name: "นาย ธนันวา สีพิธบู",
      score: "9.5/10",
      decisions: [
        { id: 1, text: "กรรมการที่ 1", selected: false },
        { id: 2, text: "กรรมการที่ 2", selected: false },
        { id: 3, text: "กรรมการที่ 3", selected: false },
      ],
    },
    {
      name: "นาย พรศักดิ์ เท้าเปล่า",
      score: "7.6/10",
      decisions: [
        { id: 1, text: "กรรมการที่ 1", selected: false },
        { id: 2, text: "กรรมการที่ 2", selected: false },
        { id: 3, text: "กรรมการที่ 3", selected: false },
      ],
    },
    {
      name: "นาง ฟ้า ชานม",
      score: "8.9/10",
      decisions: [
        { id: 1, text: "กรรมการที่ 1", selected: false },
        { id: 2, text: "กรรมการที่ 2", selected: false },
        { id: 3, text: "กรรมการที่ 3", selected: false },
      ],
    },
    {
      name: "นาย คิระ โยชิคาเงะ",
      score: "1.5/10",
      decisions: [
        { id: 1, text: "กรรมการที่ 1", selected: false },
        { id: 2, text: "กรรมการที่ 2", selected: false },
        { id: 3, text: "กรรมการที่ 3", selected: false },
      ],
    },
    {
      name: "นาย เดปโปะ ซามูไรจี(ยิ้ม)",
      score: "3.55/10",
      decisions: [
        { id: 1, text: "กรรมการที่ 1", selected: false },
        { id: 2, text: "กรรมการที่ 2", selected: false },
        { id: 3, text: "กรรมการที่ 3", selected: false },
      ],
    },
  ]);

  const handleDecisionChange = (judgeIndex, decisionIndex) => {
    const updatedDecisions = [...judgesDecisions];
    updatedDecisions[judgeIndex].decisions[decisionIndex].selected =
      !updatedDecisions[judgeIndex].decisions[decisionIndex].selected;
    setJudgesDecisions(updatedDecisions);
  };

  return (
    <>
      <NavEmp />
      <div className="bgscore">
        <div className="table-containerscore">
          <table className="custom-tablescore">
            <thead>
              <tr>
                <th>ชื่อ - นามสกุล</th>
                <th>คะเเนนเฉลี่ยรวม</th>
                <th>คำตัดสินของกรรมการ</th>
              </tr>
            </thead>
            <tbody>
              {judgesDecisions.map((judge, judgeIndex) => (
                <tr key={judgeIndex}>
                  <td>{judge.name}</td>
                  <td>{judge.score}</td>
                  <td>
                    <label className="checkbox-containerscore">
                      {judge.decisions.map((decision, decisionIndex) => (
                        <div key={decisionIndex}>
                          <div
                            className={`custom-checkboxscore ${
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
      </div>
    </>
  );
};

export default Examsummary;

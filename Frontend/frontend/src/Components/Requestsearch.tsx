import React, { useState } from "react";
import "./Requestsearch.css";
import NavEmp from "./NavEmp";

const Requestsearch = () => {
  const [judgesDecisions] = useState([
    {
      name: "A",
      score: "วิศวกร",
      position: "วิศวกรระบบ",
      data: ">>",
    },
    {
      name: "B",
      score: "การตลาด และการเงิน",
      position: "พนักงานบัญชี",
      data: ">>",
    },
    {
      name: "C",
      score: "ฝ่ายขาย",
      position: "พนักงานขาย",
      data: ">>",
    },
    {
      name: "D",
      score: "IT",
      position: "IT support",
      data: ">>",
    },
    {
      name: "E",
      score: "วิศวกร",
      position: "วิศวกรข้อมูล",
      data: ">>",
    },
  ]);

  return (
    <>
      <NavEmp />
      <div className="bgscore-e">
        <h3 className="texte">ข้อมูลผู้สมัคร</h3>
        <div className="table-container-e">
          <table className="custom-table-e">
            <thead>
              <tr>
                <th>ชื่อ</th>
                <th>แผนก</th>
                <th>ตำแหน่ง</th>
                <th>ข้อมูล</th>
              </tr>
            </thead>
            <tbody>
              {judgesDecisions.map((judge, judgeIndex) => (
                <tr key={judgeIndex}>
                  <td>{judge.name}</td>
                  <td>{judge.score}</td>
                  <td>{judge.position}</td>
                  <td>{judge.data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Requestsearch;

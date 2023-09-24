import React, { useState } from "react";
import "./Requeststatus.css";
import NavEmp from "./NavEmp";

function Requeststatus() {
  const [inputValue, setInputValue] = useState("");
  const [isButtonActive3, setIsButtonActive3] = useState(false);
  const [isButtonActive4, setIsButtonActive4] = useState(false);
  const [isButtonActive5, setIsButtonActive5] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleEllipsisButtonClick3 = () => {
    setIsButtonActive3(!isButtonActive3);
  };

  const handleEllipsisButtonClick4 = () => {
    setIsButtonActive4(!isButtonActive4);
  };

  const handleEllipsisButtonClick5 = () => {
    setIsButtonActive5(!isButtonActive5);
  };

  return (
    <>
      <NavEmp />
      <div className="backcolorpls2">
        <h4 className="textpics">หมายเหตุ หาก Reject</h4>
        <div className="input-container2">
          <textarea
            placeholder=""
            value={inputValue}
            onChange={handleInputChange}
            className="custom-input2"
          />

          <button
            className={`ellipsis-button3 ${isButtonActive3 ? "active" : ""}`}
            onClick={handleEllipsisButtonClick3}
          ></button>
          <span className="ellipsis-message3">
            ---------------------------------------------------------------------------
            ส่งแบบฟอร์มคำร้อง
          </span>
          <button
            className={`ellipsis-button4 ${isButtonActive4 ? "active" : ""}`}
            onClick={handleEllipsisButtonClick4}
          ></button>
          <span className="ellipsis-message4">
            ---------------------------------------------------------------------------
            รอการตอบรับจากหัวหน้า
          </span>
          <button
            className={`ellipsis-button5 ${isButtonActive5 ? "active" : ""}`}
            onClick={handleEllipsisButtonClick5}
          ></button>
          <span className="ellipsis-message5">
            ---------------------------------------------------------------------------
            ผลลัพท์ : Reject , Approve
          </span>
        </div>
      </div>
    </>
  );
}

export default Requeststatus;

import React, { useState, ChangeEvent } from "react";
import "./Requeststatus.css";
import NavEmp from "./NavEmp";

function Requeststatus() {
  const [inputValue, setInputValue] = useState("");
  const [isinputcheckRequest, setIsinputcheckRequest] =
    useState<boolean>(false);
  const [isinputcheckRequest2, setIsinputcheckRequest2] =
    useState<boolean>(false);
  const [isinputcheckRequest3, setIsinputcheckRequest3] =
    useState<boolean>(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <NavEmp />
      <div className="backcolorplss2">
        <h4 className="textpics">หมายเหตุ หาก Reject</h4>
        <div className="input-container2">
          <textarea
            placeholder=""
            value={inputValue}
            onChange={handleInputChange}
            className="custom-input2"
          />

          <label className="checkbox-container3">
            <input
              type="checkbox"
              checked={isinputcheckRequest}
              onChange={() => setIsinputcheckRequest(!isinputcheckRequest)}
            />
            <span className="checkmark"></span>
          </label>
          <span className="ellipsis-message3">
            -----------------------------------------------------------------------------
            ส่งแบบฟอร์มคำร้อง
          </span>
          <label className="checkbox-container4">
            <input
              type="checkbox"
              checked={isinputcheckRequest}
              onChange={() => setIsinputcheckRequest(!isinputcheckRequest)}
            />
            <span className="checkmark"></span>
          </label>
          <span className="ellipsis-message4">
            -----------------------------------------------------------------------------
            รอการตอบรับจากหัวหน้า
          </span>
          <label className="checkbox-container5">
            <input
              type="checkbox"
              checked={isinputcheckRequest}
              onChange={() => setIsinputcheckRequest(!isinputcheckRequest)}
            />
            <span className="checkmark"></span>
          </label>
          <span className="ellipsis-message5">
            -----------------------------------------------------------------------------
            ผลลัพท์ : Reject , Approve
          </span>
        </div>
        <button className="butsubx2">Submit</button>
      </div>
    </>
  );
}

export default Requeststatus;

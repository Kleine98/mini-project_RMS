import { useState } from "react";
import NavHr from "./NavHr";

function RequestProgessHR() {
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
      <NavHr />
      <div className="backcolorpls2">
        <h4 className="textpics">หมายเหตุ หาก Reject</h4>
        <div className="input-container2">
          <textarea
            placeholder=""
            value={inputValue}
            onChange={handleInputChange}
            className="custom-input2"
          />

          <input
            type="checkbox"
            className={`ellipsis-button3 ${isButtonActive3 ? "active" : ""}`}
            onClick={handleEllipsisButtonClick3}
          ></input>
          <span className="ellipsis-message3">
            ---------------------------------------------------------------------------
            ส่งแบบฟอร์มคำร้อง
          </span>
          <input
            type="checkbox"
            className={`ellipsis-button4 ${isButtonActive4 ? "active" : ""}`}
            onClick={handleEllipsisButtonClick4}
          ></input>
          <span className="ellipsis-message4">
            ---------------------------------------------------------------------------
            รอการตอบรับจากหัวหน้า
          </span>
          <input
            type="checkbox"
            className={`ellipsis-button5 ${isButtonActive5 ? "active" : ""}`}
            onClick={handleEllipsisButtonClick5}
          ></input>
          <span className="ellipsis-message5">
            ---------------------------------------------------------------------------
            ผลลัพท์ : Reject , Approve
          </span>
        </div>
      </div>
    </>
  );
}

export default RequestProgessHR;

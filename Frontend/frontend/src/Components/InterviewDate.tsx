import React, { useState } from "react";
import "./InterviewDate.css";
import myImagec from "./pngwing 1.png";
import NavEmp from "./NavEmp";

function InterviewDate() {
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [inputValues, setInputValues] = useState({
    inputValue: "",
    inputValue2: "",
    inputValue3: "",
    inputValue4: "",
    inputValue5: "",
  });
  const daysInMonth1 = new Date(
    date1.getFullYear(),
    date1.getMonth() + 1,
    0
  ).getDate();
  const daysInMonth2 = new Date(
    date2.getFullYear(),
    date2.getMonth() + 1,
    0
  ).getDate();
  const firstDay1 = new Date(date1.getFullYear(), date1.getMonth(), 1).getDay();
  const firstDay2 = new Date(date2.getFullYear(), date2.getMonth(), 1).getDay();

  const days1 = [];
  const days2 = [];

  for (let i = 0; i < firstDay1; i++) {
    days1.push(<div key={`empty-1-${i}`} className="empty-day"></div>);
  }
  for (let i = 1; i <= daysInMonth1; i++) {
    days1.push(
      <div key={`day-1-${i}`} className="day">
        {i}
      </div>
    );
  }

  for (let i = 0; i < firstDay2; i++) {
    days2.push(<div key={`empty-2-${i}`} className="empty-day"></div>);
  }
  for (let i = 1; i <= daysInMonth2; i++) {
    days2.push(
      <div key={`day-2-${i}`} className="day">
        {i}
      </div>
    );
  }

  const handleInputChange = (e, key) => {
    setInputValues({ ...inputValues, [key]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Input submitted:", inputValues);
    setInputValues({
      inputValue: "",
      inputValue2: "",
      inputValue3: "",
      inputValue4: "",
      inputValue5: "",
    });
  };

  return (
    <>
      <NavEmp />
      <div className="bgadd">
        <div className="image-framec">
          <img src={myImagec} alt="My Imagec" className="logoc" />
        </div>
        <h3 className="textin">เลือกวันนัดสัมภาษณ์</h3>
        <div className="calendar-frame">
          <div className="calendar">
            <h4>Start date</h4>
            <div className="headerc">
              <button
                onClick={() =>
                  setDate1(
                    new Date(date1.getFullYear(), date1.getMonth() - 1, 1)
                  )
                }
              >
                Previous
              </button>
              <h2>
                {date1.toLocaleString("default", { month: "long" })}{" "}
                {date1.getFullYear()}
              </h2>
              <button
                onClick={() =>
                  setDate1(
                    new Date(date1.getFullYear(), date1.getMonth() + 1, 1)
                  )
                }
              >
                Next
              </button>
            </div>
            <div className="weekdays">
              <div className="weekday">Sun</div>
              <div className="weekday">Mon</div>
              <div className="weekday">Tue</div>
              <div className="weekday">Wed</div>
              <div className="weekday">Thu</div>
              <div className="weekday">Fri</div>
              <div className="weekday">Sat</div>
            </div>
            <div className="days">{days1}</div>
          </div>
          <div className="calendar">
            <h4>End date</h4>
            <div className="headerc">
              <button
                onClick={() =>
                  setDate2(
                    new Date(date2.getFullYear(), date2.getMonth() - 1, 1)
                  )
                }
              >
                Previous
              </button>
              <h2>
                {date2.toLocaleString("default", { month: "long" })}{" "}
                {date2.getFullYear()}
              </h2>
              <button
                onClick={() =>
                  setDate2(
                    new Date(date2.getFullYear(), date2.getMonth() + 1, 1)
                  )
                }
              >
                Next
              </button>
            </div>
            <div className="weekdays">
              <div className="weekday">Sun</div>
              <div className="weekday">Mon</div>
              <div className="weekday">Tue</div>
              <div className="weekday">Wed</div>
              <div className="weekday">Thu</div>
              <div className="weekday">Fri</div>
              <div className="weekday">Sat</div>
            </div>
            <div className="days">{days2}</div>
          </div>
        </div>
        <h3 className="textadd">ข้อมูลผู้สมัคร</h3>
        <div className="input-container-c">
          <h4 className="textcapa1-c">ชื่อ - นามสกุล</h4>
          <textarea
            placeholder=""
            value={inputValues.inputValue}
            onChange={(e) => handleInputChange(e, "inputValue")}
            className="custom-input2-c"
          />
          <h4 className="textcapa2-c">-----</h4>
          <textarea
            placeholder=""
            value={inputValues.inputValue2}
            onChange={(e) => handleInputChange(e, "inputValue2")}
            className="custom-input3-c"
          />
          <h4 className="textcapa3-c">อายุ</h4>
          <textarea
            placeholder=""
            value={inputValues.inputValue3}
            onChange={(e) => handleInputChange(e, "inputValue3")}
            className="custom-input4-c"
          />
          <h4 className="textcapa4-c">เพศ</h4>
          <textarea
            placeholder=""
            value={inputValues.inputValue4}
            onChange={(e) => handleInputChange(e, "inputValue4")}
            className="custom-input5-c"
          />
          <h4 className="textcapa5-c">เบอร์มือถือ</h4>
          <textarea
            placeholder=""
            value={inputValues.inputValue5}
            onChange={(e) => handleInputChange(e, "inputValue5")}
            className="custom-input6-c"
          />
          <button onClick={handleSubmit} className="butsub-c">
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default InterviewDate;

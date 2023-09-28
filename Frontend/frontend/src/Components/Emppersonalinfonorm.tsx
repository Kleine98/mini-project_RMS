import React, { useState } from "react";
import "./Emppersonalinfonorm.css";
import myImage from "./pngwing 1.png";
import NavEmp from "./NavEmp";

function Emppersonalinfonorm() {
  const [inputValues, setInputValues] = useState({
    inputValue: "",
    inputValue2: "",
    inputValue3: "",
    inputValue4: "",
    inputValue5: "",
    inputValue6: "",
    inputValue7: "",
    inputValue8: "",
    inputValue9: "",
    inputValue10: "",
    inputValue11: "",
    inputValue12: "",
    inputValue13: "",
    inputValue14: "",
  });
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
      inputValue6: "",
      inputValue7: "",
      inputValue8: "",
      inputValue9: "",
      inputValue10: "",
      inputValue11: "",
      inputValue12: "",
      inputValue13: "",
      inputValue14: "",
    });
  };

  return (
    <>
      <NavEmp />
      <div className="backcolorpls2">
        <div className="fixform">
          <div className="image-frame">
            <img src={myImage} alt="My Image" className="logo2" />
          </div>
          <h6 className="textpls1">ข้อมูลส่วนตัวพนักงาน</h6>
          <h6 className="textpls2">ข้อมูลพนักงาน</h6>
          <div className="input-container">
            <h4 className="textcapa1">ชื่อ - นามสกุล</h4>
            <textarea
              placeholder=""
              value={inputValues.inputValue}
              onChange={(e) => handleInputChange(e, "inputValue")}
              className="custom-input2x"
            />
            <h4 className="textcapa2">-----</h4>
            <textarea
              placeholder=""
              value={inputValues.inputValue}
              onChange={(e) => handleInputChange(e, "inputValue")}
              className="custom-input3"
            />
            <h4 className="textcapa3">อายุ</h4>
            <textarea
              placeholder=""
              value={inputValues.inputValue}
              onChange={(e) => handleInputChange(e, "inputValue")}
              className="custom-input4"
            />
            <h4 className="textcapa4">เพศ</h4>
            <textarea
              placeholder=""
              value={inputValues.inputValue}
              onChange={(e) => handleInputChange(e, "inputValue")}
              className="custom-input5"
            />
            <h4 className="textcapa5">เบอร์มือถือ</h4>
            <textarea
              placeholder=""
              value={inputValues.inputValue}
              onChange={(e) => handleInputChange(e, "inputValue")}
              className="custom-input6"
            />
            <h4 className="textcapa6">ตำแหน่ง</h4>
            <textarea
              placeholder=""
              value={inputValues.inputValue}
              onChange={(e) => handleInputChange(e, "inputValue")}
              className="custom-input7"
            />
            <h4 className="textcapa7">ID พนักงาน</h4>
            <textarea
              placeholder=""
              value={inputValues.inputValue}
              onChange={(e) => handleInputChange(e, "inputValue")}
              className="custom-input8"
            />
            <h4 className="textcapa8">Email</h4>
            <textarea
              placeholder=""
              value={inputValues.inputValue}
              onChange={(e) => handleInputChange(e, "inputValue")}
              className="custom-input9"
            />
            <h4 className="textcapa9">วันที่เริ่มทำงาน</h4>
            <textarea
              placeholder=""
              value={inputValues.inputValue}
              onChange={(e) => handleInputChange(e, "inputValue")}
              className="custom-input10"
            />
            <h4 className="textcapa10">แผนก</h4>
            <textarea
              placeholder=""
              value={inputValues.inputValue}
              onChange={(e) => handleInputChange(e, "inputValue")}
              className="custom-input11"
            />
            <h4 className="textcapa11">หัวหน้าแผนก</h4>
            <textarea
              placeholder=""
              value={inputValues.inputValue}
              onChange={(e) => handleInputChange(e, "inputValue")}
              className="custom-input12"
            />
            <h4 className="textcapa12">Work Email</h4>
            <textarea
              placeholder=""
              value={inputValues.inputValue}
              onChange={(e) => handleInputChange(e, "inputValue")}
              className="custom-input13"
            />
            <h4 className="textcapa13">เงินเดือน</h4>
            <textarea
              placeholder=""
              value={inputValues.inputValue}
              onChange={(e) => handleInputChange(e, "inputValue")}
              className="custom-input14"
            />
            <h4 className="textcapa14">ที่อยู่</h4>
            <textarea
              placeholder=""
              value={inputValues.inputValue}
              onChange={(e) => handleInputChange(e, "inputValue")}
              className="custom-input15"
            />
            <button onClick={handleSubmit} className="butsub">
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Emppersonalinfonorm;

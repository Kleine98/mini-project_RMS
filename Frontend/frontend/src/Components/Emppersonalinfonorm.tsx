import React, { useState } from "react";
import "./Emppersonalinfonorm.css";
import myImage from "./pngwing 1.png";
import NavEmp from "./NavEmp";

function Emppersonalinfonorm() {
  const [inputValue, setInputValue] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [inputValue3, setInputValue3] = useState("");
  const [inputValue4, setInputValue4] = useState("");
  const [inputValue5, setInputValue5] = useState("");
  const [inputValue6, setInputValue6] = useState("");
  const [inputValue7, setInputValue7] = useState("");
  const [inputValue8, setInputValue8] = useState("");
  const [inputValue9, setInputValue9] = useState("");
  const [inputValue10, setInputValue10] = useState("");
  const [inputValue11, setInputValue11] = useState("");
  const [inputValue12, setInputValue12] = useState("");
  const [inputValue13, setInputValue13] = useState("");
  const [inputValue14, setInputValue14] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputChange2 = (e) => {
    setInputValue2(e.target.value);
  };

  const handleInputChange3 = (e) => {
    setInputValue3(e.target.value);
  };

  const handleInputChange4 = (e) => {
    setInputValue4(e.target.value);
  };

  const handleInputChange5 = (e) => {
    setInputValue5(e.target.value);
  };

  const handleInputChange6 = (e) => {
    setInputValue6(e.target.value);
  };

  const handleInputChange7 = (e) => {
    setInputValue7(e.target.value);
  };

  const handleInputChange8 = (e) => {
    setInputValue8(e.target.value);
  };

  const handleInputChange9 = (e) => {
    setInputValue9(e.target.value);
  };

  const handleInputChange10 = (e) => {
    setInputValue10(e.target.value);
  };

  const handleInputChange11 = (e) => {
    setInputValue11(e.target.value);
  };

  const handleInputChange12 = (e) => {
    setInputValue12(e.target.value);
  };

  const handleInputChange13 = (e) => {
    setInputValue13(e.target.value);
  };

  const handleInputChange14 = (e) => {
    setInputValue14(e.target.value);
  };

  const handleSubmit = () => {
    console.log("Input submitted:", inputValue);
    console.log("Input 2 submitted:", inputValue2);
    setInputValue("");
    setInputValue2("");
  };

  return (
    <>
      <NavEmp />
      <div className="backcolorpls2">
        <div className="image-frame">
          <img src={myImage} alt="My Image" className="logo" />
        </div>
        <h6 className="textpls1">ข้อมูลส่วนตัวพนักงาน</h6>
        <h6 className="textpls2">ข้อมูลพนักงาน</h6>
        <div className="input-container">
          <h4 className="textcapa1">ชื่อ - นามสกุล</h4>
          <textarea
            placeholder=""
            value={inputValue}
            onChange={handleInputChange}
            className="custom-input2x"
          />
          <h4 className="textcapa2">-----</h4>
          <textarea
            placeholder=""
            value={inputValue2}
            onChange={handleInputChange2}
            className="custom-input3"
          />
          <h4 className="textcapa3">อายุ</h4>
          <textarea
            placeholder=""
            value={inputValue3}
            onChange={handleInputChange3}
            className="custom-input4"
          />
          <h4 className="textcapa4">เพศ</h4>
          <textarea
            placeholder=""
            value={inputValue4}
            onChange={handleInputChange4}
            className="custom-input5"
          />
          <h4 className="textcapa5">เบอร์มือถือ</h4>
          <textarea
            placeholder=""
            value={inputValue5}
            onChange={handleInputChange5}
            className="custom-input6"
          />
          <h4 className="textcapa6">ตำแหน่ง</h4>
          <textarea
            placeholder=""
            value={inputValue6}
            onChange={handleInputChange6}
            className="custom-input7"
          />
          <h4 className="textcapa7">ID พนักงาน</h4>
          <textarea
            placeholder=""
            value={inputValue7}
            onChange={handleInputChange7}
            className="custom-input8"
          />
          <h4 className="textcapa8">Email</h4>
          <textarea
            placeholder=""
            value={inputValue8}
            onChange={handleInputChange8}
            className="custom-input9"
          />
          <h4 className="textcapa9">วันที่เริ่มทำงาน</h4>
          <textarea
            placeholder=""
            value={inputValue9}
            onChange={handleInputChange9}
            className="custom-input10"
          />
          <h4 className="textcapa10">แผนก</h4>
          <textarea
            placeholder=""
            value={inputValue10}
            onChange={handleInputChange10}
            className="custom-input11"
          />
          <h4 className="textcapa11">หัวหน้าแผนก</h4>
          <textarea
            placeholder=""
            value={inputValue11}
            onChange={handleInputChange11}
            className="custom-input12"
          />
          <h4 className="textcapa12">Work Email</h4>
          <textarea
            placeholder=""
            value={inputValue12}
            onChange={handleInputChange12}
            className="custom-input13"
          />
          <h4 className="textcapa13">เงินเดือน</h4>
          <textarea
            placeholder=""
            value={inputValue13}
            onChange={handleInputChange13}
            className="custom-input14"
          />
          <h4 className="textcapa14">ที่อยู่</h4>
          <textarea
            placeholder=""
            value={inputValue14}
            onChange={handleInputChange14}
            className="custom-input15"
          />
          <button onClick={handleSubmit} className="butsub">
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Emppersonalinfonorm;

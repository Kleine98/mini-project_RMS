import React, { useState, ChangeEvent } from "react";
import "./Requestnorm.css";
import NavEmp from "./NavEmp";

function Requestnorm() {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputValue2, setInputValue2] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [selectedItem2, setSelectedItem2] = useState<string>("");
  const [selectedItem3, setSelectedItem3] = useState<string>("");
  const [selectedItem4, setSelectedItem4] = useState<string>("");
  const [selectedItem5, setSelectedItem5] = useState<string>("");
  const [isinputcheckRequest, setIsinputcheckRequest] =
    useState<boolean>(false);
  const [isinputcheckRequest2, setIsinputcheckRequest2] =
    useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputChange2 = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue2(e.target.value);
  };

  const handleSubmit = () => {
    console.log("Input submitted:", inputValue);
    console.log("Input 2 submitted:", inputValue2);
    setInputValue("");
    setInputValue2("");
  };

  const handleItemSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedItem(event.target.value);
  };

  const items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];

  const handleItemSelect2 = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedItem2(event.target.value);
  };

  const items2 = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];

  const handleItemSelect3 = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedItem3(event.target.value);
  };

  const items3 = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];

  const handleItemSelect4 = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedItem4(event.target.value);
  };

  const items4 = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];

  const handleItemSelect5 = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedItem5(event.target.value);
  };

  const items5 = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];
  return (
    <>
      <NavEmp />
      <div className="backcolorpls">
        <h4 className="textcapa">จำนวน</h4>
        <textarea
          placeholder=""
          value={inputValue2}
          onChange={handleInputChange2}
          className="custom-inputx2"
        />
        <h6 className="textpls">ข้อมูลคำร้อง</h6>
        <div className="input-container">
          <h4 className="textpic">เนื้อหาคำร้อง</h4>
          <textarea
            placeholder=""
            value={inputValue}
            onChange={handleInputChange}
            className="custom-input"
          />
          <button onClick={handleSubmit} className="butsubx">
            Submit
          </button>
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={isinputcheckRequest}
              onChange={() => setIsinputcheckRequest(!isinputcheckRequest)}
            />
            <span className="checkmark"></span>
          </label>
          <span className="ellipsis-message">คำร้องทั่วไป</span>
          <label className="checkbox-container2">
            <input
              type="checkbox"
              checked={isinputcheckRequest2}
              onChange={() => setIsinputcheckRequest2(!isinputcheckRequest2)}
            />
            <span className="checkmark"></span>
          </label>
          <span className="ellipsis-message2">คำร้องขอเพิ่มพนักงาน</span>
        </div>
        <div className="list-box-container">
          <h4>ตำแหน่ง</h4>
          <select
            className="list-box"
            onChange={handleItemSelect}
            value={selectedItem}
          >
            <option value="">เลือกตำแหน่ง</option>
            {items.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="list-box-container-right">
          <h4>แผนก</h4>
          <select
            className="list-box2"
            onChange={handleItemSelect2}
            value={selectedItem2}
          >
            <option value="">เลือกแผนก</option>
            {items2.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="list-box-container3">
          <h3>Skill Request</h3>
          <select
            className="list-box3"
            onChange={handleItemSelect3}
            value={selectedItem3}
          >
            <option value="">Select Skill</option>
            {items3.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="list-box-container4">
          <select
            className="list-box4"
            onChange={handleItemSelect4}
            value={selectedItem4}
          >
            <option value="">Select Skill</option>
            {items4.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="list-box-container5">
          <select
            className="list-box5"
            onChange={handleItemSelect5}
            value={selectedItem5}
          >
            <option value="">Select Skill</option>
            {items5.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}

export default Requestnorm;

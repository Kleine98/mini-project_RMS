import React, { useState, ChangeEvent } from "react";
import "./Requestnorm.css";
import NavEmp from "./NavEmp";

interface RequestnormProps {}

const Requestnorm: React.FC<RequestnormProps> = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputValue2, setInputValue2] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [isGeneralRequest, setIsGeneralRequest] = useState<boolean>(false);
  const [isAddEmployeeRequest, setIsAddEmployeeRequest] =
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
              checked={isGeneralRequest}
              onChange={() => setIsGeneralRequest(!isGeneralRequest)}
            />
            <span className="checkmark"></span>
          </label>
          <span className="ellipsis-message">คำร้องทั่วไป</span>
          <label className="checkbox-container2">
            <input
              type="checkbox"
              checked={isAddEmployeeRequest}
              onChange={() => setIsAddEmployeeRequest(!isAddEmployeeRequest)}
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
          {selectedItem && <p>You selected the location: {selectedItem}</p>}
        </div>
        <div className="list-box-container-right">
          <h4>แผนก</h4>
          <select
            className="list-box"
            onChange={handleItemSelect}
            value={selectedItem}
          >
            <option value="">เลือกแผนก</option>
            {items.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          {selectedItem && <p>You selected the location: {selectedItem}</p>}
        </div>
      </div>
    </>
  );
};

export default Requestnorm;

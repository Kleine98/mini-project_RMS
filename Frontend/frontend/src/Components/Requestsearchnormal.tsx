import React, { useState, useEffect, useRef } from "react";
import "./Requestsearchnormal.css";
import NavEmp from "./NavEmp";

const Requestsearchnormal = () => {
  const scrollContainerRef = useRef(null);
  const [numRows, setNumRows] = useState(1);
  const [selectedItem, setSelectedItem] = useState("");
  const [tableData, setTableData] = useState([]);

  const addRow = () => {
    if (selectedItem !== "") {
      const newRow = {
        position: selectedItem,
        data: `>>`,
      };
      setTableData([...tableData, newRow]);
      setSelectedItem("");
      setNumRows(numRows + 1);
    }
  };

  const tableRows = tableData.map((row, rowIndex) => (
    <tr key={rowIndex}>
      <td>Request{rowIndex + 1}</td>
      <td>{row.position}</td>
      <td>{row.data}</td>
    </tr>
  ));

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [tableData]);

  const handleItemSelect = (event) => {
    setSelectedItem(event.target.value);
  };

  const items = [
    "วิศวกรระบบ",
    "วิศวกรไฟฟ้า",
    "วิศวกรเครื่องกล",
    "วิศวกรโยธา",
    "วิศวกรข้อมูล",
  ];

  return (
    <>
      <NavEmp />
      <div className="bgred">
        <div className="table-container">
          <button className="add-row-button" onClick={addRow}>
            Add
          </button>
          <div className="table-scroll-container">
            <div className="table-scroll" ref={scrollContainerRef}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>ลำดับ</th>
                    <th>ตำแหน่ง</th>
                    <th>ข้อมูล</th>
                  </tr>
                </thead>
                <tbody>{tableRows}</tbody>
              </table>
            </div>
          </div>
          <div className="list-box-containerxxx">
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
        </div>
      </div>
    </>
  );
};

export default Requestsearchnormal;

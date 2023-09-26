import React, { useState, useEffect, useRef } from "react";
import "./Requestsearchnormal.css";
import NavEmp from "./NavEmp";

const Requestsearchnormal = () => {
  const numColumns = 3;
  const scrollContainerRef = useRef(null);
  const [numRows, setNumRows] = useState(1);
  const [selectedItem, setSelectedItem] = useState("");
  const [expanded, setExpanded] = useState(false);

  const addRow = () => {
    setNumRows(numRows + 1);
    setExpanded(true);
  };

  const tableRows = [];
  for (let i = 1; i <= numRows; i++) {
    const tableColumns = [];
    for (let j = 1; j <= numColumns; j++) {
      tableColumns.push(
        <td key={j}>
          <div className="cell-content">
            Row {i}, Column {j}
          </div>
        </td>
      );
    }
    tableRows.push(<tr key={i}>{tableColumns}</tr>);
  }

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [numRows]);

  const handleItemSelect = (event) => {
    setSelectedItem(event.target.value);
  };

  const items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];

  return (
    <>
      <NavEmp />
      <div className="bgred">
        <div className={`table-container ${expanded ? "expanded" : ""}`}>
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
            {selectedItem && <p>คุณเลือกตำแหน่ง: {selectedItem}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Requestsearchnormal;

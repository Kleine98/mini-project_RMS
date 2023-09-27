import React from "react";
import NavSuper from "./NavSuper";
import { Link } from "react-router-dom";
import "./SuperRequestDetail.css"; // Import your CSS file for styling

function SuperRequestDetail() {
  return (
    <div className="super-request-detail">
      <NavSuper />

      <div className="request-info">
        <h1 className="h1">ข้อมูลคำร้อง</h1>

        <select className="select-bar">
          <option value="option1">คำร้องทั่วไป</option>
          <option value="option2">คำร้องเพิ่มพนักงาน</option>
        </select>

        <table className="info">
          <thead>
            <tr>
              <th>Attribute</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ชื่อ</td>
              <td>
                <span id="nameOutput">John</span>
              </td>
            </tr>
            <tr>
              <td>นามสกุล</td>
              <td>
                <span id="lastNameOutput">Doe</span>
              </td>
            </tr>
            <tr>
              <td>ตำแหน่ง</td>
              <td>
                <span id="positionOutput">Manager</span>
              </td>
            </tr>
            <tr>
              <td>แผนก</td>
              <td>
                <span id="departmentOutput">Sales</span>
              </td>
            </tr>
            <tr>
              <td>ID พนักงาน</td>
              <td>
                <span id="employeeIdOutput">12345</span>
              </td>
            </tr>
            <tr>
              <td>แผนกที่ขอเพิ่มพนักงาน</td>
              <td>
                <span id="departmentToAddOutput">Marketing</span>
              </td>
            </tr>
            <tr>
              <td>ตำแหน่งที่ขอเพิ่มพนักงาน</td>
              <td>
                <span id="positionToAddOutput">Assistant Manager</span>
              </td>
            </tr>
            <tr>
              <td>จำนวน</td>
              <td>
                <span id="numberToAddOutput">2</span>
              </td>
            </tr>
          </tbody>
        </table>

        <h2 className="h2">หมายเหตุ</h2>
        <p>
          <span id="notesOutput"></span>
        </p>

        <div className="button">
          <Link to="/SuperRequest">
            <button className="approve-button">Approve</button>
          </Link>
          <Link to="/SuperRequest">
            <button className="reject-button">Reject</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SuperRequestDetail;

import React from "react";
import NavHr from "./NavHr";

function HrPermission() {
  return (
    <>
      <NavHr />
      <div className="table-container">
        <table className="Table-Privilege">
          <thead>
            <tr>
              <th>Privilege ID</th>
              <th>Privilege Name</th>
              <th>Privilage</th>
            </tr>
            <tr>
              <td>01</td>
              <td>Request</td>
              <td>
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              <td>02</td>
              <td>Profile</td>
              <td>
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              <td>03</td>
              <td>Petition</td>
              <td>
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              <td>04</td>
              <td>Edit</td>
              <td>
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              <td>05</td>
              <td>Permission</td>
              <td>
                <input type="checkbox" />
              </td>
            </tr>
          </thead>
        </table>
      </div>
    </>
  );
}

export default HrPermission;

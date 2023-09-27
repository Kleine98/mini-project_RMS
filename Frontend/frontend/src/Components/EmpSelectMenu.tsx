import React from "react";
import NavHr from "./NavHr";

function EmpSelectMenu() {
  return (
    <>
      <NavHr />
      <div>
        <a href="#">
          <button>Employee Status</button>
        </a>
        <a href="#">
          <button>Employee Recuit</button>
        </a>
        <a href="#">
          <button>Interview</button>
        </a>
      </div>
    </>
  );
}

export default EmpSelectMenu;

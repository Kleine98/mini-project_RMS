import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

function Home() {
  const location = useLocation();
  const userAndPermissionData = location.state?.user; // This now contains both user and permission data

  return (
    <div className="home">
      <Navbar />
      <h1>Welcome to the Homepage</h1>

      {userAndPermissionData && (
        <div className="user-data">
          <p>ID: {userAndPermissionData.id}</p>
          <p>Permission ID: {userAndPermissionData.permission_id}</p>
          <p>Employee ID: {userAndPermissionData.employee_id}</p>
        </div>
      )}

      {userAndPermissionData && (
        <div className="permission-data">
          <p>Permission Name: {userAndPermissionData.permission_name}</p>
          <p>Permission Description: {userAndPermissionData.permission}</p>
        </div>
      )}

      {/* Rest of your homepage content */}
    </div>
  );
}

export default Home;

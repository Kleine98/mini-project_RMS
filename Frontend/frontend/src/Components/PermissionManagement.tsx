import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import PermissionDetailPage from "./PermissionDetailPage";

function PermissionManagement() {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPermission, setSelectedPermission] = useState(null);

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      const response = await axios.get(
        "http://203.188.54.9/~u6411130038/mini-project/Backend/api/direct_search/permission.php"
      );
      setPermissions(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  };

  const handlePermissionClick = (permissionId) => {
    setSelectedPermission(permissionId);
  };

  return (
    <div>
      <Navbar />
      <h2>Permission Management</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Permission Name</th>
              <th>Permission</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((permission) => (
              <tr
                key={permission.id}
                onClick={() => handlePermissionClick(permission.id)}
                style={{ cursor: "pointer" }}
              >
                <td>{permission.id}</td>
                <td>{permission.permission_name}</td>
                <td>{permission.permission}</td>
                <td>{/* You can add actions here */}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {selectedPermission && (
        <PermissionDetailPage permissionId={selectedPermission} />
      )}
    </div>
  );
}

export default PermissionManagement;

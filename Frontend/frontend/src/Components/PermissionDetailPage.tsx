import React, { useState, useEffect } from "react";
import axios from "axios";

function PermissionDetailPage({ permissionId }) {
  const [permission, setPermission] = useState({});
  const [loading, setLoading] = useState(true);
  const [editedPermission, setEditedPermission] = useState({
    id: "",
    permission_name: "",
    permission: "",
  });

  useEffect(() => {
    fetchPermission(permissionId);
  }, [permissionId]);

  const fetchPermission = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost/mini-project/mini-project/Backend/api/direct_search/permission.php?id=${id}`
      );
      setPermission(response.data);
      setEditedPermission(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching permission:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPermission({ ...editedPermission, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost/mini-project/mini-project/Backend/api/direct_search/permission.php`,
        editedPermission
      );
      console.log(response.data.message);
      // Redirect to the permission management page or perform any other actions
    } catch (error) {
      console.error("Error updating permission:", error);
    }
  };

  return (
    <div>
      <h2>Edit Permission</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>ID:</td>
                <td>
                  <input
                    type="text"
                    name="id"
                    value={editedPermission.id}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Permission Name:</td>
                <td>
                  <input
                    type="text"
                    name="permission_name"
                    value={editedPermission.permission_name}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Permission:</td>
                <td>
                  <input
                    type="text"
                    name="permission"
                    value={editedPermission.permission}
                    onChange={handleChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit">Update Permission</button>
        </form>
      )}
    </div>
  );
}

export default PermissionDetailPage;

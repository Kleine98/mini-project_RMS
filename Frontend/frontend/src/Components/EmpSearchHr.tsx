import React, { useState, useEffect } from "react";
import NavHr from "./NavHr";
import "./EmpSearchHr.css";

function EmpSearchHr() {
  const initialData = [
    // Your initial data goes here
  ];

  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [rankFilter, setRankFilter] = useState("");
  const [newEntry, setNewEntry] = useState({
    name: "",
    department: "",
    rank: "",
    status: "",
    data: "",
  });

  useEffect(() => {
    // You can fetch initial data here and set it in 'data' state
    // For this example, let's use some sample data
    setData(initialData);
    setFilteredData(initialData);
  }, []);

  useEffect(() => {
    // Filter the data whenever departmentFilter or rankFilter changes
    const filteredData = data.filter(
      (item) =>
        (!departmentFilter || item.department === departmentFilter) &&
        (!rankFilter || item.rank === rankFilter)
    );
    setFilteredData(filteredData);
  }, [departmentFilter, rankFilter, data]);

  const handleAddRow = () => {
    setData([...data, newEntry]);
    setNewEntry({
      name: "",
      department: "",
      rank: "",
      status: "",
      data: "",
    });
  };

  return (
    <>
      <NavHr />
      <div>
        <h1>Employee Data</h1>
        <label htmlFor="departmentFilter">Filter by Department:</label>
        <select
          id="departmentFilter"
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="HR">HR</option>
          <option value="IT">IT</option>
          <option value="Finance">Finance</option>
        </select>
        <label htmlFor="rankFilter">Filter by Rank:</label>
        <select
          id="rankFilter"
          value={rankFilter}
          onChange={(e) => setRankFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="Junior">Junior</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Senior">Senior</option>
        </select>
        <button onClick={handleAddRow}>Add Row</button>
        <br />
        <br />
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Rank</th>
              <th>Status</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.department}</td>
                <td>{item.rank}</td>
                <td>{item.status}</td>
                <td>{item.data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default EmpSearchHr;

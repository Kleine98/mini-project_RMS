import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

function ReportPage() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch employee insights when the component mounts
    fetchEmployeeInsights();
  }, []);

  const fetchEmployeeInsights = async () => {
    try {
      const response = await axios.get(
        // Update the API endpoint to your report API URL
        "http://203.188.54.9/~u6411130038/mini-project/Backend/api/report/report.php"
      );
      setInsights(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching employee insights:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Insights Report</h2>

      {/* Show loading message while waiting for data */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        // Table to display employee insights
        <table>
          <thead>
            <tr>
              <th>Department</th>
              <th>Skill Name</th>
              <th>Employee Count</th>
              <th>Total Employees</th>
              <th>Percentage of Employees</th>
            </tr>
          </thead>
          <tbody>
            {insights.map((insight, index) => (
              <tr key={index}>
                <td>{insight.department_name}</td>
                <td>{insight.skill_name}</td>
                <td>{insight.employee_count}</td>
                <td>{insight.total_employees}</td>
                <td>{insight.percentage_of_employees}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ReportPage;

import React, { useState } from "react";
import axios from "axios";

function InterviewScoringForm({ interviewId }) {
  const [scores, setScores] = useState({
    technicalScore: "",
    creativeScore: "",
    humanRelationScore: "",
    learningScore: "",
    decision: "",
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setScores({ ...scores, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://203.188.54.9/~u6411130038/mini-project/Backend/api/interview/interview.php",
        {
          candidate_id: interviewId,
          technical_score: scores.technicalScore,
          creative_score: scores.creativeScore,
          human_relation_score: scores.humanRelationScore,
          learning_score: scores.learningScore,
          decision: scores.decision,
          comment: scores.comment,
        }
      );
      // Handle success, e.g., show a success message to the user
      console.log(response.data.message);
      window.location.reload();
    } catch (error) {
      // Handle error, e.g., display an error message to the user
      console.error("Error submitting scores:", error);
    }
  };

  return (
    <div>
      <h2>Interview Scoring</h2>
      <p>Interview ID: {interviewId}</p>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>Technical Score:</td>
              <td>
                <input
                  type="number"
                  name="technicalScore"
                  value={scores.technicalScore}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Creative Score:</td>
              <td>
                <input
                  type="number"
                  name="creativeScore"
                  value={scores.creativeScore}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Human Relation Score:</td>
              <td>
                <input
                  type="number"
                  name="humanRelationScore"
                  value={scores.humanRelationScore}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Learning Score:</td>
              <td>
                <input
                  type="number"
                  name="learningScore"
                  value={scores.learningScore}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Decision:</td>
              <td>
                <input
                  type="text"
                  name="decision"
                  value={scores.decision}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Comment:</td>
              <td>
                <input
                  type="text"
                  name="comment"
                  value={scores.comment}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Submit Scores</button>
      </form>
    </div>
  );
}

export default InterviewScoringForm;

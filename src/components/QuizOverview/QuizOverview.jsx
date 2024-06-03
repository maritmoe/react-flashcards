import { useEffect, useState } from "react";
import { environment } from "../../environment/environment";
import { useNavigate } from "react-router-dom";
import "./QuizOverview.css";

function QuizOverview() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAvailableQuizes();
  }, []);

  const fetchAvailableQuizes = () => {
    fetch(`${environment.QuizApiUrl}`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => setError(error));
  };

  return (
    <div className="main-div">
      <h2>Available Flashcard Quizes</h2>
      {error && <span>{error.message}</span>}
      {data && (
        <ul>
          {data.map((quiz) => (
            <li key={quiz.quizId} className="overview-item">
              <h3>{quiz.title}</h3>
              <button onClick={() => navigate(`/view/${quiz.quizId}`)}>
                View Quiz
              </button>
              <button onClick={() => navigate(`/edit/${quiz.quizId}`)}>
                Edit Quiz
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default QuizOverview;

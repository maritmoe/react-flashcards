import { useEffect, useState } from "react";
import { environment } from "../../environment/environment";
import { useNavigate } from "react-router-dom";

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
    <>
      <h2>Available Flashcard Quizes</h2>
      {error && <span>{error.message}</span>}
      {data && (
        <ul>
          {data.map((quiz) => (
            <li key={quiz.quizId}>
              <p>{quiz.title}</p>
              <button onClick={() => navigate(`/view/${quiz.quizId}`)}>
                Click here to play
              </button>
              <button onClick={() => navigate(`/edit/${quiz.quizId}`)}>
                Click here to edit quiz
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default QuizOverview;

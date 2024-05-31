import { useEffect, useState } from "react";
import { environment } from "../../environment/environment";
import EditCardList from "../EditCardList/EditCardList";
import { useParams } from "react-router-dom";

function EditQuiz() {
  const { quizId } = useParams();
  const [quizData, setQuizData] = useState({ id: "", title: "", cards: [] });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = () => {
    fetch(`${environment.QuizApiUrl}/${quizId}`)
      .then((response) => response.json())
      .then((data) => setQuizData(data))
      .catch((error) => setError(error));
  };

  const handleTitleChange = (event) => {
    const { name, value } = event.target;
    setQuizData({ ...quizData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (quizData.title) {
      fetch(`${environment.QuizApiUrl}/${quizId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: quizData.title }),
      })
        .then((response) => {
          if (response.status !== 200) {
            response.json().then((data) => setError(data));
          }
        })
        .then((data) => console.log(data));
    }
  };

  return (
    <div className="main-div">
      <h2>Edit Quiz</h2>
      {error && <span className="error">{error}</span>}
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={quizData.title}
          type="text"
          onChange={handleTitleChange}
        />
        <button type="submit">Edit Quiz Title</button>
      </form>
      {quizId && <EditCardList cards={quizData.cards} />}
    </div>
  );
}

export default EditQuiz;

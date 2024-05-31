import { useEffect, useState } from "react";
import { environment } from "../../environment/environment";
import { useNavigate, useParams } from "react-router-dom";
import { Delete } from "@mui/icons-material";
import CreateCard from "../CreateQuiz/CreateCard/CreateCard";
import "./EditQuiz.css";

function EditQuiz() {
  const { quizId } = useParams();
  const [quizData, setQuizData] = useState({ id: "", title: "", cards: [] });
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  const handleDelete = () => {
    fetch(`${environment.QuizApiUrl}/${quizId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          response
            .json()
            .then((data) =>
              alert(`Quiz with title: ${data.title} was deleted`)
            );
          navigate("/");
        } else {
          response.json().then((data) => setError(data));
        }
      })
      .then((data) => console.log(data));
  };

  return (
    <div className="main-div">
      <h2>Edit Quiz</h2>
      {error && <span className="error">{error}</span>}
      {quizData.title && (
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            value={quizData.title}
            type="text"
            onChange={handleTitleChange}
          />
          <button type="submit">Edit Quiz Title</button>
        </form>
      )}
      {quizData.id && (
        <CreateCard quizId={quizData.id} initialCards={quizData.cards} />
      )}
      {quizData.id && (
        <button className="delete-button" onClick={handleDelete}>
          Delete Quiz <br />
          <Delete />
        </button>
      )}
    </div>
  );
}

export default EditQuiz;

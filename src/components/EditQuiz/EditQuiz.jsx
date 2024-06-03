import { useEffect, useState } from "react";
import { environment } from "../../environment/environment";
import { useNavigate, useParams } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import CreateCard from "../CreateQuiz/CreateCard/CreateCard";

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
          <button type="submit">
            Edit Quiz Title{" "}
            <Edit
              sx={{
                position: "relative",
                top: "2px",
                width: "19px",
                height: "19px",
              }}
            />
          </button>
          <button onClick={handleDelete}>
            Delete Quiz
            <Delete
              sx={{
                position: "relative",
                top: "3px",
                width: "19px",
                height: "19px",
              }}
            />
          </button>
        </form>
      )}
      {quizData.id && (
        <CreateCard quizId={quizData.id} initialCards={quizData.cards} />
      )}
    </div>
  );
}

export default EditQuiz;

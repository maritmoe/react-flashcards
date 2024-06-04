import { useState } from "react";
import { environment } from "../../environment/environment";
import CreateCard from "./CreateCard/CreateCard";
import "./CreateQuiz.css";

function CreateQuiz() {
  const [quizTitle, setQuizTitle] = useState({ title: "" });
  const [quizId, setQuizId] = useState("");
  const [error, setError] = useState("");

  const handleTitleChange = (event) => {
    const { name, value } = event.target;
    setQuizTitle({ ...quizTitle, [name]: value });
  };

  const handlesubmit = (event) => {
    event.preventDefault();
    if (quizTitle.title) {
      fetch(`${environment.QuizApiUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizTitle),
      })
        .then((response) => {
          if (response.status === 200) {
            response.json().then((data) => setQuizId(data.id));
            setError("");
          } else {
            response.json().then((data) => setError(data));
          }
        })
        .then((data) => console.log(data));
    } else setError("The title cannot be empty");
  };

  return (
    <div className="main-div">
      <h2>Create Quiz</h2>
      {error && <span className="error">{error}</span>}
      {!quizId && (
        <form onSubmit={handlesubmit}>
          <input
            placeholder="Title"
            name="title"
            value={quizTitle.title}
            type="text"
            onChange={handleTitleChange}
            disabled={quizId}
          />
          <button type="submit">Create Quiz Title</button>
        </form>
      )}
      {quizId && (
        <div className="title-box">
          <h3>Title: {quizTitle.title}</h3>
        </div>
      )}
      {quizId && <CreateCard quizId={quizId} initialCards={[]} />}
    </div>
  );
}

export default CreateQuiz;

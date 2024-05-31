import { useState } from "react";
import { environment } from "../../environment/environment";
import CreateCard from "./CreateCard/CreateCard";

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
    if (quizTitle) {
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
          } else {
            response.json().then((data) => setError(data));
          }
        })
        .then((data) => console.log(data));
    }
  };

  return (
    <div className="main-div">
      <h2>Create Quiz</h2>
      {error && <span className="error">{error}</span>}
      <form onSubmit={handlesubmit}>
        <input
          placeholder="Title"
          name="title"
          value={quizTitle.title}
          type="text"
          onChange={handleTitleChange}
        />
        <button type="submit">Create Quiz Title</button>
      </form>
      {quizId && <CreateCard quizId={quizId} initialCards={[]} />}
    </div>
  );
}

export default CreateQuiz;

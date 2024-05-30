import { useState } from "react";
import { environment } from "../../environment/environment";

function CreateQuiz() {
  const [quizTitle, setQuizTitle] = useState({ title: "" });

  const handleTitleChange = (event) => {
    const { name, value } = event.target;
    setQuizTitle({ ...quizTitle, [name]: value });
  };

  const handlesubmit = (event) => {
    event.preventDefault();
    fetch(`${environment.QuizApiUrl}`);
    if (quizTitle) {
      fetch(`${environment.QuizApiUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizTitle),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  //TODO: when title is succedded, a create card component can be added

  return (
    <div>
      <h2>Create Quiz</h2>
      <form onSubmit={handlesubmit}>
        <input
          name="title"
          value={quizTitle.title}
          type="text"
          onChange={handleTitleChange}
        />
        <button type="submit">Create Quiz Title</button>
      </form>
    </div>
  );
}

export default CreateQuiz;

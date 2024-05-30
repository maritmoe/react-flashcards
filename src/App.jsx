import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import QuizOverview from "./components/QuizOverview/QuizOverview";
import CreateQuiz from "./components/CreateQuiz/CreateQuiz";
import EditQuiz from "./components/EditQuiz/EditQuiz";
import ViewQuiz from "./components/ViewQuiz/ViewQuiz";

function App() {
  return (
    <>
      <h1 id="title"> React Flashcards</h1>
      <Link to="/" id="home-link">
        Home
      </Link>
      <Link to="/create" id="create-quiz-link">
        Create Quiz
      </Link>
      <Routes>
        <Route path="/" element={<QuizOverview />} />
        <Route path="/create" element={<CreateQuiz />} />
        <Route path="/view/:quizId" element={<ViewQuiz />} />
        <Route path="/edit/:quizId" element={<EditQuiz />} />
      </Routes>
    </>
  );
}

export default App;

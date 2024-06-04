import { Route, Routes } from "react-router-dom";
import "./App.css";
import QuizOverview from "./components/QuizOverview/QuizOverview";
import CreateQuiz from "./components/CreateQuiz/CreateQuiz";
import EditQuiz from "./components/EditQuiz/EditQuiz";
import ViewQuiz from "./components/ViewQuiz/ViewQuiz";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />
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

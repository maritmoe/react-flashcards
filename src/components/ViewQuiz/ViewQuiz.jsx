import { useEffect, useState } from "react";
import { environment } from "../../environment/environment";
import CardList from "../CardList/CardList";
import { useParams } from "react-router-dom";

function ViewQuiz() {
  const [data, setData] = useState({
    id: "",
    title: "",
    cards: [],
  });
  const [error, setError] = useState(null);
  const { quizId } = useParams();

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = () => {
    fetch(`${environment.QuizApiUrl}/${quizId}`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => setError(error));
  };

  return (
    <div className="main-div">
      {error && <span>{error.message}</span>}
      {data.id && <CardList title={data.title} cards={data.cards} />}
    </div>
  );
}

export default ViewQuiz;

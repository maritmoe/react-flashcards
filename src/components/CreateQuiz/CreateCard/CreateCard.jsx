import { useState } from "react";
import PropTypes from "prop-types";
import { environment } from "../../../environment/environment";
import EditCardList from "../../EditCardList/EditCardList";

function CreateCard({ quizId, initialCards }) {
  const [addCard, setAddCard] = useState(false);
  const [cards, setCards] = useState(initialCards);
  const [cardFormData, setCardFormData] = useState({
    quizId: quizId,
    question: "",
    answer: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (cardFormData.quizId && cardFormData.question && cardFormData.answer) {
      fetch(`${environment.CardApiUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cardFormData),
      })
        .then((response) => {
          if (response.status === 200) {
            response
              .json()
              .then((data) =>
                setCards([
                  ...cards,
                  { id: data.id, question: data.question, answer: data.answer },
                ])
              );
            setCardFormData({
              quizId: quizId,
              question: "",
              answer: "",
            });
            setAddCard(false);
          } else {
            response.json().then((data) => setError(data));
          }
        })
        .then((data) => console.log(data));
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCardFormData({ ...cardFormData, [name]: value });
  };

  return (
    <div>
      {cards[0] && <EditCardList cards={cards} />}
      {error && <span className="error">{error}</span>}
      {addCard && (
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Question"
            name="question"
            type="text"
            value={cardFormData.question}
            onChange={handleChange}
          />
          <input
            placeholder="Answer"
            name="answer"
            type="text"
            value={cardFormData.answer}
            onChange={handleChange}
          />
          <button type="submit">Create Card</button>
        </form>
      )}
      {!addCard && (
        <button onClick={() => setAddCard(true)}>Add a new card</button>
      )}
    </div>
  );
}

export default CreateCard;

CreateCard.propTypes = {
  quizId: PropTypes.number,
  initialCards: PropTypes.array,
};

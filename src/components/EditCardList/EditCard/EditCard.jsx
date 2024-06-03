import PropTypes from "prop-types";
import "./EditCard.css";
import { useState } from "react";
import { environment } from "../../../environment/environment";
import { Delete, Edit } from "@mui/icons-material";

function EditCard({ card }) {
  const [cardFormData, setCardFormData] = useState({
    question: card.question,
    answer: card.answer,
  });
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (cardFormData.question && cardFormData.answer && card.cardId) {
      fetch(`${environment.CardApiUrl}/${card.cardId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cardFormData),
      }).then((response) => {
        if (response.status !== 200) {
          response.json().then((data) => setError(data));
        }
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCardFormData({ ...cardFormData, [name]: value });
  };

  //TODO: reload when a card is deleted so it does not show in the list
  const handleDelete = () => {
    fetch(`${environment.CardApiUrl}/${card.cardId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          alert(`Question: ${data.question} was deleted`);
        });
      } else {
        response.json().then((data) => setError(data));
      }
    });
  };

  return (
    <>
      {card.cardId && (
        <li key={card.cardId} className="editcard">
          {error && <span className="error">{error}</span>}
          {cardFormData.question && (
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="question" className="edit-card-label">
                  Question:
                </label>
                <input
                  className="edit-card-input"
                  id="question"
                  name="question"
                  value={cardFormData.question}
                  type="text"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="answer" className="edit-card-label">
                  Answer:
                </label>
                <input
                  className="edit-card-input"
                  id="answer"
                  name="answer"
                  value={cardFormData.answer}
                  type="text"
                  onChange={handleChange}
                />
              </div>
              <div>
                <button type="submit" className="editcard-button">
                  Edit Card{" "}
                  <Edit
                    sx={{
                      position: "relative",
                      top: "2px",
                      width: "19px",
                      height: "19px",
                    }}
                  />
                </button>
                <button onClick={handleDelete} className="editcard-button">
                  Delete Card{" "}
                  <Delete
                    sx={{
                      position: "relative",
                      top: "3px",
                      width: "19px",
                      height: "19px",
                    }}
                  />
                </button>
              </div>
            </form>
          )}
        </li>
      )}
    </>
  );
}

export default EditCard;

EditCard.propTypes = {
  card: PropTypes.object,
};

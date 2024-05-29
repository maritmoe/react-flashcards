import { useState } from "react";
import PropTypes from "prop-types";
import "./Card.css";
import { Autorenew } from "@mui/icons-material";

function Card({ card }) {
  const [flip, setFlip] = useState(false);

  const handleClick = () => {
    setFlip(!flip);
  };

  return (
    <li
      className="flashcard"
      title="click on the card to flip it"
      onClick={handleClick}
    >
      {flip ? (
        <p className="answer">{card.answer}</p>
      ) : (
        <p className="question">{card.question}</p>
      )}
      <button className="icon" aria-label="click to flip">
        <Autorenew />
      </button>
    </li>
  );
}

export default Card;

Card.propTypes = {
  card: PropTypes.objectOf(String),
};

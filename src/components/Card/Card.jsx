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
    <li className="flashcard" onClick={handleClick}>
      {flip ? (
        <p className="answer">{card.answer}</p>
      ) : (
        <p className="question">{card.question}</p>
      )}
      <button className="icon" title="click on card to flip">
        <Autorenew />
      </button>
    </li>
  );
}

export default Card;

Card.propTypes = {
  card: PropTypes.objectOf(String),
};

import PropTypes from "prop-types";
import "./EditCard.css";

function EditCard({ card }) {
  return (
    <li key={card.id} className="editcard">
      <p>Question: {card.question}</p>
      <p>Answer: {card.answer}</p>
    </li>
  );
}

export default EditCard;

EditCard.propTypes = {
  card: PropTypes.object,
};

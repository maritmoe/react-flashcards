import Card from "../Card/Card";
import PropTypes from "prop-types";
import "./CardList.css";

function CardList({ cards }) {
  return (
    <ul className="flashcard-list">
      {cards.map((card) => (
        <Card key={card} card={card} />
      ))}
    </ul>
  );
}

export default CardList;

CardList.propTypes = {
  cards: PropTypes.arrayOf(Object),
};

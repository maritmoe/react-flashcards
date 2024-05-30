import Card from "../Card/Card";
import PropTypes from "prop-types";
import "./CardList.css";

function CardList({ title, cards }) {
  return (
    <>
      <h2>{title}</h2>
      <ul className="flashcard-list">
        {cards.map((card) => (
          <Card key={card.question} card={card} />
        ))}
      </ul>
    </>
  );
}

export default CardList;

CardList.propTypes = {
  cards: PropTypes.arrayOf(Object),
  title: PropTypes.string,
};

import PropTypes from "prop-types";
import EditCard from "./EditCard/EditCard";

function EditCardList({ cards }) {
  return (
    <ul>
      {cards.map((card) => (
        <EditCard key={card.id} card={card} />
      ))}
    </ul>
  );
}

export default EditCardList;

EditCardList.propTypes = {
  cards: PropTypes.array,
};

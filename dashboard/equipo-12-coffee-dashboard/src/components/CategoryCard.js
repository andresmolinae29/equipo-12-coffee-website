import PropTypes from "prop-types";

function CategoryCard(props) {
  return (
    <div className="col-lg-6 mb-4">
      <div className="card bg-dark text-white shadow">
        <div className="card-body">{props.category}</div>
      </div>
    </div>
  );
}

CategoryCard.propTypes = {
  category: PropTypes.string.isRequired,
};

CategoryCard.defaultProps = {
  category: "Sin datos",
};

export default CategoryCard;

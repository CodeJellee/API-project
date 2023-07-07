import React from "react";
import PropTypes from "prop-types";

const StarRating = ({ rating, setRating }) => {
  const handleRatingChange = (selectedRating) => {
    setRating(selectedRating);
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className="star"
          onClick={() => handleRatingChange(star)}
        >
          &#9734;
        </span>
      ))}
     star
     </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  setRating: PropTypes.func.isRequired,
};

export default StarRating;

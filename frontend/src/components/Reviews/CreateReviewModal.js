// frontend/src/components/DeleteSpotModal/index.js
import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreateReview } from "../../store/reviews";
import { fetchGetSpotById } from "../../store/spots";
import StarRating from "./StarRatingForReview";
import { useEffect } from "react";
import { useParams } from "react-router-dom";




function CreateReviewModal() {
    const reviewObject = useSelector(state => state.reviews)
    const spotId = useSelector(state => state.spots.singleSpot.id)
    // console.log('SPODID', spotId)


    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit= (e) => {
        e.preventDefault()

        const reviewData = {
            // reviewId: reviewId,
            review: comment,
            stars: rating, // Pass the rating to the review data
        };


        dispatch(fetchCreateReview(reviewData, spotId)) //make sure to pass both parameters from thunk, in the same order as well
        .then(() => dispatch(fetchGetSpotById(spotId)))
        .then(closeModal)
        .catch((error) => setError(error.message));

        setError(null);
    }


    const handleRatingChange = (number) => {
        setRating(parseInt(number))
    }


    return (
        <form onSubmit={handleSubmit}>
            <h4>How was your stay?</h4>
            {error && <p className="error">{error}</p>}
            <textarea
                type="text"
                name="description"
                placeholder="Leave your review here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <StarRating
            disabled={false}
            onChange={handleRatingChange}
            rating={rating}
            />
            <button
            type="submit"
            disabled={comment.length < 10 && rating.length === 0}
            >
                Submit Your Review
            </button>
        </form>
    );
}

export default CreateReviewModal;

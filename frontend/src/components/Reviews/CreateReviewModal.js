// frontend/src/components/DeleteSpotModal/index.js
import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreateReview } from "../../store/reviews";
import { fetchGetSpotById } from "../../store/spots";
import StarRating from "./StarRatingForReview";
import { useEffect } from "react";




function CreateReviewModal({reviewId, spotId}) {
    const reviewObject = useSelector(state => state.reviews)
    const spotObject = useSelector(state => state.spots)
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const [rating, setRating] = useState(0);


    const onClick = (e) => {
        e.preventDefault();
        const reviewData = {
          reviewId: reviewId,
          rating: rating, // Pass the rating to the review data
          description: e.target.form.description.value,
        };

        dispatch(fetchCreateReview(reviewData))
          .then(() => dispatch(fetchGetSpotById(spotId)))
          .then(closeModal);
      };


    // const onClick = (e) => {
    //     e.preventDefault();
    //     dispatch(fetchCreateReview(reviewId))
    //     .then (() => dispatch(fetchGetSpotById(spotId)))
    //     .then(closeModal)
    // }


    // console.log('IS THIS AN ARRAY', Object.keys(reviewObject))

    // useEffect(() => {
    // dispatch(fetchGetSpotById(reviewObject.spotId))
    // }, [dispatch])



    return (
        <>
            <h4>How was your stay?</h4>
            <textarea
                type="text"
                name="description"
                placeholder="Leave your review here..."
            />
            <StarRating rating={rating} setRating={setRating} />
            <button onClick={onClick}>Submit Your Review</button>
        </>
    );
}

export default CreateReviewModal;

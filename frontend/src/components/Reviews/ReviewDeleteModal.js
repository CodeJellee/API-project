// frontend/src/components/DeleteSpotModal/index.js
import React from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeleteReview } from "../../store/reviews";
import { fetchGetSpotById } from "../../store/spots";
import { useEffect } from "react";





function DeleteReviewModal({reviewId, spotId}) {
    const reviewObject = useSelector(state => state.reviews)
    const { closeModal } = useModal()
    const dispatch = useDispatch()


    const onClick = (e) => {
        e.preventDefault();
        dispatch(fetchDeleteReview(reviewId))
        .then (() => dispatch(fetchGetSpotById(spotId)))
        .then(closeModal)
    }


    return (
        <div id="review-delete-modal-container">
            <div id="confirm-delete-review">Confirm Delete</div>
            <h3 id="delete-review-description">Are you sure you want to delete this review?</h3>
            <div id="delete-review-buttons-two">
            <button id="review-yes" onClick={onClick}>Yes (Delete Review)</button>
            <button id="review-no" onClick={closeModal}>No (Keep Review)</button>
            </div>
        </div>
    );
}

export default DeleteReviewModal;

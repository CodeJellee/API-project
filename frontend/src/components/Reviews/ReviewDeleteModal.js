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


    // console.log('IS THIS AN ARRAY', Object.keys(reviewObject))

    // useEffect(() => {
    // dispatch(fetchGetSpotById(reviewObject.spotId))
    // }, [dispatch])



    return (
        <>
            <h4>Confirm Delete</h4>
            <h3>Are you sure you want to delete this review?</h3>
            <button onClick={onClick}>Yes (Delete Review)</button>
            <button onClick={closeModal}>No (Keep Review)</button>
        </>
    );
}

export default DeleteReviewModal;

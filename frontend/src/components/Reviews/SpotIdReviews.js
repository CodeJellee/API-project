// frontend/src/components/SpotIdReviews.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import {fetchGetReviewsBySpotId} from "../../store/reviews";
import DeleteReviewModal from "./ReviewDeleteModal";
import OpenModalButton from "../OpenModalButton";
import './Reviews.css';


const ReviewsBySpotId = () => {
    let {spotId} = useParams();
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGetReviewsBySpotId(spotId));


    }, [dispatch]);

    const reviews = useSelector((state) => Object.values(state.reviews)); //changing into an array
    //do not forget map through it within the return


    //NEED THIS, bc will cause error w/ refresh
    if (!reviews) return null;

    if (sessionUser && sessionUser.id !== reviews.spotId && reviews.length === 0) {
        return <p>Be the first to post a review!</p>;
    }

return (
    <>
        {reviews.map((review) => {

            const isUserReview = review.userId === sessionUser?.id;
            const deleteButton = isUserReview ? (
                <OpenModalButton
                buttonText="Delete"
                modalComponent={<DeleteReviewModal reviewId={review.id} spotId={review.spotId} />}
                />
                ) : null;

                return (
                    <div key={review.id}>
                    <p>{sessionUser.firstName}</p>
                    <p>{review.createdAt}</p>
                    <p>{review.review}</p>
                    {deleteButton}
                </div>
            );
        })}
    </>
);



}


export default ReviewsBySpotId

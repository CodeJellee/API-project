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
    const sessionUser = useSelector(state => state.session.user);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGetReviewsBySpotId(spotId));


    }, [dispatch]);

    const reviews = useSelector((state) => Object.values(state.reviews)); //changing into an array
    //dont forget map through it within the return

    reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (!reviews) return null;
// if(!reviews) return null //NEED THIS, bc will cause error w/ refresh

if (reviews.length === 0 && sessionUser && sessionUser.id !== reviews.spotId) {
    return <p>Be the first to post a review!</p>;
  }

return (
    <>
        {reviews.map((review) => {
            const reviewCreatedAt = new Date(review.createdAt);
            const options = { year: 'numeric', month: 'long' };
            const formattedDate = reviewCreatedAt.toLocaleDateString('en-US', options);

            const isUserReview = review.User.id === sessionUser.id;
        const deleteButton = isUserReview ? (
          <OpenModalButton
            buttonText="Delete"
            modalComponent={<DeleteReviewModal reviewId={review.id} spotId={review.spotId} />}
          />
        ) : null;

            return (
                <div key={review.id}>
                    <p>{review.User.firstName}</p>
                    <p>{formattedDate}</p>
                    <p>{review.review}</p>
                    {deleteButton}
                </div>
            );
        })}
    </>
);
}


export default ReviewsBySpotId

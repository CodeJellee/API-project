// frontend/src/components/SpotIdReviews.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import {fetchGetReviewsBySpotId} from "../../store/reviews";
import './Reviews.css';


const ReviewsBySpotId = () => {
 let {spotId} = useParams();

 const dispatch = useDispatch();

 useEffect(() => {
    dispatch(fetchGetReviewsBySpotId(spotId));
}, [dispatch]);

const reviews = useSelector((state) => Object.values(state.reviews)); //changing into an array
//dont forget map through it within the return


// if(!reviews) return null //NEED THIS, bc will cause error w/ refresh

return (
    <>
        {reviews.map((review) => {
            const reviewCreatedAt = new Date(review.createdAt);
            const options = { year: 'numeric', month: 'long' };
            const formattedDate = reviewCreatedAt.toLocaleDateString('en-US', options);

            return (
                <div key={review.id}>
                    <p>{review.User.firstName}</p>
                    <p>{formattedDate}</p>
                    <p>{review.review}</p>
                </div>
            );
        })}
    </>
);
}


export default ReviewsBySpotId

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import {fetchGetReviewsBySpotId} from "../../store/reviews";
import DeleteReviewModal from "./ReviewDeleteModal";
import OpenModalButton from "../OpenModalButton";
import './Reviews.css';

const NotLoggedInReviews = () => {

    const sessionUser = useSelector((state) => state.session.user);
    const reviews = useSelector((state) => state.reviews);


    return (
        <>
            <p>{reviews.User.firstName}</p>
            <p>{reviews.createdAt}</p>
            <p>{reviews}</p>
        </>
    )
}


export default NotLoggedInReviews

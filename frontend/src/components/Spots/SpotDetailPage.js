// frontend/src/components/SpotDetailPage.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import {fetchGetSpotById} from "../../store/spots";
import ReviewsBySpotId from "../Reviews/SpotIdReviews";
import OpenModalButton from "../OpenModalButton";
import CreateReviewModal from "../Reviews/CreateReviewModal";
import { UseSelector } from "react-redux";
import {Route} from "react-router-dom"
import './Spots.css';



const SpotId = () => {
    let {spotId} = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGetSpotById(spotId));
    }, [dispatch, spotId]);

    const spots = useSelector((state) => (state.spots.singleSpot));
    const reviews = useSelector((state) => (state.reviews));
    const sessionUser = useSelector((state) => state.session.user);


    if(!spots.SpotImages) return null //NEED THIS, bc will cause error w/ refresh
    //make sure to add spots.SpotImages or spots.Owner not JUST spots, need to key in because AN EMPTY OBJ WILL BE TRUTHY AND CANNOT DO .LENGTH ON AN OBJ

    const handleReserveClick = () => {
      alert("Feature coming soon");
    };

    // const isCurrentUserOwner = sessionUser && sessionUser.id === spots.Owner.id; //is current user and current user matches spot owner ID
    // const shouldShowReviewButton = !(sessionUser && isCurrentUserOwner); //if NOT current user and

    //if current user is logged-in and they view a spots detail page for a spot that they have not posted a review yet, +'post your review'

    // if(!sessionUser) return null


    const sessionUserNotNull = sessionUser !== null
    const reviewDoesNotHaveReviewByUser = sessionUser && sessionUserNotNull && Object.values(reviews).every(review => review.userId !== sessionUser.id);
    const spotDoesNotBelongToUser = sessionUser && sessionUserNotNull && sessionUser.id !== spots.Owner.id
    const loggedInButNoReviewByUserAndSpotDoesNotBelongToUser = sessionUser && sessionUserNotNull && reviewDoesNotHaveReviewByUser && spotDoesNotBelongToUser





    return (
    <>
        <div id="spot-details-container">
          <h1>{spots.name}</h1>
          <h2>{spots.city}, {spots.state}, {spots.country}</h2>


        <div id="photo-container">
          {/* <div id='preview-container'> */}
              {spots.SpotImages.map((spot, index) => (
                  index === 0 ? (<div key={index}> <img className="preview-image" id={spot.id} src={spot.url}/></div>) : null
              )) }
            {/* </div> */}

          <div id='other-images-container'>
              {spots.SpotImages.map((spot, index) => (
                  index !== 0 ? (<div key={index} > <img className="other-img" id={spot.id} src={spot.url}/></div>) : null
              )) }
          </div>
      </div>


          <div>
            <div>
                <div>Hosted by {spots.Owner.firstName} {spots.Owner.lastName} </div>
                <div>{spots.description}</div>
            </div>
            <div>
                <div>
                  <div>
                    $ {spots.price.toFixed(2)} night,
                  </div>
                  <div>
                    {spots.avgRating && (
                          <div id="each-spot-avgRating">★ {spots.avgRating.toFixed(1)}</div>
                        )}
                      {!spots.avgRating && <div id="each-spot-avgRating">★ New</div>}
                  </div>
                  <div>
                    {
                      (() => {
                        if (spots.numReviews === 1) {
                          return <div id="each-spot-reviews"> · {spots.numReviews} Review</div>;
                        } else if (spots.numReviews > 1) {
                          return <div id="each-spot-reviews"> · {spots.numReviews} Reviews</div>;
                        } else {
                          return <div id="each-spot-reviews"></div>;
                        }
                      })()
                    }
                  </div>
                </div>
                <button onClick={handleReserveClick}>Reserve</button>
            </div>
            <div>
                <h3>add a line here to separate above and start of below</h3>
                <div>
                    {spots.avgRating && (
                        <div id="each-spot-avgRating">★ {spots.avgRating.toFixed(1)}</div>
                      )}
                    {!spots.avgRating && <div id="each-spot-avgRating">★ New</div>}
                    <div>
                    {
                      (() => {
                        if (spots.numReviews === 1) {
                          return <div id="each-spot-reviews"> · {spots.numReviews} Review</div>;
                        } else if (spots.numReviews > 1) {
                          return <div id="each-spot-reviews"> · {spots.numReviews} Reviews</div>;
                        } else {
                          return <div id="each-spot-reviews"></div>;
                        }
                      })()
                    }
                  </div>
                  </div>
            </div>
          </div>
          {loggedInButNoReviewByUserAndSpotDoesNotBelongToUser && (
          <OpenModalButton
            buttonText="Post Your Review"
            modalComponent={<CreateReviewModal reviewId={reviews.id} />}
          />
        )}
          <div >
            <ReviewsBySpotId />
          </div>
        </div>

    </>
    );

  };

  export default SpotId;

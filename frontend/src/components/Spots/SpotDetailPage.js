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

    const isCurrentUserOwner = sessionUser && sessionUser.id === spots.Owner.id;
    const shouldShowReviewButton = !(sessionUser && isCurrentUserOwner);

    return (
    <>
        <div id="spot-details-container">
          <h1>{spots.name}</h1>
          <h2>{spots.city}, {spots.state}, {spots.country}</h2>
          <div id='spot-images'>
            {spots.SpotImages.map((spot) => (
                // <img id={spots.SpotImages[spots.SpotImages.indexOf(spot)].id} src={spots.SpotImages[spots.SpotImages.indexOf(spot)].url}></img>
                  <img id={spot.id} src={spot.url}/>
            ))}
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
          {shouldShowReviewButton && (
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

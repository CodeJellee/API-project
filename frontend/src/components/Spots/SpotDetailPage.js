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


    const sessionUserNotNull = sessionUser !== null
    const reviewDoesNotHaveReviewByUser = sessionUser && sessionUserNotNull && Object.values(reviews).every(review => review.userId !== sessionUser.id);
    const spotDoesNotBelongToUser = sessionUser && sessionUserNotNull && sessionUser.id !== spots.Owner.id
    const loggedInButNoReviewByUserAndSpotDoesNotBelongToUser = sessionUser && sessionUserNotNull && reviewDoesNotHaveReviewByUser && spotDoesNotBelongToUser





    return (
    <>
        <div id="spot-details-container">
          <div id="spot-detail-titles">
            <h1 id="spots-detail-heading1">{spots.name}</h1>
            <h4 id="spots-detail-heading2">{spots.city}, {spots.state}, {spots.country}</h4>
          </div>


        <div id="photo-container">
              {spots.SpotImages.map((spot, index) => (
                  index === 0 ? (<div key={index}> <img className="preview-image" id={spot.id} src={spot.url}/></div>) : null
              )) }

          <div id='other-images-container'>
              {spots.SpotImages.map((spot, index) => (
                  index !== 0 ? (<div key={index} > <img className="other-img" id={spot.id} src={spot.url}/></div>) : null
              )) }
          </div>
      </div>


          <div>
            <div id="spot-details-page-upper-container">
            <div>
                <div id="hosted-by">Hosted by {spots.Owner.firstName} {spots.Owner.lastName} </div>
                <div id="spots-description">{spots.description}</div>
            </div>
            <div id="reservation-box">
                <div id="price-rating-review">
                  <div>
                    ${Number(spots.price).toFixed(2)} night
                  </div>

              <div id="reservation-rating-and-review-container">
                      <div>
                        {spots.avgRating && (
                              <div id="each-spot-avgRating"><i className="fa fa-star"></i> {Number(spots.avgRating).toFixed(1)}</div>
                            )}
                          {!spots.avgRating && <div id="each-spot-avgRating"><i className="fa fa-star"></i> New</div>}
                      </div>
                      <div id="center-dot">
                      ·
                      </div>
                      <div>
                        {
                          (() => {
                            if (spots.numReviews == 1) {
                              return <div id="each-spot-reviews"> {spots.numReviews} Review</div>;
                            } else if (spots.numReviews > 1) {
                              return <div id="each-spot-reviews"> {spots.numReviews} Reviews</div>;
                            } else {
                              return <div id="each-spot-reviews"></div>;
                            }
                          })()
                        }
                      </div>
                </div>
                </div>
                <button id="reserve-button" onClick={handleReserveClick}>Reserve</button>
            </div>
            </div>


            <div>
                <div id="spot-details-page-middle-container">
                    {spots.avgRating && (
                        <div id="each-spot-avgRating"><i className="fa fa-star"></i> {Number(spots.avgRating).toFixed(1)}</div>
                      )}
                    {!spots.avgRating && <div id="each-spot-avgRating"><i className="fa fa-star"></i> New</div>}
                    <div id="center-dot">
                      ·
                    </div>
                    <div>
                    {
                      (() => {
                        if (spots.numReviews == 1) {
                          return <div id="each-spot-reviews"> {spots.numReviews} Review</div>;
                        } else if (spots.numReviews > 1) {
                          return <div id="each-spot-reviews"> {spots.numReviews} Reviews</div>;
                        } else {
                          return <div id="each-spot-reviews"></div>;
                        }
                      })()
                    }
                  </div>
                  </div>
            </div>
          </div>
          <div id="post-your-review-button-container">
              {loggedInButNoReviewByUserAndSpotDoesNotBelongToUser && (
              <OpenModalButton
                buttonText="Post Your Review"
                modalComponent={<CreateReviewModal reviewId={reviews.id} />}
                className="post-your-review-button"
              />
            )}
          </div>


          <div >
            <ReviewsBySpotId />
          </div>
        </div>

    </>
    );

  };

  export default SpotId;

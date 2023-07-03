// frontend/src/components/SpotDetailPage.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import {fetchGetSpotById} from "../../store/spots";
import ReviewsBySpotId from "../Reviews/SpotIdReviews";
import {Route} from "react-router-dom"
import './Spots.css';



const SpotId = () => {
    let {spotId} = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGetSpotById(spotId));
    }, [dispatch]);

    const spots = useSelector((state) => (state.spots.singleSpot));

    if(!spots) return null //NEED THIS, bc will cause error w/ refresh

    return (
    <>
        <div id="spot-details-container">
          <h1>{spots.name}</h1>
          <h2>{spots.city}, {spots.state}, {spots.country}</h2>
          <div>
            {spots.SpotImages.map((spot) => (
                <img id={spots.SpotImages[spots.SpotImages.indexOf(spot)].id} src={spots.SpotImages[spots.SpotImages.indexOf(spot)].url}></img>
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
                    · {spots.numReviews} reviews

                  </div>
                </div>
                <button>Reserve</button>
            </div>
            <div>
                <h3>add a line here to seprate above and start of below</h3>
                <div>
                    {spots.avgRating && (
                        <div id="each-spot-avgRating">★ {spots.avgRating.toFixed(1)}</div>
                      )}
                    {!spots.avgRating && <div id="each-spot-avgRating">★ New</div>}
                    <div>· {spots.numReviews} reviews</div>
                  </div>
            </div>
          </div>
          <div >
            <ReviewsBySpotId />
          </div>
        </div>

    </>
    );

  };

  export default SpotId;
